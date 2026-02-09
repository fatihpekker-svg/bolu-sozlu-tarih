<?php get_header(); ?>

<!-- Hero Section -->
<section class="hero-section">
    <div class="hero-bg"></div>
    <div class="hero-content">
        <span class="hero-label">Bolu Sözlü Tarih Projesi</span>
        <h1 class="hero-title">Bolu'nun Sesli Belleği</h1>
        <p class="hero-subtitle">
            Kökez suyunun serinliğinden yayla rüzgarlarına, Bolu'nun unutulmaya yüz tutmuş hikayelerini yaşayan
            tanıklardan dinleyin.
        </p>

        <div class="hero-actions">
            <a href="/kesfet" class="btn btnSecondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    style="margin-right: 8px;">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                Tanıklıkları Keşfet
            </a>
            <a href="/harita" class="btn btnGhost">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    style="margin-right: 8px;">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" x2="9" y1="3" y2="18" />
                    <line x1="15" x2="15" y1="6" y2="21" />
                </svg>
                Haritada Keşfet
            </a>
            <a href="/katki" class="btn btnGhost">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    style="margin-right: 8px;">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
                Hikayeni Paylaş
            </a>
        </div>
    </div>
</section>

<!-- Featured Stories Section -->
<section class="section" style="background-color: #fff;">
    <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem;">
            <div>
                <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Öne Çıkan Tanıklıklar</h2>
                <p style="opacity: 0.8;">Editörlerimizin seçtiği etkileyici hikayeler</p>
            </div>
            <a href="/stories" class="btn btnOutline">
                Tümünü Gör <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    style="margin-left: 8px;">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                </svg>
            </a>
        </div>

        <div class="story-grid">
            <?php
$args = array(
    'post_type' => 'story',
    'posts_per_page' => 3,
);
$query = new WP_Query($args);

if ($query->have_posts()):
    while ($query->have_posts()):
        $query->the_post();
        $location = get_field('location');
        $interviewee = get_field('interviewee');
?>
            <article class="story-card">
                <div class="story-image-wrapper">
                    <?php if (has_post_thumbnail()): ?>
                    <?php the_post_thumbnail('medium_large'); ?>
                    <?php
        else: ?>
                    <div
                        style="width: 100%; height: 100%; background: #eee; display: flex; align-items: center; justify-content: center; color: #999;">
                        Görsel Yok</div>
                    <?php
        endif; ?>
                </div>
                <div class="story-content">
                    <div class="story-meta">
                        <?php echo esc_html($interviewee ? $interviewee : 'Tanık'); ?> •
                        <?php echo esc_html($location ? $location : 'Bolu'); ?>
                    </div>
                    <h3 class="story-title">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_title(); ?>
                        </a>
                    </h3>
                    <div class="story-excerpt">
                        <?php the_excerpt(); ?>
                    </div>
                    <a href="<?php the_permalink(); ?>" class="story-link">
                        Devamını Oku <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </article>
            <?php
    endwhile;
    wp_reset_postdata();
else:
?>
            <p>Henüz hikaye eklenmemiş.</p>
            <?php
endif; ?>
        </div>
    </div>
</section>

<!-- Map Teaser -->
<section class="section" style="background-color: var(--color-primary); color: #fff;">
    <div class="container" style="text-align: center; max-width: 800px;">
        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: #fff;">Bolu'nun İlçelerindeki Hikayeleri Keşfedin
        </h2>
        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; color: #fff; opacity: 0.9;">
            Mengen'den Göynük'e, Gerede'den Mudurnu'ya... Bolu'nun dört bir yanından toplanmış tanıklıklara harita
            üzerinden ulaşın.
            Kendi ilçenizdeki veya köyünüzdeki sözlü tarih kayıtlarını dinleyin, yerel hafızaya dokunun.
        </p>
        <a href="/harita" class="btn btnSecondary" style="font-size: 1.1rem; padding: 1rem 3rem;">
            Haritada Keşfet
        </a>
    </div>
</section>

<?php get_footer(); ?>