"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import styles from "./FilterPanel.module.css";

function FilterGroup({ title, options, selectedValues, onToggle }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={styles.group}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                {title}
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
                <div className={styles.options}>
                    {options.map((opt, i) => (
                        <label key={i} className={styles.label}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={selectedValues.includes(opt.value)}
                                onChange={() => onToggle(opt.value)}
                            />
                            {opt.label}
                            {/* Count removed for now as it requires complex calculation */}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FilterPanel({ selectedLocation, onLocationChange }) {
    // Dynamic generation from data or hardcoded for now
    const locations = [
        { label: "Merkez", value: "Merkez" },
        { label: "Mengen", value: "Mengen" },
        { label: "Gerede", value: "Gerede" },
        { label: "Mudurnu", value: "Mudurnu" },
        { label: "Göynük", value: "Göynük" },
        { label: "Yeniçağa", value: "Yeniçağa" },
        { label: "Dörtdivan", value: "Dörtdivan" },
        { label: "Seben", value: "Seben" },
        { label: "Kıbrıscık", value: "Kıbrıscık" },
    ];

    const toggleLocation = (value) => {
        if (selectedLocation.includes(value)) {
            onLocationChange(selectedLocation.filter(l => l !== value));
        } else {
            onLocationChange([...selectedLocation, value]);
        }
    };

    return (
        <div className={styles.panel}>
            <FilterGroup
                title="İlçe / Konum"
                options={locations}
                selectedValues={selectedLocation}
                onToggle={toggleLocation}
            />
            {/* Add more filters here later (e.g. Decades) */}
        </div>
    );
}
