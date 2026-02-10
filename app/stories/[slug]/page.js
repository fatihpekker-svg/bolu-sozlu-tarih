import { getStory } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getStories } from "@/sanity/lib/queries";
import { FileText, ExternalLink, MapPin, User, Calendar } from "lucide-react";
import StoryGallery from "@/components/StoryGallery";
import styles from "./Story.module.css";

// Allow dynamic params for new stories not generated at build time
export const dynamicParams = false;

export async function generateStaticParams() {
    const stories = await getStories();
    return stories.map((story) => ({
        slug: story.slug,
    }));
}

function getYouTubeID(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default async function StoryPage({ params }) {
    try {
        const { slug } = await params;
        const story = await getStory(slug);

        if (!story) {
            notFound();
        }

        return (
            <article className={`container ${styles.storyContainer}`}>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>{story.title}</h1>

                    {story.imageUrl && (
                        <div className={styles.imageContainer}>
                            <Image
                                src={story.imageUrl}
                                alt={story.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    {story.youtubeUrl && (
                        <div className={styles.videoWrapper}>
                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeID(story.youtubeUrl)}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube video"
                            />
                        </div>
                    )}

                    {story.audioUrl && (
                        <div className={styles.audioPlayer}>
                            <h3>Ses Kaydını Dinle</h3>
                            <audio controls style={{ width: '100%' }}>
                                <source src={story.audioUrl} type="audio/mpeg" />
                                Tarayıcınız ses elementini desteklemiyor.
                            </audio>
                        </div>
                    )}

                    {/* Künye Section - Moved after Video/Audio */}
                    <section className={styles.kunyeSection}>
                        <h2 className={styles.sectionTitle}>Künye Bilgisi</h2>
                        <div className={styles.kunyeGrid}>
                            <div className={styles.kunyeItem}>
                                <label><User size={14} style={{ marginRight: 4 }} /> Tanıklık Eden</label>
                                <span>{story.interviewee}</span>
                            </div>
                            {story.interviewer && (
                                <div className={styles.kunyeItem}>
                                    <label><User size={14} style={{ marginRight: 4 }} /> Konuşturan</label>
                                    <span>{story.interviewer}</span>
                                </div>
                            )}
                            <div className={styles.kunyeItem}>
                                <label><Calendar size={14} style={{ marginRight: 4 }} /> Dönem/Tarih</label>
                                <span>{story.date}</span>
                            </div>
                            <div className={styles.kunyeItem}>
                                <label><MapPin size={14} style={{ marginRight: 4 }} /> İlçe / Mekan</label>
                                <span>{story.location} {story.village && ` / ${story.village}`}</span>
                            </div>
                        </div>
                        {story.storyMetadata && (
                            <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem', fontSize: '0.95rem' }}>
                                <PortableText value={story.storyMetadata} />
                            </div>
                        )}
                    </section>

                    {/* Photo Gallery Component with Lightbox */}
                    <StoryGallery photos={story.gallery} storyTitle={story.title} />

                    <div className={`prose ${styles.proseBody}`}>
                        <h2 className={styles.sectionTitle}>Tanıklık Metni / Transkripsiyon</h2>
                        {story.body ? <PortableText value={story.body} /> : <p>{story.excerpt}</p>}
                    </div>

                    {/* Documents / PDFs */}
                    {story.documents && story.documents.length > 0 && (
                        <section className={styles.documentsSection}>
                            <h2 className={styles.sectionTitle}>Ekli Belgeler</h2>
                            <div className={styles.documentList}>
                                {story.documents.map((doc, index) => (
                                    <a key={index} href={doc.url} target="_blank" rel="noopener noreferrer" className={styles.documentLink}>
                                        <FileText size={24} color="var(--color-secondary)" />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600' }}>{doc.description || doc.filename}</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Halk Belgesi / PDF</div>
                                        </div>
                                        <ExternalLink size={18} opacity={0.5} />
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </article>
        );
    } catch (error) {
        console.error("STORY_PAGE_ERROR:", error);
        return (
            <div className="container py-20 text-center">
                <h2>Hikaye yüklenirken bir teknik hata oluştu.</h2>
                <p style={{ opacity: 0.6, marginTop: '1rem' }}>{error.message}</p>
            </div>
        );
    }
}
