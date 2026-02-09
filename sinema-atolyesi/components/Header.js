import Link from 'next/link';
import { Film, User, BookOpen, Award } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.content}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <Film size={32} />
                        <span>Sinema Mektebi</span>
                    </Link>

                    {/* Navigation */}
                    <nav className={styles.nav}>
                        <Link href="/dashboard" className={styles.navLink}>
                            <BookOpen size={18} />
                            Dersler
                        </Link>
                        <Link href="/fiyatlandirma" className={styles.navLink}>
                            <Award size={18} />
                            Fiyatlandırma
                        </Link>
                        <Link href="/profil" className={styles.navLink}>
                            <User size={18} />
                            Profilim
                        </Link>
                    </nav>

                    {/* User Actions */}
                    <div className={styles.actions}>
                        <Link href="/giris" className="btn btnGhost">
                            Giriş Yap
                        </Link>
                        <Link href="/kayit" className="btn btnPrimary">
                            Kayıt Ol
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
