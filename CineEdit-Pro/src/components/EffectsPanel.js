import React, { useState } from 'react';
import './EffectsPanel.css';

const EffectsPanel = () => {
    const [activeCategory, setActiveCategory] = useState('video');

    const videoEffects = [
        { id: 'brightness', name: 'Brightness', icon: '☀️' },
        { id: 'contrast', name: 'Contrast', icon: '◐' },
        { id: 'saturation', name: 'Saturation', icon: '🎨' },
        { id: 'blur', name: 'Blur', icon: '🌫️' },
        { id: 'sharpen', name: 'Sharpen', icon: '🔍' },
    ];

    const transitions = [
        { id: 'fade', name: 'Fade', icon: '◯' },
        { id: 'dissolve', name: 'Dissolve', icon: '◐' },
        { id: 'wipe-left', name: 'Wipe Left', icon: '◀︎' },
        { id: 'wipe-right', name: 'Wipe Right', icon: '▶︎' },
        { id: 'zoom', name: 'Zoom', icon: '⊕' },
    ];

    const currentEffects = activeCategory === 'video' ? videoEffects : transitions;

    const handleEffectDragStart = (e, effect) => {
        e.dataTransfer.setData('effect', JSON.stringify(effect));
    };

    return (
        <div className="effects-panel">
            <div className="panel-header">
                <span className="panel-title">Effects</span>
            </div>

            <div className="effects-categories">
                <button
                    className={`category-btn ${activeCategory === 'video' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('video')}
                >
                    Video Effects
                </button>
                <button
                    className={`category-btn ${activeCategory === 'transitions' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('transitions')}
                >
                    Transitions
                </button>
            </div>

            <div className="effects-list">
                {currentEffects.map(effect => (
                    <div
                        key={effect.id}
                        className="effect-item"
                        draggable
                        onDragStart={(e) => handleEffectDragStart(e, effect)}
                    >
                        <span className="effect-icon">{effect.icon}</span>
                        <span className="effect-name">{effect.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EffectsPanel;
