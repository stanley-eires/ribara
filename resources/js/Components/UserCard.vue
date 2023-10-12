<script setup>
import { _btoa, disconnectUser } from "@/Scripts/helpers";
import { usePage } from "@inertiajs/vue3"
import { computed } from "vue"
let props = defineProps( { user: Object, mode: { default: 'grid' } } )
let relationship = computed( () => {
    let current_user_id = usePage().props.auth.user.id;
    let x = usePage().props.auth.connections.filter( e => ( e.user_id == current_user_id && e.connected_user_id == props.user.id ) || ( e.connected_user_id == current_user_id && e.user_id == props.user.id ) );
    let status = 'not_connected';
    if ( x ) {
        if ( x.find( e => e.status == 'accepted' ) ) {
            status = 'connected';
        } else if ( x.find( e => e.status == 'pending' && e.connected_user_id == current_user_id ) ) {
            status = 'pending_request';
        } else if ( x.find( e => e.status == 'pending' && e.user_id == current_user_id ) ) {
            status = 'awaiting_confirm';
        }
    }
    return { status, connection: x }
} )
let requestDescription = () => {
    let message = null;
    switch ( relationship.value.connection[ 0 ].connection_type ) {
        case 'mentor':
            message = "wants to be your <b>protege</b>."
            break;
        case 'protege':
            message = "wants to be your <b>mentor</b>."
            break;
        case 'peer':
            message = "wants to be your <b>peer</b>."
            break;
        default:
            break;
    }
    return message;
}
</script>
<template>
    <div v-if="mode == 'grid'" class="card p-3 shadow-lg text-center">
        <div>
            <img loading="lazy"
                :src="user.avatar && user.avatar != 'null' ? user.avatar : '/assets/images/no-profilepics.png'"
                class="avatar avatar-xl rounded-circle img-thumbnail">
        </div>
        <div v-if="user.id == $page.props.auth.user.id" class="w-100">
            <p class="fw-bold my-1 mb-0 position-relative">
                <Link class="text-dark stretched-link" :href="route('profile.index', { slug: user.slug })">
                {{ user.firstname }}
                {{ user.lastname }}</Link>
            </p>
            <p v-if="user.headline" class="small mb-2 text-capitalize w-100 d-block text-truncate">{{ user.headline }}</p>
            <Link :href="route('profile.index', { slug: $page.props.auth.user.slug })" type="button"
                class="btn w-100 btn-light px-3 btn-sm text-nowrap fw-bold">
            Go to Profile <i class="fal fa-chevron-right font-size-12 ms-1"></i></Link>
        </div>
        <div v-else-if="relationship.status == 'not_connected'" class="w-100">
            <p class="fw-bold my-1 mb-0 position-relative">
                <Link class="text-dark stretched-link" :href="route('profile.index', { slug: user.slug })">
                {{ user.firstname }}
                {{ user.lastname }}</Link>
            </p>
            <p class="small mb-2 text-capitalize w-100 d-block text-truncate">{{ user.headline }}</p>
            <button type="button" data-bs-toggle="dropdown" class="btn w-100 btn-light px-3 btn-sm text-nowrap fw-bold"><i
                    class="fal fa-user-plus px-1"></i>
                Connect <i class="fal fa-chevron-down font-size-12 ms-1"></i></button>
            <div class="dropdown-menu">
                <Link :preserve-state="false" :preserve-scroll="true" as="button" method="POST"
                    :href="route('user.connect')"
                    :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'mentor' }"
                    class="dropdown-item "><i class="fal fa-user-tag me-1"></i>Request to be a protégé</Link>
                <Link :preserve-state="false" :preserve-scroll="true" as="button" method="POST"
                    :href="route('user.connect')"
                    :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'protege' }"
                    class="dropdown-item">
                <i class="fal fa-users-viewfinder me-1"></i> Offer to be a mentor</Link>
                <Link :preserve-state="false" :preserve-scroll="true" :href="route('user.connect')" method="POST"
                    :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'peer' }"
                    class="dropdown-item" as="button"><i class="fal fa-people-arrows-left-right me-1"></i> Connect
                as peers
                </Link>
            </div>
        </div>
        <div v-else-if="relationship.status == 'awaiting_confirm'">
            <p class="position-relative">
                <Link class="text-dark stretched-link" :href="route('profile.index', { slug: user.slug })">
                {{ user.firstname }}
                {{ user.lastname }}</Link> <small v-html="requestDescription()"></small>
            </p>
            <div class="d-flex align-items-center">
                <Link :preserve-state="false" :preserve-scroll="true" method="PUT" :href="route('user.connection.accept')"
                    :data="{ connected_user_id: user.id }" class="btn btn-success w-100 btn-sm me-1 text-nowrap"><i
                    class="fas fa-check me-1   "></i>
                Confirm
                </Link>
                <button @click.prevent="disconnectUser(user.id, 'disconnect')"
                    class="btn btn-light w-100 btn-sm text-nowrap">Delete</button>
            </div>
        </div>
        <div v-else-if="relationship.status == 'pending_request'" class="w-100">
            <p class="fw-bold my-1 mb-0 position-relative">
                <Link class="text-dark stretched-link" :href="route('profile.index', { slug: user.slug })">
                {{ user.firstname }}
                {{ user.lastname }}</Link>
            </p>
            <p v-if="user.headline" class="small mb-2 text-capitalize w-100">{{ user.headline }}</p>
            <button @click.prevent="disconnectUser(user.id, 'cancel')"
                class="btn w-100 btn-light fw-bold btn-sm text-nowrap text-danger">
                <i class="fas fa-times me-1  "></i> Cancel Request</button>
        </div>
        <template v-else>
            <div>
                <p class="fw-bold my-1 mb-0 text-truncate position-relative">
                    <Link class="text-dark stretched-link" :href="route('profile.index', { slug: user.slug })">
                    {{ user.firstname }}
                    {{ user.lastname }}</Link>
                </p>
                <p v-if="user.headline" class="small mb-2 text-capitalize w-100 d-block text-truncate">{{ user.headline }}
                </p>
            </div>
            <div class="dropdown open w-100">
                <button class="btn btn-primary w-100 btn-sm text-nowrap" type="button" data-bs-toggle="dropdown">
                    <i class="fas fa-bars me-2"></i> Actions <i class="fas fa-angle-down ms-2"></i>
                </button>
                <div class="dropdown-menu">
                    <Link :href="route('messages.index', { id: _btoa({ type: 'user', id: user.id }) })"
                        class="dropdown-item"><i class="fal fa-envelope-open-text me-1"></i> Send Private
                    Message</Link>
                    <Link v-if="user.connection_type != 'peer'"
                        :href="route('profile.index', { slug: user.slug, page: 'schedule' })" class="dropdown-item">
                    <i class="fal fa-calendar-plus me-1"></i> Schedule
                    Appointment</Link>
                    <button class="dropdown-item"><i class="fal fa-comments me-1"></i>Request Informational
                        Interview</button>
                    <button @click.prevent="disconnectUser(user.id, 'disconnect')" class="dropdown-item text-danger"><i
                            class="fal fa-user-times me-1"></i>
                        Disconnect</button>
                </div>
            </div>
        </template>
    </div>
    <div v-else class="d-flex">
        <div class="flex-shrink-0 me-2">
            <img loading="lazy"
                :src="user.avatar && user.avatar != 'null' ? user.avatar : '/assets/images/no-profilepics.png'"
                class="avatar rounded-circle img-thumbnail">
        </div>
        <div class="row w-100">
            <div class="col-7">
                <h6 class="mb-1 position-relative">
                    <Link class="text-dark stretched-link" :href="route('profile.index', { slug: user.slug })">
                    {{ user.fullname }}
                    </Link>
                </h6>
                <p v-if="user.headline" class="mb-0 font-size-12 text-capitalize text-muted">{{ user.headline }}</p>
            </div>
            <div class="col-5 text-end">
                <div v-if="relationship.status == 'not_connected'" class="w-100">
                    <button type="button" data-bs-toggle="dropdown" class="btn w-100 btn-light p-2 btn-sm text-nowrap"><i
                            class="fal fa-user-plus px-1"></i>
                        Connect <i class="fal fa-chevron-down font-size-12 ms-1"></i></button>
                    <div class="dropdown-menu">
                        <Link :preserve-state="false" :preserve-scroll="true" as="button" method="POST"
                            :href="route('user.connect')"
                            :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'mentor' }"
                            class="dropdown-item "><i class="fal fa-user-tag me-1"></i>Request to be a protégé</Link>
                        <Link :preserve-state="false" :preserve-scroll="true" as="button" method="POST"
                            :href="route('user.connect')"
                            :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'protege' }"
                            class="dropdown-item">
                        <i class="fal fa-users-viewfinder me-1"></i> Offer to be a mentor</Link>
                        <Link :preserve-state="false" :preserve-scroll="true" :href="route('user.connect')" method="POST"
                            :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'peer' }"
                            class="dropdown-item" as="button"><i class="fal fa-people-arrows-left-right me-1"></i> Connect
                        as peers
                        </Link>
                    </div>
                </div>
                <div v-else-if="relationship.status == 'pending_request'" class="w-100">
                    <button @click.prevent="disconnectUser(user.id, 'cancel')"
                        class="btn w-100 btn-light fw-bold btn-sm text-nowrap text-danger">
                        <i class="fas fa-times me-1  "></i> Cancel Request</button>
                </div>
                <div v-else-if="relationship.status == 'awaiting_confirm'">
                    <Link :preserve-state="false" :preserve-scroll="true" method="PUT"
                        :href="route('user.connection.accept')" :data="{ connected_user_id: user.id }"
                        class="btn btn-primary mb-2 w-100 btn-sm">
                    Confirm
                    </Link>
                    <button @click.prevent="disconnectUser(user.id, 'disconnect')"
                        class="btn btn-light w-100 btn-sm">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>