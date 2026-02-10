"use client";
import { Link } from "next/link";

export default function DebugCard({ title, slug }) {
    return (
        <div style={{ padding: '1rem', border: '1px solid red' }}>
            <h3>{title}</h3>
            <p>Slug: {slug}</p>
        </div>
    );
}
