import styles from "./ProjectIntro.module.css";

export default function ProjectIntro() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.inner}`}>
                <span className={styles.label}>Proje Hakkında</span>
                <h2 className={styles.title}>Bolu'nun Yaşayan Tarihi</h2>
                <p className={styles.text}>
                    Bolu Sözlü Tarih Projesi, şehrimizin kültürel belleğini oluşturmak, yaşlılarımızın anılarını kayıt altına almak ve gelecek nesillere aktarmak amacıyla başlatılmıştır.
                    Her bir röportaj, Bolu'nun sosyal, kültürel ve ekonomik geçmişine ışık tutan birer belgedir.
                </p>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>50+</span>
                        <span className={styles.statLabel}>Röportaj</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>100+</span>
                        <span className={styles.statLabel}>Saat Kayıt</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>500+</span>
                        <span className={styles.statLabel}>Fotoğraf</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
