import StoryCard from "@/components/StoryCard";

export const metadata = {
    title: "Hikayeler | Bolu Sözlü Tarih Projesi",
    description: "Bolu'nun geçmişine tanıklık edenlerin anlatımları.",
};

const stories = [
    { id: 1, title: "Eski Bolu Çarşısı ve Esnaflık", interviewee: "Ahmet Yılmaz", date: "2023", excerpt: "Ahmet Amca, 1960'larda Bolu çarşısındaki esnaflık kültürünü, ahilik geleneğini ve unutulan zanaatları anlatıyor." },
    { id: 2, title: "Yaylalar ve Göç Yolları", interviewee: "Fatma Teyze", date: "2023", excerpt: "Çocukluğunda yayla göçlerini, hayvan otlatmayı ve yayla şenliklerini anlatan Fatma Teyze'den nostaljik bir yolculuk." },
    { id: 3, title: "Deprem Öncesi Bolu Mimarisi", interviewee: "Mehmet Bey", date: "2022", excerpt: "Bolu'nun eski ahşap evleri, mahalle kültürü ve depremlerle değişen şehir dokusu üzerine bir sohbet." },
    { id: 4, title: "Köy Düğünleri ve Gelenekler", interviewee: "Ayşe Hanım", date: "2023", excerpt: "Eskiden 3 gün 3 gece süren köy düğünleri, kına geceleri ve unutulmaya yüz tutmuş maniler." },
    { id: 5, title: "Bolu'da Ramazanlar", interviewee: "Hüseyin Amca", date: "2022", excerpt: "Eski Ramazanlardaki iftar sofraları, top atılması ve teravih namazı sonrası sohbetler." },
    { id: 6, title: "Milli Mücadele Döneminde Bolu", interviewee: "Tarihçi Ali Bey", date: "2023", excerpt: "Bolu'nun Milli Mücadele yıllarındaki rolü ve yerel kahramanların hikayeleri." },
];

export default function StoriesPage() {
    return (
        <div className="container section">
            <h1 className="title">Röportajlar ve Hikayeler</h1>
            <p className="subtitle">Bolu'nun hafızasını keşfedin.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                {stories.map(story => (
                    <StoryCard key={story.id} {...story} />
                ))}
            </div>
        </div>
    );
}
