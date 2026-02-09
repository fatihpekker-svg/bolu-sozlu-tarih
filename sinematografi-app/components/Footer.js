'use client';

import Link from 'next/link';
import { Film, Github, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* About */}
                <div className="footer-column">
                    <div className="footer-logo">
                        <Film size={24} />
                        <span>Sinematografi</span>
                    </div>
                    <p className="footer-description">
                        İnteraktif simülasyonlar ve görsel örneklerle kamera ve ışık sanatını öğrenin.
                        Profesyonel sinematografi eğitimi için ücretsiz platform.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <h3 className="footer-title">Hızlı Erişim</h3>
                    <ul className="footer-links">
                        <li><Link href="/">Ana Sayfa</Link></li>
                        <li><Link href="/kamera-ayarlari">Kamera Ayarları</Link></li>
                        <li><Link href="/kadrajlar">Kadrajlar</Link></li>
                        <li><Link href="/objektifler">Objektifler</Link></li>
                        <li><Link href="/hareketler">Kamera Hareketleri</Link></li>
                        <li><Link href="/isiklandirma">Işıklandırma</Link></li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div className="footer-column">
                    <h3 className="footer-title">İletişim</h3>
                    <div className="social-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="mailto:info@sinematografi.com" aria-label="Email">
                            <Mail size={20} />
                        </a>
                    </div>
                    <p className="footer-contact">
                        Geri bildirim ve önerileriniz için:<br />
                        <a href="mailto:info@sinematografi.com">info@sinematografi.com</a>
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Sinematografi Eğitim Platformu. Tüm hakları saklıdır.</p>
                <button
                    onClick={scrollToTop}
                    className="back-to-top"
                    aria-label="Yukarı çık"
                >
                    <ArrowUp size={20} />
                </button>
            </div>
        </footer>
    );
}
