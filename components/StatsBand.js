import styles from "./StatsBand.module.css";

export default function StatsBand() {
    const stats = [
        { value: "1.250+", label: "Toplam Tanıklık" },
        { value: "3.500+", label: "Saat Kayıt" },
        { value: "81", label: "İl" },
        { value: "45+", label: "Özel Koleksiyon" },
    ];

    return (
        <div className={styles.band}>
            <div className={`container ${styles.grid}`}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.value}>{stat.value}</div>
                        <div className={styles.label}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
