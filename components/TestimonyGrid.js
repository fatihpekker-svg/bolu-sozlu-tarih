"use client";

import { useState, useMemo, useEffect } from "react";
import FilterPanel from "@/components/FilterPanel";
import TestimonyCard from "@/components/TestimonyCard";
import { Search, ChevronDown, Filter } from "lucide-react";
import styles from "./TestimonyGrid.module.css";
import { useSearchParams } from "next/navigation";

export default function TestimonyGrid({ initialStories }) {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || "";

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Update state if URL param changes (e.g. searching from header while already on page)
    useEffect(() => {
        const query = searchParams.get('q');
        if (query !== null) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    // Filter Logic
    const filteredStories = useMemo(() => {
        return initialStories.filter(story => {
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
    }, [initialStories, selectedLocations, searchQuery]);

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
                        <p>{filteredStories.length} sonuç gösteriliyor</p>
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
                        <button className={`btn btnOutline ${styles.sortBtn}`}>
                            Sıralama: Yeniden Eskiye <ChevronDown size={16} />
                        </button>
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
                    {filteredStories.length > 0 ? (
                        filteredStories.map(story => (
                            <TestimonyCard
                                key={story._id}
                                title={story.title}
                                narrator={story.interviewee}
                                date={story.date}
                                location={story.location}
                                slug={story.slug}
                                imageUrl={story.imageUrl}
                                youtubeUrl={story.youtubeUrl}
                                type={story.youtubeUrl ? "video" : (story.audioUrl ? "audio" : "text")}
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
