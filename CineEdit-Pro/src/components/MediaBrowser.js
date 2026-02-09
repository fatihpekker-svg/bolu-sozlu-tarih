import React, { useRef, useState, useEffect } from 'react';
import { useProject } from '../store/projectStore';
import './MediaBrowser.css';

const MediaBrowser = () => {
    const { mediaItems, addMediaItem, removeMediaItem } = useProject();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const fileInputRef = useRef();

    // Helper to format file path as URL
    const getFileUrl = (path) => {
        try {
            if (!path) return '';
            if (path.startsWith('file://')) return path;
            const parts = path.split('/');
            const encodedPath = parts.map(part => encodeURIComponent(part)).join('/');
            return `file://${encodedPath.startsWith('/') ? '' : '/'}${encodedPath}`;
        } catch (e) {
            console.error('Path encoding error:', e);
            return path || '';
        }
    };

    const getMediaDuration = (path, type) => {
        return new Promise((resolve) => {
            if (type === 'image') {
                resolve(5);
                return;
            }

            const element = document.createElement(type === 'audio' ? 'audio' : 'video');
            element.preload = 'metadata';

            const timeoutId = setTimeout(() => {
                console.warn('Metadata load timed out for:', path);
                resolve(type === 'video' ? 10 : 5); // Fallback
            }, 1000); // 1s timeout

            element.onloadedmetadata = () => {
                clearTimeout(timeoutId);
                resolve(element.duration && isFinite(element.duration) ? element.duration : (type === 'video' ? 10 : 5));
            };

            element.onerror = (e) => {
                clearTimeout(timeoutId);
                console.warn('Metadata load error for:', path, e);
                resolve(type === 'video' ? 10 : 5); // Fallback but still import
            };

            try {
                element.src = getFileUrl(path);
            } catch (err) {
                clearTimeout(timeoutId);
                resolve(type === 'video' ? 10 : 5);
            }
        });
    };

    const generateThumbnail = (path) => {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';

            try {
                video.src = getFileUrl(path);
            } catch (e) {
                resolve(null);
                return;
            }

            video.currentTime = 1;

            video.onloadeddata = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = 320;
                    canvas.height = 180;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg');
                    resolve(dataUrl);
                } catch (e) {
                    resolve(null);
                }
            };

            video.onerror = () => {
                resolve(null);
            };

            // Timeout for thumbnail
            setTimeout(() => resolve(null), 2000);
        });
    };

    const handleImport = async () => {
        if (!window.electron) return;

        const result = await window.electron.openFileDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Media Files', extensions: ['mp4', 'mov', 'webm', 'avi', 'mkv', 'mp3', 'wav', 'aac', 'm4a', 'jpg', 'jpeg', 'png', 'gif', 'MOV', 'MP4', 'M4V'] }
            ]
        });

        if (!result.canceled && result.filePaths.length > 0) {
            for (const filePath of result.filePaths) {
                const fileName = filePath.split('/').pop();
                const extension = fileName.split('.').pop().toLowerCase();
                const type = ['mp4', 'mov', 'webm', 'avi', 'mkv', 'm4v'].includes(extension) ? 'video' :
                    ['mp3', 'wav', 'aac', 'm4a'].includes(extension) ? 'audio' : 'image';

                const duration = await getMediaDuration(filePath, type);
                let thumbnail = null;

                if (type === 'video') {
                    thumbnail = await generateThumbnail(filePath);
                } else if (type === 'image') {
                    thumbnail = `file://${filePath}`;
                }

                addMediaItem({
                    name: fileName,
                    path: filePath,
                    type,
                    duration,
                    thumbnail,
                });
            }
        }
    };

    // Listen for menu commands
    useEffect(() => {
        if (window.electron) {
            window.electron.onMenuEvent('menu-import-media', handleImport);
            return () => window.electron.removeMenuListener('menu-import-media');
        }
    }, []);

    // Pre-load transparent drag image
    const dragImageRef = useRef(null);
    useEffect(() => {
        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        dragImageRef.current = img;
    }, []);

    const handleDragStart = (e, item) => {
        // Exclude larg thumbnail data to reduce drag lag
        const { thumbnail, ...lightweightItem } = item;
        e.dataTransfer.setData('mediaItem', JSON.stringify(lightweightItem));
        e.dataTransfer.effectAllowed = 'copy';

        // Use pre-loaded transparent image
        if (dragImageRef.current) {
            e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
        }
    };

    // Handle file drop from desktop
    const handleFileDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);

            for (const file of files) {
                const fileName = file.name;
                const extension = fileName.split('.').pop().toLowerCase();
                const type = ['mp4', 'mov', 'webm', 'avi', 'mkv', 'm4v'].includes(extension) ? 'video' :
                    ['mp3', 'wav', 'aac', 'm4a'].includes(extension) ? 'audio' : 'image';

                const duration = await getMediaDuration(file.path, type);
                let thumbnail = null;

                if (type === 'video') {
                    thumbnail = await generateThumbnail(file.path);
                } else if (type === 'image') {
                    thumbnail = `file://${file.path}`;
                }

                addMediaItem({
                    name: fileName,
                    path: file.path || file.name,
                    type,
                    duration,
                    thumbnail,
                });
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleBackgroundDoubleClick = (e) => {
        // Prevent triggering if clicking on a media item or its children
        if (e.target.closest('.media-item')) return;
        handleImport();
    };

    return (
        <div
            className="media-browser"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
        >
            <div className="panel-header">
                <span className="panel-title">Media Browser</span>
                <div className="panel-actions">
                    <div className="view-toggles">
                        <button
                            className={`icon-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            title="Grid View"
                        >
                            ⊞
                        </button>
                        <button
                            className={`icon-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            title="List View"
                        >
                            ☰
                        </button>
                    </div>
                    <div className="separator-vertical"></div>
                    <button className="icon-btn" onClick={handleImport} title="Import Media">
                        ➕
                    </button>
                </div>
            </div>

            <div
                className="panel-content"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDoubleClick={handleBackgroundDoubleClick}
            >
                {mediaItems.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🎥</div>
                        <div className="empty-state-text">
                            No media imported yet.<br />
                            Click + to import media files.
                        </div>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' ? 'media-grid' : 'media-list'}>
                        {mediaItems.map(item => (
                            <div
                                key={item.id}
                                className="media-item"
                                draggable
                                onDragStart={(e) => handleDragStart(e, item)}
                            >
                                <div className="media-thumbnail">
                                    {item.thumbnail ? (
                                        <img src={item.thumbnail} alt={item.name} draggable={false} />
                                    ) : (
                                        <>
                                            {item.type === 'video' && '🎬'}
                                            {item.type === 'audio' && '🎵'}
                                            {item.type === 'image' && '🖼️'}
                                        </>
                                    )}
                                </div>
                                <div className="media-info">
                                    <div className="media-name" title={item.name}>
                                        {item.name}
                                    </div>
                                    <div className="media-meta">
                                        {item.type} • {item.duration ? item.duration.toFixed(1) : '0.0'}s
                                    </div>
                                </div>
                                <button
                                    className="media-delete"
                                    onClick={() => removeMediaItem(item.id)}
                                    title="Remove"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaBrowser;
