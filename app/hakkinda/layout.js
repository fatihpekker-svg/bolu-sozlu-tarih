"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, Users, Handshake, Newspaper } from "lucide-react";
import styles from "./about.module.css";

export default function AboutLayout({ children }) {
    const pathname = usePathname();

    const links = [
        { href: "/hakkinda/proje", label: "Proje Hakkında", icon: <Info size={20} /> },
        { href: "/hakkinda/ekip", label: "Ekibimiz", icon: <Users size={20} /> },
        { href: "/hakkinda/ortaklar", label: "Ortaklar", icon: <Handshake size={20} /> },
        { href: "/hakkinda/basin", label: "Basında Biz", icon: <Newspaper size={20} /> },
    ];

    return (
        <div className="container section">
            {/* Hero for About Section */}
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Hakkımızda</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
                    Bolu'nun toplumsal belleğini dijitalleştirmek ve gelecek kuşaklara aktarmak için çalışıyoruz.
                </p>
            </div>

            <div className={styles.layoutGrid}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <nav style={{ display: 'flex', flexDirection: 'column' }}>
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content Area */}
                <div className={styles.contentContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
}
