<?php
$video_id   = isset( $attributes['videoId'] )    ? sanitize_text_field( $attributes['videoId'] )    : '';
$aspect     = isset( $attributes['aspectRatio'] ) ? sanitize_text_field( $attributes['aspectRatio'] ) : '16/9';
$title      = isset( $attributes['title'] )       ? sanitize_text_field( $attributes['title'] )       : 'Vidéo PodEduc';
$show_cap   = isset( $attributes['showCaption'] ) ? (bool) $attributes['showCaption']                 : false;
$caption    = isset( $attributes['caption'] )     ? $attributes['caption']                             : '';

if ( ! $video_id ) return;

$embed_url = 'https://podeduc.apps.education.fr/video/' . rawurlencode( $video_id ) . '/?is_iframe=true';
$wrapper   = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper; ?>>
	<figure style="margin:0;display:block;width:100%;aspect-ratio:<?php echo esc_attr( $aspect ); ?>;overflow:hidden;">
		<iframe
			src="<?php echo esc_url( $embed_url ); ?>"
			title="<?php echo esc_attr( $title ); ?>"
			allowfullscreen
			allow="autoplay; encrypted-media; picture-in-picture"
			loading="lazy"
			style="display:block;width:100%;height:100%;border:0;"
		></iframe>
		<?php if ( $show_cap && $caption ) : ?>
		<figcaption style="text-align:center;font-style:italic;margin-top:0.5em;">
			<?php echo wp_kses_post( $caption ); ?>
		</figcaption>
		<?php endif; ?>
	</figure>
</div>
