import { getStory } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

function getYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default async function StoryPage({ params }) {
    const { slug } = await params;
    const story = await getStory(slug);

    if (!story) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{story.title}</h1>
                <div style={{ marginBottom: '2rem', color: '#666' }}>
                    {story.interviewee} • {story.date} {story.location && `• ${story.location}`}
                </div>

                {story.imageUrl && (
                    <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden' }}>
                        <Image
                            src={story.imageUrl}
                            alt={story.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}

                {story.youtubeUrl && (
                    <div style={{ marginBottom: '2rem', position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeID(story.youtubeUrl)}`}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video"
                        />
                    </div>
                )}

                {story.audioUrl && (
                    <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Ses Kaydını Dinle</h3>
                        <audio controls style={{ width: '100%' }}>
                            <source src={story.audioUrl} type="audio/mpeg" />
                            Tarayıcınız ses elementini desteklemiyor.
                        </audio>
                    </div>
                )}

                <div className="prose" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                    {story.body ? <PortableText value={story.body} /> : <p>{story.excerpt}</p>}
                </div>
            </div>
        </div>
    );
}
