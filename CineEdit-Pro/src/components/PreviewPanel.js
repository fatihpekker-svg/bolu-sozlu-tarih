import React, { useRef, useEffect } from 'react';
import { useProject } from '../store/projectStore';
import './PreviewPanel.css';

const PreviewPanel = ({ onAnalysersReady }) => {
    const {
        playheadPosition,
        isPlaying,
        togglePlayback,
        setPlayheadPosition,
        projectDuration,
        tracks,
        mediaItems
    } = useProject();

    const canvasRef = useRef();
    const videoRef = useRef();
    const panelRef = useRef();
    const audioRefs = useRef({}); // Store refs for audio elements: { clipId: ref }
    const animationFrameRef = useRef();
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const audioContextRef = useRef();
    const analyserLeftRef = useRef();
    const analyserRightRef = useRef();

    // Helper to check if a track should be audible
    const isTrackAudible = (targetTrack) => {
        if (!targetTrack) return false;
        if (targetTrack.muted) return false;

        const anySolo = tracks.some(t => t.solo);
        if (anySolo && !targetTrack.solo) return false;

        return true;
    };

    // Find all active clips at current playhead position
    const getActiveClips = () => {
        let videoClip = null;
        let audioClips = [];

        // We only support one video layer for now (topmost)
        // Reverse array to prioritize upper tracks if we supported layers, 
        // but current logic is simple find-first
        for (const track of tracks) {
            // Skip hidden video tracks
            if (track.type === 'video' && track.hidden) continue;

            for (const clip of track.clips) {
                const clipStart = clip.startTime;
                const clipEnd = clip.startTime + clip.duration;

                if (playheadPosition >= clipStart && playheadPosition < clipEnd) {
                    if (track.type === 'video' && !videoClip) {
                        videoClip = { ...clip, trackId: track.id };
                    }
                    // Collect all audio clips (including from video tracks if we want to mix them, 
                    // but for now let's assume video tracks handle their own audio via the video element)
                    else if (track.type === 'audio') {
                        audioClips.push({ ...clip, trackId: track.id });
                    }
                }
            }
        }
        return { videoClip, audioClips };
    };

    const { videoClip, audioClips } = getActiveClips();

    // Resolve media items
    const videoMedia = videoClip ? mediaItems.find(m => m.id === videoClip.mediaId) : null;
    const audioMediaMap = audioClips.reduce((acc, clip) => {
        const media = mediaItems.find(m => m.id === clip.mediaId);
        if (media) acc[clip.id] = media;
        return acc;
    }, {});

    // Format URL
    const getUrl = (path) => {
        try {
            if (!path) return null;
            if (path.startsWith('http')) return path;
            if (path.startsWith('file://')) return path;

            // Use consistent encoding helper
            const parts = path.split('/');
            const encodedPath = parts.map(part => encodeURIComponent(part)).join('/');
            return `file://${encodedPath.startsWith('/') ? '' : '/'}${encodedPath}`;
        } catch (e) {
            console.error('URL formatting error:', e);
            return path;
        }
    };

    const videoUrl = videoMedia ? getUrl(videoMedia.path) : null;

    // Animation Loop
    useEffect(() => {
        if (isPlaying) {
            // Resume audio context if suspended
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                console.log(`[${audioContextRef.current.id}] Resuming AudioContext...`);
                audioContextRef.current.resume().then(() => {
                    console.log(`[${audioContextRef.current.id}] AudioContext resumed`);
                });
            }

            let lastTime = performance.now();

            const animate = (currentTime) => {
                const deltaTime = (currentTime - lastTime) / 1000;
                lastTime = currentTime;

                // Drive playhead with main video if available, else wall clock
                if (videoRef.current && videoClip && videoRef.current.readyState >= 2) {
                    const videoTime = videoRef.current.currentTime;
                    const playheadTime = videoClip.startTime + (videoTime - (videoClip.trimStart || 0));
                    setPlayheadPosition(playheadTime);
                } else {
                    setPlayheadPosition(prev => {
                        const next = prev + deltaTime;
                        if (next >= projectDuration) {
                            togglePlayback();
                            return projectDuration;
                        }
                        return next;
                    });
                }
                animationFrameRef.current = requestAnimationFrame(animate);
            };
            animationFrameRef.current = requestAnimationFrame(animate);
        } else {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        }
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isPlaying, projectDuration, videoClip, setPlayheadPosition, togglePlayback]);

    // Calculate volume from keyframes at specific time
    const getVolumeAtTime = (clip, clipTime) => {
        // Safety checks
        if (!clip || !clip.keyframes || clip.keyframes.length === 0) return 0.5;
        if (!isFinite(clipTime)) return 0.5;

        const sortedKeyframes = [...clip.keyframes].sort((a, b) => a.time - b.time);

        // Validate keyframes
        const validKeyframes = sortedKeyframes.filter(kf =>
            kf && isFinite(kf.time) && isFinite(kf.value)
        );

        if (validKeyframes.length === 0) return 0.5;

        // If before first keyframe
        if (clipTime <= validKeyframes[0].time) {
            const vol = validKeyframes[0].value / 2;
            return isFinite(vol) ? Math.max(0, Math.min(1, vol)) : 0.5;
        }

        // If after last keyframe
        if (clipTime >= validKeyframes[validKeyframes.length - 1].time) {
            const vol = validKeyframes[validKeyframes.length - 1].value / 2;
            return isFinite(vol) ? Math.max(0, Math.min(1, vol)) : 0.5;
        }

        // Find surrounding keyframes and interpolate
        for (let i = 0; i < validKeyframes.length - 1; i++) {
            const kf1 = validKeyframes[i];
            const kf2 = validKeyframes[i + 1];

            if (clipTime >= kf1.time && clipTime <= kf2.time) {
                const timeDiff = kf2.time - kf1.time;
                if (timeDiff === 0) return kf1.value / 2;

                const progress = (clipTime - kf1.time) / timeDiff;
                const interpolatedValue = kf1.value + (kf2.value - kf1.value) * progress;
                const vol = interpolatedValue / 2;
                return isFinite(vol) ? Math.max(0, Math.min(1, vol)) : 0.5;
            }
        }

        return 0.5;
    };

    // Sync Media Elements
    const syncMedia = () => {
        // Sync Video
        if (videoRef.current && videoClip) {
            // Video audio routing is now handled via Web Audio API
            // Connect video to audio context if not already connected
            if (audioContextRef.current && !videoRef.current._audioSourceConnected) {
                try {
                    const source = audioContextRef.current.createMediaElementSource(videoRef.current);
                    source.connect(audioContextRef.current.masterGain);
                    videoRef.current._audioSourceConnected = true;
                    console.log('Video element connected to AudioContext');
                } catch (e) {
                    console.warn('Error connecting video to audio context:', e);
                }
            }

            const clipTime = playheadPosition - videoClip.startTime;
            const actualTime = clipTime + (videoClip.trimStart || 0);

            // Sync time if significantly off
            if (Math.abs(videoRef.current.currentTime - actualTime) > 0.3) {
                videoRef.current.currentTime = Math.max(0, actualTime);
            }

            if (isPlaying && videoRef.current.paused) {
                videoRef.current.play().catch(() => { });
            } else if (!isPlaying && !videoRef.current.paused) {
                videoRef.current.pause();
            }
        }

        // Sync Audio Clips
        audioClips.forEach(clip => {
            const ref = audioRefs.current[clip.id];
            if (ref) {
                const track = tracks.find(t => t.id === clip.trackId);
                const isAudible = isTrackAudible(track);
                ref.muted = !isAudible;

                const clipTime = playheadPosition - clip.startTime;
                const actualTime = clipTime + (clip.trimStart || 0);

                // Apply volume automation
                const volumeLevel = getVolumeAtTime(clip, clipTime);
                ref.volume = volumeLevel;

                if (Math.abs(ref.currentTime - actualTime) > 0.3) {
                    ref.currentTime = Math.max(0, actualTime);
                }

                if (isPlaying && ref.paused) {
                    ref.play().catch(() => { });
                } else if (!isPlaying && !ref.paused) {
                    ref.pause();
                }
            }
        });
    };

    // Run sync on every render/update
    useEffect(() => {
        syncMedia();
    });

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const frames = Math.floor((seconds % 1) * 30);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
    };

    const handleJumpFrame = (direction) => {
        const frameTime = 1 / 30;
        setPlayheadPosition(prev => Math.max(0, Math.min(projectDuration, prev + (direction * frameTime))));
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (panelRef.current.requestFullscreen) {
                panelRef.current.requestFullscreen();
            } else if (panelRef.current.webkitRequestFullscreen) {
                panelRef.current.webkitRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    // Web Audio API setup for audio metering
    useEffect(() => {
        if (!onAnalysersReady) return;

        // Create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            console.warn('Web Audio API not supported');
            return;
        }

        const audioContext = new AudioContext();
        audioContext.id = Math.random().toString(36).substr(2, 9); // Debug ID
        audioContextRef.current = audioContext;

        // Create gain node as master mixer
        const masterGain = audioContext.createGain();
        masterGain.gain.value = 1.0;

        // Create channel splitter for stereo analysis
        const splitter = audioContext.createChannelSplitter(2);

        // Create analysers for left and right channels
        const analyserLeft = audioContext.createAnalyser();
        const analyserRight = audioContext.createAnalyser();

        analyserLeft.fftSize = 2048;
        analyserRight.fftSize = 2048;
        analyserLeft.smoothingTimeConstant = 0.3; // Lower = more responsive
        analyserRight.smoothingTimeConstant = 0.3;

        analyserLeftRef.current = analyserLeft;
        analyserRightRef.current = analyserRight;

        console.log(`[${audioContext.id}] AudioContext created. State:`, audioContext.state);
        audioContext.onstatechange = () => {
            console.log(`[${audioContext.id}] AudioContext state changed to:`, audioContext.state);
        };

        // Connect: masterGain -> splitter -> analysers -> destination
        masterGain.connect(splitter);
        splitter.connect(analyserLeft, 0);
        splitter.connect(analyserRight, 1);
        masterGain.connect(audioContext.destination);

        // Store master gain for later use
        audioContextRef.current.masterGain = masterGain;

        // Notify parent with analysers
        onAnalysersReady({
            left: analyserLeft,
            right: analyserRight
        });

        console.log(`[${audioContext.id}] Audio analysers created and sent to parent`);

        // Cleanup
        return () => {
            if (audioContextRef.current === audioContext && audioContext.state !== 'closed') {
                console.log(`[${audioContext.id}] Closing AudioContext...`);
                audioContext.close();
            }
        };
    }, [onAnalysersReady]);

    // Helper to connect audio element to Web Audio graph
    const connectAudioElement = (audioElement, clipId) => {
        if (!audioElement || !audioContextRef.current || !audioContextRef.current.masterGain) return;

        if (audioElement._audioSourceConnected) return;

        try {
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(audioContextRef.current.masterGain);
            audioElement._audioSourceConnected = true;
            audioRefs.current[clipId] = audioElement;
            console.log('Audio element connected:', clipId);
        } catch (e) {
            console.warn('Audio element already connected:', e);
        }
    };

    // ESC key handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                setIsFullscreen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, [isFullscreen]);

    return (
        <div className={`preview-panel ${isFullscreen ? 'fullscreen' : ''}`} ref={panelRef}>
            <div className="panel-header">
                <span className="panel-title">Preview</span>
                <div className="panel-actions">
                    <button className="icon-btn" onClick={toggleFullscreen} title="Fullscreen">⛶</button>
                </div>
            </div>

            <div className="preview-stage" onDoubleClick={toggleFullscreen}>
                <div className="preview-viewport">
                    {/* Main Video Layer */}
                    {videoMedia && videoUrl ? (
                        <video
                            ref={videoRef}
                            className="preview-video"
                            src={videoUrl}
                            controls={false}
                            crossOrigin={videoUrl && videoUrl.startsWith('file:') ? undefined : "anonymous"}
                            preload="auto"
                            playsInline
                            onError={(e) => {
                                console.error('Video playback error:', e);
                                console.error('Video source:', videoUrl);
                                console.error('Possible codec incompatibility - browser may not support this MOV format');
                            }}
                        />
                    ) : (
                        <div className="preview-overlay">
                            <div className="preview-placeholder">
                                <div className="preview-placeholder-text">
                                    {audioClips.length > 0 ? 'Audio playing...' : 'No video at playhead'}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hidden Audio Players using ref callback to populate audioRefs */}
                    {audioClips.map(clip => {
                        const media = audioMediaMap[clip.id];
                        if (!media) return null;
                        const src = getUrl(media.path);

                        return (
                            <audio
                                key={clip.id}
                                ref={(el) => {
                                    if (el) {
                                        audioRefs.current[clip.id] = el;
                                        connectAudioElement(el, clip.id);
                                    } else {
                                        delete audioRefs.current[clip.id];
                                    }
                                }}
                                src={src}
                                controls={false}
                            />
                        );
                    })}
                </div>

                <div className="preview-controls">
                    <div className="playback-controls">
                        <button className="control-btn" onClick={() => handleJumpFrame(-1)}>⏮</button>
                        <button className="control-btn control-btn-play" onClick={togglePlayback}>
                            {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button className="control-btn" onClick={() => handleJumpFrame(1)}>⏭</button>
                    </div>

                    <div className="timecode-display">
                        <span className="timecode-current">{formatTime(playheadPosition)}</span>
                        <span className="timecode-separator">/</span>
                        <span className="timecode-total">{formatTime(projectDuration)}</span>
                    </div>

                    <div className="preview-meta">
                        <span className="preview-resolution">1920 × 1080</span>
                        <span className="preview-fps">30 fps</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPanel;
