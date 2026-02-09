<?php get_header(); ?>

<div class="container section">
    <h1>
        <?php the_archive_title(); ?>
    </h1>

    <div class="story-grid">
        <?php if (have_posts()): ?>
        <?php while (have_posts()):
        the_post(); ?>
        <?php if (get_post_type() == 'story'): ?>
        <!-- Story Card Layout -->
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
                <h3 class="story-title">
                    <a href="<?php the_permalink(); ?>">
                        <?php the_title(); ?>
                    </a>
                </h3>
                <div class="story-excerpt">
                    <?php the_excerpt(); ?>
                </div>
                <a href="<?php the_permalink(); ?>" class="story-link">
                    Devamını Oku &rarr;
                </a>
            </div>
        </article>
        <?php
        else: ?>
        <!-- Standard Post Layout -->
        <article style="margin-bottom: 2rem;">
            <h2><a href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                </a></h2>
            <div style="margin-bottom: 1rem;">
                <?php the_excerpt(); ?>
            </div>
            <a href="<?php the_permalink(); ?>" class="btn btnOutline">Oku</a>
        </article>
        <?php
        endif; ?>
        <?php
    endwhile; ?>

        <div class="pagination">
            <?php the_posts_navigation(); ?>
        </div>

        <?php
else: ?>
        <p>İçerik bulunamadı.</p>
        <?php
endif; ?>
    </div>
</div>

<?php get_footer(); ?>