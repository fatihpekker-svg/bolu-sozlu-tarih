'use client';

import { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';

export default function ShutterSpeedSimulator() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [shutterSpeed, setShutterSpeed] = useState(250); // 1/250
    const [carPosition, setCarPosition] = useState(0);

    // Common shutter speed values (denominators for 1/x)
    const shutterSpeeds = [8000, 4000, 2000, 1000, 500, 250, 125, 60, 30, 15, 8, 4, 2, 1];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let position = carPosition;

        const animate = () => {
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Background
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#87CEEB');
            gradient.addColorStop(1, '#E0F6FF');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Road
            ctx.fillStyle = '#555';
            ctx.fillRect(0, height - 100, width, 100);

            // Road lines
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 4;
            ctx.setLineDash([30, 20]);
            ctx.beginPath();
            ctx.moveTo(0, height - 50);
            ctx.lineTo(width, height - 50);
            ctx.stroke();
            ctx.setLineDash([]);

            // Calculate motion blur based on shutter speed
            // Faster shutter = less blur, slower shutter = more blur
            const maxBlur = 30;
            const blurAmount = maxBlur * (1 - (Math.log(shutterSpeed) / Math.log(8000)));

            // Draw car with motion blur
            drawCar(ctx, position, height - 140, blurAmount);

            // Update position
            position += 2;
            if (position > width + 100) {
                position = -100;
            }
            setCarPosition(position);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [shutterSpeed]);

    const drawCar = (ctx, x, y, blur) => {
        ctx.save();

        // Apply motion blur
        if (blur > 1) {
            // Draw multiple instances to simulate motion blur
            const blurSteps = Math.min(Math.floor(blur / 2), 10);
            for (let i = blurSteps; i >= 0; i--) {
                const offsetX = -(i * blur * 0.3);
                const alpha = 0.1 + (i / blurSteps) * 0.3;
                drawCarBody(ctx, x + offsetX, y, alpha);
            }
        }

        // Draw main car
        drawCarBody(ctx, x, y, 1);

        ctx.restore();
    };

    const drawCarBody = (ctx, x, y, alpha) => {
        ctx.globalAlpha = alpha;

        // Car body
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(x, y, 80, 30);
        ctx.fillRect(x + 15, y - 20, 50, 20);

        // Windows
        ctx.fillStyle = '#34495e';
        ctx.fillRect(x + 18, y - 17, 20, 15);
        ctx.fillRect(x + 42, y - 17, 20, 15);

        // Wheels
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.arc(x + 20, y + 30, 10, 0, Math.PI * 2);
        ctx.arc(x + 60, y + 30, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
    };

    const handleSliderChange = (e) => {
        const index = parseInt(e.target.value);
        setShutterSpeed(shutterSpeeds[index]);
    };

    const getShutterSpeedDescription = () => {
        if (shutterSpeed >= 1000) return 'Çok hızlı - Hareketi dondurur, keskin görüntü';
        if (shutterSpeed >= 125) return 'Hızlı - Çoğu hareket keskin görünür';
        if (shutterSpeed >= 30) return 'Yavaş - Hafif hareket bulanıklığı başlar';
        return 'Çok yavaş - Belirgin hareket bulanıklığı, yaratıcı efektler';
    };

    const formatShutterSpeed = (speed) => {
        if (speed === 1) return '1"';
        return `1/${speed}`;
    };

    return (
        <div className="cine-simulator">
            <div className="cine-simulator-header">
                <h2 className="cine-simulator-title">Enstantane Simülatörü</h2>
                <p className="cine-simulator-description">
                    Enstantane hızı (shutter speed), sensörün ışığa ne kadar süre maruz kaldığını belirler.
                    Hareketli nesnelerin görüntüde nasıl görüneceğini etkiler.
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
                        <span>Enstantane Hızı</span>
                        <span className="cine-control-value">{formatShutterSpeed(shutterSpeed)}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={shutterSpeeds.length - 1}
                        step="1"
                        value={shutterSpeeds.indexOf(shutterSpeed)}
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
                        <span>1/8000 (Çok Hızlı)</span>
                        <span>1" (Yavaş)</span>
                    </div>
                    <p style={{
                        marginTop: '1rem',
                        fontSize: '0.95rem',
                        color: 'var(--cine-gold)',
                        fontWeight: 600
                    }}>
                        {getShutterSpeedDescription()}
                    </p>
                </div>
            </div>

            {/* Info Panel */}
            <div className="cine-info-panel">
                <div className="cine-info-title">
                    <Info size={20} />
                    Enstantane ve Hareket İlişkisi
                </div>
                <div className="cine-info-text">
                    <p style={{ marginBottom: '0.5rem' }}>
                        <strong>Hızlı enstantane (1/1000+):</strong> Spor, aksiyon sahneleri için idealdir.
                        Hareketi dondurur ve keskin görüntü sağlar.
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                        <strong>Orta enstantane (1/125 - 1/500):</strong> Genel kullanım için uygundur.
                        Çoğu sahneyi keskin yakalayabilir.
                    </p>
                    <p>
                        <strong>Yavaş enstantane (1/30 ve altı):</strong> Hareket bulanıklığı yaratır.
                        Yaratıcı efektler için kullanılır (akan su, ışık izleri). Tripod gerektirir.
                    </p>
                </div>
            </div>
        </div>
    );
}
