import React, { createContext, useContext, useState, useCallback } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within ProjectProvider');
    }
    return context;
};

export const ProjectProvider = ({ children }) => {
    const [mediaItems, setMediaItems] = useState([]);
    const [tracks, setTracks] = useState([
        { id: 'v1', type: 'video', name: 'Video 1', clips: [], muted: false, solo: false, hidden: false },
        { id: 'a1', type: 'audio', name: 'Audio 1', clips: [], muted: false, solo: false },
    ]);
    const [selectedClipIds, setSelectedClipIds] = useState([]);
    const [playheadPosition, setPlayheadPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [projectDuration, setProjectDuration] = useState(1800); // 30 minutes default

    // Media management
    const addMediaItem = useCallback((item) => {
        setMediaItems(prev => [...prev, { ...item, id: Date.now() + Math.random() }]);
    }, []);

    const removeMediaItem = useCallback((id) => {
        setMediaItems(prev => prev.filter(item => item.id !== id));
    }, []);

    // Timeline management
    const addClipToTrack = useCallback((trackId, clip) => {
        setTracks(prev => prev.map(track => {
            if (track.id === trackId) {
                return {
                    ...track,
                    clips: [...track.clips, {
                        ...clip,
                        id: Date.now() + Math.random(),
                        volume: 1,
                        keyframes: [
                            { id: 'start', time: 0, value: 1 },
                            { id: 'end', time: clip.duration, value: 1 }
                        ]
                    }]
                };
            }
            return track;
        }));
    }, []);

    const removeClip = useCallback((clipId) => {
        setTracks(prevTracks =>
            prevTracks.map(track => ({
                ...track,
                clips: track.clips.filter(clip => clip.id !== clipId)
            }))
        );
        // Also remove from selection
        setSelectedClipIds(prev => prev.filter(id => id !== clipId));
    }, []);

    const updateClip = useCallback((trackId, clipId, updates) => {
        setTracks(prev => prev.map(track => {
            if (track.id === trackId) {
                return {
                    ...track,
                    clips: track.clips.map(clip =>
                        clip.id === clipId ? { ...clip, ...updates } : clip
                    )
                };
            }
            return track;
        }));
    }, []);

    const addTrack = useCallback((type) => {
        const trackNumber = tracks.filter(t => t.type === type).length + 1;
        const newTrack = {
            id: `${type[0]}${trackNumber}`,
            type,
            name: `${type === 'video' ? 'Video' : 'Audio'} ${trackNumber}`,
            clips: [],
            muted: false,
            solo: false
        };
        setTracks(prev => [...prev, newTrack]);
    }, [tracks]);

    const toggleTrackMute = useCallback((trackId) => {
        setTracks(prev => prev.map(track =>
            track.id === trackId ? { ...track, muted: !track.muted } : track
        ));
    }, []);

    const toggleTrackSolo = useCallback((trackId) => {
        setTracks(prev => prev.map(track =>
            track.id === trackId ? { ...track, solo: !track.solo } : track
        ));
    }, []);

    const toggleClipLink = useCallback((clipId) => {
        setTracks(prev => prev.map(track => ({
            ...track,
            clips: track.clips.map(clip => {
                if (clip.id === clipId) {
                    // Toggle: if has link, remove it; otherwise no change (can't add without knowing partner)
                    return { ...clip, linkedClipId: clip.linkedClipId ? null : clip.linkedClipId };
                }
                return clip;
            })
        })));
    }, []);

    const toggleTrackVisibility = useCallback((trackId) => {
        setTracks(prev => prev.map(track =>
            track.id === trackId ? { ...track, hidden: !track.hidden } : track
        ));
    }, []);

    // Selection
    const selectClip = useCallback((clipId, multi = false) => {
        setSelectedClipIds(prev => {
            if (multi) {
                return prev.includes(clipId)
                    ? prev.filter(id => id !== clipId)
                    : [...prev, clipId];
            }
            return [clipId];
        });
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedClipIds([]);
    }, []);

    // Playback
    const togglePlayback = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    const value = {
        // State
        mediaItems,
        tracks,
        selectedClipIds,
        playheadPosition,
        isPlaying,
        zoomLevel,
        projectDuration,

        // Actions
        addMediaItem,
        removeMediaItem,
        addClipToTrack,
        removeClip,
        updateClip,
        addTrack,
        toggleTrackMute,
        toggleTrackSolo,
        toggleTrackVisibility,
        toggleClipLink,
        selectClip,
        clearSelection,
        setPlayheadPosition,
        togglePlayback,
        setZoomLevel,
        setProjectDuration,
    };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
};
