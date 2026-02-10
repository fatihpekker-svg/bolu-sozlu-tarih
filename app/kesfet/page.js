import { getStories } from "@/sanity/lib/queries";
import TestimonyGrid from "@/components/TestimonyGrid";
import { Suspense } from "react";

export const metadata = {
    title: "Keşfet | Sözlü Tarih Arşivi",
    description: "Arşivdeki tüm tanıklıkları filtreleyin ve keşfedin.",
};

export default async function ExplorePage() {
    const stories = await getStories();

    return (
        <Suspense fallback={<div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Yükleniyor...</div>}>
            <TestimonyGrid initialStories={stories} />
        </Suspense>
    );
}
