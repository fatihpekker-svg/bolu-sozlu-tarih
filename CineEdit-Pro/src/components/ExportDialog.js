import React, { useState } from 'react';
import './ExportDialog.css';
import { useProject } from '../store/projectStore';
import videoRenderer from '../utils/videoRenderer';

const ExportDialog = ({ onClose }) => {
    const { tracks } = useProject();
    const [format, setFormat] = useState('mp4');
    const [quality, setQuality] = useState('1080p');
    const [isExporting, setIsExporting] = useState(false);
    const [progress, setProgress] = useState(0);

    const qualities = [
        { value: '4k', label: '4K (3840 × 2160)', bitrate: '50 Mbps' },
        { value: '1080p', label: '1080p (1920 × 1080)', bitrate: '12 Mbps' },
        { value: '720p', label: '720p (1280 × 720)', bitrate: '8 Mbps' },
        { value: '480p', label: '480p (854 × 480)', bitrate: '4 Mbps' },
    ];

    const handleExport = async () => {
        setIsExporting(true);
        setProgress(0);

        try {
            // Get save location first
            let filePath;
            if (window.electron) {
                const result = await window.electron.saveFileDialog({
                    defaultPath: `export.${format}`,
                    filters: [
                        { name: 'Video Files', extensions: [format] }
                    ]
                });

                if (result.canceled) {
                    setIsExporting(false);
                    return;
                }
                filePath = result.filePath;
            }

            // Start rendering
            const blob = await videoRenderer.renderTimeline(
                tracks,
                {
                    outputFormat: format,
                    outputName: `output.${format}`, // FFmpeg internal name
                    // quality settings could be passed here
                },
                (percent) => setProgress(percent)
            );

            // Save the file
            if (window.electron && filePath) {
                const buffer = await blob.arrayBuffer();
                const saveResult = await window.electron.writeBinaryFile(filePath, buffer);

                if (saveResult.success) {
                    alert('Video exported successfully!');
                    onClose();
                } else {
                    throw new Error(saveResult.error || 'Failed to save file');
                }
            } else {
                // Browser fallback download
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `export.${format}`;
                a.click();
                URL.revokeObjectURL(url);

                alert('Export complete! Downloading file...');
                onClose();
            }

        } catch (error) {
            console.error('Export failed:', error);
            alert(`Export failed: ${error.message}`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="export-dialog-overlay" onClick={onClose}>
            <div className="export-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="export-dialog-header">
                    <h2 className="export-dialog-title">Export Video</h2>
                    <button className="export-dialog-close" onClick={onClose}>✕</button>
                </div>

                <div className="export-dialog-body">
                    <div className="export-section">
                        <label className="export-label">Format</label>
                        <div className="format-options">
                            {['mp4', 'mov', 'webm'].map(fmt => (
                                <button
                                    key={fmt}
                                    className={`format-btn ${format === fmt ? 'active' : ''}`}
                                    onClick={() => setFormat(fmt)}
                                >
                                    {fmt.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="export-section">
                        <label className="export-label">Quality</label>
                        <div className="quality-options">
                            {qualities.map(q => (
                                <div
                                    key={q.value}
                                    className={`quality-option ${quality === q.value ? 'selected' : ''}`}
                                    onClick={() => setQuality(q.value)}
                                >
                                    <div className="quality-option-main">
                                        <span className="quality-label">{q.label}</span>
                                        <span className="quality-bitrate">{q.bitrate}</span>
                                    </div>
                                    {quality === q.value && (
                                        <div className="quality-check">✓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {isExporting && (
                        <div className="export-progress">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="progress-text">{progress}% Complete</div>
                        </div>
                    )}
                </div>

                <div className="export-dialog-footer">
                    <button className="btn-secondary" onClick={onClose} disabled={isExporting}>
                        Cancel
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        {isExporting ? 'Exporting...' : 'Export'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportDialog;
