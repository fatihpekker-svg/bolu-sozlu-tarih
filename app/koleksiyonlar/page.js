import CollectionGrid from "@/components/CollectionGrid";

export const metadata = {
    title: "Koleksiyonlar | Sözlü Tarih Arşivi",
    description: "Arşivdeki özel tematik koleksiyonları inceleyin.",
};

export default function CollectionsPage() {
    return (
        <div className="container section">
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Bolu'nun Hafıza Koleksiyonları</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                    Şehrin belleğindeki farklı odalara açılan kapılar. Göçten zanaate, köyden kente; Bolu'nun yaşanmışlıklarını tematik olarak keşfedin.
                </p>
            </div>

            <CollectionGrid />

            {/* Additional Collections Grid could go here if different from the component */}
        </div>
    );
}
