import Link from "next/link";
import { BookOpen, Video, FileText, GraduationCap, Download } from "lucide-react";

export const metadata = {
    title: "Kaynaklar | Bolu Sözlü Tarih",
    description: "Sözlü tarih araştırmacıları, öğretmenler ve öğrenciler için eğitim materyalleri ve kılavuzlar.",
};

export default function ResourcesPage() {
    const categories = [
        {
            title: "Eğitim Materyalleri",
            icon: <Video size={32} />,
            desc: "Sözlü tarih metodolojisi üzerine video dersler ve webinar kayıtları.",
            items: ["Sözlü Tarih Nedir? (Video)", "Görüşme Teknikleri Atölyesi", "Dijital Arşivleme Eğitimi"]
        },
        {
            title: "Öğretmenler İçin",
            icon: <GraduationCap size={32} />,
            desc: "Sınıf içi etkinlikler, ders planları ve öğrenci projeleri için rehberler.",
            items: ["Yerel Tarih Ders Planı (PDF)", "Öğrenciler İçin Görüşme Kılavuzu", "Değerlendirme Rubriği"]
        },
        {
            title: "Araştırmacılar İçin",
            icon: <FileText size={32} />,
            desc: "Akademik çalışmalar için veri erişim protokolleri ve atıf kuralları.",
            items: ["Veri Talep Formu", "Atıf ve Kaynakça Rehberi", "Etik Kurul Yönergeleri"]
        },
        {
            title: "Okuma Listesi",
            icon: <BookOpen size={32} />,
            desc: "Alana dair temel eserler, makaleler ve tezlerden oluşan seçki.",
            items: ["Temel Başvuru Kitapları", "Bolu Tarihi Bibliyografyası", "Örnek Tez Çalışmaları"]
        }
    ];

    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Kaynaklar</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
                    Sözlü tarih çalışmalarını desteklemek ve yerel tarih bilincini yaygınlaştırmak için hazırladığımız materyaller.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {categories.map((cat, index) => (
                    <div key={index} style={{
                        background: '#fff', padding: '2rem', borderRadius: '12px',
                        border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '12px', background: 'var(--color-light-gray)',
                            color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            {cat.icon}
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{cat.title}</h2>
                        <p style={{ marginBottom: '1.5rem', color: '#4b5563', lineHeight: '1.6', minHeight: '3em' }}>
                            {cat.desc}
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {cat.items.map((item, i) => (
                                <li key={i} style={{
                                    padding: '0.75rem 0', borderTop: '1px solid #f1f5f9',
                                    display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text)'
                                }}>
                                    <Download size={16} color="var(--color-primary)" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="btn btnOutline" style={{ width: '100%', marginTop: '1.5rem' }}>
                            Tümünü Gör
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
