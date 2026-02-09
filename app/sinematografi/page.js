import Link from 'next/link';
import { Camera, Aperture, Sun, Film, Video, Lightbulb } from 'lucide-react';
import './cinematography.css';

export const metadata = {
    title: 'Sinematografi Eğitim Platformu | Kamera ve Işık Sanatı',
    description: 'İnteraktif simülasyonlar ile sinematografi öğrenin. Diyafram, ISO, enstantane, kadrajlar, objektif açıları ve ışıklandırma teknikleri.',
};

export default function CinematographyPage() {
    const modules = [
        {
            id: 'kamera-ayarlari',
            title: 'Kamera Ayarları',
            description: 'Diyafram, ISO ve enstantane ayarlarının görüntüye etkilerini interaktif simülasyonlar ile öğrenin.',
            icon: <Camera size={32} />,
            topics: ['Diyafram (f-stop)', 'ISO', 'Enstantane', 'Alan Derinliği'],
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            href: '/sinematografi/kamera-ayarlari'
        },
        {
            id: 'kadrajlar',
            title: 'Kadraj ve Çerçeveleme',
            description: 'ECU\'dan ELS\'ye tüm shot type\'larını, çerçeveleme tekniklerini ve kompozisyon kurallarını keşfedin.',
            icon: <Film size={32} />,
            topics: ['Shot Types', 'Rule of Thirds', 'Headroom', 'Leadroom'],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            href: '/sinematografi/kadrajlar'
        },
        {
            id: 'objektifler',
            title: 'Objektif Açıları',
            description: 'Farklı lens açılarının perspektif ve görüntü kompozisyonuna etkilerini karşılaştırmalı olarak inceleyin.',
            icon: <Aperture size={32} />,
            topics: ['Wide Angle', 'Normal', 'Telephoto', 'Perspective'],
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            href: '/sinematografi/objektifler'
        },
        {
            id: 'hareketler',
            title: 'Kamera Hareketleri',
            description: 'Pan, tilt, dolly, truck gibi temel kamera hareketlerini animasyonlu gösterimler ile öğrenin.',
            icon: <Video size={32} />,
            topics: ['Pan', 'Tilt', 'Dolly', 'Truck', 'Zoom'],
            gradient: 'linear-gradient(135deg, #f4c430 0%, #d4a017 100%)',
            href: '/sinematografi/hareketler'
        },
        {
            id: 'isiklandirma',
            title: 'Işıklandırma Teknikleri',
            description: '3-point lighting ve diğer profesyonel ışıklandırma setup\'larını interaktif simülasyonlarla öğrenin.',
            icon: <Lightbulb size={32} />,
            topics: ['3-Point Lighting', 'Key Light', 'Fill Light', 'Back Light'],
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            href: '/sinematografi/isiklandirma'
        }
    ];

    return (
        <div className="cine-page">
            <div className="cine-container">
                {/* Hero Section */}
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="cine-title cine-fade-in">
                        Sinematografi Eğitim Platformu
                    </h1>
                    <p className="cine-subtitle cine-fade-in" style={{ animationDelay: '0.1s' }}>
                        İnteraktif simülasyonlar ve görsel örneklerle kamera ve ışık sanatını öğrenin.
                        Temel tekniklerden profesyonel uygulamalara kadar sinematografinin tüm yönlerini keşfedin.
                    </p>
                </header>

                {/* Modules Grid */}
                <section>
                    <h2 className="cine-section-title">Eğitim Modülleri</h2>
                    <div className="cine-modules-grid">
                        {modules.map((module, index) => (
                            <Link
                                key={module.id}
                                href={module.href}
                                className="cine-lesson-card cine-fade-in"
                                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                            >
                                <div className="cine-card-icon" style={{ background: module.gradient }}>
                                    {module.icon}
                                </div>
                                <h3 className="cine-card-title">{module.title}</h3>
                                <p className="cine-card-description">{module.description}</p>
                                <div className="cine-card-topics">
                                    {module.topics.map((topic, i) => (
                                        <span key={i} className="cine-topic-tag">{topic}</span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Info Section */}
                <section style={{ marginTop: '4rem' }}>
                    <div className="cine-glass" style={{
                        padding: '2rem',
                        borderRadius: 'var(--cine-radius-lg)',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--cine-gold)' }}>
                            Neden İnteraktif Öğrenme?
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            maxWidth: '800px',
                            margin: '0 auto',
                            color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                            Sinematografi sadece teorik bilgi ile öğrenilemez. Her ayarın görüntüye olan etkisini
                            gerçek zamanlı olarak görmek, öğrenme sürecini hızlandırır ve kavramanızı güçlendirir.
                            Bu platformda her teknik için interaktif simülasyonlar bulacaksınız.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
