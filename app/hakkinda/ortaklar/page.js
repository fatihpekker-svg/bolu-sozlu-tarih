export const metadata = {
    title: "Ortaklar | Bolu Sözlü Tarih",
};

export default function PartnersPage() {
    return (
        <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Ortaklarımız</h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.1rem', color: '#374151' }}>
                Bu proje, yerel yönetimler, üniversiteler ve sivil toplum kuruluşlarının değerli katkılarıyla hayata geçirilmiştir.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                {/* Mock Logos */}
                <div style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center', color: '#6b7280', fontWeight: 'bold' }}>
                    Bolu Valiliği
                </div>
                <div style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center', color: '#6b7280', fontWeight: 'bold' }}>
                    BAİBÜ
                </div>
                <div style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center', color: '#6b7280', fontWeight: 'bold' }}>
                    Bolu Belediyesi
                </div>
                <div style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center', color: '#6b7280', fontWeight: 'bold' }}>
                    İzzet Baysal Vakfı
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Destekçilerimiz</h3>
                <p style={{ color: '#4b5563' }}>
                    Projenin teknik altyapısı TÜBİTAK 1001 Programı kapsamında desteklenmiştir (Proje No: 123K456).
                </p>
            </div>
        </div>
    );
}
