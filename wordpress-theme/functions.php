<?php
/**
 * Bolu Sözlü Tarih functions and definitions
 */

if ( ! function_exists( 'bolusozlutarih_setup' ) ) :
	function bolusozlutarih_setup() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails on posts and pages.
		add_theme_support( 'post-thumbnails' );

		// Register Navigation Menus
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'bolusozlutarih' ),
            'footer-menu' => esc_html__( 'Footer Menu', 'bolusozlutarih' ),
		) );

		// Switch default core markup for search form, comment form, and comments to output valid HTML5.
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );
	}
endif;
add_action( 'after_setup_theme', 'bolusozlutarih_setup' );

/**
 * Enqueue scripts and styles.
 */
function bolusozlutarih_scripts() {
	wp_enqueue_style( 'bolusozlutarih-style', get_stylesheet_uri() );
    
    // Custom scripts can be added here
    // wp_enqueue_script( 'bolusozlutarih-script', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'bolusozlutarih_scripts' );

/**
 * Register Custom Post Types (Must match Sanity Schema)
 */
function bolusozlutarih_register_cpt() {
    // Stories (Tanıklıklar)
    $labels = array(
        'name'                  => _x( 'Hikayeler', 'Post Type General Name', 'bolusozlutarih' ),
        'singular_name'         => _x( 'Hikaye', 'Post Type Singular Name', 'bolusozlutarih' ),
        'menu_name'             => __( 'Hikayeler', 'bolusozlutarih' ),
        'all_items'             => __( 'Tüm Hikayeler', 'bolusozlutarih' ),
        'add_new_item'          => __( 'Yeni Hikaye Ekle', 'bolusozlutarih' ),
        'add_new'               => __( 'Yeni Ekle', 'bolusozlutarih' ),
    );
    $args = array(
        'label'                 => __( 'Hikaye', 'bolusozlutarih' ),
        'description'           => __( 'Sözlü tarih tanıklıkları', 'bolusozlutarih' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'taxonomies'            => array( 'category', 'post_tag' ), // İlçe için kategori kullanılabilir veya ayrı taksonomi yapılabilir
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-microphone',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'rewrite'               => array('slug' => 'stories'),
    );
    register_post_type( 'story', $args );
}
add_action( 'init', 'bolusozlutarih_register_cpt', 0 );
