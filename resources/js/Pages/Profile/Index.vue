<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import countries from "@/Scripts/country_codes.min.js";
import professions from "@/Scripts/professions.json"
import { useForm, usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';
import { formatStartEndDate } from '@/Scripts/helpers';
import moment from 'moment';
import PostItem from '@/Components/PostItem.vue';
import { register } from 'swiper/element/bundle';
import OnboardMessage from './OnboardMessage.vue';
import { toast } from 'vue3-toastify';
import { startCase, sum, truncate } from 'lodash';
import { _btoa, disconnectUser } from "@/Scripts/helpers";
import UserCard from '@/Components/UserCard.vue';
import Schedule from "@/Pages/Appointments/Schedule.vue"
register();

let props = defineProps( { user: Object, title: String, stream: String, page: String, stats: Object } );
let modal = ref();

let isOwner = computed( () => usePage().props.auth.user.id == props.user.id )
let country_code = computed( () => countries.countries.find( e => e.name == form.usermeta.country )?.dial_code );
let connection_menu = ref( [
    { title: "All Connections", icon: 'fal fa-person-circle-check', href: route( 'profile.index', { slug: props.user.slug, page: 'connections' } ), active: !props.stream, count: props.stats ? sum( [ props.stats[ 'peer' ], props.stats[ 'protege' ], props.stats[ 'mentor' ] ] ) : 0 },

    { title: "Mentors", icon: 'fal fa-person-breastfeeding', href: route( 'profile.index', { slug: props.user.slug, page: 'connections', stream: 'mentor' } ), active: props.stream == 'mentor', count: props.stats ? props.stats[ 'mentor' ] : 0 },
    { title: "Proteges", icon: 'fal fa-baby', href: route( 'profile.index', { slug: props.user.slug, page: 'connections', stream: 'protege' } ), active: props.stream == 'protege', count: props.stats ? props.stats[ 'protege' ] : 0 },
    { title: "Peers", icon: 'fal fa-person-dots-from-line', href: route( 'profile.index', { slug: props.user.slug, page: 'connections', stream: 'peer' } ), active: props.stream == 'peer', count: props.stats ? props.stats[ 'peer' ] : 0 },
] )

let form = useForm( props.user )
let total_connects = computed( () => sum( Object.values( props.user.connection_stats ) ) )
let next_page_url = ref( props.user.post?.next_page_url );
let allposts = ref( props.user.post?.data )
let loadMore = () => {
    if ( next_page_url.value ) {
        axios.get( next_page_url.value, { headers: { 'via-axios': true } } )
            .then( response => {
                allposts.value = allposts.value.concat( response.data.data );
                next_page_url.value = response.data.next_page_url
            } )
            .catch( error => {
                console.error( error );
            } )
    }
}
let handleSave = () => {
    form.post( route( 'profile.update' ), { preserveState: true, preserveScroll: true, onSuccess: () => { modal?.hide(); toast.success( "Profile changes updated" ) } } )
}
let avatarform = useForm( { avatar: null } );
const uploadAvatar = ( event ) => {
    avatarform.avatar = event.target.files[ 0 ];
    avatarform.post( route( "profile.avatar" ), { preserveState: false, onFinish: () => modal.hide(), onSuccess: () => toast.success( "Avatar Changed" ) } )
}
const removeAvatar = () => useForm( { avatar: props.user.avatar } ).delete( route( 'profile.avatar.destroy' ), { preserveState: false, onSuccess: () => { modal.hide(); toast.success( "Avatar removed" ) } } );

let showModal = ( id ) => {
    modal = new bootstrap.Modal( id, {} )
    modal.show()
}
let handleAction = ( ev ) => {
    switch ( ev ) {
        case 'close':
            modal.hide();
            break;
        case 'avatar':
            modal.hide();
            showModal( '#update-avatar' )
            break;
        case 'profile':
            modal.hide();
            showModal( '#update-profile' )
            break;

        default:
            break;
    }
}

onMounted( () => {

    if ( isOwner && !props.page ) {
        if ( !props.user.avatar || !props.user.headline ) {
            showModal( '#onboarding' )
        }
    }
} )
let relationship = computed( () => {
    let current_user_id = usePage().props.auth.user.id;
    let x = usePage().props.auth.connections.filter( e => ( e.user_id == current_user_id && e.connected_user_id == props.user.id ) || ( e.connected_user_id == current_user_id && e.user_id == props.user.id ) );
    let status = 'not_connected';
    if ( x ) {
        if ( x.find( e => e.status == 'accepted' ) ) {
            status = 'connected';
        }
        else if ( x.find( e => e.status == 'pending' && e.connected_user_id == current_user_id ) ) {
            status = 'pending_request';
        }
        //else if ( x.find( e => e.status == 'pending' && e.friend_id == current_user_id ) ) {
        //     status = 'awaiting_confirm';
        // }
    }
    return { status, connection: x }
} )

</script>
<template>
    <Head :title="title" />
    <AuthenticatedLayout>
        <div class="card overflow-hidden mb-4">
            <div class="card-header"
                style="height:15vh;background-image: url(/assets/images/bg.jpg);background-size: cover;">
            </div>
            <div class="p-2 d-flex flex-column flex-md-row" style="z-index:2">
                <div class="flex-shrink-0">
                    <img @click.prevent="showModal('#update-avatar')"
                        :src="user.avatar ? user.avatar : '/assets/images/no-profilepics.png'"
                        class="rounded-circle avatar avatar-xl img-thumbnail mt-n5 border border-white border-3">
                </div>
                <div class="flex-grow-1 ms-3 ">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h6 class="fs-2 fw-bold mb-1">
                                <Link class="text-dark" :href="route('profile.index', { slug: props.user.slug })">
                                {{ user.fullname }}</Link>
                            </h6>
                            <p class="mb-1" v-if="user.headline">{{ (user.headline) }}</p>
                            <div class='d-flex align-items-center mb-1'>
                                <Link
                                    :href="route('profile.index', { slug: props.user.slug, page: 'connections', stream: 'mentor' })"
                                    class="text-dark"><b>{{ user.connection_stats.mentor }}</b>
                                Mentor{{ user.connection_stats.mentor == 1 ? '' : 's' }}
                                </Link>
                                <i style="font-size:3px" class="fa fa-circle px-2"></i>
                                <Link
                                    :href="route('profile.index', { slug: props.user.slug, page: 'connections', stream: 'protege' })"
                                    class="text-dark"><b>{{ user.connection_stats.protege }}</b>
                                Protege{{ user.connection_stats.protege == 1 ? '' : 's' }}</Link><i style="font-size:3px"
                                    class="fa fa-circle px-2"></i>
                                <Link
                                    :href="route('profile.index', { slug: props.user.slug, page: 'connections', stream: 'peer' })"
                                    class="text-dark"><b>{{ user.connection_stats.peer }}</b>
                                Peer{{ user.connection_stats.peer == 1 ? '' : 's' }}</Link>
                            </div>
                            <div v-if="!page && total_connects" class="my-2 d-flex align-items-center">
                                <img data-bs-toggle="tooltip" :data-bs-title="`${i.firstname} ${i.lastname}`"
                                    v-for=" i  in  user.connections" :key="i"
                                    :src="i.avatar ? i.avatar : '/assets/images/no-profilepics.png'"
                                    class="ms-n1 bg-light rounded-circle avatar avatar-xs border border-secondary shadow-lg">
                                <Link :href="route('profile.index', { slug: user.slug, page: 'connections' })"
                                    class="text-dark streched-link">
                                <span
                                    class="ms-n1 d-flex align-items-center justify-content-center bg-light rounded-circle avatar avatar-xs border border-secondary shadow-lg">
                                    <i class="fa fa-ellipsis"></i>
                                </span>

                                </Link>
                            </div>

                        </div>
                        <div class="col-12 d-block d-md-none ">
                            <p class="" v-if="user.usermeta.bio">{{ truncate(user.usermeta.bio, { length: 160 }) }}</p>
                        </div>
                        <div class="col-md-6  d-flex justify-content-start justify-content-lg-end">
                            <button v-if="isOwner" @click.prevent="showModal('#update-profile')"
                                class="btn btn-secondary"><i class="fa fa-pencil me-2"></i>Edit Profile</button>
                            <template v-else>
                                <div v-if="relationship.status == 'not_connected'" class="dropdown">
                                    <button type="button" data-bs-toggle="dropdown" class="btn  btn-primary me-1"><i
                                            class="fal fa-user-plus px-1"></i>
                                        Connect <i class="fal fa-chevron-down font-size-12 ms-1"></i></button>
                                    <div class="dropdown-menu">
                                        <Link :preserve-state="false" :preserve-scroll="true" as="button" method="POST"
                                            :href="route('user.connect')"
                                            :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'mentor' }"
                                            class="dropdown-item "><i class="fal fa-user-tag me-1"></i>Request to be a
                                        protégé</Link>
                                        <Link :preserve-state="false" :preserve-scroll="true" as="button" method="POST"
                                            :href="route('user.connect')"
                                            :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'protege' }"
                                            class="dropdown-item">
                                        <i class="fal fa-users-viewfinder me-1"></i> Offer to be a mentor</Link>
                                        <Link :preserve-state="false" :preserve-scroll="true" :href="route('user.connect')"
                                            method="POST"
                                            :data="{ user_id: user.id, connected_user_id: $page.props.auth.user.id, connection_type: 'peer' }"
                                            class="dropdown-item" as="button"><i
                                            class="fal fa-people-arrows-left-right me-1"></i> Connect
                                        as peers
                                        </Link>
                                    </div>
                                </div>
                                <button v-else-if="relationship.status == 'pending_request'"
                                    @click.prevent="disconnectUser(user.id, 'cancel')"
                                    class="btn  btn-light text-nowrap text-danger">
                                    <i class="fas fa-times me-1  "></i> Cancel Request</button>
                                <template v-else-if="relationship.status == 'connected'">
                                    <Link :href="route('messages.index', { id: _btoa({ type: 'user', id: user.id }) })"
                                        class="btn btn-secondary me-1"><i class="fal fa-envelope-open-text me-1"></i>
                                    Message</Link>
                                    <button @click.prevent="disconnectUser(user.id, 'disconnect')"
                                        class="btn btn-light text-danger me-1"><i class="fal fa-user-times me-1"></i>
                                        Disconnect</button>
                                    <div class="dropdown open">
                                        <button class="btn border-secondary btn-white dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown">
                                            <i class="fa fa-chevron-down"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                            <Link :href="route('profile.index', { slug: user.slug, page: 'schedule' })"
                                                class="dropdown-item">
                                            <i class="fal fa-calendar-plus me-1"></i> Schedule
                                            Appointment</Link>
                                        </div>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="page == 'connections'">
            <div class="row">
                <div class="col-md-11 mx-auto">
                    <div class="card card-body">
                        <h4 class="fw-bold mb-4">Connections</h4>
                        <ul class="nav nav-pills mb-2" role="tablist">
                            <li class="nav-item" role="presentation" v-for="i in connection_menu" :key="i">
                                <Link preserve-scroll="true" :href="i.href" class="nav-link" :class="{ active: i.active }">
                                <i class="me-2" :class="i.icon"></i>
                                {{ i.title }}<span class="badge text-bg-dark ms-1">{{ i.count }}</span></Link>
                            </li>
                        </ul>

                        <div class="row">
                            <div class="col-xl-3  col-md-4 col-6" v-for=" i  in  user.connections " :key="i">
                                <user-card :user="i" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="page == 'schedule'">
            <div class="row">
                <div class="col-xl-9 mx-auto">
                    <schedule :user="user" />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row">
                <div class="col-md-5">
                    <div class="card card-body pb-0 d-block d-md-none">
                        <ul class="list-unstyled">
                            <li v-for="i in user.experience" :key="i" class="d-flex mb-1"><i
                                    class="fas fa-briefcase text-muted me-2"></i>
                                Worked as
                                {{ i.title }} with {{ i.employer }} ({{ i.type }})
                            </li>
                            <li v-for="i in user.education" :key="i" class="d-flex mb-1"><i
                                    class="fas fa-graduation-cap text-muted me-2"></i>
                                Studied
                                {{ i.study }} ({{ i.degree }}) at {{ i.institution }}
                            </li>
                            <li v-for="i in user.certification" :key="i" class="d-flex mb-1"><i
                                    class="fas fa-certificate text-muted me-2"></i>
                                Certified {{ i.title }} by {{ i.organization }}
                            </li>
                            <li class="d-flex mb-1"><i class="fas fa-location-crosshairs text-muted me-2"></i>
                                Resides in {{ user.usermeta.country }}
                            </li>
                        </ul>
                    </div>
                    <div class="card card-body">
                        <h5>Availability</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex px-1 justify-content-between">
                                <span>
                                    <i class="fad fa-handshake me-2 fs-4"></i>
                                    <span>Available for hiring</span>
                                </span>
                                <div v-if="isOwner" class="form-check ms-2 form-switch">
                                    <input @change="handleSave" type="checkbox" v-model="form.usermeta.available_for_work"
                                        class="form-check-input" id="available_for_work">
                                </div>
                                <span v-else>{{ form.usermeta.available_for_work ? 'YES' : 'NO' }}</span>
                            </li>
                            <li class="list-group-item d-flex px-1 justify-content-between">
                                <span>
                                    <i class="fad fa-baby  me-2 fs-4"></i>
                                    <span>Willing to be mentored</span>
                                </span>
                                <div v-if="isOwner" class="form-check ms-2 form-switch ">
                                    <input @change="handleSave" type="checkbox"
                                        v-model="form.usermeta.available_for_mentoring" class="form-check-input"
                                        id="available_for_work">
                                </div>
                                <span v-else>{{ form.usermeta.available_for_mentoring ? 'YES' : 'NO' }}</span>
                            </li>
                            <li class="list-group-item d-flex px-1 justify-content-between">
                                <span>
                                    <i class="fad fa-person-breastfeeding me-2 fs-4"></i>
                                    <span>Willing to mentor</span>
                                </span>
                                <div v-if="isOwner" class="form-check ms-2 form-switch ">
                                    <input @change="handleSave" type="checkbox" v-model="form.usermeta.available_to_mentor"
                                        class="form-check-input" id="available_to_mentor">
                                </div>
                                <span v-else>{{ form.usermeta.available_to_mentor ? 'YES' : 'NO' }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="card card-body d-none d-md-block">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex"><i class="fad fa-briefcase me-4 fs-3"></i>
                                <p class="mb-0">
                                    <small class="text-muted d-block">Aspiring Role</small>
                                    <strong class="text-capitalize"
                                        v-if="user.usermeta.dream_job">{{ user.usermeta.dream_job }}</strong>
                                    <span v-else class="text-muted">(Not Stated)</span>
                                </p>
                            </li>
                            <li class="list-group-item d-flex"><i class="fad fa-location-dot me-4 fs-3"></i>
                                <p class="mb-0">
                                    <small class="text-muted d-block">Country of Residence</small>
                                    <strong class="text-capitalize"
                                        v-if="user.usermeta.country">{{ user.usermeta.country }}</strong>
                                    <span v-else class="text-muted">(Not Stated)</span>
                                </p>
                            </li>
                        </ul>
                    </div>

                    <!-- <div class="card  card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item ">
                                <p class="text-muted mb-2">Career Goal <i class="fa fa-info-circle"></i></p>
                                <div class="progress animated-progess">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                        style="width: 79%;"></div>
                                </div>
                            </li>
                            <li class="list-group-item ">
                                <p class="text-muted mb-2">Skill Meter <i class="fa fa-info-circle"></i></p>
                                <div class="progress animated-progess">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                        style="width: 10%;"></div>
                                </div>
                            </li>
                        </ul>
                    </div> -->
                    <div class="card card-body d-md-block d-none ">
                        <h5 class="mb-3 fw-bold">About</h5>
                        <p v-if="user.usermeta.bio">{{ user.usermeta.bio }}</p>
                        <div v-else>
                            <p class="fw-bold mb-0">User has not updated their biography section of their profile</p>
                            <p v-if="user.usermeta.gender !== ''">Once
                                {{ user.usermeta.gender == 'Male' ? 'he' : 'she' }} does, it would be
                                displayed here.
                            </p>
                            <button data-bs-toggle="modal" data-bs-target="#update-profile" v-if="isOwner"
                                class="btn border-primary text-primary btn-sm fw-bold">
                                <i class="fa fa-pencil me-1"></i>
                                Edit Profile</button>
                        </div>
                    </div>
                    <div class="card card-body ">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-3 fw-bold">Connections<br>
                                <small class="fw-normal">
                                    {{ total_connects }}
                                    Connection{{ total_connects > 1 ? 's' : '' }}</small>
                            </h5>
                            <Link :href="route('profile.index', { slug: user.slug, page: 'connections' })">See All
                            connections</Link>
                        </div>
                        <div class="row g-4">
                            <div class="col-4 mb-1 text-center" :class="{ 'd-none d-md-block': index > 2 }"
                                v-for="(i, index) in user.connections" :key="i">
                                <img :src="i.avatar ?? '/assets/images/no-profilepics.png'"
                                    class="img-thumbnail rounded-3 border border-light"
                                    style="width:100%;height:100px;object-fit:cover">
                                <Link :href="route('profile.index', { slug: i.slug })"
                                    class="fw-bold d-block font-size-12 stretched-link text-dark lh-1 w-100 text-truncate">
                                {{ i.firstname }}
                                {{ i.lastname }}</Link>
                            </div>
                        </div>
                    </div>

                    <div class="card card-body d-md-block d-none  ">
                        <div class="accordion accordion-flush" id="experience-accordion">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="mb-3 fw-bold">Experiences</h5>
                                <div v-if="user.experience.length && isOwner">
                                    <Link :href="route('experience.create')" class="btn"><i
                                        class="fa fa-plus text-muted"></i>
                                    </Link>
                                    <Link :href="route('profile.experience', { slug: user.slug })" class="btn"><i
                                        class="fa fa-pencil text-muted"></i>
                                    </Link>
                                </div>
                            </div>
                            <template v-if="user.experience.length">
                                <div class="d-flex mb-3 " v-for="i in user.experience.slice(0, 2)" :key="i">
                                    <div class="d-flex w-100">
                                        <div class="flex-shrink-0 me-2">
                                            <img src="/assets/images/business.png" alt="" style="width:80px">
                                        </div>
                                        <div class="flex-grow-1">
                                            <div class="accordion-item">
                                                <div class="btn text-start w-100 collapsed  flex-column"
                                                    data-bs-toggle="collapse" :data-bs-target="`#experience_${i.id}`">
                                                    <div>
                                                        <p class="mb-1 fw-bold">{{ i.title }}</p>
                                                        <p class="mb-0">{{ i.employer }}<small
                                                                class="ms-1 text-muted">({{ i.type }})</small>
                                                        </p>
                                                        <p class="mb-0">{{ formatStartEndDate(i.start_end_date) }}</p>
                                                        <small>{{ i.industry }}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div :id="`experience_${i.id}`" class="accordion-collapse collapse"
                                                data-bs-parent="#experience-accordion">
                                                <div class="accordion-body">
                                                    {{ i.description }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-end" v-if="user.experience.length > 2">
                                    <Link :href="route('profile.experience', { slug: user.slug })" class="btn btn-light">See
                                    More
                                    </Link>
                                </div>
                            </template>
                            <div v-else>
                                <p class="fw-bold mb-0">{{ user.firstname }} hasn't shared
                                    {{ user.usermeta.gender == 'Male' ? 'his' : 'her' }} experience yet
                                </p>
                                <p v-if="user.usermeta.gender !== ''">Once
                                    {{ user.usermeta.gender == 'Male' ? 'he' : 'she' }} does, it would be
                                    displayed here.
                                </p>
                                <Link v-if="isOwner" :href="route('experience.create')"
                                    class="btn border-primary text-primary btn-sm fw-bold"><i
                                    class="fa fa-plus-circle me-1"></i>
                                Add Experience</Link>
                            </div>
                        </div>
                    </div>
                    <div class="card card-body d-md-block d-none ">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-3 fw-bold">Education</h5>
                            <div v-if="user.education.length && isOwner">
                                <Link :href="route('education.create')" class="btn"><i class="fa fa-plus text-muted"></i>
                                </Link>
                                <Link :href="route('profile.education', { slug: user.slug })" class="btn">
                                <i class="fa fa-pencil text-muted"></i>
                                </Link>
                            </div>
                        </div>
                        <div class="list-group list-group-flush" v-if="user.education.length">
                            <div class="d-flex mb-3 list-group-item px-0" v-for="i in user.education.slice(0, 2)" :key="i">
                                <div class=" me-2 flex-shrink-0">
                                    <img src="/assets/images/education.png" alt="" style="width:80px">
                                </div>
                                <div class="flex-grow-1">
                                    <p class="mb-1 fw-bold">{{ i.institution }} <small
                                            class="text-muted ms-2 fw-normal">({{ i.degree }})</small></p>
                                    <p class="mb-0">
                                        {{ i.study }}
                                    </p>
                                    <p class="mb-0">{{ formatStartEndDate(i.start_end_date) }}</p>
                                </div>
                            </div>
                            <div class="text-end" v-if="user.experience.length > 2">
                                <Link :href="route('profile.education', { slug: user.slug })" class="btn btn-light">See
                                More
                                </Link>
                            </div>
                        </div>
                        <div v-else>
                            <p class="fw-bold mb-0">{{ user.firstname }} hasn't posted
                                {{ user.usermeta.gender == 'Male' ? 'his' : 'her' }} educational history
                            </p>
                            <p v-if="user.usermeta.gender !== ''">Once
                                {{ user.usermeta.gender == 'Male' ? 'he' : 'she' }} does, it would be
                                displayed here.
                            </p>
                            <Link v-if="isOwner" :href="route('education.create')"
                                class="btn border-primary text-primary btn-sm fw-bold"><i
                                class="fa fa-plus-circle me-1"></i>
                            Add Educational history</Link>
                        </div>
                    </div>
                    <div class="card card-body d-md-block d-none ">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-3 fw-bold">Certifications</h5>
                            <div v-if="user.certification.length && isOwner">
                                <Link :href="route('certification.create')" class="btn"><i
                                    class="fa fa-plus text-muted"></i>
                                </Link>
                                <Link :href="route('profile.certification', { slug: user.slug })" class="btn">
                                <i class="fa fa-pencil text-muted"></i>
                                </Link>
                            </div>
                        </div>
                        <div class="list-group list-group-flush" v-if="user.certification.length">
                            <div class="d-flex mb-3 list-group-item px-0" v-for="i in user.certification.slice(0, 2)"
                                :key="i">
                                <div class=" me-2 flex-shrink-0">
                                    <img src="/assets/images/certificate.png" alt="" style="width:80px" />
                                </div>
                                <div class="flex-grow-1 lh-sm">
                                    <p class="mb-1 fw-bold">{{ i.title }}</p>
                                    <p class="mb-1">{{ i.organization }}</p>
                                    <p class="mb-1">Issued {{ moment(i.issued_date).format("MMM, YYYY") }}</p>
                                    <a v-if="i.url" class="btn rounded-pill btn-sm border-primary text-primary"
                                        :href="i.url" target="_blank"><i class="fa fa-link"></i> Show
                                        Credentials</a>
                                </div>
                            </div>
                            <div class="text-end" v-if="user.certification.length > 2">
                                <Link :href="route('profile.education', { slug: user.slug })" class="btn btn-light">See
                                More
                                </Link>
                            </div>
                        </div>
                        <div v-else>
                            <p class="fw-bold mb-0">{{ user.firstname }} hasn't posted
                                {{ user.usermeta.gender == 'Male' ? 'his' : 'her' }} licenses and certifications
                            </p>
                            <p v-if="user.usermeta.gender !== ''">Once
                                {{ user.usermeta.gender == 'Male' ? 'he' : 'she' }} does, it would be
                                displayed here.
                            </p>
                            <Link v-if="isOwner" :href="route('certification.create')"
                                class="btn border-primary text-primary btn-sm fw-bold"><i
                                class="fa fa-plus-circle me-1"></i>
                            Add Certification & License</Link>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="card card-body  mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-0 fw-bold">Posts
                            </h5>
                            <Link :href="route('feeds', { stream: 'author', author: usePage().props.auth.user.slug })">View
                            All</Link>
                        </div>
                    </div>
                    <template v-if="allposts.length">
                        <post-item :post="i" v-for="i in allposts" :key="i"></post-item>
                        <infinite-loading v-if="next_page_url" distance="50" direction="bottom" @infinite="loadMore()" />
                    </template>
                    <div v-else
                        class="card card-body my-3 d-flex flex-column justify-content-center text-center align-items-center"
                        style="min-height:40vh">
                        <img loading="lazy" src="/assets/images/coming-soon-img.png" alt=""
                            style="width:250px;object-fit:cover">

                        <p>No post by {{ user.firstname }}</p>
                    </div>
                </div>
            </div>
            <template v-if="isOwner">
                <!--MODALS-->
                <div class="modal fade" id="update-profile" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
                    role="dialog">
                    <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-xl" role="document">
                        <form class="modal-content" @submit.prevent="handleSave">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit Profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row no-gutter">
                                    <div class="col-md-7">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3">
                                                    <input type="text" maxlength="50" class="form-control" placeholder=""
                                                        required v-model="form.firstname">
                                                    <label>Firstname</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3">
                                                    <input type="text" maxlength="50" class="form-control" placeholder=""
                                                        required v-model="form.lastname">
                                                    <label>Lastname</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3">
                                                    <input type="email" maxlength="50" class="form-control" placeholder=""
                                                        required v-model="form.email">
                                                    <label>Email</label>
                                                    <small v-if="form.email !== user.email" class="text-warning"><i
                                                            class="fa fa-exclamation-triangle"></i>
                                                        Changing this field would require reverification</small>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3">
                                                    <select class="form-select" required v-model="form.usermeta.country">
                                                        <option :value="null">Select Country</option>
                                                        <option :value="i.name" v-for="i in countries.countries" :key="i">
                                                            {{ i.name }}
                                                        </option>
                                                    </select>
                                                    <label>Country</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <div class="form-floating">
                                                    <input type="tel" maxlength="50" class="form-control" placeholder=""
                                                        required v-model="form.phone">
                                                    <label>Phone</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3">
                                                    <select class="form-select" required v-model="form.usermeta.gender">
                                                        <option :value="null">Select Gender</option>
                                                        <option :value="i" v-for="i in ['Male', 'Female', 'Others']"
                                                            :key="i">
                                                            {{ i }}
                                                        </option>
                                                    </select>
                                                    <label>Gender</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3 custom-vselect">
                                                    <label>Aspiring Role</label>
                                                    <v-select class="text-capitalize" required
                                                        v-model="form.usermeta.dream_job" :options="professions"
                                                        :taggable="true" :pushtags="true"
                                                        placeholder="-- Select or create new --"></v-select>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-floating mb-3">
                                                    <input type="text" class="form-control" placeholder="" maxlength="50"
                                                        required v-model="form.headline">
                                                    <label>Profile Headline</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control" required v-model="form.usermeta.bio"
                                                style="height:150px" maxlength="160"></textarea>
                                            <label>About Me</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 text-center">
                                        <div class="vr h-100 text-muted px-0"></div>
                                    </div>
                                    <div class="col-md-4">
                                        <h5 class="fw-bold">What are your interests</h5>
                                        <p>List down topics, paths, courses, careers or anything you're interested in to
                                            help others connect with you better</p>
                                        <div class="form-group mb-3">
                                            <h6 class="fw-bold mb-0">Mentoring</h6>
                                            <v-select placeholder="Enter each interest" v-model="form.interests.mentoring"
                                                taggable :autocomplete="true" multiple push-tags :loading="false"
                                                :select-on-tab="true" :no-drop="true"
                                                :dropdown-should-open="(VueSelect) => VueSelect.open">
                                                <!-- <template #search="{ attributes, events }">
                                                    <input class="vs__search" :required="!form.email.length" v-bind="attributes"
                                                        v-on="events" />
                                                </template> -->
                                            </v-select>
                                        </div>
                                        <div class="form-group mb-3">
                                            <h6 class="fw-bold mb-0">Protege Interests</h6>
                                            <v-select placeholder="Enter each interest" v-model="form.interests.protege"
                                                taggable :autocomplete="true" multiple push-tags :loading="false"
                                                :select-on-tab="true" :no-drop="true"
                                                :dropdown-should-open="(VueSelect) => VueSelect.open">
                                            </v-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light px-4" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary px-4"><span v-if="form.processing"
                                        class="spinner-grow text-white spinner-grow-sm me-2"></span> Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal fade" id="update-avatar" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
                    role="dialog">
                    <div class="modal-dialog modal-dialog-scrollable modal-md " role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Profile Photo</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center">
                                <img :src="user.avatar ? user.avatar : '/assets/images/no-profilepics.png'"
                                    class="rounded-circle img-thumbnail" style="width:300px;height:300px">
                                <input type="file" @input="uploadAvatar($event)" ref="profileimage"
                                    accept="image/jpeg, image/jpeg, image/png" style="display: none" />
                            </div>
                            <div class="modal-footer justify-content-between">
                                <button @click.prevent="$refs.profileimage.click()" type="button"
                                    class="btn d-flex flex-column align-items-center"><i class="fa fa-pencil"></i>
                                    Change</button>
                                <span v-if="avatarform.processing"
                                    class="spinner-grow text-white spinner-grow-sm me-2"></span>
                                <button v-if="user.avatar" @click.prevent="removeAvatar" type="button"
                                    class="btn d-flex flex-column align-items-center"><i class="fa fa-trash"></i>
                                    Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="onboarding" tabindex="-1" role="dialog" data-bs-backdrop="static"
                    data-bs-keyboard="false">
                    <div class="modal-dialog modal-dialog-scrollable modal-xl" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="container">
                                    <onboard-message @action="handleAction($event)" :user="user" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>
    </AuthenticatedLayout>
</template>
