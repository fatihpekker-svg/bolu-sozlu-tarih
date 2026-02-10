import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./Timeline.module.css";

export const metadata = {
    title: "Zaman Çizelgesi | Bolu Sözlü Tarih",
    description: "Bolu'nun yakın tarihine damga vuran olayların kronolojik akışı.",
};

const timelineEvents = [
    {
        year: "1999",
        title: "12 Kasım Düzce Depremi",
        desc: "Bolu'yu derinden etkileyen, şehir merkezinde ve kalıcı konutlarda yaşamı değiştiren büyük afet.",
        category: "Afet",
        image: "https://images.unsplash.com/photo-1596324623725-7a6627df8d24?q=80&w=2670&auto=format&fit=crop"
    },
    {
        year: "1985",
        title: "İlk İzzet Baysal Vakfı Eseri",
        desc: "Bolu'nun babası İzzet Baysal'ın eğitim ve sağlık seferberliğinin ilk büyük adımlarının atıldığı yıllar.",
        category: "Kalkınma",
        image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2669&auto=format&fit=crop"
    },
    {
        year: "1974",
        title: "Bolu Çimento Fabrikası'nın Kuruluşu",
        desc: "Şehrin sanayileşme sürecindeki ilk büyük adımlardan biri ve işçi sınıfının oluşumu.",
        category: "Sanayi",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2670&auto=format&fit=crop"
    },
    {
        year: "1960",
        title: "Yaylacılık Geleneğinin Dönüşümü",
        desc: "Tarım toplumundan modernleşmeye geçiş sürecinde yayla göçlerinin şekil değiştirmesi.",
        category: "Kültür",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"
    },
    {
        year: "1944",
        title: "Büyük Gerede Depremi",
        desc: "Kuzey Anadolu Fay Hattı üzerindeki en yıkıcı depremlerden biri ve halk hafızasındaki izleri.",
        category: "Afet",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop"
    },
    {
        year: "1923",
        title: "Cumhuriyet'in İlanı ve Bolu",
        desc: "Milli Mücadele sonrası Bolu'da Cumhuriyet kutlamaları ve ilk modernleşme hamleleri.",
        category: "Tarih",
        image: "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=2670&auto=format&fit=crop"
    }
];

export default function TimelinePage() {
    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Zaman Çizelgesi</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                    Bolu'nun hafızasında yer eden dönüm noktaları.
                </p>
            </div>

            <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
                {/* Center Line */}
                <div style={{
                    position: 'absolute', left: '50%', top: '0', bottom: '0', width: '4px',
                    background: 'var(--color-border)', transform: 'translateX(-50%)', borderRadius: '4px'
                }}></div>

                {timelineEvents.map((event, index) => {
                    const isEven = index % 2 === 0; // Left side
                    return (
                        <div key={index} style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: isEven ? 'flex-end' : 'flex-start',
                            paddingRight: isEven ? '50%' : '0',
                            paddingLeft: isEven ? '0' : '50%',
                            marginBottom: '4rem',
                            position: 'relative',
                            boxSizing: 'border-box'
                        }}>
                            {/* Timeline Dot */}
                            <div style={{
                                position: 'absolute', left: '50%', top: '24px', width: '24px', height: '24px',
                                background: 'var(--color-secondary)', borderRadius: '50%', border: '4px solid #fff',
                                transform: 'translate(-50%, -50%)', zIndex: 10, boxShadow: '0 0 0 4px rgba(217, 119, 6, 0.2)'
                            }}></div>

                            {/* Content Card container with spacing from center */}
                            <div style={{
                                width: '100%',
                                paddingLeft: isEven ? '0' : '2rem',
                                paddingRight: isEven ? '2rem' : '0',
                                display: 'flex',
                                justifyContent: isEven ? 'flex-end' : 'flex-start'
                            }}>
                                <div className={styles.timelineCard}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-secondary)', lineHeight: 1 }}>{event.year}</span>
                                        <span style={{ background: 'var(--color-light-gray)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', color: '#666' }}>
                                            {event.category}
                                        </span>
                                    </div>

                                    <div style={{ height: '200px', marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden' }}>
                                        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>{event.title}</h3>
                                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: '#4b5563' }}>
                                        {event.desc}
                                    </p>

                                    <Link href="/kesfet" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>
                                        Döneme Git <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
