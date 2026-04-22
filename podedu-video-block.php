<?php
/**
 * Plugin Name: PodEduc - Intégration de vidéo (plugin non-officiel)
 * Plugin URI:  https://github.com/mlebrun40/PodEducForWordPress
 * Description: Ajoute un bloc Gutenberg pour intégrer des vidéos PodEduc.
 * Version:     1.3
 * Author:      Maxence LEBRUN
 * Author URI:  https://github.com/mlebrun40/PodEducForWordPress
 * License:     GPL-2.0-or-later
 * Text Domain: podeduc-video-block
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function () {
	register_block_type( __DIR__ . '/build' );
} );
