"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlayCircle, Mic, Map } from "lucide-react";
import styles from "./Hero.module.css";

const SLIDE_IMAGES = [
    "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop", // Bolu Nature 1
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop", // Mountains/Nature 2
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop"  // Mountains/Nature 3
];

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % SLIDE_IMAGES.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.hero}>
            <div className={styles.bg}>
                {/* Fixed Blue Gradient Overlay */}
                <div className={styles.overlay}></div>

                {/* Image Slider */}
                {SLIDE_IMAGES.map((img, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === currentImageIndex ? styles.active : ''}`}
                        style={{ backgroundImage: `url('${img}')` }}
                    />
                ))}
            </div>

            <div className={styles.content}>
                <span className={styles.label}>BOLU SÖZLÜ TARİH PROJESİ</span>
                <h1 className={styles.title}>Bolu'nun Sesli Belleği</h1>
                <p className={styles.subtitle}>
                    Kökez suyunun serinliğinden yayla rüzgarlarına, Bolu'nun unutulmaya yüz tutmuş hikayelerini yaşayan tanıklardan dinleyin.
                </p>

                <div className={styles.actions}>
                    <Link href="/kesfet" className={`btn btnSecondary ${styles.btnHero}`}>
                        <PlayCircle strokeWidth={1.5} />
                        Tanıklıkları Keşfet
                    </Link>
                    <Link href="/harita" className={`btn btnGhost ${styles.btnHero} ${styles.btnHeroGhost}`}>
                        <Map strokeWidth={1.5} />
                        Haritada Keşfet
                    </Link>
                    <Link href="/katki" className={`btn ${styles.btnHero} ${styles.btnHeroPrimary}`}>
                        <Mic strokeWidth={1.5} />
                        Hikayeni Paylaş
                    </Link>
                </div>
            </div>
        </section>
    );
}
