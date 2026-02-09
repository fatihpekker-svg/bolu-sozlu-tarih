import Link from 'next/link';
import { Play, BookOpen, Award, TrendingUp } from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Sinema Sanatını <span className={styles.highlight}>Öğrenin</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Teoriden pratiğe, kendi hızınızda ilerleyin. Video dersler, interaktif kuizler ve sertifikalarla sinema eğitiminde yeni bir deneyim.
            </p>
            <div className={styles.heroActions}>
              <Link href="/kayit" className="btn btnSecondary">
                <Play size={20} />
                Hemen Başla
              </Link>
              <Link href="/seviyeler" className="btn btnOutline" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}>
                <BookOpen size={20} />
                Seviyeleri Keşfet
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>35+</div>
                <div className={styles.statLabel}>Video Ders</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>3</div>
                <div className={styles.statLabel}>Seviye</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>6</div>
                <div className={styles.statLabel}>Modül</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'var(--color-background-light)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Nasıl Çalışır?</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Play size={32} />
              </div>
              <h3>Video Dersler</h3>
              <p>Her ders kısa, öz ve pratiğe odaklı videolardan oluşur. Kendi hızınızda izleyin.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BookOpen size={32} />
              </div>
              <h3>İnteraktif Kuizler</h3>
              <p>Her dersin sonunda öğrendiklerinizi pekiştiren kuizlerle ilerlemenizi test edin.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Award size={32} />
              </div>
              <h3>Rozetler & Sertifikalar</h3>
              <p>Başarılarınızı rozetlerle kutlayın, seviyeleri tamamlayarak sertifika kazanın.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <TrendingUp size={32} />
              </div>
              <h3>İlerleme Takibi</h3>
              <p>Dashboard'unuzda ne kadar ilerlediğinizi görün, kaldığınız yerden devam edin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Levels Preview */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Öğrenim Yolculuğunuz</h2>
          <div className={styles.levels}>
            <div className={styles.levelCard}>
              <div className={styles.levelIcon}>🎬</div>
              <h3>Seviye 1: Temel Kavramlar</h3>
              <p>Sinemaya giriş, görsel dil ve hikaye anlatımının temelleri.</p>
              <ul className={styles.levelList}>
                <li>Kompozisyon & Çerçeveleme</li>
                <li>Kamera Açıları</li>
                <li>Hikaye Yapısı</li>
              </ul>
            </div>
            <div className={styles.levelCard}>
              <div className={styles.levelIcon}>🎥</div>
              <h3>Seviye 2: Teknik Beceriler</h3>
              <p>Kamera kullanımı, ışık ve ses teknikleri.</p>
              <ul className={styles.levelList}>
                <li>Kamera Teknikleri</li>
                <li>Işık & Renk</li>
                <li>Ses Tasarımı</li>
              </ul>
            </div>
            <div className={styles.levelCard}>
              <div className={styles.levelIcon}>🏆</div>
              <h3>Seviye 3: İleri Seviye</h3>
              <p>Kurgu, yönetmenlik ve prodüksiyon yönetimi.</p>
              <ul className={styles.levelList}>
                <li>Kurgu Sanatı</li>
                <li>Yönetmenlik</li>
                <li>Prodüksiyon</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Sinema Yolculuğunuza Başlayın</h2>
          <p>Ücretsiz kayıt olun, ilk derslerinize hemen başlayın.</p>
          <Link href="/kayit" className="btn btnSecondary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Ücretsiz Kayıt Ol
          </Link>
        </div>
      </section>
    </div>
  );
}
