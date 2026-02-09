import Link from "next/link";
import { PlayCircle, Mic, Map } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.bg}></div>

            <div className={styles.content}>
                <span className={styles.label}>Bolu Sözlü Tarih Projesi</span>
                <h1 className={styles.title}>Bolu'nun Sesli Belleği</h1>
                <p className={styles.subtitle}>
                    Kökez suyunun serinliğinden yayla rüzgarlarına, Bolu'nun unutulmaya yüz tutmuş hikayelerini yaşayan tanıklardan dinleyin.
                </p>

                <div className={styles.actions}>
                    <Link href="/kesfet" className="btn btnSecondary">
                        <PlayCircle size={20} style={{ marginRight: '8px' }} />
                        Tanıklıkları Keşfet
                    </Link>
                    <Link href="/harita" className="btn btnGhost">
                        <Map size={20} style={{ marginRight: '8px' }} />
                        Haritada Keşfet
                    </Link>
                    <Link href="/katki" className="btn btnGhost">
                        <Mic size={20} style={{ marginRight: '8px' }} />
                        Hikayeni Paylaş
                    </Link>
                </div>
            </div>
        </section>
    );
}
