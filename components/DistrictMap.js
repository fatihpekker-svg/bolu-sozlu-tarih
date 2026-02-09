'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DistrictMap({ stories }) {
    const [hoveredDistrict, setHoveredDistrict] = useState(null);

    // Bolu Districts Stylized Data
    // These paths are schematic representations, roughly recreating the layout of Bolu districts.
    // They are not geographically perfect but topologically correct for a stylized map.
    const districts = [
        { id: 'Merkez', name: 'Merkez', path: 'M 250,200 L 350,180 L 400,250 L 350,320 L 250,300 L 200,250 Z', color: '#e63946' }, // Center
        { id: 'Mengen', name: 'Mengen', path: 'M 350,180 L 450,150 L 480,200 L 400,250 Z', color: '#f1faee' }, // North East
        { id: 'Gerede', name: 'Gerede', path: 'M 480,200 L 580,220 L 550,300 L 450,320 L 400,250 Z', color: '#a8dadc' }, // East
        { id: 'Yeniçağa', name: 'Yeniçağa', path: 'M 400,250 L 450,320 L 420,350 L 350,320 Z', color: '#457b9d' }, // Small, between Merkez/Gerede
        { id: 'Dörtdivan', name: 'Dörtdivan', path: 'M 450,320 L 550,300 L 520,380 L 420,350 Z', color: '#1d3557' }, // South East
        { id: 'Mudurnu', name: 'Mudurnu', path: 'M 200,250 L 250,300 L 220,400 L 120,350 L 150,280 Z', color: '#2a9d8f' }, // South West
        { id: 'Göynük', name: 'Göynük', path: 'M 150,280 L 120,350 L 50,320 L 80,220 Z', color: '#e9c46a' }, // West
        { id: 'Seben', name: 'Seben', path: 'M 250,300 L 350,320 L 320,420 L 220,400 Z', color: '#f4a261' }, // South
        { id: 'Kıbrıscık', name: 'Kıbrıscık', path: 'M 350,320 L 420,350 L 380,450 L 320,420 Z', color: '#e76f51' }, // South
    ];

    // Calculate story counts per district
    const districtCounts = districts.reduce((acc, district) => {
        acc[district.id] = stories.filter(s => s.location === district.id).length;
        return acc;
    }, {});

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <svg viewBox="0 0 650 500" style={{ width: '100%', height: 'auto', dropShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                {districts.map(district => {
                    const count = districtCounts[district.id] || 0;
                    const isHovered = hoveredDistrict === district.id;

                    return (
                        <g
                            key={district.id}
                            onMouseEnter={() => setHoveredDistrict(district.id)}
                            onMouseLeave={() => setHoveredDistrict(null)}
                            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                        >
                            <path
                                d={district.path}
                                fill={district.color}
                                stroke="#fff"
                                strokeWidth={isHovered ? 3 : 2}
                                style={{ opacity: isHovered ? 1 : 0.85, transition: 'all 0.3s ease' }}
                            />

                            {/* Label */}
                            <text
                                x={getCenter(district.path).x}
                                y={getCenter(district.path).y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#fff"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                                    pointerEvents: 'none'
                                }}
                            >
                                {district.name}
                            </text>

                            {/* Count Badge (only if > 0) */}
                            {count > 0 && (
                                <g transform={`translate(${getCenter(district.path).x}, ${getCenter(district.path).y + 20})`}>
                                    <circle r="10" fill="#fff" />
                                    <text textAnchor="middle" dominantBaseline="middle" fill="#333" fontSize="10px" fontWeight="bold">
                                        {count}
                                    </text>
                                </g>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Hover Tooltip / Interaction Hint */}
            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontStyle: 'italic' }}>
                {hoveredDistrict
                    ? `${hoveredDistrict} ilçesindeki hikayeleri görüntülemek için tıklayın (Yakında)`
                    : 'İlçelerin üzerine gelerek hikaye sayılarını görebilirsiniz.'}
            </div>
        </div>
    );
}

// Helper to estimate center of a polygon (centroid approximation)
function getCenter(pathData) {
    // Very rough approximation based on parsing M and L commands
    const points = pathData.match(/[\d.]+,[\d.]+/g).map(p => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
    });

    const x = points.reduce((s, p) => s + p.x, 0) / points.length;
    const y = points.reduce((s, p) => s + p.y, 0) / points.length;
    return { x, y };
}
