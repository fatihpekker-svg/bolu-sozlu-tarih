<?php get_header(); ?>

<div class="container single-story-container">
    <div class="single-story-inner">
        <?php
while (have_posts()):
    the_post();
    $interviewee = get_field('interviewee');
    $date = get_field('date'); // Assuming ACF Date Picker or Text
    $location = get_field('location');
    $youtube_url = get_field('youtube_url');
    $audio_file = get_field('audio_file'); // Assuming File Object or URL
?>
        <h1 class="single-story-title">
            <?php the_title(); ?>
        </h1>

        <div class="single-story-meta">
            <?php echo esc_html($interviewee ? $interviewee : 'Tanık'); ?>
            <?php if ($date)
        echo ' • ' . esc_html($date); ?>
            <?php if ($location)
        echo ' • ' . esc_html($location); ?>
        </div>

        <?php if ($youtube_url):
        // Extract video ID logic
        preg_match('/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/', $youtube_url, $matches);
        $video_id = (isset($matches[2]) && strlen($matches[2]) == 11) ? $matches[2] : null;
?>
        <?php if ($video_id): ?>
        <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/<?php echo esc_attr($video_id); ?>" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <?php
        endif; ?>

        <?php
    elseif (has_post_thumbnail()): ?>
        <div class="single-story-image">
            <?php the_post_thumbnail('large'); ?>
        </div>
        <?php
    endif; ?>

        <?php if ($audio_file): ?>
        <div class="audio-player">
            <h3 style="margin-bottom: 1rem;">Ses Kaydını Dinle</h3>
            <audio controls style="width: 100%;">
                <source src="<?php echo esc_url($audio_file); ?>" type="audio/mpeg">
                Tarayıcınız ses elementini desteklemiyor.
            </audio>
        </div>
        <?php
    endif; ?>

        <div class="prose">
            <?php the_content(); ?>
        </div>

        <?php
endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>