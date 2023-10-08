import { router, useForm, usePage } from "@inertiajs/vue3";
import moment from "moment/moment";
export const money_format = ( amount ) => new Intl.NumberFormat( 'en-NG', {
    style: 'currency',
    currency: 'NGN',
} ).format( amount );

export const formatStartEndDate = ( date ) => {
    let [ prefix, suffix ] = date ? date.split( ' - ' ).map( e => e.trim() ) : [];
    if ( prefix ) {
        return `${ moment( prefix ).format( 'MMMM, YYYY' ) } - ${ suffix.toLowerCase() === "current" ? 'Current' : moment( suffix ).format( 'MMMM, YYYY' ) }`;
    }
}


export const hasRole = ( roles ) => roles.some( r => usePage().props.auth.roles.includes( r ) )

export const logout = () => {
    if ( confirm( "Are you sure you want to log out from account?" ) ) {
        router.post( route( 'logout' ) )
    }
}
export const disconnectUser = ( connected_user_id, action = 'disconnect' ) => {
    let msg = action == 'disconnect' ? `Are you sure you want to disconnect from this user?` : `Are you sure you want to cancel this request?`
    if ( confirm( msg ) ) {
        useForm( {
            connected_user_id, action
        } ).delete( route( 'user.disconnect' ), { preserveState: false, preserveScroll: true } )
    }
}

export const stripHtml = ( html ) => {
    let tmp = document.createElement( "DIV" );
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

export const _btoa = ( data ) => {
    return btoa( JSON.stringify( data ) )
}
export const deletePost = ( id, return_path = false ) => {
    if ( confirm( `Are you sure you want to delete this post? Deleting would
    1. Remove all attached images.
    2. Remove all associated likes,shares and comments`) ) {
        useForm( { id, return_path } ).delete( route( 'post.destroy' ), { preserveScroll: true, preserveState: false } )
    }
}
