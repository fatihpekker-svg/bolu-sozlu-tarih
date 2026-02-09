import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
    title: "Fotoğraf Galerisi | Bolu Sözlü Tarih Projesi",
    description: "Bolu'nun geçmişinden kareler, aile albümleri ve tarihi belgeler.",
};

export default function GalleryPage() {
    return (
        <div className="container section">
            <h1 className="title">Fotoğraf Galerisi</h1>
            <p className="subtitle">Geçmişin izlerini taşıyan kareler.</p>

            <GalleryGrid />
        </div>
    );
}
