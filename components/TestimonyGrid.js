"use client";

import { useState, useMemo } from "react";
import FilterPanel from "@/components/FilterPanel";
import TestimonyCard from "@/components/TestimonyCard";
import { Search, ChevronDown, Filter } from "lucide-react";

export default function TestimonyGrid({ initialStories }) {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filter Logic
    const filteredStories = useMemo(() => {
        return initialStories.filter(story => {
            // Location Filter
            if (selectedLocations.length > 0) {
                // If story has no location, exclude it. Or if it has location but not in selected list.
                // Assuming story.location is a string "Bolu - Merkez" or just "Merkez"
                // We check if the location string includes any of the selected locations
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
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', gap: '3rem', position: 'relative' }}>

                {/* Sidebar */}
                <div style={{ width: '280px', flexShrink: 0 }} className={`desktop-sidebar ${showMobileFilters ? 'mobile-visible' : ''}`}>
                    <div className="mobile-filter-header" style={{ display: 'none' }}> {/* Add logic for mobile header if needed */}</div>
                    <FilterPanel
                        selectedLocation={selectedLocations}
                        onLocationChange={setSelectedLocations}
                    />
                </div>

                {/* Main Content */}
                <div style={{ flex: 1 }}>
                    {/* Top Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tüm Tanıklıklar</h1>
                            <p style={{ opacity: 0.7 }}>{filteredStories.length} sonuç gösteriliyor</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Arşivde ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ padding: '0.75rem 1rem', paddingLeft: '2.5rem', borderRadius: '4px', border: '1px solid var(--color-border)', minWidth: '250px' }}
                                />
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                            </div>
                            <button className="btn btnOutline" style={{ padding: '0.75rem 1rem' }}>
                                Sıralama: Yeniden Eskiye <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        className="btn btnSecondary mobile-filter-btn"
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        style={{ width: '100%', marginBottom: '1.5rem', justifyContent: 'center' }}
                    >
                        <Filter size={18} style={{ marginRight: '8px' }} /> Filtrele
                    </button>

                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
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
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                                <p>Arama kriterlerinize uygun hikaye bulunamadı.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Simple CSS for mobile toggle roughly implemented inline or assumed in globals */}
            <style jsx global>{`
                @media (max-width: 768px) {
                    .desktop-sidebar {
                        display: none;
                        position: fixed;
                        top: 0; left: 0; bottom: 0;
                        background: white;
                        z-index: 100;
                        padding: 2rem;
                        box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                        overflow-y: auto;
                    }
                    .desktop-sidebar.mobile-visible {
                        display: block;
                        width: 80%;
                    }
                    .mobile-filter-btn {
                        display: flex;
                    }
                }
                @media (min-width: 769px) {
                    .mobile-filter-btn {
                        display: none !important;
                    }
                    .desktop-sidebar {
                        display: block !important;
                    }
                }
            `}</style>
        </div>
    );
}
