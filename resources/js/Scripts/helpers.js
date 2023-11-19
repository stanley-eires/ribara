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
export const generateInviteMessage = ( type ) => {
    let usepage = usePage().props;
    let invitation_url = `${ usepage.ziggy.url }/register?hook=${ _btoa( { user_id: usepage.auth.user.id, type } ) }`
    let message = "";
    switch ( type ) {
        case 'mentor':
            message = `is inviting you to be ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } mentor on Ribara. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is truly inspired by your achievements. Your expertise is something ${ usepage.auth.user.usermeta.gender == 'Male' ? 'he' : 'she' } greatly admires and aspires to attain in ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } own career. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is reaching out with a sincere request for your mentorship. We believe your guidance would be invaluable in navigating the path ahead.  ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is committed to investing the necessary time and effort, and is flexible to accommodate your schedule. Your mentorship would not only be an honor but a catalyst for ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } professional growth. Thank you for considering ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } request.`;
            break;
        case 'protege':
            message = `wants to be your mentor on Ribara. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is truly impressed by your dedication and potential. Your passion is evident and ${ usepage.auth.user.usermeta.gender == 'Male' ? 'he' : 'she' } believes it deserves the right guidance to reach its fullest potential. With that in mind, ${ usepage.auth.user.usermeta.gender == 'Male' ? 'he' : 'she' } would be honored to offer you mentorship. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is eager to share ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } experiences and insights to support you in your professional journey. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } understands the value of time and would ensure your interactions are convenient for you. Your growth is important to ${ usepage.auth.user.usermeta.gender == 'Male' ? 'him' : 'her' }, and is committed to helping you achieve your goals. Please feel free to let ${ usepage.auth.user.usermeta.gender == 'Male' ? 'him' : 'her' } know if you have any preferences or specific areas you'd like to focus on. Looking forward to the opportunity to work together.`;
            break;
        default:
            message = `wants to connect with you on Ribara. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } admires your drive, creativity, and the unique perspective you bring in your field. It's clear to ${ usepage.auth.user.usermeta.gender == 'Male' ? 'him' : 'her' } you share a common goal - to push boundaries and grow in your respective careers. With that in mind, ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } believe that by supporting and challenging each other, you both would achieve remarkable things together. You can both share insights, set goals, and hold each other accountable for each other's progress. Connect on Ribara to discuss this further and brainstorm on how you both can best support each other's growth. Looking forward to the incredible possibilities that lie ahead.`
    }
    return `<p>${ usepage.auth.user.fullname } ${ message } </p><p>Accept the invite by clicking the link: <a href='${ invitation_url }'>${ invitation_url }</a></p>`
}
