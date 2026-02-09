import { Film, Mail, Youtube, Instagram } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <Film size={28} />
                            <span>Sinema Mektebi</span>
                        </div>
                        <p>Sinema sanatını öğrenmenin en interaktif yolu</p>
                    </div>

                    {/* Links */}
                    <div className={styles.links}>
                        <div>
                            <h4>Platformdüm</h4>
                            <ul>
                                <li><a href="/hakkinda">Hakkımızda</a></li>
                                <li><a href="/seviyeler">Seviyeler</a></li>
                                <li><a href="/iletisim">İletişim</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Destek</h4>
                            <ul>
                                <li><a href="/sss">SSS</a></li>
                                <li><a href="/kullanim-kosullari">Kullanım Koşulları</a></li>
                                <li><a href="/gizlilik">Gizlilik Politikası</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Social */}
                    <div className={styles.social}>
                        <h4>Bizi Takip Edin</h4>
                        <div className={styles.socialLinks}>
                            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="mailto:info@sinemamektebi.com" aria-label="Email"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; 2026 Sinema Mektebi. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}
