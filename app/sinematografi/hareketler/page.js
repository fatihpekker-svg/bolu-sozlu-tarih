'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
import '../cinematography.css';

export default function CameraMovementsPage() {
    const [selectedMovement, setSelectedMovement] = useState('pan');

    const movements = [
        {
            id: 'pan',
            name: 'Pan',
            description: 'Kamera yatay eksende sağa veya sola döner',
            usage: 'Geniş sahneyi göstermek, takip etmek',
            icon: '↔️'
        },
        {
            id: 'tilt',
            name: 'Tilt',
            description: 'Kamera dikey eksende yukarı veya aşağı döner',
            usage: 'Yükseklik göstermek, karakteri üstten aşağı taramak',
            icon: '↕️'
        },
        {
            id: 'dolly',
            name: 'Dolly',
            description: 'Kamera fiziksel olarak ileri veya geri hareket eder',
            usage: 'Özneye yaklaşmak/uzaklaşmak, perspektif değişimi',
            icon: '⬆️'
        },
        {
            id: 'truck',
            name: 'Truck',
            description: 'Kamera yatay olarak sağa veya sola kayar',
            usage: 'Paralel takip, sahne geçişi',
            icon: '⬅️➡️'
        },
        {
            id: 'zoom',
            name: 'Zoom',
            description: 'Lens optik olarak yakınlaştırır/uzaklaştırır',
            usage: 'Hızlı yaklaşma, dikkat çekme (dolly ile farklı)',
            icon: '🔍'
        },
        {
            id: 'arc',
            name: 'Arc/Orbit',
            description: 'Kamera özne etrafında yay çizer',
            usage: 'Dinamik açılar, özneyi farklı perspektiflerden gösterme',
            icon: '🔄'
        }
    ];

    const getAnimationDemo = () => {
        const selected = movements.find(m => m.id === selectedMovement);

        return (
            <div style={{
                width: '100%',
                maxWidth: '600px',
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                borderRadius: 'var(--cine-radius-md)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Grid background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px)
          `
                }}></div>

                {/* Camera Icon */}
                <div style={{
                    position: 'absolute',
                    fontSize: '3rem',
                    animation: `${selectedMovement}-movement 3s ease-in-out infinite`
                }}>
                    📹
                </div>

                {/* Subject */}
                <div style={{
                    fontSize: '4rem',
                    zIndex: 1
                }}>
                    🎭
                </div>

                {/* Movement Label */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(244, 196, 48, 0.9)',
                    color: 'var(--cine-dark)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--cine-radius-sm)',
                    fontWeight: 700,
                    fontSize: '1.1rem'
                }}>
                    {selected.icon} {selected.name}
                </div>

                <style jsx>{`
          @keyframes pan-movement {
            0%, 100% { transform: translateX(-100px) translateY(-120px); }
            50% { transform: translateX(100px) translateY(-120px); }
          }
          @keyframes tilt-movement {
            0%, 100% { transform: translateX(0) translateY(-200px); }
            50% { transform: translateX(0) translateY(-40px); }
          }
          @keyframes dolly-movement {
            0%, 100% { transform: scale(0.5) translateY(-240px); }
            50% { transform: scale(1.2) translateY(-100px); }
          }
          @keyframes truck-movement {
            0%, 100% { transform: translateX(-150px) translateY(-120px); }
            50% { transform: translateX(150px) translateY(-120px); }
          }
          @keyframes zoom-movement {
            0%, 100% { transform: translateY(-120px) scale(0.6); }
            50% { transform: translateY(-120px) scale(1.3); }
          }
          @keyframes arc-movement {
            0% { transform: translateX(-120px) translateY(-180px); }
            25% { transform: translateX(0) translateY(-220px); }
            50% { transform: translateX(120px) translateY(-180px); }
            75% { transform: translateX(0) translateY(-80px); }
            100% { transform: translateX(-120px) translateY(-180px); }
          }
        `}</style>
            </div>
        );
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
                    <h1 className="cine-title">Kamera Hareketleri</h1>
                    <p className="cine-subtitle">
                        Temel kamera hareketlerini öğrenin. Her hareket farklı bir duygu ve anlatım yaratır.
                        Animasyonlu gösterimlerle her hareketin nasıl çalıştığını görün.
                    </p>
                </header>

                {/* Movement Selector */}
                <section className="cine-simulator">
                    <div className="cine-simulator-header">
                        <h2 className="cine-simulator-title">Kamera Hareketleri Simülatörü</h2>
                        <p className="cine-simulator-description">
                            Bir hareket tipi seçin ve animasyonlu gösterimi izleyin
                        </p>
                    </div>

                    {/* Movement Buttons */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        {movements.map((movement) => (
                            <button
                                key={movement.id}
                                onClick={() => setSelectedMovement(movement.id)}
                                style={{
                                    background: selectedMovement === movement.id
                                        ? 'var(--cine-gradient-gold)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    color: selectedMovement === movement.id ? 'var(--cine-dark)' : '#fff',
                                    border: selectedMovement === movement.id
                                        ? '2px solid var(--cine-gold)'
                                        : '2px solid var(--cine-border)',
                                    padding: '1rem',
                                    borderRadius: 'var(--cine-radius-sm)',
                                    cursor: 'pointer',
                                    transition: 'all var(--cine-transition-fast)',
                                    fontWeight: 600,
                                    fontSize: '1rem'
                                }}
                            >
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                    {movement.icon}
                                </div>
                                {movement.name}
                            </button>
                        ))}
                    </div>

                    {/* Animation Display */}
                    <div className="cine-canvas-wrapper">
                        {getAnimationDemo()}
                    </div>

                    {/* Movement Info */}
                    <div className="cine-controls" style={{ marginTop: '2rem' }}>
                        <div className="cine-control-group">
                            <h3 style={{
                                fontSize: '1.5rem',
                                color: 'var(--cine-gold)',
                                marginBottom: '1rem'
                            }}>
                                {movements.find(m => m.id === selectedMovement)?.name}
                            </h3>
                            <p style={{
                                fontSize: '1.1rem',
                                color: 'rgba(255, 255, 255, 0.9)',
                                marginBottom: '1rem',
                                lineHeight: 1.6
                            }}>
                                {movements.find(m => m.id === selectedMovement)?.description}
                            </p>
                            <p style={{
                                fontSize: '1rem',
                                color: 'rgba(255, 255, 255, 0.7)',
                                lineHeight: 1.6
                            }}>
                                <strong>Kullanım:</strong> {movements.find(m => m.id === selectedMovement)?.usage}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Comparison: Dolly vs Zoom */}
                <section style={{ marginTop: '3rem' }}>
                    <div className="cine-simulator">
                        <h2 className="cine-simulator-title">Dolly vs Zoom: Fark Nedir?</h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
                            Her ikisi de özneyi yakınlaştırır gibi görünse de, sonuçları çok farklıdır.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '2rem'
                        }}>
                            <div className="cine-glass" style={{ padding: '1.5rem', borderRadius: 'var(--cine-radius-md)' }}>
                                <h3 style={{ color: 'var(--cine-blue)', fontSize: '1.3rem', marginBottom: '1rem' }}>
                                    🎬 Dolly In/Out
                                </h3>
                                <ul style={{ lineHeight: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                                    <li>Kamera fiziksel hareket eder</li>
                                    <li>Perspektif değişir</li>
                                    <li>Derinlik hissi artar</li>
                                    <li>Daha sinematik görünüm</li>
                                    <li>Arka plan değişir</li>
                                </ul>
                            </div>

                            <div className="cine-glass" style={{ padding: '1.5rem', borderRadius: 'var(--cine-radius-md)' }}>
                                <h3 style={{ color: 'var(--cine-purple)', fontSize: '1.3rem', marginBottom: '1rem' }}>
                                    🔍 Zoom In/Out
                                </h3>
                                <ul style={{ lineHeight: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                                    <li>Kamera sabit kalır</li>
                                    <li>Perspektif değişmez</li>
                                    <li>Sadece büyütme yapar</li>
                                    <li>Hızlı ve pratik</li>
                                    <li>Arka plan aynı kalır</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tips */}
                <div className="cine-info-panel" style={{ marginTop: '3rem' }}>
                    <div className="cine-info-title">
                        <Info size={20} />
                        Kamera Hareketleri İçin İpuçları
                    </div>
                    <div className="cine-info-text">
                        <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Smooth hareket:</strong> Tüm kamera hareketleri yumuşak ve kasıtlı olmalıdır.
                            Tripod, gimbal veya dolly kullanın.
                        </p>
                        <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Amaç odaklı:</strong> Her hareketin bir nedeni olmalı. Gereksiz hareket izleyiciyi rahatsız eder.
                        </p>
                        <p>
                            <strong>Hız kontrolü:</strong> Yavaş hareketler daha sinematik görünür. Hızlı hareketler aksiyonu vurgular.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
