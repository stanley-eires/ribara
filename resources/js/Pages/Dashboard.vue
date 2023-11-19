<script setup>
import UserLists from '@/Components/UserLists.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import PostItem from '@/Components/PostItem.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppointmentWidget from '@/Components/AppointmentWidget.vue';
import { usePage } from '@inertiajs/vue3';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import CreatePostArticle from '@/Components/CreatePostArticle.vue';

let props = defineProps( { posts: Object, title: String, stream: String } )
let modal = null;
let type = ref( 'post' )
onMounted( () => {
    modal = new bootstrap.Modal( "#createPostModal", {} )
} )
let hideModal = ( ev ) => {
    modal.hide();
}


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
            <div class="col-md-8">
                <div class="card text-bg-primary shadow-lg waves-effect w-100">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="card-body rounded w-100">
                                <p class="d-flex align-items-center fw-bolder fs-5">Hi,
                                    {{ $page.props.auth.user.firstname }}
                                    <img class="ms-1" src="/assets/images/waving-hand.png" width="20" alt="">
                                </p>
                                <p>Discover and Get Discovered! Unlock Your Path to Top Tech and Engineering
                                    Companies with
                                    Us!</p>
                                <div class="text-center text-md-start">
                                    <Link :href="route('profile.index', { slug: $page.props.auth.user.slug })"
                                        class="btn bg-light btn-sm text-primary">
                                    Get Started</Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                        </div>
                    </div>
                </div>
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
                <div @click="modal.show()" class="card card-body">
                    <div class="d-flex">
                        <div class="me-2 flex-shrink-0">
                            <img :src="$page.props.auth.user.avatar ?? '/assets/images/no-profilepics.png'"
                                class="avatar avatar-xs rounded-circle shadow-sm border-secondary border-1 border">
                        </div>
                        <div class="flex-grow-1 lh-sm">
                            <input class="form-control border-secondary border-1 border p-2 rounded-pill rounded-4"
                                placeholder="Share career updates and opportunities">
                            <hr class="my-1">
                            <div class="d-flex justify-content-around align-items-center">
                                <button class="btn text-nowrap w-100 border-0"><i
                                        class="fad me-2 fas fa-photo-film text-primary"></i>
                                    Photo/video</button>
                                <button class="btn  w-100 border-0"><i class="fad me-2 fa-calendar-days text-primary"></i>
                                    Event</button>
                                <button class="btn d-none d-md-block w-100"><i
                                        class="fad me-2 fa-file-lines text-primary"></i> Write
                                    post</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="createPostModal" tabindex="-1" data-bs-backdrop="static"
                    data-bs-keyboard="false" role="dialog">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Create Post</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <create-post-article @close="hideModal($event)" v-if="type == 'post'" />
                        </div>
                    </div>
                </div>

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
            <div class="col-md-4">
                <div class="text-end mb-3 d-none d-md-block">
                    <button @click.prevent="modal.show()" class="btn border-secondary border-2 text-primary"><i
                            class="fas fa-plus    "></i>
                        Create
                        Post</button>
                </div>
                <div class="offcanvas-md offcanvas-end" tabindex="-1" id="offcanvasResponsive">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                            data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                    </div>
                    <div style="overflow-y: auto;">
                        <div class="card p-2">
                            <p class="fw-bolder"> Schedules & Appointment</p>
                            <appointment-widget />
                            <p class="fw-bolder my-3">Grow your network </p>
                            <user-lists></user-lists>
                            <Link class="fw-bold" :href="route('search.people')">View all recommendations <i
                                class="fa fa-long-arrow-right  ms-2  "></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
