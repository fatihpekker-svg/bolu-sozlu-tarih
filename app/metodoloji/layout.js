"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Mic, FileText, Database, Settings } from "lucide-react";

export default function MethodologyLayout({ children }) {
    const pathname = usePathname();

    const links = [
        { href: "/metodoloji/nedir", label: "Sözlü Tarih Nedir?", icon: <BookOpen size={20} /> },
        { href: "/metodoloji/gorusme", label: "Görüşme Rehberi", icon: <Mic size={20} /> },
        { href: "/metodoloji/teknik", label: "Teknik Rehber", icon: <Settings size={20} /> },
        { href: "/metodoloji/transkripsiyon", label: "Transkripsiyon", icon: <FileText size={20} /> },
        { href: "/metodoloji/arsivleme", label: "Arşivleme", icon: <Database size={20} /> },
    ];

    return (
        <div className="container section">
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Metodoloji</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
                    Bolu Sözlü Tarih Projesi'nin bilimsel çalışma yöntemleri ve standartları.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '4rem', alignItems: 'start' }}>
                <aside style={{
                    background: '#fff',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'sticky',
                    top: '2rem'
                }}>
                    <nav style={{ display: 'flex', flexDirection: 'column' }}>
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '12px',
                                        padding: '1rem 1.5rem',
                                        background: isActive ? 'var(--color-primary)' : 'transparent',
                                        color: isActive ? '#fff' : 'var(--color-text)',
                                        borderBottom: '1px solid #f1f5f9',
                                        fontWeight: isActive ? '600' : '400',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
