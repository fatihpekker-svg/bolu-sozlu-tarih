'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, Lightbulb } from 'lucide-react';
import '../cinematography.css';

export default function LightingPage() {
    const [keyLightIntensity, setKeyLightIntensity] = useState(80);
    const [fillLightIntensity, setFillLightIntensity] = useState(40);
    const [backLightIntensity, setBackLightIntensity] = useState(60);
    const [selectedSetup, setSelectedSetup] = useState('3-point');

    const lightingSetups = [
        {
            id: '3-point',
            name: '3-Point Lighting',
            description: 'Klasik portre ışıklandırması',
            key: 80,
            fill: 40,
            back: 60
        },
        {
            id: 'rembrandt',
            name: 'Rembrandt',
            description: 'Yüzde üçgen ışık, dramatik',
            key: 90,
            fill: 25,
            back: 50
        },
        {
            id: 'butterfly',
            name: 'Butterfly',
            description: 'Yukarıdan ışık, beauty lighting',
            key: 85,
            fill: 45,
            back: 40
        },
        {
            id: 'split',
            name: 'Split Lighting',
            description: 'Yüzün yarısı aydınlık, yarısı karanlık',
            key: 100,
            fill: 10,
            back: 55
        },
        {
            id: 'low-key',
            name: 'Low-Key',
            description: 'Koyu tonlar, yüksek kontrast',
            key: 70,
            fill: 15,
            back: 80
        },
        {
            id: 'high-key',
            name: 'High-Key',
            description: 'Açık tonlar, düşük kontrast',
            key: 90,
            fill: 80,
            back: 70
        }
    ];

    const applySetup = (setup) => {
        setSelectedSetup(setup.id);
        setKeyLightIntensity(setup.key);
        setFillLightIntensity(setup.fill);
        setBackLightIntensity(setup.back);
    };

    const getFaceShading = () => {
        // Calculate shadow intensity based on lights
        const shadowIntensity = Math.max(0, keyLightIntensity - fillLightIntensity);
        const highlightIntensity = keyLightIntensity;
        const rimLight = backLightIntensity;

        return {
            shadowIntensity,
            highlightIntensity,
            rimLight
        };
    };

    const { shadowIntensity, highlightIntensity, rimLight } = getFaceShading();

    return (
        <div className="cine-page">
            <div className="cine-container">
                {/* Back Button */}
                <Link href="/" style={{
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
                    <h1 className="cine-title">Işıklandırma Teknikleri</h1>
                    <p className="cine-subtitle">
                        Profesyonel görüntülerin sırrı doğru ışıklandırmadadır. 3-point lighting ve diğer
                        klasik setup'ları öğrenin, kendi ışık düzenlerinizi oluşturun.
                    </p>
                </header>

                {/* Main Lighting Simulator */}
                <section className="cine-simulator">
                    <div className="cine-simulator-header">
                        <h2 className="cine-simulator-title">3-Point Lighting Simülatörü</h2>
                        <p className="cine-simulator-description">
                            Key, fill ve back light yoğunluklarını ayarlayarak yüzdeki ışık ve gölge dağılımını kontrol edin
                        </p>
                    </div>

                    {/* Preset Setups */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '0.75rem',
                        marginBottom: '2rem'
                    }}>
                        {lightingSetups.map((setup) => (
                            <button
                                key={setup.id}
                                onClick={() => applySetup(setup)}
                                style={{
                                    background: selectedSetup === setup.id
                                        ? 'var(--cine-gradient-gold)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    color: selectedSetup === setup.id ? 'var(--cine-dark)' : '#fff',
                                    border: selectedSetup === setup.id
                                        ? '2px solid var(--cine-gold)'
                                        : '2px solid var(--cine-border)',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--cine-radius-sm)',
                                    cursor: 'pointer',
                                    transition: 'all var(--cine-transition-fast)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    textAlign: 'center'
                                }}
                            >
                                {setup.name}
                            </button>
                        ))}
                    </div>

                    {/* Visual Display */}
                    <div className="cine-canvas-wrapper">
                        <div style={{
                            width: '100%',
                            maxWidth: '500px',
                            aspectRatio: '1',
                            background: '#1a1a1a',
                            borderRadius: 'var(--cine-radius-md)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            {/* Face representation */}
                            <div style={{
                                width: '200px',
                                height: '240px',
                                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                position: 'relative',
                                background: `
                  radial-gradient(
                    ellipse at 30% 40%,
                    rgba(255, 220, 180, ${highlightIntensity / 100}) 0%,
                    rgba(200, 150, 120, ${Math.max(0.3, fillLightIntensity / 100)}) 50%,
                    rgba(100, 70, 50, ${Math.max(0.2, 1 - shadowIntensity / 100)}) 100%
                  )
                `,
                                boxShadow: `
                  ${rimLight > 50 ? `10px 0 ${rimLight}px rgba(255, 255, 255, ${rimLight / 200})` : 'none'},
                  inset -${shadowIntensity / 2}px 0 ${shadowIntensity}px rgba(0, 0, 0, ${shadowIntensity / 100})
                `,
                                transition: 'all 0.3s ease'
                            }}>
                                {/* Eyes */}
                                <div style={{
                                    position: 'absolute',
                                    top: '35%',
                                    left: '28%',
                                    width: '15px',
                                    height: '15px',
                                    background: '#2c2c2c',
                                    borderRadius: '50%'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    top: '35%',
                                    right: '28%',
                                    width: '15px',
                                    height: '15px',
                                    background: '#2c2c2c',
                                    borderRadius: '50%'
                                }}></div>

                                {/* Nose shadow */}
                                <div style={{
                                    position: 'absolute',
                                    top: '45%',
                                    left: '45%',
                                    width: '20px',
                                    height: '30px',
                                    background: `linear-gradient(to right, 
                    rgba(0,0,0,${shadowIntensity / 200}),
                    transparent
                  )`,
                                    transform: 'translateX(-50%)',
                                    borderRadius: '0 50% 50% 0'
                                }}></div>

                                {/* Mouth */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '25%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '40px',
                                    height: '5px',
                                    background: '#3c3c3c',
                                    borderRadius: '0 0 20px 20px'
                                }}></div>
                            </div>

                            {/* Light indicators */}
                            {keyLightIntensity > 10 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10%',
                                    left: '15%',
                                    width: '15px',
                                    height: '15px',
                                    background: 'var(--cine-gold)',
                                    borderRadius: '50%',
                                    boxShadow: `0 0 20px rgba(244, 196, 48, ${keyLightIntensity / 100})`,
                                    animation: 'pulse 2s ease-in-out infinite'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%) rotate(45deg)',
                                        fontSize: '0.6rem'
                                    }}>💡</div>
                                </div>
                            )}

                            {fillLightIntensity > 10 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '30%',
                                    right: '15%',
                                    width: '12px',
                                    height: '12px',
                                    background: 'var(--cine-blue)',
                                    borderRadius: '50%',
                                    boxShadow: `0 0 15px rgba(74, 158, 255, ${fillLightIntensity / 100})`
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '0.5rem'
                                    }}>💡</div>
                                </div>
                            )}

                            {backLightIntensity > 10 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '40%',
                                    right: '5%',
                                    width: '12px',
                                    height: '12px',
                                    background: '#fff',
                                    borderRadius: '50%',
                                    boxShadow: `0 0 15px rgba(255, 255, 255, ${backLightIntensity / 100})`
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '0.5rem'
                                    }}>💡</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="cine-controls" style={{ marginTop: '2rem' }}>
                        {/* Key Light */}
                        <div className="cine-control-group">
                            <div className="cine-control-label">
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        background: 'var(--cine-gold)',
                                        borderRadius: '50%'
                                    }}></div>
                                    Key Light (Ana Işık)
                                </span>
                                <span className="cine-control-value">{keyLightIntensity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={keyLightIntensity}
                                onChange={(e) => setKeyLightIntensity(parseInt(e.target.value))}
                                className="cine-slider"
                            />
                        </div>

                        {/* Fill Light */}
                        <div className="cine-control-group">
                            <div className="cine-control-label">
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        background: 'var(--cine-blue)',
                                        borderRadius: '50%'
                                    }}></div>
                                    Fill Light (Dolgu Işık)
                                </span>
                                <span className="cine-control-value">{fillLightIntensity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={fillLightIntensity}
                                onChange={(e) => setFillLightIntensity(parseInt(e.target.value))}
                                className="cine-slider"
                            />
                        </div>

                        {/* Back Light */}
                        <div className="cine-control-group">
                            <div className="cine-control-label">
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        background: '#fff',
                                        borderRadius: '50%'
                                    }}></div>
                                    Back Light (Arka Işık)
                                </span>
                                <span className="cine-control-value">{backLightIntensity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={backLightIntensity}
                                onChange={(e) => setBackLightIntensity(parseInt(e.target.value))}
                                className="cine-slider"
                            />
                        </div>
                    </div>
                </section>

                {/* Lighting Explanations */}
                <section style={{ marginTop: '3rem' }}>
                    <h2 className="cine-section-title">Işık Türleri</h2>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="cine-glass" style={{ padding: '1.5rem', borderRadius: 'var(--cine-radius-md)' }}>
                            <h3 style={{
                                color: 'var(--cine-gold)',
                                fontSize: '1.3rem',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Lightbulb size={24} />
                                Key Light (Ana Işık)
                            </h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7 }}>
                                En güçlü ve ana ışık kaynağı. Öznenin ana aydınlatmasını sağlar. Genellikle
                                45 derece açıyla ve kameranın bir tarafında konumlandırılır. Sahnenin genel tonunu belirler.
                            </p>
                        </div>

                        <div className="cine-glass" style={{ padding: '1.5rem', borderRadius: 'var(--cine-radius-md)' }}>
                            <h3 style={{
                                color: 'var(--cine-blue)',
                                fontSize: '1.3rem',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Lightbulb size={24} />
                                Fill Light (Dolgu Işık)
                            </h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7 }}>
                                Key light'ın yarattığı gölgeleri yumuşatır. Key light'tan daha az yoğunlukta,
                                kameranın diğer tarafında konumlandırılır. Gölge detaylarını korur ve kontrast seviyesini ayarlar.
                            </p>
                        </div>

                        <div className="cine-glass" style={{ padding: '1.5rem', borderRadius: 'var(--cine-radius-md)' }}>
                            <h3 style={{
                                color: '#fff',
                                fontSize: '1.3rem',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Lightbulb size={24} />
                                Back Light / Hair Light (Arka Işık)
                            </h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7 }}>
                                Öznenin arkasından gelir. Özneyi arka plandan ayırır ve kenarlarında ışık yaratır (rim light).
                                Derinlik hissi verir ve profesyonel görünüm sağlar.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tips */}
                <div className="cine-info-panel" style={{ marginTop: '3rem' }}>
                    <div className="cine-info-title">
                        <Info size={20} />
                        Işıklandırma İpuçları
                    </div>
                    <div className="cine-info-text">
                        <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Lighting Ratio:</strong> Key ve fill light arasındaki oran önemlidir.
                            2:1 ratio (Key'in iki katı güçlü) doğal görünüm, 8:1 ratio dramatik, film noir görünüm yaratır.
                        </p>
                        <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Işık kalitesi:</strong> Sert ışık (hard light) keskin gölgeler, yumuşak ışık (soft light)
                            yumuşak geçişler yaratır. Diffuser kullanarak ışığı yumuşatabilirsiniz.
                        </p>
                        <p>
                            <strong>Renk sıcaklığı:</strong> Işık kaynağının rengi önemlidir. Tungsten (3200K) sıcak,
                            daylight (5600K) soğuk tonlar verir. Color temperature tutarlı olmalıdır.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
