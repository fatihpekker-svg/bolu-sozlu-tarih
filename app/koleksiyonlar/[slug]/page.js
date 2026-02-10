import TestimonyCard from "@/components/TestimonyCard";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";
import { getCollectionBySlug, getCollections } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

// Required for static export
export const dynamicParams = false;

export async function generateStaticParams() {
    const collections = await getCollections();
    return collections.map((col) => ({
        slug: col.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const collection = await getCollectionBySlug(slug);

    if (!collection) return { title: "Koleksiyon Bulunamadı" };

    return {
        title: `${collection.title} | Sözlü Tarih Arşivi`,
        description: collection.description,
    };
}

export default async function CollectionDetail({ params }) {
    const { slug } = await params;
    let collection = null;

    try {
        collection = await getCollectionBySlug(slug);
    } catch (error) {
        console.error("Error fetching collection detail:", error);
        return (
            <div className="container section" style={{ textAlign: 'center', py: '10rem' }}>
                <h1>Hata Oluştu</h1>
                <p>Koleksiyon bilgileri yüklenirken bir sorun yaşandı.</p>
                <Link href="/koleksiyonlar" className="btn btnOutline" style={{ marginTop: '1rem' }}>Geri Dön</Link>
            </div>
        );
    }

    if (!collection) {
        notFound();
    }

    const collectionStories = collection.stories || [];

    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: 'var(--color-primary)',
                color: '#fff',
                padding: '5rem 0',
                textAlign: 'center',
                backgroundImage: collection.imageUrl ? `linear-gradient(rgba(26, 54, 93, 0.8), rgba(26, 54, 93, 0.7)), url(${collection.imageUrl})` : 'linear-gradient(rgba(26, 54, 93, 0.9), rgba(26, 54, 93, 0.8))',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="container">
                    <Link href="/koleksiyonlar" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <ArrowLeft size={16} /> Tüm Koleksiyonlar
                    </Link>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#fff' }}>{collection.title}</h1>
                    {collection.description && (
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                            {collection.description}
                        </p>
                    )}
                    <div style={{ marginTop: '2rem', display: 'inline-block', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', borderRadius: '50px' }}>
                        {collectionStories.length} Kayıt Mevcut
                    </div>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="container section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem' }}>Koleksiyon İçeriği</h2>
                    {collectionStories.length > 0 && (
                        <button className="btn btnSecondary">
                            <PlayCircle size={18} style={{ marginRight: '8px' }} /> Tümünü Oynat
                        </button>
                    )}
                </div>

                {collectionStories.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {collectionStories.map(story => (
                            <TestimonyCard
                                key={story._id}
                                id={story._id}
                                title={story.title}
                                narrator={story.interviewee}
                                location={story.location}
                                village={story.village}
                                date={story.date}
                                imageUrl={story.imageUrl}
                                slug={story.slug}
                                youtubeUrl={story.youtubeUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem', background: '#f9fafb', borderRadius: '12px' }}>
                        <p style={{ opacity: 0.6 }}>Bu koleksiyona henüz hikaye eklenmemiş.</p>
                        <Link href="/kesfet" className="btn btnOutline" style={{ marginTop: '1.5rem' }}>Arşive Göz At</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
