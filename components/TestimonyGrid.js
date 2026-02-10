"use client";

import { useState, useMemo, useEffect } from "react";
import FilterPanel from "@/components/FilterPanel";
import TestimonyCard from "@/components/TestimonyCard";
import { Search, ChevronDown, Filter } from "lucide-react";
import styles from "./TestimonyGrid.module.css";
import { useSearchParams } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";

export default function TestimonyGrid({ initialStories }) {
    const searchParams = useSearchParams();
    // const { isLoaded, isSignedIn, user } = useUser();

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [userFavorites, setUserFavorites] = useState([]);
    const [sortBy, setSortBy] = useState("newest"); // newest, oldest, az, za

    // Fetch user favorites
    /*
    useEffect(() => {
        async function fetchFavorites() {
            if (isSignedIn && user) {
                const { data, error } = await supabase
                    .from('favorites')
                    .select('story_id')
                    .eq('user_id', user.id);

                if (!error && data) {
                    setUserFavorites(data.map(f => f.story_id));
                }
            }
        }
        if (isLoaded) {
            fetchFavorites();
        }
    }, [isLoaded, isSignedIn, user]);
    */

    // Update state if URL param changes
    useEffect(() => {
        const query = searchParams.get('q');
        if (query !== null) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    // Filter & Sort Logic
    const processedStories = useMemo(() => {
        let result = initialStories.filter(story => {
            // Location Filter
            if (selectedLocations.length > 0) {
                const locationMatch = story.location && selectedLocations.some(loc => story.location.includes(loc));
                if (!locationMatch) return false;
            }

            // Search Filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const titleMatch = story.title?.toLowerCase().includes(query);
                const narratorMatch = story.interviewee?.toLowerCase().includes(query);
                if (!titleMatch && !narratorMatch) return false;
            }

            return true;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.date || 0) - new Date(a.date || 0);
            }
            if (sortBy === "oldest") {
                return new Date(a.date || 0) - new Date(b.date || 0);
            }
            if (sortBy === "az") {
                return (a.title || "").localeCompare(b.title || "", 'tr');
            }
            if (sortBy === "za") {
                return (b.title || "").localeCompare(a.title || "", 'tr');
            }
            return 0;
        });

        return result;
    }, [initialStories, selectedLocations, searchQuery, sortBy]);

    const sortOptions = {
        newest: "Yeniden Eskiye",
        oldest: "Eskiden Yeniye",
        az: "A'dan Z'ye",
        za: "Z'den A'ye"
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <div className={`${styles.sidebar} ${showMobileFilters ? styles.mobileVisible : ''}`}>
                <FilterPanel
                    selectedLocation={selectedLocations}
                    onLocationChange={setSelectedLocations}
                />
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Top Bar */}
                <div className={styles.topBar}>
                    <div className={styles.header}>
                        <h1>Tüm Tanıklıklar</h1>
                        <p>{processedStories.length} sonuç gösteriliyor</p>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Arşivde ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                            <Search size={18} className={styles.searchIcon} />
                        </div>

                        <div className={styles.sortWrapper}>
                            <select
                                className={styles.sortSelect}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {Object.entries(sortOptions).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className={styles.sortIcon} />
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                    className={`btn btnSecondary ${styles.mobileFilterBtn}`}
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                    <Filter size={18} /> {showMobileFilters ? 'Filtreleri Gizle' : 'Filtrele'}
                </button>

                {/* Grid */}
                <div className={styles.grid}>
                    {processedStories.length > 0 ? (
                        processedStories.map(story => (
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
                                type={story.youtubeUrl ? "video" : (story.audioUrl ? "audio" : "text")}
                                isFavorited={userFavorites.includes(story._id)}
                            />
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Arama kriterlerinize uygun hikaye bulunamadı.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
