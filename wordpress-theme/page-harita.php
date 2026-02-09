<?php
/*
 Template Name: Harita Sayfası
 */
get_header();

$districts = [
    ['id' => 'Merkez', 'name' => 'Merkez', 'path' => 'M 250,200 L 350,180 L 400,250 L 350,320 L 250,300 L 200,250 Z', 'color' => '#e63946'],
    ['id' => 'Mengen', 'name' => 'Mengen', 'path' => 'M 350,180 L 450,150 L 480,200 L 400,250 Z', 'color' => '#a8dadc'],
    ['id' => 'Gerede', 'name' => 'Gerede', 'path' => 'M 480,200 L 580,220 L 550,300 L 450,320 L 400,250 Z', 'color' => '#457b9d'],
    ['id' => 'Yeniçağa', 'name' => 'Yeniçağa', 'path' => 'M 400,250 L 450,320 L 420,350 L 350,320 Z', 'color' => '#1d3557'],
    ['id' => 'Dörtdivan', 'name' => 'Dörtdivan', 'path' => 'M 450,320 L 550,300 L 520,380 L 420,350 Z', 'color' => '#2a9d8f'],
    ['id' => 'Mudurnu', 'name' => 'Mudurnu', 'path' => 'M 200,250 L 250,300 L 220,400 L 120,350 L 150,280 Z', 'color' => '#e9c46a'],
    ['id' => 'Göynük', 'name' => 'Göynük', 'path' => 'M 150,280 L 120,350 L 50,320 L 80,220 Z', 'color' => '#f4a261'],
    ['id' => 'Seben', 'name' => 'Seben', 'path' => 'M 250,300 L 350,320 L 320,420 L 220,400 Z', 'color' => '#e76f51'],
    ['id' => 'Kıbrıscık', 'name' => 'Kıbrıscık', 'path' => 'M 350,320 L 420,350 L 380,450 L 320,420 Z', 'color' => '#264653'],
];

function get_polygon_center($path)
{
    preg_match_all('/([\d.]+),([\d.]+)/', $path, $matches);
    $x_coords = $matches[1];
    $y_coords = $matches[2];
    $count = count($x_coords);
    if ($count === 0)
        return ['x' => 0, 'y' => 0];
    $avg_x = array_sum($x_coords) / $count;
    $avg_y = array_sum($y_coords) / $count;
    return ['x' => $avg_x, 'y' => $avg_y];
}
?>

<div class="container" style="padding: 3rem 0;">
    <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="margin-bottom: 1rem; font-size: 2.5rem;">Sözlü Tarih Haritası</h1>
        <p style="max-width: 600px; margin: 0 auto; line-height: 1.6; color: #666;">
            Bolu'nun ilçelerine tıklayarak o bölgeden derlenen hikayeleri keşfedin.
        </p>
    </div>

    <div style="width: 100%; max-width: 800px; margin: 0 auto; position: relative;">
        <svg viewBox="0 130 650 370"
            style="width: 100%; height: auto; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));">
            <?php foreach ($districts as $district):
    $center = get_polygon_center($district['path']);
?>
            <a href="/?post_type=story&meta_key=location&meta_value=<?php echo urlencode($district['id']); ?>"
                class="district-link" data-id="<?php echo esc_attr($district['id']); ?>">
                <g class="district-group" style="cursor: pointer; transition: all 0.3s ease;"
                    onmouseover="this.querySelector('path').style.opacity=1; this.querySelector('path').style.strokeWidth=4; this.querySelector('path').style.filter='brightness(1.1)';"
                    onmouseout="this.querySelector('path').style.opacity=0.9; this.querySelector('path').style.strokeWidth=2; this.querySelector('path').style.filter='none';">
                    <path d="<?php echo esc_attr($district['path']); ?>"
                        fill="<?php echo esc_attr($district['color']); ?>" stroke="#fff" stroke-width="2"
                        style="opacity: 0.9; transition: all 0.3s ease;" />
                    <text x="<?php echo $center['x']; ?>" y="<?php echo $center['y']; ?>" text-anchor="middle"
                        dominant-baseline="middle" fill="#fff"
                        style="font-size: 16px; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.6); pointer-events: none; user-select: none;">
                        <?php echo esc_html($district['name']); ?>
                    </text>
                </g>
            </a>
            <?php
endforeach; ?>
        </svg>

        <div id="map-tooltip"
            style="text-align: center; margin-top: 2rem; color: #666; font-size: 1.1rem; min-height: 1.5em;">
            İlçelerin üzerine gelerek keşfetmek için tıklayın.
        </div>
    </div>
</div>

<script>
    document.querySelectorAll('.district-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            const id = this.getAttribute('data-id');
            document.getElementById('map-tooltip').innerHTML = '<span><strong>' + id + '</strong> ilçesindeki hikayeleri keşfetmek için tıklayın.</span>';
        });
        link.addEventListener('mouseleave', function () {
            document.getElementById('map-tooltip').innerText = 'İlçelerin üzerine gelerek keşfetmek için tıklayın.';
        });
    });
</script>

<?php get_footer(); ?>