<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="container header-inner">
        <!-- Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="logo-area">
            <span class="logo-text">Bolu Sözlü Tarih</span>
        </a>

        <!-- Desktop Nav -->
        <nav class="main-navigation">
            <?php
wp_nav_menu(array(
    'theme_location' => 'menu-1',
    'menu_id' => 'primary-menu',
    'container' => false,
    'menu_class' => 'nav-menu',
    'fallback_cb' => false, // Fallback to nothing if no menu assigned
));
?>
        </nav>

        <!-- Desktop Actions -->
        <div class="header-actions">
            <button class="icon-btn" aria-label="Arama">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <a href="/giris" class="icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </a>
            <a href="/katki" class="btn btnPrimary authBtn">
                Katkıda Bulun
            </a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" id="mobile-menu-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu-overlay" style="display: none; position: fixed; inset: 0; background: var(--color-background); z-index: 200; padding: 2rem; flex-direction: column; gap: 2rem;">
        <div style="display: flex; justify-content: flex-end;">
            <button id="mobile-menu-close" style="background: none; border: none; color: var(--color-primary);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
        <nav style="display: flex; flex-direction: column; gap: 1.5rem; font-size: 1.5rem; font-weight: 500;">
            <?php
wp_nav_menu(array(
    'theme_location' => 'menu-1',
    'container' => false,
    'menu_class' => 'mobile-nav-list',
));
?>
            <a href="/katki" style="color: var(--color-secondary);">Katkıda Bulun</a>
        </nav>
    </div>

    <script>
        document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
            document.getElementById('mobile-menu-overlay').style.display = 'flex';
        });
        document.getElementById('mobile-menu-close').addEventListener('click', function() {
            document.getElementById('mobile-menu-overlay').style.display = 'none';
        });
    </script>
</header>
