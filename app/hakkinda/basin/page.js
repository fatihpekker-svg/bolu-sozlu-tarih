export const metadata = {
    title: "Basında Biz | Bolu Sözlü Tarih",
};

export default function PressPage() {
    const news = [
        { source: "Bolu Gündem", date: "15 Ekim 2024", title: "Bolu'nun hafızası dijitalleşiyor", url: "#" },
        { source: "Ulusal Kanal", date: "02 Kasım 2024", title: "Sözlü tarih projesi ödül aldı", url: "#" },
        { source: "Köroğlu Gazetesi", date: "10 Aralık 2024", title: "Gençler dedelerinin hikayelerini kaydediyor", url: "#" },
    ];

    return (
        <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Basında Biz</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#374151' }}>
                Projemiz hakkında basında çıkan haberler ve duyurular.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {news.map((item, i) => (
                    <div key={i} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-secondary)', marginBottom: '0.4rem' }}>{item.source} • {item.date}</div>
                            <a href={item.url} style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-primary)', textDecoration: 'none' }}>{item.title}</a>
                        </div>
                        <a href={item.url} className="btn btnOutline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Oku</a>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '3rem', padding: '2rem', background: '#f8fafc', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Basın Kiti</h3>
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                    Logo, görseller ve basın bültenlerini içeren medya kitimizi indirebilirsiniz.
                </p>
                <button className="btn btnSecondary">Medya Kitini İndir (ZIP)</button>
            </div>
        </div>
    );
}
