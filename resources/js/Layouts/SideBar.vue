<script setup>
import { usePage } from "@inertiajs/vue3";
import QRCodeVue3 from "qrcode-vue3";
import { _btoa, generateInviteMessage, stripHtml } from '@/Scripts/helpers';
import { ref, watch } from "vue";
import { toast } from "vue3-toastify";

let invitation_type = ref( 'peer' );
let invitation_link = ref( null );
let invitation_message = ref( null );
watch( () => invitation_type, ( value ) => {
    invitation_link.value = `${ usePage().props.ziggy.url }/register?hook=${ _btoa( {
        user_id: usePage().props.auth.user.id,
        type: value.value
    } ) }`
    invitation_message.value = generateInviteMessage( value.value );
}, { immediate: true, deep: true } )
let copy = () => {
    navigator.clipboard.writeText( stripHtml( invitation_message.value ) ).then( () => toast.success( "Invitation link copied" ) ).catch( ( err ) => toast.error( err ) )
}

let menus = [
    { title: "Home", icon: "fa-house fa-duotone", href: route( 'feeds' ), active: [ 'Dashboard', 'Feeds/Post', 'Feeds/PostEdit' ].includes( usePage().component ) },
    { title: "Informational Interview", icon: "fad fa-comments", href: route( 'connections' ), active: false },
    { title: "Appointments", icon: "fad fa-calendar-star", href: route( 'appointment.index' ), active: [ 'Appointments/Index' ].includes( usePage().component ) },
    { title: "Messages", icon: "fad fa-comment-dots", href: route( 'messages.index' ), active: [ 'Messages/Conversation', 'Messages/Index' ].includes( usePage().component ) },
    { title: "People", icon: "fad fa-people-group", href: route( 'search.people' ), active: [ 'People' ].includes( usePage().component ) },
    { title: "Profile", icon: "fad fa-user-edit", href: route( 'profile.index', { slug: usePage().props.auth.user.slug } ), active: [ 'Profile/Index' ].includes( usePage().component ) },
    { title: "Connections", icon: "fad fa-users", href: route( 'connections' ), active: [ 'Connections' ].includes( usePage().component ) },
    { title: "Opportunities", icon: "fad fa-briefcase", href: route( 'internship-opportunities' ), active: [ 'Jobs' ].includes( usePage().component ) },
    { title: "Invite Others", icon: "fad  fa-person-military-to-person", href: route( 'users.invitation' ), active: [ 'Invitation' ].includes( usePage().component ) }
    // { title: "Learning Box", icon: "fa-duotone fa-folder-closed", href: route( 'learning-box' ) },
    // { title: "Community", icon: "fad fa-users", href: route( 'community' ) },
    // { title: "Ranking", icon: "fad fa-chart-line", href: route( 'ranking' ) },
    // { title: "Analytics", icon: "fad fa-chart-column", href: route( 'analytics' ) },
]
</script>
<template>
    <div class="vertical-menu">
        <div class="navbar-brand-box">
            <Link href="/" class="logo logo-dark">
            <span class="logo-sm">
                <img loading="lazy" src="/favicon.png" alt="" width="30">
            </span>
            <span class="logo-lg">
                <img loading="lazy" src="/logo.png" alt="" width="130">
            </span>
            </Link>
        </div>

        <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
            <i class="fa fa-fw fa-bars"></i>
        </button>

        <div data-simplebar class="sidebar-menu-scroll">
            <div id="sidebar-menu">
                <ul class="metismenu list-unstyled mt-3" id="side-menu">
                    <li v-for="menu in menus" :key="menu" :class="{ 'mm-active': menu.active }">
                        <Link :href="menu.href" class="d-flex"><i :class="menu.icon" class="me-1"></i>
                        <span>{{ menu.title }}</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#"><i class="fad fa-chart-pie"></i> <span>Skill Meter</span>
                        <span class="badge bg-primary font-size-10 rounded-pill float-end">Coming Soon</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#"><i class="fad fa-walkie-talkie"></i> <span>Virtual Room</span>
                        <span class="badge bg-primary font-size-10 rounded-pill float-end">Coming Soon</span>
                        </Link>
                    </li>
                </ul>
                <hr>
                <div class="py-1 logo" style="line-height:unset">
                    <span class="logo-lg">
                        <div class="text-start  mx-2 ">
                            <p class="mb-0">Save QRcode to invite friends as:</p>
                            <div class="form-check form-check-inline" v-for="i in ['peer', 'protege', 'mentor']" :key="i">
                                <input class="form-check-input" type="radio" name="type" :id="i" :value="i"
                                    v-model="invitation_type">
                                <label class="form-check-label small text-capitalize" :for="i">{{ i }}</label>
                            </div>
                            <QRCodeVue3 :width="235" :height="235" :value="invitation_link" image="/logo.png" :dotsOptions="{
                                type: 'dots',
                                color: '#26249a'
                            }" />
                            <div class="text-center">
                                <button @click.prevent="copy" class="btn btn-light  btn-sm"><i class="fas fa-copy me-2"></i>
                                    Copy invitation link
                                </button>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>