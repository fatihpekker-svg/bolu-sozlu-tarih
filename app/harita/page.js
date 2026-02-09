import { getStories } from "@/sanity/lib/queries";
import DistrictMap from "@/components/DistrictMap";

export const metadata = {
    title: 'Harita | Bolu Sözlü Tarih Arşivi',
    description: 'Bolu ilçelerine göre tanıklıkları keşfedin.',
};

export default async function MapPage() {
    const stories = await getStories();

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Sözlü Tarih Haritası</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', color: '#666' }}>
                    Bolu'nun ilçelerine tıklayarak o bölgeden derlenen hikayeleri keşfedin.
                    Harita üzerindeki sayılar, ilgili ilçedeki kayıt sayısını göstermektedir.
                </p>
            </div>

            <DistrictMap stories={stories} />
        </div>
    );
}
