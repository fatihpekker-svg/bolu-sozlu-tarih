import TestimonyCard from "@/components/TestimonyCard";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";

// Mock Data Source (Normalde bir veritabanından veya API'den gelir)
const collectionsData = {
    "0": { title: "Göç Hikayeleri", desc: "Balkanlardan Anadolu'ya uzanan zorlu yolculukların tanıklıkları.", count: 120 },
    "1": { title: "Kayıp Meslekler", desc: "Unutulmaya yüz tutmuş zanaatların son ustalarıyla yapılan görüşmeler.", count: 85 },
    "2": { title: "Köy Hayatı", desc: "Tarım, hayvancılık ve köy sosyal yaşamının değişimi üzerine anlatılar.", count: 240 },
    "3": { title: "Şehir Belleği", desc: "Değişen mimari, mahalle kültürü ve şehir efsaneleri.", count: 150 },
    "4": { title: "Kadın Anlatıları", desc: "Toplumsal yaşamda kadının yeri, ev içi emek ve mücadele hikayeleri.", count: 95 },
    "5": { title: "Deprem Tanıklıkları", desc: "Büyük afetlerin bıraktığı izler ve dayanışma öyküleri.", count: 60 }
};

export async function generateMetadata({ params }) {
    const { id } = await params;
    const collection = collectionsData[id] || { title: "Koleksiyon Bulunamadı" };
    return {
        title: `${collection.title} | Sözlü Tarih Arşivi`,
    };
}

export default async function CollectionDetail({ params }) {
    const { id } = await params;
    const collection = collectionsData[id];

    if (!collection) {
        return (
            <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>Koleksiyon Bulunamadı</h1>
                <Link href="/collections" className="btn btnOutline" style={{ marginTop: '1rem' }}>
                    <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Geri Dön
                </Link>
            </div>
        );
    }

    // Mock Stories for specific collections
    const getStories = (collectionId) => {
        switch (collectionId) {
            case "0": // Göç Hikayeleri
                return [
                    { id: 101, title: "Selanik'ten İzmir'e Yolculuk", narrator: "Fatma Teyze", location: "İzmir", date: "1923 Mübadelesi", duration: "45:00", type: "video" },
                    { id: 102, title: "Bulgaristan Göçü ve Kayıp Yıllar", narrator: "Hasan Amca", location: "Bursa", date: "1989", duration: "32:15", type: "audio" },
                    { id: 103, title: "Kafkaslardan Gelen Miras", narrator: "Cemil Bey", location: "Kars", date: "1950'ler", duration: "55:30", type: "video" }
                ];
            case "1": // Kayıp Meslekler
                return [
                    { id: 201, title: "Son Bakırcı Ustası", narrator: "Mehmet Usta", location: "Gaziantep", date: "2022", duration: "28:45", type: "video" },
                    { id: 202, title: "Yemenicilik Zanaatı", narrator: "Ahmet Usta", location: "Safranbolu", date: "2021", duration: "41:20", type: "video" },
                    { id: 203, title: "İpek Dokumacılığının Sırları", narrator: "Ayşe Hanım", location: "Bursa", date: "2023", duration: "36:10", type: "audio" }
                ];
            case "2": // Köy Hayatı
                return [
                    { id: 301, title: "Harman Zamanı Anıları", narrator: "Hüseyin Dayı", location: "Konya", date: "1960", duration: "50:00", type: "audio" },
                    { id: 302, title: "Köy Odası Sohbetleri", narrator: "Ali Ağa", location: "Yozgat", date: "1975", duration: "1:10:00", type: "video" },
                    { id: 303, title: "Yaylaya Göç", narrator: "Zeynep Nine", location: "Rize", date: "1955", duration: "42:30", type: "audio" }
                ];
            case "3": // Şehir Belleği
                return [
                    { id: 401, title: "Beyoğlu'nun Eski Sinemaları", narrator: "Orhan Bey", location: "İstanbul", date: "1970", duration: "48:15", type: "video" },
                    { id: 402, title: "Ulus Meydanı'nın Değişimi", narrator: "Kemal Bey", location: "Ankara", date: "1965", duration: "35:40", type: "audio" },
                    { id: 403, title: "Kordon Boyu Gezintileri", narrator: "Sevinç Hanım", location: "İzmir", date: "1980", duration: "39:50", type: "video" }
                ];
            case "4": // Kadın Anlatıları
                return [
                    { id: 501, title: "İlk Kadın Öğretmenlerden", narrator: "Melahat Hanım", location: "Eskişehir", date: "1940", duration: "52:20", type: "video" },
                    { id: 502, title: "Köyde Ebe Olmak", narrator: "Hatice Ebe", location: "Mardin", date: "1960", duration: "44:10", type: "audio" },
                    { id: 503, title: "Fabrikada Çalışan Kadınlar", narrator: "Süheyla Hanım", location: "Bursa", date: "1975", duration: "38:00", type: "video" }
                ];
            case "5": // Deprem Tanıklıkları
                return [
                    { id: 601, title: "1999 Gölcük Depremi O Gece", narrator: "Murat Bey", location: "Kocaeli", date: "1999", duration: "1:05:00", type: "video" },
                    { id: 602, title: "Van Depremi ve Dayanışma", narrator: "Selim Bey", location: "Van", date: "2011", duration: "40:25", type: "audio" },
                    { id: 603, title: "Erzincan Depremi Anıları", narrator: "Fatma Hanım", location: "Erzincan", date: "1939", duration: "25:30", type: "audio" }
                ];
            default:
                return Array.from({ length: 3 }, (_, i) => ({
                    id: parseInt(collectionId) * 10 + i,
                    title: `${collectionsData[collectionId]?.title} - Kayıt #${i + 1}`,
                    narrator: "İsim Soyisim",
                    location: "Türkiye",
                    date: "Tarih",
                    duration: "45:00",
                    type: i % 2 === 0 ? "video" : "audio"
                }));
        }
    };

    const collectionStories = getStories(id);

    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: 'var(--color-primary)',
                color: '#fff',
                padding: '5rem 0',
                textAlign: 'center',
                background: `linear-gradient(rgba(26, 54, 93, 0.9), rgba(26, 54, 93, 0.8)), url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="container">
                    <Link href="/collections" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <ArrowLeft size={16} /> Tüm Koleksiyonlar
                    </Link>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#fff' }}>{collection.title}</h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                        {collection.desc}
                    </p>
                    <div style={{ marginTop: '2rem', display: 'inline-block', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', borderRadius: '50px' }}>
                        {collection.count} Kayıt Mevcut
                    </div>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="container section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem' }}>Koleksiyon İçeriği</h2>
                    <button className="btn btnSecondary">
                        <PlayCircle size={18} style={{ marginRight: '8px' }} /> Tümünü Oynat
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {collectionStories.map(story => (
                        <TestimonyCard key={story.id} {...story} />
                    ))}
                </div>
            </div>
        </div>
    );
}
