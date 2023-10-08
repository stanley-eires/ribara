<script setup>
import UserLists from '@/Components/UserLists.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import PostItem from '@/Components/PostItem.vue';
import CreatePostForm from '@/Components/CreatePostForm.vue';
import { ref } from 'vue';
import axios from 'axios';
import AppointmentWidget from '@/Components/AppointmentWidget.vue';
import { usePage } from '@inertiajs/vue3';

let props = defineProps( { posts: Object, title: String, stream: String } )

let next_page_url = ref( props.posts.next_page_url )
let allposts = ref( props.posts.data )
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
let nav = ref( [
    { title: "General Feeds", href: route( 'feeds', { stream: 'promoted' } ), active: props.stream == 'promoted' },
    { title: "Network Feeds", href: route( 'feeds', { stream: 'network' } ), active: props.stream == 'network' },
    { title: "Author Post", href: route( 'feeds', { stream: 'author', author: usePage().props.auth.user.slug } ), active: props.stream == 'author' }
] )
</script>

<template>
    <Head :title="`(${posts.total})+ Posts`" />

    <AuthenticatedLayout>
        <div class="row">
            <div class="col-xxl-10">
                <div
                    class="card border-0 overflow-hidden shadow-lg info-box d-flex flex-column justify-content-center align-items-center">
                    <div class="row unblurred">
                        <div class="col-md-9">
                            <div class="card-body ">
                                <h3 class="d-none d-md-block  lh-md fw-bold text-center text-white text-md-start mb-3">Our
                                    system is
                                    set up to reach out to you with the right opportunities and connections.
                                </h3>
                                <p class="text-center text-md-start text-white">Set up your profile with our tools. Connect
                                    with mentors, proteges, or peers at elite organizations; discover what your skills are
                                    worth; discover any existing gaps; ask or share professional guidance and updates;
                                    document and track your advancement</p>
                                <div class="text-center text-md-start">
                                    <Link :href="route('profile.index', { slug: $page.props.auth.user.slug })"
                                        class="btn bg-white text-primary rounded-pill"><i class="far fa-user-pen"></i>
                                    Profile
                                    Settings</Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3"
                            style="background:url(/assets/images/register-img.png);background-size:cover;background-repeat:no-repeat;background-position: center center;">
                        </div>
                    </div>
                    <!-- <div class="blur"></div> -->
                </div>
                <div class="row">
                    <div class="col-md-7">
                        <div class="d-flex bg-white justify-conent-between align-items-center rounded-4 py-2 px-3 mb-3">
                            <div class="d-flex w-100 align-items-center justify-content-start">
                                <strong class="d-md-block d-none me-3"><i class="fas fa-home  me-2  "></i> Home</strong>
                                <ul class="nav nav-pills flex-row">
                                    <li v-for="i in nav" :key="i" class="nav-item" role="presentation"
                                        :class="{ 'd-none d-md-block': i.title == 'Author Post' }">
                                        <Link :href="i.href" class="nav-link rounded-pill" :class="{ active: i.active }">
                                        {{ i.title }}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <button class="btn d-md-none" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasResponsive"><i class="fa fa-bars fs-5"></i></button>
                        </div>
                        <create-post-form />
                        <template v-if="allposts.length">
                            <post-item :post="i" v-for="i in allposts" :key="i"></post-item>
                            <infinite-loading v-if="next_page_url" distance="50" direction="bottom" @infinite="loadMore"
                                :firstload="true" />
                        </template>
                        <div v-else
                            class="card card-body my-3 d-flex flex-column justify-content-center text-center align-items-center"
                            style="min-height:40vh">
                            <img loading="lazy" src="/assets/images/coming-soon-img.png" alt=""
                                style="width:250px;object-fit:cover">
                            <h5 class="my-3">It feels so lonely here</h5>
                            <p>Connect with friends & colleagues to see and interact with their posts</p>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="offcanvas-md offcanvas-end" tabindex="-1" id="offcanvasResponsive">
                            <div class="offcanvas-header">
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                    data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                            </div>
                            <div style="overflow-y: auto;">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-transparent">
                                        <h5 class="mb-0"><i class="fad me-2 fa-calendar-check    "></i> Schedules &
                                            Appointment</h5>
                                    </div>
                                    <appointment-widget />
                                </div>
                                <div class="card shadow-sm">
                                    <div class="card-header bg-transparent">
                                        <h5 class="">Grow your network</h5>
                                    </div>
                                    <user-lists></user-lists>
                                    <div class="card-footer bg-transparent">
                                        <Link :href="route('search.people')">View all recommendations <i
                                            class="fa fa-arrow-right  ms-2  "></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
.info-box {
    min-height: 250px;
    background-image: url(/assets/images/bg.jpg);
    background-size: cover;
    background-position: center center;
    background-color: #000000ad;
    backdrop-filter: blur(10px);
    background-blend-mode: overlay;
}

/* .blur {
    height: 250px;
    backdrop-filter: blur(10px);
    background-color: #13121257
}

.unblurred {

    overflow: hidden;
    position: absolute;
    top: 0px;
    z-index: 2;
} */
</style>