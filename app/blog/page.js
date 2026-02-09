import Link from "next/link";
import { blogPosts } from "./data";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Blog | Sözlü Tarih Arşivi",
    description: "Sözlü tarih, metodoloji ve proje güncellemeleri hakkında yazılar.",
};

export default function BlogListing() {
    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Blog</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                    Tarih, bellek ve proje süreçlerine dair makalelerimizi keşfedin.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
                {blogPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', background: '#fff', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-5px)' } }}>
                        <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem', color: '#6b7280' }}>
                                <span style={{ color: 'var(--color-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>{post.category}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={14} /> {post.date}
                                </div>
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.3', color: 'var(--color-primary)' }}>{post.title}</h2>
                            <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text)', opacity: 0.9, flex: 1 }}>
                                {post.excerpt}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                                Devamını Oku <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
