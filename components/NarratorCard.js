import styles from "./NarratorCard.module.css";

export default function NarratorCard() {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.avatar} />
                <div className={styles.info}>
                    <span className={styles.name}>Ahmet Usta</span>
                    <span className={styles.sub}>Ebru Sanatçısı, 75</span>
                </div>
            </div>

            <p className={styles.bio}>
                1948 İstanbul doğumlu. Kapalıçarşı'da çıraklıktan yetişme bir Ebru ustası. 50 yıldır geleneksel motifleri su yüzeyine işliyor ve yeni nesillere aktarıyor.
            </p>

            <div className={styles.metaList}>
                <div className={styles.metaItem}>
                    <span className={styles.label}>Doğum Yeri:</span>
                    <span className={styles.value}>Seben, Bolu</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.label}>Meslek:</span>
                    <span className={styles.value}>Öğretmen</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.label}>Görüşme Tarihi:</span>
                    <span className={styles.value}>12 Mayıs 2023</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.label}>Süre:</span>
                    <span className={styles.value}>45 Dakika</span>
                </div>
            </div>
        </div>
    );
}
