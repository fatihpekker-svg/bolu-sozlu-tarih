
import styles from "./Transcript.module.css";

export default function Transcript() {
    const lines = [
        { time: "00:00", text: "Merhaba Ahmet Usta, bize biraz kendinizden bahseder misiniz?" },
        { time: "00:05", text: "Ben Ahmet Demir. 1948 yılında İstanbul'da doğdum. Babam da bir zanaatkardı, bu yüzden atölyelerin tozuyla büyüdüm diyebilirim." },
        { time: "00:15", text: "Ebru sanatı ile tanışmanız nasıl oldu?" },
        { time: "00:22", text: "Çok küçük yaşlarda, bir gün Kapalıçarşı'da bir ustanın suyun üzerine boya serpişini izledim. O renklerin dansı beni büyüledi." },
        { time: "00:40", text: "Çıraklık süreciniz nasıldı?" },
        { time: "00:45", text: "Zordu tabii. Ustam, 'önce sabrı öğreneceksin' derdi. Fırça tutmama izin vermeden aylarca sadece tekneyi temizledim, boyaları ezdim." },
        { time: "01:10", text: "İlk eserinizi yaptığınız anı hatırlıyor musunuz?" },
        { time: "01:15", text: "Evet, elim titreyerek boyayı serptim. Ustamın 'oldu' dediği o an, dünyalar benim olmuştu." },
    ];

    return (
        <div className={styles.container}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Transkript</h3>
            {lines.map((line, i) => (
                <div key={i} className={styles.item}>
                    <div className={styles.time}>{line.time}</div>
                    <div className={styles.text}>{line.text}</div>
                </div>
            ))}
        </div>
    );
}
