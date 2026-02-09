'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DistrictMap({ stories }) {
    const [hoveredDistrict, setHoveredDistrict] = useState(null);

    // Bolu Districts Stylized Data
    // Updated colors for better contrast (Mengen darker)
    const districts = [
        { id: 'Merkez', name: 'Merkez', path: 'M 250,200 L 350,180 L 400,250 L 350,320 L 250,300 L 200,250 Z', color: '#e63946' },
        { id: 'Mengen', name: 'Mengen', path: 'M 350,180 L 450,150 L 480,200 L 400,250 Z', color: '#a8dadc' }, // Darker than before (was #f1faee)
        { id: 'Gerede', name: 'Gerede', path: 'M 480,200 L 580,220 L 550,300 L 450,320 L 400,250 Z', color: '#457b9d' },
        { id: 'Yeniçağa', name: 'Yeniçağa', path: 'M 400,250 L 450,320 L 420,350 L 350,320 Z', color: '#1d3557' },
        { id: 'Dörtdivan', name: 'Dörtdivan', path: 'M 450,320 L 550,300 L 520,380 L 420,350 Z', color: '#2a9d8f' },
        { id: 'Mudurnu', name: 'Mudurnu', path: 'M 200,250 L 250,300 L 220,400 L 120,350 L 150,280 Z', color: '#e9c46a' },
        { id: 'Göynük', name: 'Göynük', path: 'M 150,280 L 120,350 L 50,320 L 80,220 Z', color: '#f4a261' },
        { id: 'Seben', name: 'Seben', path: 'M 250,300 L 350,320 L 320,420 L 220,400 Z', color: '#e76f51' },
        { id: 'Kıbrıscık', name: 'Kıbrıscık', path: 'M 350,320 L 420,350 L 380,450 L 320,420 Z', color: '#264653' },
    ];

    // Calculate story counts per district
    const districtCounts = districts.reduce((acc, district) => {
        acc[district.id] = stories.filter(s => s.location === district.id).length;
        return acc;
    }, {});

    return (
        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
            <svg viewBox="0 130 650 370" style={{ width: '100%', height: 'auto', dropShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
                {districts.map(district => {
                    const count = districtCounts[district.id] || 0;
                    const isHovered = hoveredDistrict === district.id;

                    return (
                        <Link href={`/kesfet?location=${district.id}`} key={district.id}>
                            <g
                                onMouseEnter={() => setHoveredDistrict(district.id)}
                                onMouseLeave={() => setHoveredDistrict(null)}
                                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                            >
                                <path
                                    d={district.path}
                                    fill={district.color}
                                    stroke="#fff"
                                    strokeWidth={isHovered ? 4 : 2}
                                    style={{
                                        opacity: isHovered ? 1 : 0.9,
                                        transition: 'all 0.3s ease',
                                        filter: isHovered ? 'brightness(1.1)' : 'none'
                                    }}
                                />

                                {/* Label */}
                                <text
                                    x={getCenter(district.path).x}
                                    y={getCenter(district.path).y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="#fff"
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '800',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                                        pointerEvents: 'none',
                                        userSelect: 'none'
                                    }}
                                >
                                    {district.name}
                                </text>

                                {/* Count Badge (only if > 0) */}
                                {count > 0 && (
                                    <g transform={`translate(${getCenter(district.path).x}, ${getCenter(district.path).y + 25})`}>
                                        <circle r="12" fill="#fff" />
                                        <text
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill="#333"
                                            fontSize="11px"
                                            fontWeight="bold"
                                            dy="1px"
                                        >
                                            {count}
                                        </text>
                                    </g>
                                )}
                            </g>
                        </Link>
                    );
                })}
            </svg>

            {/* Hover Tooltip / Interaction Hint */}
            <div style={{ textAlign: 'center', marginTop: '2rem', color: '#666', fontSize: '1.1rem' }}>
                {hoveredDistrict
                    ? <span><strong>{hoveredDistrict}</strong> ilçesindeki hikayeleri keşfetmek için tıklayın.</span>
                    : 'İlçelerin üzerine gelerek hikaye sayılarını görebilir, tıklayarak keşfedebilirsiniz.'}
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
