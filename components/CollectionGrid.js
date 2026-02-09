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
