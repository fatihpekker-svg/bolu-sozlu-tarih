"use client";
import Link from "next/link";
import Image from "next/image";
import { Play, MapPin, Calendar, Heart } from "lucide-react";
import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
import styles from "./TestimonyCard.module.css";

function getYouTubeID(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function TestimonyCard({ id, title, narrator, date, location, slug, imageUrl, youtubeUrl, type = "video", isFavorited: initialFavorited }) {
    const { isSignedIn, user } = useUser();
    const [isFavorited, setIsFavorited] = useState(initialFavorited);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsFavorited(initialFavorited);
    }, [initialFavorited]);

    const toggleFavorite = async (e) => {
        e.preventDefault(); // Prevent navigating to detail page
        e.stopPropagation();

        if (!isSignedIn) {
            alert("Favorilere eklemek için lütfen giriş yapın.");
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);
        const nextState = !isFavorited;
        setIsFavorited(nextState); // Optimistic update

        try {
            if (nextState) {
                // Add to favorites
                await supabase
                    .from('favorites')
                    .insert([{ user_id: user.id, story_id: id }]);
            } else {
                // Remove from favorites
                await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('story_id', id);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            setIsFavorited(!nextState); // Revert on error
        } finally {
            setIsSubmitting(false);
        }
    };
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
                <button
                    className={`${styles.favoriteBtn} ${isFavorited ? styles.favorited : ""}`}
                    onClick={toggleFavorite}
                    disabled={isSubmitting}
                    title={isFavorited ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                >
                    <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
                </button>
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
