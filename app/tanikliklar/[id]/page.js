import MediaPlayer from "@/components/MediaPlayer";
import Transcript from "@/components/Transcript";
import NarratorCard from "@/components/NarratorCard";
import StoryCard from "@/components/StoryCard";
import { Share2, Bookmark, Download } from "lucide-react";

export default function StoryDetail({ params }) {
    return (
        <div className="container section">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Media Player Section */}
                <MediaPlayer />

                {/* Info Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Geleneksel Ebru Sanatı</h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Kayıt No: #TR-IST-2023-089</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btnOutline" style={{ padding: '0.5rem 1rem' }}>
                            <Share2 size={18} style={{ marginRight: '8px' }} /> Paylaş
                        </button>
                        <button className="btn btnOutline" style={{ padding: '0.5rem 1rem' }}>
                            <Bookmark size={18} style={{ marginRight: '8px' }} /> Kaydet
                        </button>
                        <button className="btn btnOutline" style={{ padding: '0.5rem 1rem' }}>
                            <Download size={18} style={{ marginRight: '8px' }} /> İndir
                        </button>
                    </div>
                </div>

                {/* Split Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginTop: '2rem' }}>
                    {/* Left Column */}
                    <div>
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Hikaye Özeti</h2>
                            <p style={{ lineHeight: '1.7', fontSize: '1.05rem', color: 'var(--color-text)' }}>
                                Ahmet Usta, 40 yılı aşkın süredir icra ettiği Ebru sanatının inceliklerini ve bu sanatla nasıl tanıştığını anlatıyor.
                                Suyun üzerindeki dansın, sabrın ve geleneksel boyaların hazırlanış sürecinin detaylarını paylaşıyor.
                                Bu tanıklık, Türk süsleme sanatlarının yaşayan bir hazinesi niteliğinde.
                            </p>
                        </div>

                        <Transcript />
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div>
                        <NarratorCard />

                        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Etiketler</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['Sanat', 'Ebru', 'Geleneksel', 'Zanaat', 'İstanbul', 'Ustalık'].map(tag => (
                                    <span key={tag} style={{ background: 'var(--color-light-gray)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--color-text)' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Content */}
                <div style={{ marginTop: '4rem', borderTop: '1px solid var(--color-border)', paddingTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>İlginizi Çekebilir</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        <StoryCard
                            id={4}
                            title="Bir Öğretmenin Günlüğü"
                            narrator="Ayşe Hoca"
                            date="1955" location="İzmir" duration="32:10" type="audio"
                        />
                        <StoryCard
                            id={5}
                            title="Köy Okulları Yapımı"
                            narrator="Ali Usta"
                            date="1950" location="Balıkesir" duration="28:45" type="video"
                        />
                        <StoryCard
                            id={6}
                            title="Halk Evleri Etkinlikleri"
                            narrator="Zeynep Hanım"
                            date="1948" location="Ankara" duration="55:00" type="video"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
