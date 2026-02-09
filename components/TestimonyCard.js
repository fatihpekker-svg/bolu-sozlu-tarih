import Link from "next/link";
import Image from "next/image";
import { Play, MapPin, Calendar } from "lucide-react";
import styles from "./TestimonyCard.module.css";

function getYouTubeID(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function TestimonyCard({ title, narrator, date, location, slug, imageUrl, youtubeUrl, type = "video" }) {
    let displayImageUrl = imageUrl;

    // If no main image but we have a YouTube URL, try to get the thumbnail
    if (!displayImageUrl && youtubeUrl) {
        const videoId = getYouTubeID(youtubeUrl);
        if (videoId) {
            displayImageUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    }

    return (
        <Link href={`/stories/${slug}`} className={styles.card}>
            <div className={styles.thumbnail}>
                {displayImageUrl ? (
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <Image
                            src={displayImageUrl}
                            alt={title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}></div>
                    </div>
                ) : (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(45deg, #1a365d, #2563eb)'
                    }}></div>
                )}

                <div style={{
                    position: 'relative', zIndex: 1,
                    width: '50px', height: '50px',
                    borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(4px)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Play fill="#fff" stroke="none" size={20} style={{ marginLeft: '4px' }} />
                </div>

                {type && <span className={styles.typeBadge}>{type}</span>}
                {/* Duration removed as it's not in schema yet */}
            </div>

            <div className={styles.content}>
                {location && <div className={styles.meta}><MapPin size={12} style={{ marginRight: 4 }} /> {location}</div>}
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.narrator}>
                    {narrator}
                </div>

                <div className={styles.footer}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} /> {date}
                    </div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.8rem' }}>
                        DETAY
                    </div>
                </div>
            </div>
        </Link>
    );
}
