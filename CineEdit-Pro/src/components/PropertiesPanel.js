import React from 'react';
import { useProject } from '../store/projectStore';
import './PropertiesPanel.css';

const PropertiesPanel = () => {
    const { selectedClipIds, tracks } = useProject();

    const selectedClip = selectedClipIds.length === 1 ? (() => {
        for (const track of tracks) {
            const clip = track.clips.find(c => c.id === selectedClipIds[0]);
            if (clip) return clip;
        }
        return null;
    })() : null;

    if (!selectedClip) {
        return (
            <div className="properties-panel">
                <div className="panel-header">
                    <span className="panel-title">Properties</span>
                </div>
                <div className="panel-content">
                    <div className="empty-state">
                        <div className="empty-state-icon">⚙️</div>
                        <div className="empty-state-text">
                            Select a clip to edit properties
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="properties-panel">
            <div className="panel-header">
                <span className="panel-title">Properties</span>
            </div>

            <div className="panel-content">
                <div className="property-section">
                    <div className="property-section-title">Basic</div>

                    <div className="property-item">
                        <label className="property-label">Name</label>
                        <input
                            type="text"
                            className="property-input"
                            value={selectedClip.name}
                            readOnly
                        />
                    </div>

                    <div className="property-item">
                        <label className="property-label">Duration</label>
                        <input
                            type="number"
                            className="property-input"
                            value={selectedClip.duration.toFixed(2)}
                            readOnly
                        />
                    </div>

                    <div className="property-item">
                        <label className="property-label">Start Time</label>
                        <input
                            type="number"
                            className="property-input"
                            value={selectedClip.startTime.toFixed(2)}
                            readOnly
                        />
                    </div>
                </div>

                <div className="property-section">
                    <div className="property-section-title">Transform</div>

                    <div className="property-item">
                        <label className="property-label">Opacity</label>
                        <input
                            type="range"
                            className="property-slider"
                            min="0"
                            max="100"
                            defaultValue="100"
                        />
                        <span className="property-value">100%</span>
                    </div>

                    <div className="property-item">
                        <label className="property-label">Scale</label>
                        <input
                            type="range"
                            className="property-slider"
                            min="0"
                            max="200"
                            defaultValue="100"
                        />
                        <span className="property-value">100%</span>
                    </div>
                </div>

                {selectedClip.type === 'audio' && (
                    <div className="property-section">
                        <div className="property-section-title">Audio</div>

                        <div className="property-item">
                            <label className="property-label">Volume</label>
                            <input
                                type="range"
                                className="property-slider"
                                min="0"
                                max="100"
                                defaultValue="100"
                            />
                            <span className="property-value">100%</span>
                        </div>
                    </div>
                )}

                <div className="property-section">
                    <div className="property-section-title">Effects</div>
                    <div className="effects-stack">
                        <div className="empty-state-text" style={{ fontSize: '12px' }}>
                            Drag effects here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertiesPanel;
