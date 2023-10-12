<script setup>
import { onMounted, ref } from "vue";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import UserCard from '@/Components/UserCard.vue';
import PostItem from '@/Components/PostItem.vue';
let props = defineProps( { title: String, people: Object, posts: Object, tab: String, keyword: String } )
let all_people = ref( props.people?.data );
let all_posts = ref( props.posts?.data );
let next_people_page_url = ref( props.people?.next_page_url )
let next_post_page_url = ref( props.posts?.next_page_url )
let menu = ref( [
    { title: "All", icon: 'fal fa-layer-group', href: route( 'search.results', { tab: 'top', q: props.keyword } ), active: props.tab == 'top' },
    { title: "People", icon: 'fal fa-people-group', href: route( 'search.results', { tab: 'people', q: props.keyword } ), active: props.tab == 'people' },
    { title: "Posts", icon: 'fal fa-file-lines', href: route( 'search.results', { tab: 'posts', q: props.keyword } ), active: props.tab == 'posts' },
] )
let disconnect = ( ev, reject = false ) => {
    let msg = reject ? `Are you sure you want to cancel this request?` : `Are you sure you want to disconnect from this user?`
    if ( confirm( msg ) ) {
        useForm( ev ).delete( route( 'user.disconnect' ), { preserveState: false, preserveScroll: true } )
    }
}
let connect = ( ev ) => {
    useForm( ev ).post( route( 'user.connect' ), { preserveState: false, preserveScroll: true } )
}
let loadMore = ( type ) => {
    let next_page_url = type == 'posts' ? next_post_page_url.value : next_people_page_url.value;
    if ( next_page_url ) {
        axios.get( next_page_url, { headers: { 'via-axios': true } } )
            .then( response => {
                if ( type == 'posts' ) {
                    all_posts.value = all_posts.value.concat( response.data.data );
                    next_post_page_url.value = response.data.next_page_url;
                } else {
                    all_people.value = all_people.value.concat( response.data.data );
                    next_people_page_url.value = response.data.next_page_url
                }
            } )
            .catch( error => {
                console.error( error );
            } )
    }
}

</script>
<template>
    <AuthenticatedLayout>

        <Head :title="title" />
        <div class="row">
            <div class="col-md-3">
                <div class="fixed-sidebar ">
                    <h5 class="fw-bold mb-0 p-3">Search Results</h5>
                    <div class="card rounded-0 mb-0">
                        <div class="list-group lh-lg flex-row flex-md-column list-group-flush ">
                            <Link :href="i.href" v-for="i in  menu " :key="i" class="list-group-item list-group-item-action"
                                :class="{ 'text-white active': i.active }">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" font-size-22" :class="i.icon"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="mb-0 text-reset">{{ i.title }}</h6>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xxl-7 col-md-9">
                <div class="accordion accordion-flush" id="accordionSearch" v-if="tab == 'top'">
                    <div class="accordion-item bg-white">
                        <button class="accordion-button  fw-bold text-dark fs-4" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapsePeople">People
                        </button>
                        <div id="collapsePeople" class="accordion-collapse collapse show "
                            data-bs-parent="#accordionSearch">
                            <div class="accordion-body p-md-4 px-0">
                                <div class="row">
                                    <template v-if="people.length">
                                        <div class="col-md-4 col-6" v-for="i in people.slice(0, 6)" :key="i">
                                            <user-card @onConnect="connect($event)" @onCancel="disconnect($event, true)"
                                                @onDisconnect="disconnect($event)" :user="i" />
                                        </div>
                                        <div v-if="people.length > 6" class="col-12">
                                            <Link class="btn btn-outline-primary w-100"
                                                :href="route('search.results', { tab: 'people', q: keyword })">See
                                            All</Link>
                                        </div>
                                    </template>
                                    <div v-else>
                                        <div class="p-5 mb-4 text-center">
                                            <div class="container-fluid py-5">
                                                <h1 class="fw-bold mb-3">Sorry "{{ keyword }}" is not on Ribara yet.</h1>
                                                <p class="fs-4">Would you like to invite {{ keyword }}?</p>
                                                <Link :href="route('users.invitation')" class="btn btn-primary btn-lg"
                                                    type="button">Click to Invite</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item bg-white" v-if="posts.length">
                        <button class="accordion-button  fw-bold text-dark fs-4" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapsePosts">Posts
                        </button>
                        <div id="collapsePosts" class="accordion-collapse collapse show " data-bs-parent="#accordionSearch">
                            <div class="accordion-body p-md-4 px-0 ">
                                <post-item :post="i" v-for="i in posts" :key="i"></post-item>
                            </div>
                        </div>
                    </div>



                </div>
                <div class="row" v-else-if="tab == 'people'">
                    <template v-if="all_people.length > 0">
                        <div class=" col-md-4 col-6" v-for="i in all_people" :key="i">
                            <user-card @onConnect="connect($event)" @onCancel="disconnect($event, true)"
                                @onDisconnect="disconnect($event)" :user="i" />
                        </div>
                        <infinite-loading v-if="next_people_page_url" distance="50" direction="bottom"
                            @infinite="loadMore('people')" />
                    </template>
                    <div v-else class="text-center ">
                        <img src="/assets/images/404-error.png" alt="" style="width:300px;object-fit:cover">
                        <h5>No results found</h5>
                        <p>Try shortening or rephrasing your search.</p>
                    </div>
                </div>
                <div v-else-if="tab == 'posts'">
                    <template v-if="all_posts.length > 0">
                        <post-item :post="i" v-for="i in all_posts" :key="i"></post-item>
                        <infinite-loading v-if="next_post_page_url" distance="50" direction="bottom"
                            @infinite="loadMore('posts')" />
                    </template>
                    <div v-else class="text-center ">
                        <img src="/assets/images/404-error.png" alt="" style="width:300px;object-fit:cover">
                        <h5>No results found</h5>
                        <p>Try shortening or rephrasing your search.</p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
.fixed-sidebar {
    position: fixed;
    width: 250px;
    z-index: 1;
}

@media (max-width: 767.98px) {
    .fixed-sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        margin-top: 70px;
        background-color: #f8f9fa;
        border-right: 1px solid #dee2e6;

    }

    .col-xxl-7 {
        margin-top: 100px
    }
}
</style>