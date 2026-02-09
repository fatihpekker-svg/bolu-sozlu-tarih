'use client';
import { useState } from 'react';
import { MapPin, Users, Clock } from 'lucide-react';
import styles from './InteractiveMap.module.css';

const districtData = [
    {
        id: 1, name: 'Merkez', x: 50, y: 50, count: 24, stories: [
            { title: 'Eski Bolu Pazarı Anıları', narrator: 'Ayşe Yılmaz', year: 1965 },
            { title: 'Kökez Çayının Kıyısında', narrator: 'Mehmet Demir', year: 1972 },
            { title: 'Bolu Otobüs Terminalinin Kuruluşu', narrator: 'Hasan Öztürk', year: 1980 }
        ]
    },
    {
        id: 2, name: 'Mengen', x: 70, y: 35, count: 18, stories: [
            { title: 'Aşçılık Geleneğinin Doğuşu', narrator: 'Ali Usta', year: 1960 },
            { title: 'Mengen Aşçılar Derneği', narrator: 'Zeynep Kaya', year: 1975 }
        ]
    },
    {
        id: 3, name: 'Mudurnu', x: 25, y: 70, count: 16, stories: [
            { title: 'Osmanlı Konakları Arasında Çocukluk', narrator: 'Fatma Arslan', year: 1958 },
            { title: 'Mudurnu Taş Köprüsü', narrator: 'İbrahim Çelik', year: 1963 }
        ]
    },
    {
        id: 4, name: 'Gerede', x: 75, y: 65, count: 21, stories: [
            { title: 'Gerede İstasyon Hatıraları', narrator: 'Mustafa Kara', year: 1968 },
            { title: 'Hallaç Müezzin ve Gerede', narrator: 'Emine Yıldız', year: 1971 }
        ]
    },
    {
        id: 5, name: 'Göynük', x: 15, y: 40, count: 14, stories: [
            { title: 'Göynük Çarşısında Sabah', narrator: 'Ahmet Şahin', year: 1962 },
            { title: 'Mimar Sinan\'ın İzleri', narrator: 'Elif Yılmaz', year: 1970 }
        ]
    },
    {
        id: 6, name: 'Yeniçağa', x: 82, y: 48, count: 12, stories: [
            { title: 'Yeniçağa Gölü Balıkçılığı', narrator: 'Osman Avcı', year: 1966 },
            { title: 'Köy Okullarındaki Yıllar', narrator: 'Neriman Öz', year: 1974 }
        ]
    },
    {
        id: 7, name: 'Dörtdivan', x: 35, y: 25, count: 9, stories: [
            { title: 'Orman Köylülerinin Hayatı', narrator: 'Hüseyin Kaya', year: 1969 }
        ]
    },
    {
        id: 8, name: 'Kıbrıscık', x: 45, y: 75, count: 7, stories: [
            { title: 'Kıbrıscık\'ta Nevruz Geleneği', narrator: 'Ayten Güneş', year: 1964 }
        ]
    },
    {
        id: 9, name: 'Seben', x: 60, y: 20, count: 11, stories: [
            { title: 'Çeltik Tarımı ve Hasadı', narrator: 'Veli Yılmaz', year: 1967 }
        ]
    }
];

export default function InteractiveMap() {
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [hoveredDistrict, setHoveredDistrict] = useState(null);

    const activeDistrict = hoveredDistrict || selectedDistrict;
    const displayedStories = activeDistrict?.stories || [];

    return (
        <div className={styles.mapContainer}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>Bolu İlçeleri</h2>
                    <p>Harita üzerindeki işaretlere tıklayarak o bölgeye ait tanıklıkları görüntüleyin</p>
                </div>

                {activeDistrict ? (
                    <div className={styles.districtDetails}>
                        <div className={styles.districtHeader}>
                            <h3>{activeDistrict.name}</h3>
                            <div className={styles.districtStats}>
                                <span><Users size={16} /> {activeDistrict.count} Tanıklık</span>
                            </div>
                        </div>

                        <div className={styles.storyList}>
                            {displayedStories.map((story, idx) => (
                                <div key={idx} className={styles.storyItem}>
                                    <h4>{story.title}</h4>
                                    <div className={styles.storyMeta}>
                                        <span className={styles.narrator}>{story.narrator}</span>
                                        <span className={styles.year}><Clock size={14} /> {story.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.districtList}>
                        <h3>Tüm İlçeler</h3>
                        {districtData.map(district => (
                            <button
                                key={district.id}
                                className={styles.districtButton}
                                onClick={() => setSelectedDistrict(district)}
                            >
                                <div className={styles.districtName}>
                                    <MapPin size={18} />
                                    {district.name}
                                </div>
                                <span className={styles.badge}>{district.count}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Map Area */}
            <div className={styles.mapArea}>
                <div className={styles.mapTitle}>
                    <h1>Bolu Sözlü Tarih Haritası</h1>
                    <p>İlçelere göre tanıklık kayıtları</p>
                </div>

                <svg className={styles.mapSvg} viewBox="0 0 100 100">
                    {/* Background region (Bolu outline approximation) */}
                    <ellipse
                        cx="50"
                        cy="50"
                        rx="45"
                        ry="40"
                        className={styles.boluRegion}
                    />

                    {/* District pins */}
                    {districtData.map(district => {
                        const isActive = activeDistrict?.id === district.id;
                        const size = isActive ? 8 : 5;

                        return (
                            <g key={district.id}>
                                {/* Pulse effect for active district */}
                                {isActive && (
                                    <circle
                                        cx={district.x}
                                        cy={district.y}
                                        r="10"
                                        className={styles.pulse}
                                    />
                                )}

                                {/* Pin circle */}
                                <circle
                                    cx={district.x}
                                    cy={district.y}
                                    r={size}
                                    className={`${styles.pin} ${isActive ? styles.pinActive : ''}`}
                                    onMouseEnter={() => setHoveredDistrict(district)}
                                    onMouseLeave={() => setHoveredDistrict(null)}
                                    onClick={() => setSelectedDistrict(selectedDistrict?.id === district.id ? null : district)}
                                />

                                {/* Label */}
                                <text
                                    x={district.x}
                                    y={district.y - (isActive ? 12 : 9)}
                                    className={`${styles.label} ${isActive ? styles.labelActive : ''}`}
                                    textAnchor="middle"
                                >
                                    {district.name}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
