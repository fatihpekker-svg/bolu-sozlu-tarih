import React, { useRef, useState, useEffect } from 'react';
import { useProject } from '../store/projectStore';
import './Timeline.css';

const Timeline = () => {
    const {
        tracks,
        addClipToTrack,
        removeClip,
        updateClip,
        selectClip,
        selectedClipIds,
        playheadPosition,
        setPlayheadPosition,
        zoomLevel,
        setZoomLevel,
        projectDuration,
        addTrack,
        toggleTrackMute,
        toggleTrackSolo,
        toggleTrackVisibility,
        toggleClipLink,
        isPlaying,
        togglePlayback,
        mediaItems
    } = useProject();

    const timelineRef = useRef();
    const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
    const [draggingClip, setDraggingClip] = useState(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [dragPreviewTime, setDragPreviewTime] = useState(null);
    const [trimmingClip, setTrimmingClip] = useState(null);
    const [activeTool, setActiveTool] = useState('select'); // 'select' or 'cut'
    const [draggingNode, setDraggingNode] = useState(null);

    const pixelsPerSecond = 50 * zoomLevel;

    // Pre-load transparent drag image
    const dragImageRef = useRef(null);
    useEffect(() => {
        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        dragImageRef.current = img;
    }, []);

    const handleDrop = (e, trackId) => {
        e.preventDefault();
        const mediaData = e.dataTransfer.getData('mediaItem');
        if (mediaData) {
            const mediaItem = JSON.parse(mediaData);
            const rect = timelineRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const startTime = x / pixelsPerSecond;

            // Generate unique link ID for video+audio pairs
            const linkId = mediaItem.type === 'video' ? `link_${Date.now()}` : null;

            addClipToTrack(trackId, {
                mediaId: mediaItem.id,
                name: mediaItem.name,
                type: mediaItem.type,
                startTime,
                duration: mediaItem.duration,
                trimStart: 0,
                trimEnd: mediaItem.duration,
                path: mediaItem.path,
                volume: 1,
                linkedClipId: linkId,
                keyframes: [
                    { id: 'start', time: 0, value: 1 },
                    { id: 'end', time: mediaItem.duration, value: 1 }
                ]
            });

            // If video, also add to first audio track
            if (mediaItem.type === 'video') {
                const audioTrack = tracks.find(t => t.type === 'audio');
                if (audioTrack) {
                    addClipToTrack(audioTrack.id, {
                        mediaId: mediaItem.id,
                        name: `${mediaItem.name} (Audio)`,
                        type: 'audio',
                        startTime,
                        duration: mediaItem.duration,
                        trimStart: 0,
                        trimEnd: mediaItem.duration,
                        path: mediaItem.path,
                        volume: 1,
                        linkedClipId: linkId,
                        keyframes: [
                            { id: 'start', time: 0, value: 1 },
                            { id: 'end', time: mediaItem.duration, value: 1 }
                        ]
                    });
                }
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handlePlayheadClick = (e) => {
        // Only trigger if not dragging
        if (isDraggingPlayhead) return;

        // Pause playback when user clicks to scrub
        if (isPlaying) {
            togglePlayback();
        }

        if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect();
            const scrollLeft = timelineRef.current.scrollLeft;
            const x = e.clientX - rect.left + scrollLeft;
            const time = Math.max(0, Math.min(projectDuration, x / pixelsPerSecond));
            setPlayheadPosition(time);
        }
    };

    // Playhead drag handlers
    const handlePlayheadMouseDown = (e) => {
        e.stopPropagation();
        setIsDraggingPlayhead(true);
        if (isPlaying) togglePlayback();
    };

    useEffect(() => {
        if (!isDraggingPlayhead) return;

        const handleDragMove = (e) => {
            if (timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                const scrollLeft = timelineRef.current.scrollLeft;
                const x = e.clientX - rect.left + scrollLeft;
                const time = Math.max(0, Math.min(projectDuration, x / pixelsPerSecond));
                setPlayheadPosition(time);
            }
        };

        const handleDragUp = () => {
            setIsDraggingPlayhead(false);
        };

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragUp);

        return () => {
            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragUp);
        };
    }, [isDraggingPlayhead, projectDuration, pixelsPerSecond, setPlayheadPosition]);

    const formatTimecode = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Clip dragging handlers
    const handleClipDragStart = (e, clip, trackId) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        setDragOffset(offsetX);
        setDraggingClip({ ...clip, trackId });
        setDragPreviewTime(clip.startTime);
        e.dataTransfer.effectAllowed = 'move';

        // Use pre-loaded transparent image
        if (dragImageRef.current) {
            e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
        }
    };

    const handleClipDragOver = (e, trackId) => {
        if (!draggingClip) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        // Calculate and update live preview position
        const rect = timelineRef.current.getBoundingClientRect();
        const scrollLeft = timelineRef.current.scrollLeft;
        const x = e.clientX - rect.left + scrollLeft - dragOffset;
        const newStartTime = Math.max(0, x / pixelsPerSecond);

        setDragPreviewTime(newStartTime);
    };

    const handleClipDrop = (e, targetTrackId) => {
        e.preventDefault();
        e.stopPropagation();

        if (draggingClip) {
            const rect = timelineRef.current.getBoundingClientRect();
            const scrollLeft = timelineRef.current.scrollLeft;
            const x = e.clientX - rect.left + scrollLeft - dragOffset;
            const newStartTime = Math.max(0, x / pixelsPerSecond);

            // Calculate time delta for linked clip
            const timeDelta = newStartTime - draggingClip.startTime;

            // Check if moving to different track
            const isTrackChange = targetTrackId !== draggingClip.trackId;

            if (isTrackChange) {
                // Remove from old track
                removeClip(draggingClip.id);

                // Find target track type
                const targetTrack = tracks.find(t => t.id === targetTrackId);

                // Add to new track with updated type
                addClipToTrack(targetTrackId, {
                    ...draggingClip,
                    type: targetTrack.type,
                    startTime: newStartTime,
                    trackId: targetTrackId
                });
            } else {
                // Same track - just update position
                updateClip(draggingClip.trackId, draggingClip.id, {
                    startTime: newStartTime
                });
            }

            // If clip has a link, update the linked clip too (only if same track)
            if (draggingClip.linkedClipId && !isTrackChange) {
                // Find the linked clip in all tracks
                tracks.forEach(track => {
                    const linkedClip = track.clips.find(c =>
                        c.linkedClipId === draggingClip.linkedClipId && c.id !== draggingClip.id
                    );

                    if (linkedClip) {
                        // Move linked clip by same delta
                        const linkedNewStartTime = Math.max(0, linkedClip.startTime + timeDelta);
                        updateClip(track.id, linkedClip.id, {
                            startTime: linkedNewStartTime
                        });
                    }
                });
            }

            setDraggingClip(null);
            setDragPreviewTime(null);
        }
    };

    const handleClipDragEnd = () => {
        setDraggingClip(null);
        setDragPreviewTime(null);
    };

    // Volume Automation Handlers
    const getVolumeY = (value) => {
        // Map volume 0-2 to height 100-0 (SVG coordinates)
        // value 1 = 50
        // Validate value to prevent NaN
        const safeValue = (typeof value === 'number' && isFinite(value)) ? value : 1;
        return Math.max(0, Math.min(100, (1 - (safeValue / 2)) * 100));
    };

    const getVolumePoints = (clip) => {
        if (!clip.keyframes || clip.keyframes.length === 0) return `0,50 100,50`;

        return clip.keyframes
            .filter(kf => typeof kf.time === 'number' && isFinite(kf.time) && typeof kf.value === 'number' && isFinite(kf.value))
            .sort((a, b) => a.time - b.time)
            .map(kf => {
                const x = (kf.time / clip.duration) * 100;
                const y = getVolumeY(kf.value);
                return `${x},${y}`;
            }).join(' ') || `0,50 100,50`;
    };

    const handleVolumeMouseDown = (e, clip, trackId, nodeId = null) => {
        // Only allow if not using cut tool
        if (activeTool === 'cut') return;

        e.stopPropagation();
        e.preventDefault();

        if (e.metaKey || e.ctrlKey) {
            // Add new keyframe logic handled in onClick/onMouseDown on line
            // But here we might be clicking an existing node to remove it?
            // Premiere: Cmd+Click on line adds, Cmd+Click on node removes (maybe?)
            // Let's stick to: Click line to add (if Cmd held), Click node to Drag.
            // Actually user asked for "Command click to add node".
        }

        if (nodeId) {
            // Start dragging existing node
            setDraggingNode({
                clipId: clip.id,
                trackId,
                nodeId,
                startX: e.clientX,
                startY: e.clientY,
                originalKeyframes: [...clip.keyframes]
            });
        } else if (e.metaKey || e.ctrlKey) {
            // Add new node on line
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const relTime = (x / rect.width) * clip.duration;

            // Calculate value based on existing line interpolation
            // For now default to 1 or calculate linear interp
            const rectHeight = rect.height;
            const y = e.clientY - rect.top;
            // y is 0 at top (vol 2), height at bottom (vol 0)
            // vol = 2 * (1 - y/height)
            const value = Math.max(0, Math.min(2, 2 * (1 - y / rectHeight)));

            const newKeyframe = {
                id: Date.now().toString(),
                time: relTime,
                value
            };

            const newKeyframes = [...(clip.keyframes || []), newKeyframe].sort((a, b) => a.time - b.time);

            updateClip(trackId, clip.id, { keyframes: newKeyframes });

            // Immediately start dragging the new node
            setDraggingNode({
                clipId: clip.id,
                trackId,
                nodeId: newKeyframe.id,
                startX: e.clientX,
                startY: e.clientY,
                originalKeyframes: newKeyframes
            });
        }
    };

    useEffect(() => {
        if (!draggingNode) return;

        const handleMouseMove = (e) => {
            const track = tracks.find(t => t.id === draggingNode.trackId);
            const clip = track.clips.find(c => c.id === draggingNode.clipId);
            if (!clip) return;

            const nodeIndex = clip.keyframes.findIndex(k => k.id === draggingNode.nodeId);
            if (nodeIndex === -1) return;

            // Calculate deltas
            // We need pixel-to-value/time conversion
            // Since we don't have rect reference easily here, re-query or store initial rect stats?
            // Simpler: Use movementXY purely if we had standard scaling. 
            // Instead, let's use the clip's DOM element if possible or assume logic.
            // Re-calculating based on screen pixels to clip-relative coordinates is best.

            // Actually, let's just update based on mouse position relative to timeline
            // But node is inside clip. 
            // We can update value based on dy

            // Map movement to value change
            // 50px height = volume range 0-2 (approx)
            const videoHeight = 44; // px
            const dy = e.clientY - draggingNode.startY;
            const volChange = -(dy / videoHeight) * 2; // Up is positive volume

            const dx = e.clientX - draggingNode.startX;
            const timeChange = dx / pixelsPerSecond;

            const originalKf = draggingNode.originalKeyframes.find(k => k.id === draggingNode.nodeId);

            let newValue = Math.max(0, Math.min(2, originalKf.value + volChange));
            let newTime = Math.max(0, Math.min(clip.duration, originalKf.time + timeChange));

            // Constrain time between neighbors
            // Find current index in *original* sorted array to know neighbors
            const sortedOrig = draggingNode.originalKeyframes.sort((a, b) => a.time - b.time);
            const origIndex = sortedOrig.findIndex(k => k.id === draggingNode.nodeId);

            if (origIndex > 0) {
                const prev = sortedOrig[origIndex - 1];
                newTime = Math.max(prev.time + 0.01, newTime);
            } else {
                newTime = 0; // First node locked to start
            }

            if (origIndex < sortedOrig.length - 1) {
                const next = sortedOrig[origIndex + 1];
                newTime = Math.min(next.time - 0.01, newTime);
            } else {
                newTime = clip.duration; // Last node locked to end
            }

            const updatedKeyframes = clip.keyframes.map(kf =>
                kf.id === draggingNode.nodeId
                    ? { ...kf, time: newTime, value: newValue }
                    : kf
            );

            updateClip(draggingNode.trackId, clip.id, { keyframes: updatedKeyframes });
        };

        const handleMouseUp = () => {
            setDraggingNode(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingNode, tracks, pixelsPerSecond, updateClip]);

    // Trim handlers
    const handleTrimStart = (e, clip, trackId, edge) => {
        e.stopPropagation();
        e.preventDefault();

        const media = mediaItems.find(m => m.id === clip.mediaId);
        const maxDuration = media ? media.duration : clip.duration;

        setTrimmingClip({
            clip,
            trackId,
            edge,
            initialX: e.clientX,
            originalStartTime: clip.startTime,
            originalDuration: clip.duration,
            originalTrimStart: clip.trimStart || 0,
            maxDuration
        });
    };

    useEffect(() => {
        if (!trimmingClip) return;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - trimmingClip.initialX;
            const deltaTime = deltaX / pixelsPerSecond;

            if (trimmingClip.edge === 'left') {
                // Trim from start
                const newStartTime = Math.max(0, trimmingClip.originalStartTime + deltaTime);
                const newDuration = trimmingClip.originalDuration - deltaTime;
                const newTrimStart = trimmingClip.originalTrimStart + deltaTime;

                if (newDuration > 0.5 && newTrimStart >= 0) {
                    updateClip(trimmingClip.trackId, trimmingClip.clip.id, {
                        startTime: newStartTime,
                        duration: newDuration,
                        trimStart: newTrimStart
                    });

                    // Update linked clip if exists
                    if (trimmingClip.clip.linkedClipId) {
                        tracks.forEach(track => {
                            const linkedClip = track.clips.find(c =>
                                c.linkedClipId === trimmingClip.clip.linkedClipId && c.id !== trimmingClip.clip.id
                            );

                            if (linkedClip) {
                                const linkedMedia = mediaItems.find(m => m.id === linkedClip.mediaId);
                                const linkedMaxDuration = linkedMedia ? linkedMedia.duration : linkedClip.duration;
                                const linkedOriginalTrimStart = linkedClip.trimStart || 0;

                                const linkedNewStartTime = Math.max(0, linkedClip.startTime + deltaTime);
                                const linkedNewDuration = linkedClip.duration - deltaTime;
                                const linkedNewTrimStart = linkedOriginalTrimStart + deltaTime;

                                if (linkedNewDuration > 0.5 && linkedNewTrimStart >= 0) {
                                    updateClip(track.id, linkedClip.id, {
                                        startTime: linkedNewStartTime,
                                        duration: linkedNewDuration,
                                        trimStart: linkedNewTrimStart
                                    });
                                }
                            }
                        });
                    }
                }
            } else {
                // Trim from end
                let newDuration = Math.max(0.5, trimmingClip.originalDuration + deltaTime);

                // Cap duration so we don't exceed source media length
                // trimEnd = trimStart + duration
                const currentTrimStart = trimmingClip.originalTrimStart;
                if (currentTrimStart + newDuration > trimmingClip.maxDuration) {
                    newDuration = trimmingClip.maxDuration - currentTrimStart;
                }

                updateClip(trimmingClip.trackId, trimmingClip.clip.id, {
                    duration: newDuration,
                    trimEnd: currentTrimStart + newDuration
                });

                // Update linked clip if exists
                if (trimmingClip.clip.linkedClipId) {
                    tracks.forEach(track => {
                        const linkedClip = track.clips.find(c =>
                            c.linkedClipId === trimmingClip.clip.linkedClipId && c.id !== trimmingClip.clip.id
                        );

                        if (linkedClip) {
                            const linkedMedia = mediaItems.find(m => m.id === linkedClip.mediaId);
                            const linkedMaxDuration = linkedMedia ? linkedMedia.duration : linkedClip.duration;
                            const linkedCurrentTrimStart = linkedClip.trimStart || 0;

                            let linkedNewDuration = Math.max(0.5, linkedClip.duration + deltaTime);

                            // Cap linked clip duration
                            if (linkedCurrentTrimStart + linkedNewDuration > linkedMaxDuration) {
                                linkedNewDuration = linkedMaxDuration - linkedCurrentTrimStart;
                            }

                            updateClip(track.id, linkedClip.id, {
                                duration: linkedNewDuration,
                                trimEnd: linkedCurrentTrimStart + linkedNewDuration
                            });
                        }
                    });
                }
            }
        };

        const handleMouseUp = () => {
            setTrimmingClip(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [trimmingClip, pixelsPerSecond, updateClip]);

    // Cut tool handler
    const handleCutAtPlayhead = React.useCallback(() => {
        if (!tracks || tracks.length === 0) return;

        tracks.forEach(track => {
            track.clips.forEach(clip => {
                if (playheadPosition > clip.startTime && playheadPosition < clip.startTime + clip.duration) {
                    const splitTime = playheadPosition - clip.startTime;

                    // Create two new clips
                    const clip1Duration = splitTime;
                    const clip2Duration = clip.duration - splitTime;

                    // Update first clip
                    updateClip(track.id, clip.id, {
                        duration: clip1Duration,
                        trimEnd: (clip.trimStart || 0) + clip1Duration
                    });

                    // Add second clip
                    addClipToTrack(track.id, {
                        mediaId: clip.mediaId,
                        name: clip.name,
                        type: clip.type,
                        startTime: playheadPosition,
                        duration: clip2Duration,
                        trimStart: (clip.trimStart || 0) + clip1Duration,
                        trimEnd: clip.trimEnd || clip.duration,
                        path: clip.path
                    });
                }
            });
        });
    }, [tracks, playheadPosition, updateClip, addClipToTrack]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case 's':
                case 'c': // Make C also trigger split immediately
                    handleCutAtPlayhead();
                    break;
                case 'v':
                    setActiveTool('select');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleCutAtPlayhead]);

    // Dynamic ruler intervals
    const getMarkerInterval = () => {
        const minPixelSpacing = 100; // Minimum pixels between markers
        const secondsPer100px = minPixelSpacing / pixelsPerSecond;

        // Find best interval from nice round numbers
        const intervals = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600];
        for (const interval of intervals) {
            if (interval >= secondsPer100px) return interval;
        }
        return 3600; // Fallback for very long durations
    };

    const markerInterval = getMarkerInterval();
    const timeMarkers = [];
    for (let i = 0; i <= projectDuration; i += markerInterval) {
        timeMarkers.push(i);
    }


    // Fit to screen handler
    const handleFitToScreen = () => {
        if (!timelineRef.current || !tracks) return;

        let maxEndTime = 0;
        tracks.forEach(track => {
            track.clips.forEach(clip => {
                const end = clip.startTime + clip.duration;
                if (end > maxEndTime) maxEndTime = end;
            });
        });

        // If empty, default to a reasonable duration (e.g. 60s) or project start
        if (maxEndTime === 0) maxEndTime = 60;

        // Add 5% padding
        const effectiveDuration = maxEndTime * 1.05;
        const containerWidth = timelineRef.current.clientWidth;

        // Calculate required zoom
        // containerWidth = (50 * zoom) * effectiveDuration
        const newZoom = containerWidth / (50 * effectiveDuration);

        setZoomLevel(newZoom);
    };

    return (
        <div className="timeline">
            <div className="timeline-header">
                <div className="timeline-title-section">
                    <span className="panel-title">Timeline</span>
                </div>

                <div className="timeline-controls">
                    {/* Tool Selection */}
                    <div className="tool-buttons">
                        <button
                            className={`icon-btn ${activeTool === 'select' ? 'active' : ''}`}
                            onClick={() => setActiveTool('select')}
                            title="Selection Tool (V)"
                        >
                            ➤
                        </button>
                        <button
                            className={`icon-btn ${activeTool === 'cut' ? 'active' : ''}`}
                            onClick={() => setActiveTool('cut')}
                            title="Cut Tool (C)"
                        >
                            ✂️
                        </button>
                    </div>

                    <div className="zoom-controls">
                        <button
                            className="icon-btn"
                            onClick={() => setZoomLevel(Math.max(0.25, zoomLevel - 0.25))}
                            title="Zoom Out"
                        >
                            🔍−
                        </button>
                        <button
                            className="icon-btn"
                            onClick={handleFitToScreen}
                            title="Fit to Screen"
                        >
                            ↔️
                        </button>
                        <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
                        <button
                            className="icon-btn"
                            onClick={() => setZoomLevel(Math.min(4, zoomLevel + 0.25))}
                            title="Zoom In"
                        >
                            🔍+
                        </button>
                    </div>

                    <button
                        className="btn-secondary"
                        onClick={() => addTrack('video')}
                        title="Add Video Track"
                    >
                        + Video Track
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => addTrack('audio')}
                        title="Add Audio Track"
                    >
                        + Audio Track
                    </button>
                </div>
            </div>

            <div className="timeline-body">
                <div className="timeline-tracks-header">
                    {tracks.map(track => (
                        <div key={track.id} className="track-header">
                            <span className="track-name">{track.name}</span>
                            <div className="track-controls">
                                {track.type === 'video' ? (
                                    <button
                                        className={`icon-btn ${track.hidden ? 'active-red' : ''}`}
                                        onClick={() => toggleTrackVisibility(track.id)}
                                        title={track.hidden ? 'Show Track' : 'Hide Track'}
                                    >
                                        V
                                    </button>
                                ) : (
                                    <button
                                        className={`icon-btn ${track.muted ? 'active-red' : ''}`}
                                        onClick={() => toggleTrackMute(track.id)}
                                        title={track.muted ? 'Unmute' : 'Mute'}
                                    >
                                        M
                                    </button>
                                )}
                                {track.type === 'audio' && (
                                    <button
                                        className={`icon-btn ${track.solo ? 'active-green' : ''}`}
                                        onClick={() => toggleTrackSolo(track.id)}
                                        title={track.solo ? 'Unsolo' : 'Solo'}
                                    >
                                        S
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="timeline-content"
                    ref={timelineRef}
                    onClick={handlePlayheadClick}
                >
                    {/* Ruler */}
                    <div className="timeline-ruler">
                        {timeMarkers.map(time => (
                            <div
                                key={time}
                                className="time-marker"
                                style={{ left: `${time * pixelsPerSecond}px` }}
                            >
                                <span className="time-marker-label">{formatTimecode(time)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tracks */}
                    <div className="timeline-tracks">
                        {tracks.map(track => (
                            <div
                                key={track.id}
                                className="track"
                                onDrop={(e) => {
                                    // Handle both media browser drops and clip repositioning
                                    if (draggingClip) {
                                        handleClipDrop(e, track.id);
                                    } else {
                                        handleDrop(e, track.id);
                                    }
                                }}
                                onDragOver={(e) => {
                                    if (draggingClip) {
                                        handleClipDragOver(e, track.id);
                                    } else {
                                        handleDragOver(e);
                                    }
                                }}
                            >
                                {track.clips.map(clip => {
                                    const isDragging = draggingClip && draggingClip.id === clip.id;
                                    const displayStartTime = isDragging && dragPreviewTime !== null ? dragPreviewTime : clip.startTime;
                                    const left = displayStartTime * pixelsPerSecond;
                                    const width = clip.duration * pixelsPerSecond;
                                    const isSelected = selectedClipIds.includes(clip.id);

                                    return (
                                        <div
                                            key={clip.id}
                                            className={`timeline-clip ${clip.type === 'video' ? 'clip-video' : 'clip-audio'} ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
                                            style={{
                                                left: `${left}px`,
                                                width: `${width}px`,
                                                opacity: isDragging ? 0.8 : 1,
                                                cursor: 'grab',
                                                zIndex: isDragging ? 10 : 1
                                            }}
                                            draggable={true}
                                            onDragStart={(e) => handleClipDragStart(e, clip, track.id)}
                                            onDragEnd={handleClipDragEnd}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                selectClip(clip.id, e.metaKey || e.ctrlKey);
                                            }}
                                        >
                                            {/* Left trim handle */}
                                            <div
                                                className="trim-handle trim-left"
                                                onMouseDown={(e) => handleTrimStart(e, clip, track.id, 'left')}
                                            />

                                            <div className="clip-content">
                                                <span className="clip-name">{clip.name}</span>
                                                {clip.linkedClipId && (
                                                    <button
                                                        className="clip-link-btn active"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleClipLink(clip.id);
                                                        }}
                                                        title="Unlink from paired clip"
                                                    >
                                                        🔗
                                                    </button>
                                                )}
                                            </div>

                                            {/* Right trim handle */}
                                            <div
                                                className="trim-handle trim-right"
                                                onMouseDown={(e) => handleTrimStart(e, clip, track.id, 'right')}
                                            />

                                            {clip.type === 'audio' && (
                                                <div className="volume-overlay">
                                                    {/* Volume Line */}
                                                    <svg
                                                        width="100%"
                                                        height="100%"
                                                        viewBox="0 0 100 100"
                                                        preserveAspectRatio="none"
                                                        style={{ position: 'absolute', pointerEvents: 'none' }}
                                                    >
                                                        <polyline
                                                            points={getVolumePoints(clip)}
                                                            className="volume-line"
                                                            vectorEffect="non-scaling-stroke"
                                                            onMouseDown={(e) => handleVolumeMouseDown(e, clip, track.id)}
                                                        />
                                                    </svg>

                                                    {/* Volume Nodes as HTML divs for perfect circles */}
                                                    {clip.keyframes && clip.keyframes.map(kf => {
                                                        const xPercent = (kf.time / clip.duration) * 100;
                                                        const yPercent = getVolumeY(kf.value);
                                                        return (
                                                            <div
                                                                key={kf.id}
                                                                className="volume-node-div"
                                                                style={{
                                                                    left: `${xPercent}%`,
                                                                    top: `${yPercent}%`
                                                                }}
                                                                onMouseDown={(e) => handleVolumeMouseDown(e, clip, track.id, kf.id)}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    {/* Playhead */}
                    <div
                        className="playhead"
                        style={{ left: `${playheadPosition * pixelsPerSecond}px` }}
                        onMouseDown={handlePlayheadMouseDown}
                    >
                        <div className="playhead-handle" />
                        <div className="playhead-line" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
