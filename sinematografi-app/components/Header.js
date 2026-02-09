'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Film, Moon, Sun, Menu, X } from 'lucide-react';
import './Header.css';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true); // Default dark
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/kamera-ayarlari', label: 'Kamera Ayarları' },
        { href: '/kadrajlar', label: 'Kadrajlar' },
        { href: '/objektifler', label: 'Objektifler' },
        { href: '/hareketler', label: 'Hareketler' },
        { href: '/isiklandirma', label: 'Işıklandırma' }
    ];

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('light-mode');
    };

    return (
        <header className="site-header">
            <div className="header-container">
                {/* Logo */}
                <Link href="/" className="site-logo">
                    <Film size={28} />
                    <span>Sinematografi</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
