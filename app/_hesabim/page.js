"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getStoriesByIds } from "@/sanity/lib/queries";
// import TestimonyCard from "@/components/TestimonyCard";
import styles from "./profile.module.css";

export default function ProfilePage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [dbProfile, setDbProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [favoriteStories, setFavoriteStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (isSignedIn && user) {
                setLoading(true);

                // 1. Get profile
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (profileData) setDbProfile(profileData);

                // 2. Get favorites IDs
                const { data: favData } = await supabase
                    .from("favorites")
                    .select("story_id")
                    .eq("user_id", user.id);

                if (favData) {
                    const ids = favData.map(f => f.story_id);
                    setFavorites(ids);

                    // 3. Get story details from Sanity
                    if (ids.length > 0) {
                        const stories = await getStoriesByIds(ids);
                        setFavoriteStories(stories);
                    }
                }

                setLoading(false);
            }
        }

        if (isLoaded) {
            loadData();
        }
    }, [isLoaded, isSignedIn, user]);

    if (!isLoaded || loading) {
        return (
            <div className="container py-20 text-center">
                <div className="loadingSpinner">Yükleniyor...</div>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="container py-20 text-center">
                <h2>Lütfen önce giriş yapın.</h2>
            </div>
        );
    }

    /*
    return (
        <div className={`container py-16 ${styles.profileContainer}`}>
            <div className={styles.header}>
                <img src={user.imageUrl} alt="Avatar" className={styles.avatar} />
                <div>
                    <h1>Hoş Geldin, {user.firstName || user.fullName}!</h1>
                    <p className={styles.email}>{user.primaryEmailAddress?.emailAddress}</p>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Koleksiyonum</h3>
                    <p>{favorites.length} Hikaye</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Profil Durumu</h3>
                    <p>{dbProfile ? "Aktif" : "Yeni"}</p>
                </div>
            </div>

            <div className={styles.favoritesSection}>
                <h2 className={styles.sectionTitle}>Favori Hikayelerim</h2>
                {favoriteStories.length > 0 ? (
                    <div className={styles.storiesGrid}>
                        {favoriteStories.map(story => (
                            <TestimonyCard
                                key={story._id}
                                id={story._id}
                                title={story.title}
                                narrator={story.interviewee}
                                date={story.date}
                                location={story.location}
                                slug={story.slug}
                                imageUrl={story.imageUrl}
                                youtubeUrl={story.youtubeUrl}
                                type={story.youtubeUrl ? "video" : "text"}
                                isFavorited={true}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyFavorites}>
                        <p>Henüz favori hikayeniz bulunmuyor. Keşfet sayfasından beğendiğiniz hikayeleri buraya ekleyebilirsiniz.</p>
                    </div>
                )}
            </div>
        </div>
    );
    */
    return (
        <div className="container py-20 text-center">
            <h1>Profil Sayfası Bakımda</h1>
            <p>Static export testi için geçici olarak devre dışı bırakıldı.</p>
        </div>
    );
}
