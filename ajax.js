jQuery(function ($) {

    /**
     * Trigger AJAX with radio button select
     * Use `.click()` for a standard button
     */
    $('.wrapper-class input[type="radio"]')
        .change(function () {
            if ($(this).is(":checked")) {
                var radio_value = $(this).val();

                var formdata = new FormData();

                /**
                 * Attach data - this will be accessible in php
                 * as `$_POST['radio_value']`
                 */
                formdata.append("radio_value", radio_value);

                /**
                 * Assign a random value to $_POST, this can be
                 * used as a boolean check
                 */
                formdata.append("click_happened", 'click');

                /**
                 * Define action - this is very important - it will be used as the suffix
                 * for the action hook:
                 * `wp_ajax_mm_custom_ajax_hook_suffix`
                 */
                formdata.append("action", "mm_custom_ajax_hook_suffix");

                $.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: formdata,
                    contentType: false,
                    processData: false,
                    success: function (data, textStatus, XMLHttpRequest) {
                        /**
                         * Log the returned data
                         */
                        console.log(data);

                        /**
                         * Use data to modify value of hidden field
                         */
                        $('input#field_id').val(data);

                    },
                    error: function (MLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });

            }
        });
});