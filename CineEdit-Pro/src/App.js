import React, { useState, useEffect } from 'react';
import './App.css';
import MediaBrowser from './components/MediaBrowser';
import PreviewPanel from './components/PreviewPanel';
import Timeline from './components/Timeline';
import EffectsPanel from './components/EffectsPanel';
import PropertiesPanel from './components/PropertiesPanel';
import AudioMeter from './components/AudioMeter';
import ExportDialog from './components/ExportDialog';
import { ProjectProvider, useProject } from './store/projectStore';

function AppContent() {
    const [showExportDialog, setShowExportDialog] = useState(false);
    const { selectedClipIds, removeClip, togglePlayback } = useProject();
    const [timelineHeight, setTimelineHeight] = useState(350);
    const [isResizing, setIsResizing] = useState(false);
    const [leftPanelWidth, setLeftPanelWidth] = useState(300);
    const [rightPanelWidth, setRightPanelWidth] = useState(320);
    const [resizingPanel, setResizingPanel] = useState(null);
    const [audioAnalysers, setAudioAnalysers] = useState({ left: null, right: null });

    // Keyboard event handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't trigger shortcuts if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedClipIds.length > 0) {
                e.preventDefault();
                selectedClipIds.forEach(clipId => {
                    removeClip(clipId);
                });
            }

            if (e.code === 'Space') {
                e.preventDefault(); // Prevent scrolling
                togglePlayback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedClipIds, removeClip, togglePlayback]);

    // Timeline resize handlers
    const handleResizeStart = (e) => {
        setIsResizing(true);
        e.preventDefault();
    };

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e) => {
            const newHeight = window.innerHeight - e.clientY;
            setTimelineHeight(Math.max(200, Math.min(newHeight, window.innerHeight * 0.6)));
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    // Panel resize handlers
    const handlePanelResizeStart = (panel) => (e) => {
        setResizingPanel(panel);
        e.preventDefault();
    };

    useEffect(() => {
        if (!resizingPanel) return;

        const handleMouseMove = (e) => {
            if (resizingPanel === 'left') {
                const newWidth = e.clientX;
                setLeftPanelWidth(Math.max(250, Math.min(newWidth, window.innerWidth * 0.4)));
            } else if (resizingPanel === 'right') {
                const newWidth = window.innerWidth - e.clientX;
                setRightPanelWidth(Math.max(280, Math.min(newWidth, window.innerWidth * 0.4)));
            }
        };

        const handleMouseUp = () => {
            setResizingPanel(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizingPanel]);

    useEffect(() => {
        // Set up menu event listeners
        if (window.electron) {
            window.electron.onMenuEvent('menu-export', () => {
                setShowExportDialog(true);
            });

            window.electron.onMenuEvent('menu-new-project', () => {
                // Handle new project
                if (window.confirm('Create new project? Unsaved changes will be lost.')) {
                    window.location.reload();
                }
            });
        }

        return () => {
            // Cleanup listeners
            if (window.electron) {
                window.electron.removeMenuListener('menu-export');
                window.electron.removeMenuListener('menu-new-project');
            }
        };
    }, []);

    return (
        <div className="app">
            {/* Top Toolbar */}
            <div className="toolbar">
                <div className="toolbar-section">
                    <div className="app-title">
                        <span className="app-icon">🎬</span>
                        <span className="app-name">CineEdit Pro</span>
                    </div>
                </div>
                <div className="toolbar-section toolbar-center">
                    <span className="project-name">Untitled Project</span>
                </div>
                <div className="toolbar-section">
                    <button
                        className="btn-primary"
                        onClick={() => setShowExportDialog(true)}
                        style={{ marginLeft: 'auto' }}
                    >
                        Export Video
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="workspace">
                {/* Left Panel - Media Browser */}
                <div
                    className="panel panel-left"
                    style={{ width: `${leftPanelWidth}px` }}
                >
                    <MediaBrowser />
                    <div
                        className="panel-resize-handle panel-resize-right"
                        onMouseDown={handlePanelResizeStart('left')}
                    />
                </div>

                {/* Center & Right Panels */}
                <div className="panel-group">
                    {/* Center - Preview */}
                    <div className="panel panel-center">
                        <PreviewPanel onAnalysersReady={setAudioAnalysers} />
                    </div>

                    {/* Right - Effects & Properties */}
                    <div
                        className="panel panel-right"
                        style={{ width: `${rightPanelWidth}px` }}
                    >
                        <div
                            className="panel-resize-handle panel-resize-left"
                            onMouseDown={handlePanelResizeStart('right')}
                        />
                        <div className="panel-split">
                            <EffectsPanel />
                            <PropertiesPanel />
                            <div className="audio-meter-container">
                                <div className="panel-header">
                                    <span className="panel-title">Audio Levels</span>
                                </div>
                                <AudioMeter
                                    analyserLeft={audioAnalysers.left}
                                    analyserRight={audioAnalysers.right}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Panel - Timeline */}
            <div
                className="timeline-container"
                style={{ height: `${timelineHeight}px` }}
            >
                <div
                    className="timeline-resize-handle"
                    onMouseDown={handleResizeStart}
                />
                <Timeline />
            </div>

            {/* Export Dialog */}
            {showExportDialog && (
                <ExportDialog onClose={() => setShowExportDialog(false)} />
            )}
        </div>
    );
}

function App() {
    return (
        <ProjectProvider>
            <AppContent />
        </ProjectProvider>
    );
}

export default App;
