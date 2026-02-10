'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './StoryGallery.module.css';

export default function StoryGallery({ photos, storyTitle }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const showNext = useCallback((e) => {
        e?.stopPropagation();
        if (!photos) return;
        setSelectedIndex((prev) => (prev + 1) % photos.length);
    }, [photos]);

    const showPrev = useCallback((e) => {
        e?.stopPropagation();
        if (!photos) return;
        setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }, [photos]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') setSelectedIndex(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, showNext, showPrev]);

    if (!photos || photos.length === 0) return null;

    const currentImage = selectedIndex !== null ? photos[selectedIndex] : null;

    return (
        <section className={styles.gallerySection}>
            <h2 className={styles.sectionTitle}>Foto Galeri</h2>
            <div className={styles.galleryGrid}>
                {photos.map((item, index) => (
                    <div
                        key={index}
                        className={styles.galleryItem}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <Image
                            src={item.url}
                            alt={item.alt || storyTitle}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        {item.caption && (
                            <div className={styles.caption}>
                                {item.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox / Modal */}
            {currentImage && (
                <div
                    className={styles.lightboxOverlay}
                    onClick={() => setSelectedIndex(null)}
                >
                    <div
                        className={styles.lightboxContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.closeButton}
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X size={32} />
                        </button>

                        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={showPrev}>
                            <ChevronLeft size={48} />
                        </button>

                        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={showNext}>
                            <ChevronRight size={48} />
                        </button>

                        <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1 }}>
                            <Image
                                src={currentImage.url}
                                alt={currentImage.alt || storyTitle}
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="90vw"
                                priority
                            />
                        </div>

                        {currentImage.caption && (
                            <div className={styles.lightboxCaption}>
                                {currentImage.caption}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
