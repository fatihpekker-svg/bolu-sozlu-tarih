import { getStories } from "@/sanity/lib/queries";
import TestimonyGrid from "@/components/TestimonyGrid";

export const metadata = {
    title: "Keşfet | Sözlü Tarih Arşivi",
    description: "Arşivdeki tüm tanıklıkları filtreleyin ve keşfedin.",
};

export default async function ExplorePage() {
    const stories = await getStories();

    return <TestimonyGrid initialStories={stories} />;
}
