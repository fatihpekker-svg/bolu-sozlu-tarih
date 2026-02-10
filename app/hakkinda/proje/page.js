import { Target, Flag, History, Quote } from "lucide-react";
import styles from "../about.module.css";

export const metadata = {
    title: "Proje Hakkında | Bolu Sözlü Tarih",
};

export default function ProjePage() {
    return (
        <div>
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Neden Bu Proje?</h2>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#374151' }}>
                    Tarih, sadece kitaplarda yazan büyük olaylardan ibaret değildir.
                    Asıl tarih; bir çarşı esnafının anlattıklarında, bir yayla göçünde söylenen türküde ve depremi yaşamış bir annenin sessizliğinde saklıdır.
                </p>
                <div className={styles.quoteBox}>
                    <Quote size={32} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
                    <div>
                        "Bolu'nun hafızasını kaybetmesine izin veremezdik. Çünkü bir şehri şehir yapan, binaları değil, o binaların içinde yaşananlardır."
                        <div style={{ marginTop: '0.5rem', fontWeight: 'bold', fontStyle: 'normal' }}>- Proje Ekibi</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>

                <div className={styles.featureItem}>
                    <div className={styles.iconBox} style={{ background: '#dbeafe' }}>
                        <Target size={28} color="#1e40af" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Vizyonumuz</h3>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>
                            Türkiye'nin yerel tarih çalışmalarına model oluşturacak, yaşayan ve sürekli genişleyen bir dijital bellek platformu olmak.
                            Akademik disiplinle halkın katılımını birleştiren "kamusal tarih" anlayışının öncüsü olmak.
                        </p>
                    </div>
                </div>

                <div className={styles.featureItem}>
                    <div className={styles.iconBox} style={{ background: '#dcfce7' }}>
                        <Flag size={28} color="#166534" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Misyonumuz</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#4b5563' }}>
                            <li>Kaybolma riski altındaki kültürel mirası kayıt altına almak.</li>
                            <li>Farklı kuşaklar arasında bir hafıza köprüsü kurmak.</li>
                            <li>Yerel araştırmacılara ve öğrencilere birincil kaynak sağlamak.</li>
                            <li>Şehir kimliğini ve aidiyet duygusunu güçlendirmek.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.featureItem}>
                    <div className={styles.iconBox} style={{ background: '#f3e8ff' }}>
                        <History size={28} color="#6b21a8" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>2024 - 2026 Hedefleri</h3>
                        <p style={{ lineHeight: '1.6', color: '#4b5563' }}>
                            Bolu merkezden başlayarak tüm ilçelere (Gerede, Mudurnu, Göynük...) yayılmak ve 2026 sonuna kadar <strong>1000 saatlik</strong> görüşme kaydına ulaşmak.
                        </p>
                    </div>
                </div>

            </div>


        </div>
    );
}
