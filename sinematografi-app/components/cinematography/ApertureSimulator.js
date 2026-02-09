'use client';

import { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';

export default function ApertureSimulator() {
    const canvasRef = useRef(null);
    const [fStop, setFStop] = useState(5.6);

    // f-stop values (common aperture values)
    const fStops = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Background
        ctx.fillStyle = '#1a1a24';
        ctx.fillRect(0, 0, width, height);

        // Calculate blur based on f-stop (inverse relationship)
        // Lower f-stop = more blur, higher f-stop = less blur
        const maxBlur = 20;
        const minBlur = 0;
        const blurRadius = maxBlur - ((fStop - 1.4) / (22 - 1.4)) * (maxBlur - minBlur);

        // Draw three layers: background, midground, foreground

        // Background tree (most blur)
        drawTree(ctx, 150, 280, 80, blurRadius * 1.5, '#4a5568');

        // Midground flower (moderate blur)
        drawFlower(ctx, 400, 240, 60, blurRadius * 0.7, '#e74c3c');

        // Foreground flower (least blur - focus point)
        drawFlower(ctx, 280, 320, 70, blurRadius * 0.2, '#f39c12');

        // Add depth cues
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, height - 60, width, 60); // Ground hint

    }, [fStop]);

    const drawFlower = (ctx, x, y, size, blur, color) => {
        ctx.save();

        if (blur > 0) {
            ctx.filter = `blur(${blur}px)`;
        }

        // Center
        ctx.fillStyle = '#f4c430';
        ctx.beginPath();
        ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Petals
        ctx.fillStyle = color;
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i;
            const petalX = x + Math.cos(angle) * size * 0.5;
            const petalY = y + Math.sin(angle) * size * 0.5;

            ctx.beginPath();
            ctx.arc(petalX, petalY, size * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Stem
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = size * 0.1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size * 1.2);
        ctx.stroke();

        ctx.restore();
    };

    const drawTree = (ctx, x, y, size, blur, color) => {
        ctx.save();

        if (blur > 0) {
            ctx.filter = `blur(${blur}px)`;
        }

        // Trunk
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x - size * 0.1, y, size * 0.2, size * 0.8);

        // Crown (triangle)
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y - size * 0.3);
        ctx.lineTo(x - size * 0.6, y + size * 0.2);
        ctx.lineTo(x + size * 0.6, y + size * 0.2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    };

    const handleSliderChange = (e) => {
        const index = parseInt(e.target.value);
        setFStop(fStops[index]);
    };

    return (
        <div className="cine-simulator">
            <div className="cine-simulator-header">
                <h2 className="cine-simulator-title">Diyafram Simülatörü</h2>
                <p className="cine-simulator-description">
                    Diyafram (aperture), objektiften geçen ışık miktarını kontrol eder ve alan derinliğini belirler.
                </p>
            </div>

            {/* Canvas */}
            <div className="cine-canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="cine-canvas"
                />
            </div>

            {/* Controls */}
            <div className="cine-controls">
                <div className="cine-control-group">
                    <div className="cine-control-label">
                        <span>f-stop Değeri</span>
                        <span className="cine-control-value">f/{fStop}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={fStops.length - 1}
                        step="1"
                        value={fStops.indexOf(fStop)}
                        onChange={handleSliderChange}
                        className="cine-slider"
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginTop: '0.5rem'
                    }}>
                        <span>f/1.4 (Geniş)</span>
                        <span>f/22 (Dar)</span>
                    </div>
                </div>
            </div>

            {/* Info Panel */}
            <div className="cine-info-panel">
                <div className="cine-info-title">
                    <Info size={20} />
                    Alan Derinliği Nedir?
                </div>
                <div className="cine-info-text">
                    <p style={{ marginBottom: '0.5rem' }}>
                        <strong>Düşük f-stop (f/1.4 - f/2.8):</strong> Geniş diyafram açıklığı. Daha fazla ışık girer,
                        arka plan bulanıklaşır (얕은 alan derinliği). Portrelerde tercih edilir.
                    </p>
                    <p>
                        <strong>Yüksek f-stop (f/11 - f/22):</strong> Dar diyafram açıklığı. Daha az ışık girer,
                        ön ve arka plan nettir (derin alan derinliği). Manzara fotoğrafçılığında tercih edilir.
                    </p>
                </div>
            </div>
        </div>
    );
}
