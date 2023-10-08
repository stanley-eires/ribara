( function ( $ ) {

    'use strict';

    function initMetisMenu() {
        //metis menu
        $( "#side-menu" ).metisMenu();
    }

    function initLeftMenuCollapse() {
        $( '.vertical-menu-btn' ).on( 'click', function ( event ) {
            event.preventDefault();
            $( 'body' ).toggleClass( 'sidebar-enable' );
            if ( $( window ).width() >= 992 ) {
                $( 'body' ).toggleClass( 'vertical-collpsed' );
            } else {
                $( 'body' ).removeClass( 'vertical-collpsed' );
            }
        } );
    }


    function initMenuItemScroll() {
        // focus active menu in left sidebar
        $( document ).ready( function () {
            if ( $( "#sidebar-menu" ).length > 0 && $( "#sidebar-menu .mm-active .active" ).length > 0 ) {
                var activeMenu = $( "#sidebar-menu .mm-active .active" ).offset().top;
                if ( activeMenu > 300 ) {
                    activeMenu = activeMenu - 300;
                    $( ".vertical-menu .simplebar-content-wrapper" ).animate( { scrollTop: activeMenu }, "slow" );
                }
            }
        } );
    }

    function init() {
        initMetisMenu();
        initLeftMenuCollapse();
        initActiveMenu();
        initMenuItemScroll();
        Waves.init();
    }

    init();

} )( jQuery )
