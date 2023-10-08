

function initMetisMenu() {
    //metis menu
    $( "#side-menu" ).metisMenu();
}

function initLeftMenuCollapse() {
    var currentSIdebarSize = document.body.getAttribute( 'data-sidebar-size' );
    $( window ).on( 'load', function () {
        if ( window.innerWidth >= 1024 && window.innerWidth <= 1366 ) {
            document.body.setAttribute( 'data-sidebar-size', 'sm' );
        }
    } );
    $( '.vertical-menu-btn' ).on( 'click', function ( event ) {
        event.preventDefault();
        $( 'body' ).toggleClass( 'sidebar-enable' );
        if ( $( window ).width() >= 992 ) {
            if ( currentSIdebarSize == null ) {
                ( document.body.getAttribute( 'data-sidebar-size' ) == null || document.body.getAttribute( 'data-sidebar-size' ) == "lg" ) ? document.body.setAttribute( 'data-sidebar-size', 'sm' ) : document.body.setAttribute( 'data-sidebar-size', 'lg' )
            } else if ( currentSIdebarSize == "md" ) {
                ( document.body.getAttribute( 'data-sidebar-size' ) == "md" ) ? document.body.setAttribute( 'data-sidebar-size', 'sm' ) : document.body.setAttribute( 'data-sidebar-size', 'md' )
            } else {
                ( document.body.getAttribute( 'data-sidebar-size' ) == "sm" ) ? document.body.setAttribute( 'data-sidebar-size', 'lg' ) : document.body.setAttribute( 'data-sidebar-size', 'sm' )
            }
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

export function init() {
    //initMetisMenu();
    initLeftMenuCollapse();
    //initMenuItemScroll();
    Waves.init();
}

