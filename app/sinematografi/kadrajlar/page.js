'use client';

import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
import '../cinematography.css';

export default function FramingPage() {
    const shotTypes = [
        {
            name: 'ECU',
            fullName: 'Extreme Close-Up',
            description: 'Yüzün bir detayı (göz, ağız) veya küçük bir obje',
            usage: 'Duygu yoğunluğu, detay vurgusu, gerilim yaratma',
            example: '👁️'
        },
        {
            name: 'CU',
            fullName: 'Close-Up',
            description: 'Baş ve omuzlar, yüz ifadesine odaklanır',
            usage: 'Karakter duygularını gösterme, izleyici ile bağ kurma',
            example: '👤'
        },
        {
            name: 'MCU',
            fullName: 'Medium Close-Up',
            description: 'Göğüs hizasından yukarısı',
            usage: 'Diyaloglar, röportajlar, karakter odaklı sahneler',
            example: '🧑'
        },
        {
            name: 'MS',
            fullName: 'Medium Shot',
            description: 'Bel hizasından yukarısı',
            usage: 'Karakter ve çevre dengesi, genel çekim',
            example: '🚶'
        },
        {
            name: 'MLS',
            fullName: 'Medium Long Shot',
            description: 'Diz hizasından yukarısı',
            usage: 'Karakterin hareketi ve çevresi birlikte',
            example: '🧍'
        },
        {
            name: 'LS',
            fullName: 'Long Shot',
            description: 'Tüm vücut ve çevre görünür',
            usage: 'Establishing shot, konum ve karakter ilişkisi',
            example: '🏃'
        },
        {
            name: 'ELS',
            fullName: 'Extreme Long Shot',
            description: 'Geniş manzara, karakter çok küçük görünür',
            usage: 'Konum tanıtımı, epiklik hissi, yalnızlık',
            example: '🏔️'
        }
    ];

    const compositionRules = [
        {
            title: 'Üçte Bir Kuralı (Rule of Thirds)',
            description: 'Çerçeveyi 3x3 ızgaraya böl. Önemli öğeleri kesişim noktalarına yerleştir.',
            visual: 'grid'
        },
        {
            title: 'Headroom',
            description: 'Başın üstünde bırakılan boşluk. Çok fazla veya çok az olmamalı.',
            visual: 'headroom'
        },
        {
            title: 'Leadroom / Looking Room',
            description: 'Karakterin baktığı yönde bırakılan boşluk. Görsel konfor sağlar.',
            visual: 'leadroom'
        }
    ];

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
                    <h1 className="cine-title">Kadraj ve Çerçeveleme</h1>
                    <p className="cine-subtitle">
                        Farklı kadraj tipleri ve çerçeveleme teknikleri ile görsel hikaye anlatımında ustalık kazanın.
                        Her kadraj tipi farklı bir duygu ve anlam yaratır.
                    </p>
                </header>

                {/* Shot Types */}
                <section className="cine-simulator">
                    <div className="cine-simulator-header">
                        <h2 className="cine-simulator-title">Kadraj Tipleri (Shot Types)</h2>
                        <p className="cine-simulator-description">
                            Karakterin çerçevede ne kadar görüneceğini belirleyen kadraj tipleri
                        </p>
                    </div>

                    <div className="cine-comparison-grid">
                        {shotTypes.map((shot, index) => (
                            <div key={index} className="cine-comparison-item cine-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="cine-comparison-image" style={{
                                    fontSize: shot.name === 'ECU' ? '4rem' :
                                        shot.name === 'CU' ? '3.5rem' :
                                            shot.name === 'MCU' ? '3rem' :
                                                shot.name === 'MS' ? '2.5rem' :
                                                    shot.name === 'MLS' ? '2rem' :
                                                        shot.name === 'LS' ? '1.5rem' : '1rem'
                                }}>
                                    {shot.example}
                                </div>
                                <div className="cine-comparison-label">
                                    {shot.name} - {shot.fullName}
                                </div>
                                <div className="cine-comparison-description" style={{ marginBottom: '0.5rem' }}>
                                    {shot.description}
                                </div>
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--cine-blue)',
                                    marginTop: '0.5rem',
                                    fontStyle: 'italic'
                                }}>
                                    {shot.usage}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Composition Rules */}
                <section style={{ marginTop: '3rem' }}>
                    <h2 className="cine-section-title">Kompozisyon Kuralları</h2>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {/* Rule of Thirds */}
                        <div className="cine-simulator">
                            <h3 className="cine-card-title">Üçte Bir Kuralı (Rule of Thirds)</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
                                Çerçeveyi 3x3 ızgaraya böl. Önemli öğeleri kesişim noktalarına veya çizgilere yerleştir.
                            </p>

                            {/* Visual Grid Display */}
                            <div style={{
                                position: 'relative',
                                backgroundColor: 'var(--cine-darker)',
                                borderRadius: 'var(--cine-radius-md)',
                                padding: '2rem',
                                aspectRatio: '16/9',
                                maxWidth: '600px',
                                margin: '0 auto'
                            }}>
                                {/* Grid lines */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '2rem',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gridTemplateRows: '1fr 1fr 1fr',
                                    gap: 0
                                }}>
                                    {/* Vertical lines */}
                                    <div style={{
                                        position: 'absolute',
                                        left: '33.33%',
                                        top: 0,
                                        bottom: 0,
                                        width: '2px',
                                        backgroundColor: 'var(--cine-gold)',
                                        opacity: 0.5
                                    }}></div>
                                    <div style={{
                                        position: 'absolute',
                                        left: '66.66%',
                                        top: 0,
                                        bottom: 0,
                                        width: '2px',
                                        backgroundColor: 'var(--cine-gold)',
                                        opacity: 0.5
                                    }}></div>
                                    {/* Horizontal lines */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '33.33%',
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        backgroundColor: 'var(--cine-gold)',
                                        opacity: 0.5
                                    }}></div>
                                    <div style={{
                                        position: 'absolute',
                                        top: '66.66%',
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        backgroundColor: 'var(--cine-gold)',
                                        opacity: 0.5
                                    }}></div>

                                    {/* Intersection points */}
                                    {[
                                        { top: '33.33%', left: '33.33%' },
                                        { top: '33.33%', left: '66.66%' },
                                        { top: '66.66%', left: '33.33%' },
                                        { top: '66.66%', left: '66.66%' }
                                    ].map((pos, i) => (
                                        <div key={i} style={{
                                            position: 'absolute',
                                            top: pos.top,
                                            left: pos.left,
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: 'var(--cine-gold)',
                                            borderRadius: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            boxShadow: '0 0 10px var(--cine-gold)',
                                            animation: 'pulse 2s ease-in-out infinite',
                                            animationDelay: `${i * 0.2}s`
                                        }}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="cine-info-panel" style={{ marginTop: '1.5rem' }}>
                                <div className="cine-info-title">
                                    <Info size={20} />
                                    Kullanım İpucu
                                </div>
                                <div className="cine-info-text">
                                    Ana özneyi merkeze koymak yerine, kesişim noktalarından birine yerleştirin.
                                    Bu, görsel olarak daha ilgi çekici ve dengeli bir kompozisyon yaratır.
                                </div>
                            </div>
                        </div>

                        {/* Headroom */}
                        <div className="cine-simulator">
                            <h3 className="cine-card-title">Headroom (Baş Boşluğu)</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
                                Karakterin başı ile çerçevenin üst kenarı arasındaki boşluk.
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: '1rem'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        backgroundColor: 'var(--cine-darker)',
                                        borderRadius: 'var(--cine-radius-sm)',
                                        padding: '1rem',
                                        border: '2px solid var(--cine-border)',
                                        height: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        paddingTop: '3rem'
                                    }}>
                                        <div style={{ fontSize: '3rem' }}>🧑</div>
                                    </div>
                                    <p style={{ marginTop: '0.5rem', color: '#e74c3c', fontWeight: 600 }}>
                                        ❌ Çok Fazla Headroom
                                    </p>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        backgroundColor: 'var(--cine-darker)',
                                        borderRadius: 'var(--cine-radius-sm)',
                                        padding: '1rem',
                                        border: '2px solid var(--cine-gold)',
                                        height: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        paddingTop: '1rem'
                                    }}>
                                        <div style={{ fontSize: '3rem' }}>🧑</div>
                                    </div>
                                    <p style={{ marginTop: '0.5rem', color: 'var(--cine-gold)', fontWeight: 600 }}>
                                        ✓ Doğru Headroom
                                    </p>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        backgroundColor: 'var(--cine-darker)',
                                        borderRadius: 'var(--cine-radius-sm)',
                                        padding: '1rem',
                                        border: '2px solid var(--cine-border)',
                                        height: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        paddingTop: '0',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ fontSize: '3rem', marginTop: '-0.5rem' }}>🧑</div>
                                    </div>
                                    <p style={{ marginTop: '0.5rem', color: '#e74c3c', fontWeight: 600 }}>
                                        ❌ Çok Az Headroom
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Leadroom */}
                        <div className="cine-simulator">
                            <h3 className="cine-card-title">Leadroom / Looking Room (Bakış Boşluğu)</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
                                Karakterin baktığı/hareket ettiği yönde bırakılan boşluk.
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        backgroundColor: 'var(--cine-darker)',
                                        borderRadius: 'var(--cine-radius-sm)',
                                        padding: '2rem',
                                        border: '2px solid var(--cine-border)',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ fontSize: '2.5rem' }}>👉🧑</div>
                                    </div>
                                    <p style={{ marginTop: '0.5rem', color: '#e74c3c', fontWeight: 600 }}>
                                        ❌ Leadroom Yok
                                    </p>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        backgroundColor: 'var(--cine-darker)',
                                        borderRadius: 'var(--cine-radius-sm)',
                                        padding: '2rem',
                                        border: '2px solid var(--cine-gold)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ fontSize: '2.5rem' }}>🧑👉</div>
                                        <div style={{ width: '40%' }}></div>
                                    </div>
                                    <p style={{ marginTop: '0.5rem', color: 'var(--cine-gold)', fontWeight: 600 }}>
                                        ✓ Doğru Leadroom
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
