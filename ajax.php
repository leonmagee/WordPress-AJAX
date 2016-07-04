<?php
/**
 *  Add AJAX script only to specific pages
 */
function mm_wordpress_ajaxurl() {

	if ( is_page( 'my-page-slug' ) ) { ?>

		<script type="text/javascript">
			var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
		</script>

		<?php
	}
}
add_action( 'wp_head', 'mm_wordpress_ajaxurl' );


/**
 *  AJAX PHP Function
 */
function ajax_php_function() {

	if ( isset( $_POST['click_happened'] ) ) {

		$cpt_slug = $_POST['radio_value'];

		/**
		 * Query a CPT based on criteria
		 */
		$args = array( 'post_type' => 'cpt-name', 'name' => $cpt_slug );

		$cpt_query = new WP_Query( $args );

		while ( $cpt_query->have_posts() ) {

			$cpt_query->the_post();

			$custom_field_result = get_field( 'acf_field' );
		}

		/**
		 * Return data to AJAX Javascript
		 */
		die( $custom_field_result );
	}
}

/**
 *  Ajax Action Hooks - references name of JS action passed to formdata
 */
add_action( 'wp_ajax_mm_custom_ajax_hook_suffix', 'ajax_php_function' );
