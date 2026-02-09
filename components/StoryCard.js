import Link from "next/link";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import styles from "./StoryCard.module.css";

function getYouTubeID(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function StoryCard({ title, interviewee, date, excerpt, slug, imageUrl, location, youtubeUrl }) {
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
            <div className={styles.imageWrapper}>
                {displayImageUrl ? (
                    <Image
                        src={displayImageUrl}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', color: 'rgba(0,0,0,0.2)' }}>
                        <PlayCircle size={48} />
                    </div>
                )}
                {/* Overlay for play icon if needed */}
                <div className={styles.overlay}>
                    <PlayCircle size={48} className={styles.playIcon} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.meta}>{interviewee} • {date}</div>
                {location && <div className={styles.location}>{location}</div>}
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.excerpt}>{excerpt}</p>
                <div className={styles.link}>
                    Dinle / İzle
                </div>
            </div>
        </Link>
    );
}
