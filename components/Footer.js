import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.inner}>
                    {/* Column 1: Hakkında */}
                    <div className={styles.column}>
                        <h3>Bolu Sözlü Tarih</h3>
                        <p className={styles.desc}>
                            Bolu'nun kültürel mirasını ve toplumsal hafızasını, yaşayan tanıkların anlatımlarıyla geleceğe taşıyan dijital bellek platformu.
                        </p>
                    </div>

                    {/* Column 2: Hızlı Erişim - SSS ve Kaynaklar Eklendi */}
                    <div className={styles.column}>
                        <h3>Hızlı Linkler</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/kesfet">Keşfet</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/sss">Sıkça Sorulan Sorular</Link></li>
                            <li><Link href="/kaynaklar">Kaynaklar</Link></li>
                            <li><Link href="/katki">Katkıda Bulun</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Kurumsal */}
                    <div className={styles.column}>
                        <h3>Kurumsal</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/hakkinda">Hakkımızda</Link></li>
                            <li><Link href="/paydaslar">Paydaşlar</Link></li>
                            <li><Link href="/sponsorlar">Sponsorlar</Link></li>
                            <li><Link href="/metodoloji">Metodoloji</Link></li>
                            <li><Link href="/etik">Etik & Yasal</Link></li>
                            <li><Link href="/iletisim">İletişim</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: İletişim */}
                    <div className={styles.column}>
                        <h3>İletişim</h3>
                        <ul className={styles.linkList}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={16} /> info@bolusozlutarih.org
                            </li>
                            <li>Bolu, Türkiye</li>
                        </ul>
                        <div style={{ marginTop: '1.5rem' }}>
                            <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Bültenimize Abone Olun</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="email" placeholder="E-posta adresiniz" style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', width: '100%' }} />
                                <button style={{ padding: '0.5rem 1rem', background: 'var(--color-secondary)', border: 'none', borderRadius: '4px', color: '#fff' }}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div>&copy; {new Date().getFullYear()} Sözlü Tarih Arşivi. Tüm hakları saklıdır.</div>
                    <div className={styles.social}>
                        <Link href="https://twitter.com" target="_blank" aria-label="Twitter"><Twitter size={20} /></Link>
                        <Link href="https://instagram.com" target="_blank" aria-label="Instagram"><Instagram size={20} /></Link>
                        <Link href="https://youtube.com" target="_blank" aria-label="YouTube"><Youtube size={20} /></Link>
                        <Link href="https://facebook.com" target="_blank" aria-label="Facebook"><Facebook size={20} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
