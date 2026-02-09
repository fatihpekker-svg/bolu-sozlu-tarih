'use client';

import { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';

export default function ISOSimulator() {
    const canvasRef = useRef(null);
    const [iso, setISO] = useState(400);

    // Common ISO values
    const isoValues = [100, 200, 400, 800, 1600, 3200, 6400, 12800];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate brightness and noise based on ISO
        const brightness = Math.min(0.3 + (iso / 12800) * 0.7, 1); // Brighter at higher ISO
        const noiseAmount = (iso - 100) / (12800 - 100); // More noise at higher ISO

        // Draw night scene background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, `rgba(10, 15, 35, ${brightness})`);
        gradient.addColorStop(1, `rgba(5, 8, 20, ${brightness})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw moon
        ctx.fillStyle = `rgba(240, 240, 200, ${0.6 + brightness * 0.4})`;
        ctx.beginPath();
        ctx.arc(500, 80, 40, 0, Math.PI * 2);
        ctx.fill();

        // Draw stars
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height * 0.5;
            const size = Math.random() * 2 + 1;

            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + brightness * 0.7})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw city silhouette
        drawCityscape(ctx, width, height, brightness);

        // Add noise/grain overlay
        if (noiseAmount > 0) {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            const noiseIntensity = noiseAmount * 80; // Max noise intensity

            for (let i = 0; i < data.length; i += 4) {
                const noise = (Math.random() - 0.5) * noiseIntensity;
                data[i] += noise;     // R
                data[i + 1] += noise; // G
                data[i + 2] += noise; // B
            }

            ctx.putImageData(imageData, 0, 0);
        }

    }, [iso]);

    const drawCityscape = (ctx, width, height, brightness) => {
        const buildings = [
            { x: 50, w: 80, h: 150 },
            { x: 140, w: 60, h: 200 },
            { x: 210, w: 90, h: 120 },
            { x: 310, w: 70, h: 180 },
            { x: 390, w: 100, h: 140 },
            { x: 500, w: 80, h: 190 }
        ];

        buildings.forEach(building => {
            // Building body
            ctx.fillStyle = `rgba(20, 20, 40, ${0.8 + brightness * 0.2})`;
            ctx.fillRect(building.x, height - building.h, building.w, building.h);

            // Windows
            const windowRows = Math.floor(building.h / 25);
            const windowCols = Math.floor(building.w / 20);

            for (let row = 0; row < windowRows; row++) {
                for (let col = 0; col < windowCols; col++) {
                    if (Math.random() > 0.3) { // 70% chance of lit window
                        ctx.fillStyle = `rgba(255, 220, 150, ${0.3 + brightness * 0.5})`;
                        const wx = building.x + col * 20 + 5;
                        const wy = height - building.h + row * 25 + 5;
                        ctx.fillRect(wx, wy, 10, 15);
                    }
                }
            }
        });
    };

    const handleSliderChange = (e) => {
        const index = parseInt(e.target.value);
        setISO(isoValues[index]);
    };

    const getISODescription = () => {
        if (iso <= 400) return 'Düşük ISO - Temiz görüntü, daha fazla ışık gerektirir';
        if (iso <= 1600) return 'Orta ISO - Hafif gürültü, dengeli performans';
        return 'Yüksek ISO - Belirgin gürültü, düşük ışık koşulları için';
    };

    return (
        <div className="cine-simulator">
            <div className="cine-simulator-header">
                <h2 className="cine-simulator-title">ISO Simülatörü</h2>
                <p className="cine-simulator-description">
                    ISO, kameranın ışığa duyarlılığını belirler. Yüksek ISO değerleri daha parlak görüntü
                    sağlar ancak gürültü (noise) artışına neden olur.
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
                        <span>ISO Değeri</span>
                        <span className="cine-control-value">ISO {iso}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={isoValues.length - 1}
                        step="1"
                        value={isoValues.indexOf(iso)}
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
                        <span>ISO 100</span>
                        <span>ISO 12800</span>
                    </div>
                    <p style={{
                        marginTop: '1rem',
                        fontSize: '0.95rem',
                        color: 'var(--cine-gold)',
                        fontWeight: 600
                    }}>
                        {getISODescription()}
                    </p>
                </div>
            </div>

            {/* Info Panel */}
            <div className="cine-info-panel">
                <div className="cine-info-title">
                    <Info size={20} />
                    ISO Ne Zaman Artırılmalı?
                </div>
                <div className="cine-info-text">
                    <p style={{ marginBottom: '0.5rem' }}>
                        <strong>Düşük ışık koşulları:</strong> Gece çekimleri, kapalı mekanlar veya ışık yetersiz
                        olduğunda ISO artırılmalıdır. Ancak bu, görüntüde gürültü (grain/noise) oluşturur.
                    </p>
                    <p>
                        <strong>En iyi uygulama:</strong> Mümkün olan en düşük ISO değerini kullanın. Gerekirse
                        önce diyafram açın veya enstantaneyi yavaşlatın. ISO'yu son çare olarak artırın.
                    </p>
                </div>
            </div>
        </div>
    );
}
