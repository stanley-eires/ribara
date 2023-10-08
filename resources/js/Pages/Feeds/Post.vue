<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';
import { Head, usePage } from '@inertiajs/vue3';
import moment from 'moment';
import CommentItem from '@/Components/CommentItem.vue';
import CommentForm from '@/Components/CommentForm.vue';
import LikeButton from '@/Components/LikeButton.vue';
import CommentButton from '@/Components/CommentButton.vue';
import PostItemPost from '@/Components/PostItemPost.vue';
import { deletePost } from '@/Scripts/helpers';
import { computed, onMounted, ref } from 'vue';
import { capitalize, uniq } from 'lodash';
let props = defineProps( { post: Object, comments: Object } )
let icons = { like: { icon: 'fa-thumbs-up', color: 'success' }, dislike: { icon: 'fa-thumbs-down', color: 'danger' }, support: { icon: 'fa-handshake', color: 'primary' }, insightful: { icon: 'fa-lightbulb', color: 'info' }, celebrate: { icon: 'fa-hands-clapping', color: 'warning' } }
let currentUserReaction = computed( () => {
    return props.post.likes.find( e => e.user_id == usePage().props.auth.user.id );
} )
let post_comments = ref( props.comments.data );
let reactionUsers = ref( [] );

let postReactions = computed( () => uniq( props.post.likes.map( e => e.reaction ) ) );
let getReactionUsers = ( id ) => {
    axios.get( route( 'like.show', { likeable_id: props.post.id, likeable_type: 'App\\Models\\Post' } ) )
        .then( response => {
            reactionUsers.value = response.data;
        } )
        .then( () => {
            modal = new bootstrap.Modal( id, {} )
            modal.show()
        } )
        .catch( error => {
            console.error( error );
        } )
}
</script>
<template>
    <AuthenticatedLayoutWithSidebar>
        <Link :href="route('feeds')" class="btn rounded-pill"><i class="fad fa-long-arrow-left me-2"></i> Return
        to Feeds</Link>

        <Head title="Dashboard" />
        <div class="card p-3">
            <div class="d-flex mb-3 align-items-center">
                <div class="me-3 flex-shrink-0">
                    <img :src="post.user.avatar ?? 'assets/images/no-profilepics.png'"
                        class="avatar avatar rounded-circle img-thumbnail">
                </div>
                <div class="flex-grow-1 lh-sm">
                    <h6 class="mb-1 fw-bold">
                        <Link :href="route('profile.index', { slug: post.user.slug })">
                        {{ post.user.fullname }}
                        </Link>
                    </h6>
                    <p class="mb-0 small text-muted">{{ moment(post.created_at).format("LLL") }} <small
                            :title="moment(post.updated_at).fromNow()"
                            v-if="!moment(post.created_at).isSame(post.updated_at)">(edited)</small></p>
                </div>
                <div class="float-end" v-if="post.user.id == $page.props.auth.user.id">
                    <div class="dropdown open">
                        <button class="btn " type="button" id="triggerId" data-bs-toggle="dropdown">
                            <i class=" fad font-size-20 fa-ellipsis-h"></i>
                        </button>
                        <div class="dropdown-menu">
                            <Link :href="route('post.edit', { id: post.id })" class="dropdown-item"><i
                                class="fad fa-pencil me-1"></i>
                            Edit</Link>
                            <button @click.prevent="deletePost(post.id, 'feeds')" class="dropdown-item"><i
                                    class="fad fa-trash-alt me-1"></i>
                                Trash</button>
                        </div>
                    </div>
                </div>
            </div>
            <post-item-post v-if="post.type == 'post'" :post="post" full />
            <div class="d-flex justify-content-between align-items-center my-2">
                <div class="d-flex">
                    <Link as="button" :preserve-state="false" :preserve-scroll="true" :href="route('like.destroy')"
                        method="delete"
                        :data="{ likeable_type: 'App\\Models\\Post', user_id: $page.props.auth.user.id, id: currentUserReaction.id, likeable_id: post.id, }"
                        class="btn btn-sm text-capitalize small" v-if="currentUserReaction">
                    <span :class="`fw-bold text-${icons[currentUserReaction.reaction].color}`">
                        <i class="fal me-1" :class="icons[currentUserReaction.reaction].icon"></i>
                        {{ currentUserReaction.reaction }}
                    </span>
                    </Link>
                    <div v-else class="dropup">
                        <button data-bs-toggle="dropdown" class="btn-link btn small btn-sm">Like</button>
                        <div class="dropdown-menu shadow-lg border border-dark">
                            <div class="d-flex justify-content-evenly">
                                <Link as="button" :preserve-state="false" :preserve-scroll="true"
                                    :href="route('like.store')" method="post"
                                    :data="{ likeable_type: 'App\\Models\\Post', user_id: $page.props.auth.user.id, likeable_id: post.id, reaction: i }"
                                    v-for="i in Object.keys(icons)" :key="i" class="btn" :title="capitalize(i)"><i
                                    class="fad font-size-24" :class="`${icons[i].icon} text-${icons[i].color}`"></i></Link>
                            </div>
                        </div>
                    </div>
                    <template v-if="post.likes.length">
                        <div class="d-flex align-items-center">
                            <div style="width:22px;height:22px"
                                class=" d-flex justify-content-center align-items-center rounded-circle me-1"
                                v-for="i in postReactions" :key="i" :title="capitalize(i)" :class="`bg-${icons[i].color}`">
                                <i class="fas text-white" :class="icons[i].icon"></i>
                            </div>
                            <a @click.prevent="getReactionUsers(`#reaction-users-${post.id}`)" class="fw-bold btn btn-sm"
                                href="#">{{ post.likes.length }}</a>
                        </div>
                    </template>
                </div>

                <div class="d-flex justify-content-end text-muted small align-items-center">
                    <a href="" class="btn-link" @click.prevent="getComments">{{ post.comments_count }}
                        Comment{{ post.comments_count > 1 ? 's' : '' }}</a>
                </div>
            </div>
            <div class="mt-2">
                <comment-item v-for="comm in post_comments" :key="comm" :comment="comm"></comment-item>
                <comment-form @submit="getComments();" commentable_type="App\Models\Post" :commentable_id="post.id" />
            </div>
            <!-- <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <like-button mode="button" :post="post" />
                    <button class="btn "><i class="fal fa-share-alt"></i></button>
                </div>
                <div class="d-flex justify-content-end text-muted small align-items-center">
                    <like-button mode="label" :post="post" />
                    <i style="font-size:3px" class="fa fa-circle px-2"></i>
                    <comment-button mode="label" :post="post" />
                    <i style="font-size:3px" class="fa fa-circle px-2"></i>
                    <span>0 Reports</span>
                </div>
            </div>
            <comment-form :post-id="post.id" />
            <comment-item :can-edit="comment.user_id == $page.props.auth.user.id"
                :can-delete="comment.user_id == $page.props.auth.user.id || post.user_id == $page.props.auth.user.id"
                v-for="comment in comments.data" :key="comment" :comment="comment"></comment-item> -->
        </div>
    </AuthenticatedLayoutWithSidebar>
</template>
<style scoped>
.gi-more {
    z-index: 1
}
</style>