import { blogPosts } from "../data";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);
    return {
        title: post ? `${post.title} | Blog` : "Yazı Bulunamadı",
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <div className="container section">Yazı bulunamadı.</div>;
    }

    return (
        <article className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/blog" className="btn btnOutline" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center' }}>
                    <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Tüm Yazılar
                </Link>

                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{ marginBottom: '1rem', color: 'var(--color-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {post.category}
                    </div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2', color: 'var(--color-primary)' }}>{post.title}</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: '#6b7280', fontSize: '0.95rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={18} /> {post.date}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <User size={18} /> {post.author}
                        </div>
                    </div>
                </header>

                <div style={{ marginBottom: '3rem', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--color-text)' }}>
                    <p style={{ marginBottom: '2rem', fontWeight: '500', fontSize: '1.3rem' }}>
                        {post.excerpt}
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Bellek ve Mekan İlişkisi</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <blockquote style={{ borderLeft: '4px solid var(--color-secondary)', paddingLeft: '1.5rem', margin: '2rem 0', fontStyle: 'italic', fontSize: '1.3rem', color: '#4b5563' }}>
                        "Sözlü tarih, sadece geçmişi değil, bugünü nasıl anlamlandırdığımızı da ortaya koyan yaşayan bir süreçtir."
                    </blockquote>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </div>

                <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>Etiketler:</span>
                    {['Tarih', 'Bellek', 'Kültür', 'Metodoloji'].map(tag => (
                        <span key={tag} style={{ background: 'var(--color-light-gray)', padding: '2px 10px', borderRadius: '4px', fontSize: '0.9rem', color: '#4b5563' }}>
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
