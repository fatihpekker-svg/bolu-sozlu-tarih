'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
import '../cinematography.css';

export default function LensAnglesPage() {
    const [focalLength, setFocalLength] = useState(50);

    // Common focal lengths
    const focalLengths = [14, 24, 35, 50, 85, 135, 200];
    const focalLengthNames = {
        14: 'Ultra Wide',
        24: 'Wide Angle',
        35: 'Wide',
        50: 'Normal',
        85: 'Portrait',
        135: 'Telephoto',
        200: 'Super Telephoto'
    };

    const getLensDescription = () => {
        if (focalLength <= 24) return 'Ultra wide ve wide angle lensler geniş sahne gösterir, perspektif distorsiyonu yaratır';
        if (focalLength <= 50) return 'Normal lens, insan gözüne en yakın perspektifi sağlar';
        if (focalLength <= 100) return 'Portrait lens, yüz çekimleri için ideal, arka plan compression';
        return 'Telephoto lens, uzak nesneleri yaklaştırır, perspektif sıkıştırması yaratır';
    };

    const handleSliderChange = (e) => {
        const index = parseInt(e.target.value);
        setFocalLength(focalLengths[index]);
    };

    const getScale = () => {
        // Scale the scene based on focal length
        // Wide = zoomed out (smaller), Tele = zoomed in (larger)
        return 0.5 + (focalLength - 14) / (200 - 14) * 1.5;
    };

    const getPerspective = () => {
        // Wider lens = more perspective distortion
        return 1000 - (focalLength - 14) / (200 - 14) * 600;
    };

    return (
        <div className="cine-page">
            <div className="cine-container">
                {/* Back Button */}
                <Link href="/sinematografi" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--cine-gold)',
                    textDecoration: 'none',
                    marginBottom: '2rem',
                    fontSize: '1rem'
                }}>
                    <ArrowLeft size={20} />
                    Ana Sayfaya Dön
                </Link>

                {/* Header */}
                <header style={{ marginBottom: '3rem' }}>
                    <h1 className="cine-title">Objektif Açıları</h1>
                    <p className="cine-subtitle">
                        Farklı focal length (odak uzaklığı) değerlerinin perspektif, alan görüşü ve
                        kompozisyon üzerindeki etkilerini keşfedin.
                    </p>
                </header>

                {/* Lens Simulator */}
                <section className="cine-simulator">
                    <div className="cine-simulator-header">
                        <h2 className="cine-simulator-title">Lens Karşılaştırma Simülatörü</h2>
                        <p className="cine-simulator-description">
                            Aynı sahneyi farklı lens açılarıyla görüntüleyin
                        </p>
                    </div>

                    {/* Visual Demo */}
                    <div className="cine-canvas-wrapper">
                        <div style={{
                            width: '100%',
                            maxWidth: '600px',
                            aspectRatio: '16/9',
                            position: 'relative',
                            overflow: 'hidden',
                            background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)',
                            borderRadius: 'var(--cine-radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            perspective: `${getPerspective()}px`
                        }}>
                            {/* Background mountains */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '40%',
                                background: 'linear-gradient(to top, #2c5f2d 0%, #4a7c59 100%)',
                                clipPath: 'polygon(0 100%, 0 40%, 20% 60%, 40% 30%, 60% 50%, 80% 35%, 100% 55%, 100% 100%)',
                                transform: `scale(${getScale()}) translateZ(-100px)`,
                                transition: 'transform 0.3s ease'
                            }}></div>

                            {/* Middle ground tree */}
                            <div style={{
                                position: 'absolute',
                                bottom: '25%',
                                left: '20%',
                                transform: `scale(${getScale() * 0.8}) translateZ(-50px)`,
                                transition: 'transform 0.3s ease'
                            }}>
                                <div style={{
                                    width: '20px',
                                    height: '60px',
                                    background: '#654321',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '-30px',
                                        left: '-25px',
                                        width: 0,
                                        height: 0,
                                        borderLeft: '35px solid transparent',
                                        borderRight: '35px solid transparent',
                                        borderBottom: '50px solid #2d5016'
                                    }}></div>
                                </div>
                            </div>

                            {/* Foreground person */}
                            <div style={{
                                position: 'absolute',
                                bottom: '20%',
                                left: '50%',
                                transform: `translateX(-50%) scale(${getScale()}) translateZ(0px)`,
                                fontSize: '4rem',
                                transition: 'transform 0.3s ease'
                            }}>
                                🧍
                            </div>

                            {/* Sun */}
                            <div style={{
                                position: 'absolute',
                                top: '15%',
                                right: '15%',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)',
                                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
                                transform: `scale(${getScale() * 0.7})`,
                                transition: 'transform 0.3s ease'
                            }}></div>

                            {/* Field of View Indicator */}
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                background: 'rgba(0, 0, 0, 0.6)',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--cine-radius-sm)',
                                fontSize: '0.9rem',
                                fontWeight: 600
                            }}>
                                {focalLength}mm - {focalLengthNames[focalLength]}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="cine-controls">
                        <div className="cine-control-group">
                            <div className="cine-control-label">
                                <span>Focal Length</span>
                                <span className="cine-control-value">{focalLength}mm</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max={focalLengths.length - 1}
                                step="1"
                                value={focalLengths.indexOf(focalLength)}
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
                                <span>14mm (Wide)</span>
                                <span>200mm (Tele)</span>
                            </div>
                            <p style={{
                                marginTop: '1rem',
                                fontSize: '0.95rem',
                                color: 'var(--cine-gold)',
                                fontWeight: 600
                            }}>
                                {getLensDescription()}
                            </p>
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div className="cine-info-panel">
                        <div className="cine-info-title">
                            <Info size={20} />
                            Focal Length ve Perspektif
                        </div>
                        <div className="cine-info-text">
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>Wide Angle (14-35mm):</strong> Geniş alan görüşü, perspektif distorsiyonu,
                                nesneler arası mesafe abartılır. Mimari, manzara ve geniş sahneler için ideal.
                            </p>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>Normal (50mm):</strong> İnsan gözüne en yakın perspektif. Doğal görünüm,
                                minimal distorsiyon. Genel kullanım için çok yönlüdür.
                            </p>
                            <p>
                                <strong>Telephoto (85-200mm+):</strong> Dar alan görüşü, perspektif sıkıştırması
                                (compression), arka plan daha yakın görünür. Portre ve detay çekimler için ideal.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Lens Comparison Chart */}
                <section style={{ marginTop: '3rem' }}>
                    <h2 className="cine-section-title">Lens Tiplerine Göre Kullanım Alanları</h2>

                    <div className="cine-comparison-grid">
                        {focalLengths.map((fl, index) => (
                            <div key={fl} className="cine-comparison-item cine-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="cine-comparison-label">
                                    {fl}mm
                                </div>
                                <div className="cine-comparison-description" style={{
                                    color: 'var(--cine-blue)',
                                    fontWeight: 600,
                                    marginBottom: '0.5rem'
                                }}>
                                    {focalLengthNames[fl]}
                                </div>
                                <div className="cine-comparison-description">
                                    {fl === 14 && 'Mimari, iç mekan, geniş manzara'}
                                    {fl === 24 && 'Manzara, sokak fotoğrafçılığı, vlog'}
                                    {fl === 35 && 'Genel kullanım, documentary, street'}
                                    {fl === 50 && 'All-around, doğal perspektif'}
                                    {fl === 85 && 'Portre, röportaj, headshot'}
                                    {fl === 135 && 'Portre, spor, wildlife'}
                                    {fl === 200 && 'Spor, vahşi yaşam, uzak detaylar'}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
