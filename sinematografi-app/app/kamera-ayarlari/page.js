'use client';

import { useState } from 'react';
import ApertureSimulator from '@/components/cinematography/ApertureSimulator';
import ISOSimulator from '@/components/cinematography/ISOSimulator';
import ShutterSpeedSimulator from '@/components/cinematography/ShutterSpeedSimulator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import '../cinematography.css';

export default function CameraSettingsPage() {
    const [activeTab, setActiveTab] = useState('aperture');

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
                    fontSize: '1rem',
                    transition: 'var(--cine-transition-fast)'
                }}>
                    <ArrowLeft size={20} />
                    Ana Sayfaya Dön
                </Link>

                {/* Header */}
                <header style={{ marginBottom: '3rem' }}>
                    <h1 className="cine-title">Kamera Ayarları Simülatörü</h1>
                    <p className="cine-subtitle">
                        Diyafram, ISO ve enstantane ayarlarının görüntüye olan etkilerini gerçek zamanlı olarak
                        deneyimleyin. Her ayarı değiştirerek sonuçları anında görün.
                    </p>
                </header>

                {/* Tabs */}
                <div className="cine-tabs">
                    <button
                        className={`cine-tab ${activeTab === 'aperture' ? 'active' : ''}`}
                        onClick={() => setActiveTab('aperture')}
                    >
                        Diyafram (Aperture)
                    </button>
                    <button
                        className={`cine-tab ${activeTab === 'iso' ? 'active' : ''}`}
                        onClick={() => setActiveTab('iso')}
                    >
                        ISO
                    </button>
                    <button
                        className={`cine-tab ${activeTab === 'shutter' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shutter')}
                    >
                        Enstantane (Shutter Speed)
                    </button>
                </div>

                {/* Simulator Content */}
                <div className="cine-fade-in">
                    {activeTab === 'aperture' && <ApertureSimulator />}
                    {activeTab === 'iso' && <ISOSimulator />}
                    {activeTab === 'shutter' && <ShutterSpeedSimulator />}
                </div>
            </div>
        </div>
    );
}
