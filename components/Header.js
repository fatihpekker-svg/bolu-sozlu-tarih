"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, User, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import styles from "./Header.module.css";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const navItems = [
        { label: "Keşfet", href: "/kesfet" },
        { label: "Metodoloji", href: "/metodoloji" },
        { label: "Paydaşlar", href: "/paydaslar" },
        { label: "Sponsorlar", href: "/sponsorlar" },
        { label: "Hakkında", href: "/hakkinda" },
        { label: "Blog", href: "/blog" },
        { label: "İletişim", href: "/iletisim" },
    ];

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/kesfet?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                {/* Logo */}
                <Link href="/" className={styles.logoArea}>
                    <span className={styles.logoText}>Bolu Sözlü Tarih</span>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.link}>
                            {item.label}
                        </Link>
                    ))}
                    <SignedIn>
                        <Link href="/hesabim" className={styles.link}>Hesabım</Link>
                    </SignedIn>
                </nav>

                {/* Desktop Actions */}
                <div className={styles.actions}>
                    <input
                        type="text"
                        className={`${styles.searchInput} ${isSearchOpen ? styles.active : ''}`}
                        placeholder="Ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus={isSearchOpen}
                    />
                    <button
                        className={styles.iconBtn}
                        aria-label="Arama"
                        onClick={() => {
                            if (isSearchOpen && searchQuery) {
                                handleSearch();
                            } else {
                                setIsSearchOpen(!isSearchOpen);
                            }
                        }}
                    >
                        {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                    </button>

                    <div className={styles.authWrapper}>
                        <SignedOut>
                            <Link href="/sign-in" className={`${styles.iconBtn} ${styles.loginBtn}`} title="Giriş Yap">
                                <User size={20} />
                                <span className={styles.loginText}>Giriş</span>
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Menu Overlay (Basit Versiyon) */}
            {isMenuOpen && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'var(--color-background)', zIndex: 200, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)' }}>
                            <X size={32} />
                        </button>
                    </div>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.5rem', fontWeight: '500' }}>
                        {navItems.map(item => (
                            <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                                {item.label}
                            </Link>
                        ))}
                        <SignedIn>
                            <Link href="/hesabim" onClick={() => setIsMenuOpen(false)}>
                                Hesabım
                            </Link>
                        </SignedIn>
                        <Link href="/katki" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--color-secondary)' }}>
                            Katkıda Bulun
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
