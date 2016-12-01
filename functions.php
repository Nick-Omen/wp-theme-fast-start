<?php
/**
 * File for custom functions.
 *
 * Author: Nikita Nikitin <nikita.omen666@gmail.com>
 * Author URI: http://www.nick-omen.com/
 */

define('TEMPLATE_NAME', 'custom_template');

function add_theme_styles()
{
    wp_enqueue_style(TEMPLATE_NAME . '_styles', get_template_directory_uri() . '/dist/styles.css',
        null, '1.0.0', 'all');
}

function add_theme_scripts()
{
    wp_enqueue_script(TEMPLATE_NAME . '_scripts', get_template_directory_uri() . '/dist/scripts.js',
        array( 'jquery' ), '1.0.0', true);
}

if (!function_exists('theme_setup')) :
    function theme_setup()
    {

        load_theme_textdomain(TEMPLATE_NAME);

        add_action('wp_enqueue_scripts', 'add_theme_styles');
        add_action('wp_enqueue_scripts', 'add_theme_scripts');

        register_nav_menus(array(
            'header' => __('Header menu', TEMPLATE_NAME),
            'footer' => __('Footer menu', TEMPLATE_NAME),
        ));

    } endif;

theme_setup();
