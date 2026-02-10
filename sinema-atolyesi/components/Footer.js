import { Film, Mail, Youtube, Instagram } from 'lucide-react';
import Link from 'next/link';
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
                            <h4>Platform</h4>
                            <ul>
                                <li><Link href="/hakkinda">Hakkımızda</Link></li>
                                <li><Link href="/seviyeler">Seviyeler</Link></li>
                                <li><Link href="/iletisim">İletişim</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Destek</h4>
                            <ul>
                                <li><Link href="/sss">SSS</Link></li>
                                <li><Link href="/kullanim-kosullari">Kullanım Koşulları</Link></li>
                                <li><Link href="/gizlilik">Gizlilik Politikası</Link></li>
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
