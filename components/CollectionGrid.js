import Link from "next/link";
import { Archive, Users, MapPin, Building2, Briefcase, BookOpen } from "lucide-react";
import styles from "./CollectionGrid.module.css";

export default function CollectionGrid() {
    const collections = [
        { label: "Göç Hikayeleri", icon: MapPin, count: 120 },
        { label: "Kayıp Meslekler", icon: Briefcase, count: 85 },
        { label: "Köy Hayatı", icon: Users, count: 240 },
        { label: "Şehir Belleği", icon: Building2, count: 150 },
        { label: "Kadın Anlatıları", icon: BookOpen, count: 95 },
        { label: "Deprem Tanıklıkları", icon: Archive, count: 60 },
    ];

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
                    {collections.map((col, i) => (
                        <Link key={i} href={`/collections/${i}`} className={styles.card}>
                            <div className={styles.iconBox}>
                                <col.icon size={32} />
                            </div>
                            <h3 className={styles.title}>{col.label}</h3>
                            <p className={styles.count}>{col.count} Tanıklık</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
