import { getCollectionBySlug, getCollections } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Archive } from "lucide-react";
import StoryCard from "@/components/StoryCard";

// Dynamic routing for static export
export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const collections = await getCollections();
        // If no collections found, return a dummy slug to pass build
        if (!collections || collections.length === 0) {
            console.warn("No collections found. Using fallback 'genel' slug.");
            return [{ slug: 'genel' }];
        }
        return collections.map((collection) => ({
            slug: collection.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [{ slug: 'genel' }];
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const collection = await getCollectionBySlug(slug);

    if (!collection) {
        return {
            title: "Koleksiyon Bulunamadı",
        };
    }

    return {
        title: `${collection.title} | Bolu Sözlü Tarih`,
        description: collection.description,
    };
}

export default async function CollectionPage({ params }) {
    const { slug } = await params;

    // Check if valid slug or fallback
    let collection = null;
    try {
        collection = await getCollectionBySlug(slug);
    } catch (e) {
        // quiet fail on fallback
    }

    if (!collection) {
        // If it's the fallback slug and no data, show a friendly empty state
        if (slug === 'genel') {
            return (
                <div className="section">
                    <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <h1>Henüz Koleksiyon Eklenmedi</h1>
                        <p>Yakında burada içerikler yer alacak.</p>
                        <Link href="/kesfet" className="btn btnPrimary" style={{ marginTop: '1rem' }}>Keşfet'e Dön</Link>
                    </div>
                </div>
            );
        }
        return notFound();
    }

    return (
        <div className="section">
            <div className="container">
                <Link href="/kesfet" className="btn btnOutline" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center' }}>
                    <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Tümünü Keşfet
                </Link>

                <header style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div style={{
                        width: '80px', height: '80px', background: 'var(--color-secondary)', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                        color: '#fff'
                    }}>
                        <Archive size={40} />
                    </div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>{collection.title}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: '1.6' }}>
                        {collection.description}
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {collection.stories && collection.stories.length > 0 ? (
                        collection.stories.map((story) => (
                            <StoryCard
                                key={story._id}
                                title={story.title}
                                interviewee={story.interviewee}
                                date={story.date}
                                excerpt={story.excerpt}
                                slug={story.slug}
                                imageUrl={story.imageUrl}
                                location={story.location}
                                youtubeUrl={story.youtubeUrl}
                            />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: '#f9fafb', borderRadius: '12px' }}>
                            <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>Bu koleksiyonda henüz hikaye bulunmuyor.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
