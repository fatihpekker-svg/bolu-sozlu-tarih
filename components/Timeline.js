import styles from "./Timeline.module.css";

export default function Timeline() {
    const events = [
        { date: "Ocak 2023", title: "Projenin Başlangıcı", description: "Bolu Sözlü Tarih Projesi fikir aşamasından hayata geçirildi ve ilk ekip kuruldu." },
        { date: "Mart 2023", title: "İlk Saha Çalışmaları", description: "Merkez köylerde ilk keşif gezileri yapıldı ve potansiyel röportaj adayları belirlendi." },
        { date: "Haziran 2023", title: "İlk Kayıtlar", description: "10 farklı kişiyle ilk kapsamlı video röportajlar tamamlandı." },
        { date: "Eylül 2023", title: "Fotoğraf Arşivi", description: "Ailelerden toplanan 500'den fazla tarihi fotoğraf dijital ortama aktarıldı." },
        { date: "Aralık 2023", title: "Web Sitesi Lansmanı", description: "Toplanan materyallerin halka açılması için web sitesi projesi başlatıldı." },
    ];

    return (
        <div className={styles.container}>
            {events.map((event, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.dot}></div>
                    <div className={styles.content}>
                        <div className={styles.date}>{event.date}</div>
                        <h3 className={styles.title}>{event.title}</h3>
                        <p className={styles.description}>{event.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
