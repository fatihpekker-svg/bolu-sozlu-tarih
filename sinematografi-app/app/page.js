'use client';

import Link from 'next/link';
import { Camera, Aperture, Film, Video, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import './cinematography.css';

export default function HomePage() {
    const modules = [
        {
            id: 'kamera-ayarlari',
            title: 'Kamera Ayarları',
            description: 'Diyafram, ISO ve enstantane ayarlarının görüntüye etkilerini interaktif simülasyonlar ile öğrenin.',
            icon: <Camera size={32} />,
            topics: ['Diyafram (f-stop)', 'ISO', 'Enstantane', 'Alan Derinliği'],
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            href: '/kamera-ayarlari'
        },
        {
            id: 'kadrajlar',
            title: 'Kadraj ve Çerçeveleme',
            description: 'ECU\'dan ELS\'ye tüm shot type\'larını, çerçeveleme tekniklerini ve kompozisyon kurallarını keşfedin.',
            icon: <Film size={32} />,
            topics: ['Shot Types', 'Rule of Thirds', 'Headroom', 'Leadroom'],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            href: '/kadrajlar'
        },
        {
            id: 'objektifler',
            title: 'Objektif Açıları',
            description: 'Farklı lens açılarının perspektif ve görüntü kompozisyonuna etkilerini karşılaştırmalı olarak inceleyin.',
            icon: <Aperture size={32} />,
            topics: ['Wide Angle', 'Normal', 'Telephoto', 'Perspective'],
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            href: '/objektifler'
        },
        {
            id: 'hareketler',
            title: 'Kamera Hareketleri',
            description: 'Pan, tilt, dolly, truck gibi temel kamera hareketlerini animasyonlu gösterimler ile öğrenin.',
            icon: <Video size={32} />,
            topics: ['Pan', 'Tilt', 'Dolly', 'Truck', 'Zoom'],
            gradient: 'linear-gradient(135deg, #f4c430 0%, #d4a017 100%)',
            href: '/hareketler'
        },
        {
            id: 'isiklandirma',
            title: 'Işıklandırma Teknikleri',
            description: '3-point lighting ve diğer profesyonel ışıklandırma setup\'larını interaktif simülasyonlarla öğrenin.',
            icon: <Lightbulb size={32} />,
            topics: ['3-Point Lighting', 'Key Light', 'Fill Light', 'Back Light'],
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            href: '/isiklandirma'
        }
    ];

    const stats = [
        { number: '5', label: 'Eğitim Modülü', icon: <Film size={24} /> },
        { number: '15+', label: 'İnteraktif Simülatör', icon: <Camera size={24} /> },
        { number: '100%', label: 'Ücretsiz', icon: <Lightbulb size={24} /> }
    ];

    return (
        <div className="cine-page">
            <div className="cine-container">
                {/* Hero Section with Animation */}
                <motion.header
                    style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1
                        className="cine-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Sinematografi Eğitim Platformu
                    </motion.h1>
                    <motion.p
                        className="cine-subtitle"
                        style={{ animationDelay: '0.1s' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        İnteraktif simülasyonlar ve görsel örneklerle kamera ve ışık sanatını öğrenin.
                        Temel tekniklerden profesyonel uygulamalara kadar sinematografinin tüm yönlerini keşfedin.
                    </motion.p>

                    {/* Stats Section */}
                    <motion.div
                        className="stats-grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.header>

                {/* Modules Grid */}
                <section>
                    <motion.h2
                        className="cine-section-title"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Eğitim Modülleri
                    </motion.h2>
                    <div className="cine-modules-grid">
                        {modules.map((module, index) => (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link
                                    href={module.href}
                                    className="cine-lesson-card"
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
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Info Section */}
                <motion.section
                    style={{ marginTop: '4rem' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
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
                </motion.section>
            </div>
        </div>
    );
}
