import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import CollectionGrid from "@/components/CollectionGrid";
import StoryCard from "@/components/StoryCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStories } from "@/sanity/lib/queries";

export default async function Home() {
  const stories = await getStories();

  return (
    <>
      <Hero />
      <StatsBand />

      {/* Featured Stories Section */}
      <section className="section" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Öne Çıkan Tanıklıklar</h2>
              <p style={{ opacity: 0.8 }}>Editörlerimizin seçtiği etkileyici hikayeler</p>
            </div>
            <Link href="/explore" className="btn btnOutline">
              Tümünü Gör <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {stories.length > 0 ? (
              stories.map((story) => (
                <StoryCard
                  key={story._id}
                  title={story.title}
                  interviewee={story.interviewee}
                  date={story.date}
                  excerpt={story.excerpt}
                  slug={story.slug}
                  imageUrl={story.imageUrl}
                  location={story.location}
                  youtubeUrl={story.youtubeUrl}
                />
              ))
            ) : (
              <p>Henüz hikaye eklenmemiş.</p>
            )}
          </div>
        </div>
      </section>

      <CollectionGrid />

      {/* Newsletter / Map Teaser Layout */}
      <section className="section" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>Bolu'nun İlçelerindeki Hikayeleri Keşfedin</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', color: '#fff', opacity: 0.9 }}>
              Mengen'den Göynük'e, Gerede'den Mudurnu'ya... Bolu'nun dört bir yanından toplanmış tanıklıklara harita üzerinden ulaşın.
              Kendi ilçenizdeki veya köyünüzdeki sözlü tarih kayıtlarını dinleyin, yerel hafızaya dokunun.
            </p>
            <Link href="/map" className="btn btnSecondary" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>
              Haritada Keşfet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
