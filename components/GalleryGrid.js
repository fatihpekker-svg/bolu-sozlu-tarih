import styles from "./GalleryGrid.module.css";

export default function GalleryGrid() {
    // Dummy data for gallery
    const photos = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Tarihi Fotoğraf ${i + 1}`,
        year: 1950 + i * 2,
        location: "Bolu Merkez"
    }));

    return (
        <div className={styles.grid}>
            {photos.map((photo) => (
                <div key={photo.id} className={styles.item}>
                    {/* Placeholder Image */}
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.3)', fontWeight: 'bold', fontSize: '2rem' }}>
                        {photo.year}
                    </div>
                    <div className={styles.caption}>
                        <h3>{photo.title}</h3>
                        <p>{photo.location}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
