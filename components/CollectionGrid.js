import Link from "next/link";
import { Archive, Users, MapPin, Building2, Briefcase, BookOpen } from "lucide-react";
import { getCollections } from "@/sanity/lib/queries";
import styles from "./CollectionGrid.module.css";

const iconMap = {
    Archive,
    Users,
    MapPin,
    Building2,
    Briefcase,
    BookOpen
};

export default async function CollectionGrid() {
    let collections = [];
    try {
        collections = await getCollections();
    } catch (error) {
        console.error("Error fetching collections:", error);
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p>Koleksiyonlar yüklenirken bir hata oluştu.</p>
            </div>
        );
    }

    if (!collections || collections.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p>Henüz koleksiyon eklenmemiş.</p>
            </div>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Tematik Koleksiyonlar</h2>
                    <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Bolu'nun hafızasını oluşturan özel başlıklar altında derlenmiş tanıklıklar.
                    </p>
                </div>

                <div className={styles.grid}>
                    {collections.map((col) => {
                        const IconComponent = iconMap[col.icon] || Archive;
                        return (
                            <Link key={col._id} href={`/koleksiyonlar/${col.slug}`} className={styles.card}>
                                <div className={styles.iconBox}>
                                    <IconComponent size={32} />
                                </div>
                                <h3 className={styles.title}>{col.title}</h3>
                                <p className={styles.count}>{col.storyCount || 0} Tanıklık</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
