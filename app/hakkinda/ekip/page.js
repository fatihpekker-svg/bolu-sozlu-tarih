export const metadata = {
    title: "Ekibimiz | Bolu Sözlü Tarih",
};

const teamMembers = [
    { name: "Prof. Dr. Ahmet Yılmaz", role: "Proje Yürütücüsü", bio: "Bolu Abant İzzet Baysal Üniversitesi Tarih Bölümü.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Dr. Elif Demir", role: "Saha Koordinatörü", bio: "Sosyolog ve sözlü tarih uzmanı.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
    { name: "Caner Öztürk", role: "Teknik Lider", bio: "Yazılım mühendisi ve dijital arşiv uzmanı.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" },
    { name: "Zeynep Kaya", role: "Editoryal Sorumlu", bio: "Türk Dili ve Edebiyatı araştırmacısı.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" },
];

export default function TeamPage() {
    return (
        <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Ekibimiz</h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.1rem', color: '#374151' }}>
                Bolu Sözlü Tarih Projesi, farklı disiplinlerden gelen uzmanların ve gönüllülerin ortak emeğiyle yürütülmektedir.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
                {teamMembers.map((member, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden',
                            margin: '0 auto 1rem', border: '3px solid var(--color-border)'
                        }}>
                            <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>{member.name}</h3>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-secondary)', fontWeight: '600', marginBottom: '0.5rem' }}>{member.role}</div>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.4' }}>{member.bio}</p>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Danışma Kurulu</h3>
                <ul style={{ columnCount: 2, gap: '2rem' }}>
                    {['Prof. Dr. Mehmet Öz', 'Doç. Dr. Ayşe Sönmez', 'Bolu Belediyesi Kültür Md.', 'Yerel Tarihçi Mustafa Bey'].map((name, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', color: '#4b5563' }}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
