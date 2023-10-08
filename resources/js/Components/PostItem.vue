<script setup>
import moment from 'moment';
import { router, useForm, usePage } from '@inertiajs/vue3';
import CommentItem from './CommentItem.vue';
import CommentForm from './CommentForm.vue';
import LikeButton from './LikeButton.vue';
import CommentButton from './CommentButton.vue';
import PostItemPost from '@/Components/PostItemPost.vue';
import { deletePost } from '@/Scripts/helpers';
import { computed, ref } from 'vue';
import { capitalize, uniq } from 'lodash';
import axios from 'axios';
import { toast } from 'vue3-toastify';
let props = defineProps( { post: Object } )
let icons = { like: { icon: 'fa-thumbs-up', color: 'success' }, dislike: { icon: 'fa-thumbs-down', color: 'danger' }, support: { icon: 'fa-handshake', color: 'primary' }, insightful: { icon: 'fa-lightbulb', color: 'info' }, celebrate: { icon: 'fa-hands-clapping', color: 'warning' } }

let currentUserReaction = computed( () => {
    return props.post.likes.find( e => e.user_id == usePage().props.auth.user.id );
} )
let postReactions = computed( () => uniq( props.post.likes.map( e => e.reaction ) ) );
let tab = ref( 'all' );
let modal = ref();
let reactionUsers = ref( [] );
let showComments = ref( false )
let comments = ref( [] );

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
let getComments = () => {
    showComments.value = true;
    axios.get( route( 'comment.show', { commentable_type: 'App\\Models\\Post', commentable_id: props.post.id } ) )
        .then( response => {
            comments.value = response.data;
        } )
        .catch( error => {
            console.error( error );
        } )
}
let share = ( media ) => {
    let url = route( 'post.show', { id: props.post.id } );
    let desc = `${ props.post.user.fullname } has a post you might be interested in`
    switch ( media ) {
        case 'whatsapp':
            url = `whatsapp://send?text=${ encodeURIComponent( desc + ' ' + url ) }`
            break;
        case 'telegram':
            url = `https://t.me/share/url?url=${ encodeURIComponent( url ) }&text=${ encodeURIComponent( desc ) }`
            break;
        default:
            url = `whatsapp://send?text=${ encodeURIComponent( desc + ' ' + url ) }`
    }
    window.open( url, '_blank', 'width=600,height=400' );
}
let copy = () => {
    navigator.clipboard.writeText( route( 'post.show', { id: props.post.id } ) ).then( () => toast.success( `Link copied to clipboard. <a href='/post/${ props.post.id }'>View post</a>` ) ).catch( ( err ) => toast.error( err ) )
}
</script>
<template>
    <div class="card shadow-sm p-3 mb-3 ">
        <div class="d-flex mb-1">
            <div class="me-3 flex-shrink-0">
                <img loading="lazy" :src="post.user.avatar ?? '/assets/images/no-profilepics.png'"
                    class="avatar avatar-sm rounded-circle img-thumbnail">
            </div>
            <div class="flex-grow-1 lh-sm">
                <h6 class="mb-1 fw-bold">
                    <Link class="text-dark" :href="route('profile.index', { slug: post.user.slug })">
                    {{ post.user.fullname }}
                    </Link>
                </h6>
                <p class="mb-1 text-capitalize small">{{ post.user.headline }}
                </p>
                <p class="mb-0 d-flex align-items-center small text-muted">{{ moment(post.created_at).fromNow() }} <small
                        :title="moment(post.updated_at).fromNow()"
                        v-if="post.created_at !== post.updated_at">(edited)</small>
                    <i style="font-size:3px" class="fa fa-circle px-2"></i>
                    <i data-bs-toggle="tooltip" data-bs-title="Public" class="fas fa-globe"></i>
                </p>
            </div>
            <div class="float-end">
                <div class="dropup">
                    <button class="btn" type="button" data-bs-toggle="dropdown">
                        <i class=" fas font-size-20 fa-ellipsis-h"></i>
                    </button>
                    <div class="dropdown-menu">
                        <button @click.prevent="copy" class="dropdown-item"><i class="fas fa-link me-1"></i>
                            Copy link to post</button>
                        <Link v-if="post.user.id == $page.props.auth.user.id" :href="route('post.edit', { id: post.id })"
                            class="dropdown-item"><i class="fas fa-pencil me-1"></i>
                        Edit this post</Link>
                        <button v-if="post.user.id == $page.props.auth.user.id || $page.props.auth.user.is_admin"
                            @click.prevent="deletePost(post.id)" class="dropdown-item"><i class="fas fa-trash-alt me-1"></i>
                            Delete this post</button>
                        <template v-if="$page.props.auth.user.is_admin">
                            <hr class="my-0" />
                            <Link as="button" :preserve-state="false" :preserve-scroll="true" v-if="!post.is_promoted"
                                method="PATCH" :data="{ id: post.id, is_promoted: 1 }" :href="route('post.update.simple')"
                                class="dropdown-item"><i class="fas fa-scale-unbalanced me-1"></i> Promote this post</Link>
                            <Link as="button" :preserve-state="false" :preserve-scroll="true" v-else method="PATCH"
                                :data="{ id: post.id, is_promoted: 0 }" :href="route('post.update.simple')"
                                class="dropdown-item"><i class="fas fa-scale-unbalanced-flip me-1"></i> Unpromote this post
                            </Link>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <post-item-post v-if="post.type == 'post'" :post="post" />
        <div class="d-flex justify-content-between align-items-center my-2">
            <template v-if="post.likes.length">
                <div class="d-flex align-items-center">
                    <div style="width:22px;height:22px"
                        class=" d-flex justify-content-center align-items-center rounded-circle me-1"
                        v-for="i in postReactions" :key="i" data-bs-toggle="tooltip" :data-bs-title="capitalize(i)"
                        :class="`bg-${icons[i].color}`">
                        <i class="fas text-white" :class="icons[i].icon"></i>
                    </div>
                    <a @click.prevent="getReactionUsers(`#reaction-users-${post.id}`)" class="fw-bold btn btn-sm"
                        href="#">{{ post.likes.length }}</a>
                </div>
            </template>
            <span class="small" v-else>Be the first to react!</span>
            <div class="d-flex justify-content-end  small align-items-center">
                <a href="" class="btn-link text-dark" @click.prevent="getComments">{{ post.comments_count }}
                    Comment{{ post.comments_count == 1 ? '' : 's' }}</a>
            </div>
        </div>
        <div class="d-flex justify-content-between  rounded-0 border-top border-bottom" role="group"
            style="border-color: #37373721 !important;">
            <Link as="button" :preserve-state="false" :preserve-scroll="true" :href="route('like.destroy')" method="delete"
                :data="{ likeable_type: 'App\\Models\\Post', user_id: $page.props.auth.user.id, id: currentUserReaction.id, likeable_id: post.id, }"
                class="btn btn hover btn-white text-capitalize w-100" v-if="currentUserReaction">
            <span :class="`fw-bold text-${icons[currentUserReaction.reaction].color}`">
                <i class="fal me-1" :class="icons[currentUserReaction.reaction].icon"></i>
                {{ currentUserReaction.reaction }}
            </span>
            </Link>
            <div v-else class="dropup w-100">
                <button data-bs-toggle="dropdown" class="w-100 btn hover btn-white text-capitalize">
                    <span>
                        <i class="fal fa-thumbs-up me-1"></i>
                        Like
                    </span>
                </button>
                <div class="dropdown-menu shadow-lg border border-dark">
                    <div class="d-flex justify-content-evenly">
                        <Link data-bs-toggle="tooltip" :data-bs-title="`${capitalize(i)}`" as="button"
                            :preserve-state="false" :preserve-scroll="true" :href="route('like.store')" method="post"
                            :data="{ likeable_type: 'App\\Models\\Post', user_id: $page.props.auth.user.id, likeable_id: post.id, reaction: i }"
                            v-for="i in Object.keys(icons)" :key="i" class="btn">
                        <i class="fad font-size-24" :class="`${icons[i].icon} text-${icons[i].color}`"></i>
                        <span class="d-block d-md-none">{{ capitalize(i) }}</span>
                        </Link>
                    </div>
                </div>

            </div>
            <button @click.prevent="getComments" class="w-100 btn hover"><i class="fal fa-comment"></i>
                Comment</button>
            <div class="dropup w-100">
                <button class="btn w-100 hover" type="button" data-bs-toggle="dropdown">
                    <i class="fal fa-share"></i>
                    Share
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" @click.prevent="share('whatsapp')"><i
                            class="fab fa-whatsapp me-2"></i> Share to Whatsapp</a>
                    <a class="dropdown-item " href="#" @click.prevent="share('telegram')"><i
                            class="fab fa-telegram me-2"></i>Share
                        to
                        Telegram</a>
                </div>
            </div>
        </div>
        <div v-if="showComments" class="mt-2">
            <comment-item v-for="comm in comments" :key="comm" :comment="comm"></comment-item>
            <comment-form @submit="getComments();" commentable_type="App\Models\Post" :commentable_id="post.id" />
        </div>
        <div class="modal fade" :id="`reaction-users-${post.id}`" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog">
            <div class="modal-dialog modal-dialog-scrollable  modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Reactions</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style="max-height:80vh">
                        <ul class="nav nav-tabs mb-2" role="tablist">
                            <li class="nav-item " role="presentation">
                                <a class="nav-link " :class="{ 'text-bg-primary': tab == 'all' }"
                                    @click.prevent="tab = 'all'" type="button">All <span
                                        class="ms-1 fw-bold">{{ post.likes.length }}</span></a>
                            </li>
                            <li class="nav-item" role="presentation" v-for="i in postReactions" :key="i">
                                <a class="nav-link" :class="tab == i ? 'text-bg-primary' : `text-${icons[i].color}`"
                                    type="button" @click.prevent="tab = i">
                                    <span>
                                        <i class="fad me-1" :class="icons[i].icon"></i>
                                        {{ capitalize(i) }}
                                        <span
                                            class="ms-1 fw-bold">{{ post.likes.filter(e => e.reaction == i).length }}</span>
                                    </span>
                                </a>
                            </li>
                        </ul>

                        <ul class="list-group list-group-flush">
                            <li v-for="i in tab == 'all' ? reactionUsers : reactionUsers.filter(e => e.reaction == tab)"
                                :key="i" class="list-group-item p-0 mb-2 list-group-item-action">
                                <div class="d-flex align-items-center">
                                    <div class="me-3 flex-shrink-0">
                                        <img loading="lazy" :src="i.avatar ?? 'assets/images/no-profilepics.png'"
                                            class="avatar avatar-sm rounded-circle img-thumbnail">
                                    </div>
                                    <div class="flex-grow-1 lh-sm">
                                        <h6 class="mb-1 fw-bold">
                                            <Link class="stretched-link" @click.prevent="modal.hide()"
                                                :href="route('profile.index', { slug: i.slug })">
                                            {{ i.firstname }} {{ i.lastname }}
                                            </Link>
                                        </h6>
                                        <p class="mb-0">{{ i.headline }}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.btn.hover:hover {
    background: var(--bs-light)
}
</style>