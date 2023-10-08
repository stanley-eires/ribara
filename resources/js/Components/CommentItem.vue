<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import moment from 'moment';
import { computed, ref } from 'vue';
import CommentForm from './CommentForm.vue';
import ReactionButtons from './ReactionButtons.vue';
import GiGridImages from '@chinhpd/vue3-grid-images';
import { capitalize, uniq } from 'lodash';

let props = defineProps( { comment: Object } )
let emit = defineEmits( [ 'change' ] )
let icons = { like: { icon: 'fa-thumbs-up', color: 'success' }, dislike: { icon: 'fa-thumbs-down', color: 'danger' }, support: { icon: 'fa-handshake', color: 'primary' }, insightful: { icon: 'fa-lightbulb', color: 'info' }, celebrate: { icon: 'fa-hands-clapping', color: 'warning' } }
let postReactions = computed( () => uniq( props.comment.likes.map( e => e.reaction ) ) );
let currentUserReaction = computed( () => {
    return props.comment.likes.find( e => e.user_id == usePage().props.auth.user.id );
} )
let modal = ref();
let content = ref( "" );
let showReplyForm = ref( false );
let showComments = ref( false );
let comments = ref( [] );
let tab = ref( 'all' );
let reactionUsers = ref( [] );
let form = useForm( {
    user_id: usePage().props.auth.user.id,
    content: null,
    commentable_id: props.comment.commentable_id,
    parent_id: props.comment.id,
    commentable_type: "App\\\Models\\\Comment",
} )
let replies = computed( () => props.comment.replies );
let handleSubmit = () => {
    form.post( route( 'comment.reply.store' ), { preserveScroll: true, preserveState: false, onSuccess: () => emit( 'change' ) } )
}

let getReactionUsers = ( id ) => {
    axios.get( route( 'like.show', { likeable_id: props.comment.id, likeable_type: 'App\\Models\\Comment' } ) )
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
    axios.get( route( 'comment.show', { commentable_type: 'App\\Models\\Comment', parent_id: props.comment.id } ) )
        .then( response => {
            comments.value = response.data;
        } )
        .catch( error => {
            console.error( error );
        } )
}
</script>
<template>
    <template v-if="content && content.length">
        <comment-form :post-id="comment.post_id" :content="content" :comment-id="comment.id">
            <template #footer>
                <a href="#" class="small" @click.prevent="content = ''">Press to cancel</a>
            </template>
        </comment-form>
    </template>
    <div v-else class="d-flex  mb-3">
        <div class="me-1 flex-shrink-0">
            <img loading="lazy" :src="comment.user.avatar ?? 'assets/images/no-profilepics.png'"
                class="avatar avatar-sm rounded-circle img-thumbnail">
        </div>
        <div class="flex-grow-1">
            <div class="py-2 px-3 bg-light rounded-3">
                <div class="dropdown float-end" v-if="comment.user.id == $page.props.auth.user.id">
                    <button style="" class="btn btn-sm " type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                    <div class="dropdown-menu">
                        <button @click.prevent="content = comment.content" v-if="comment.content" class="dropdown-item"
                            href="#">Edit</button>
                        <Link method="delete" as="button" :href="route('comment.destroy')" :preserve-state="false"
                            :preserve-scroll="true" class="dropdown-item" :data="{ id: comment.id }">Delete
                        </Link>
                    </div>
                </div>
                <p class="mb-1 fw-bold">
                    <Link class="text-reset" :href="route('profile.index', { slug: comment.user.slug })">
                    {{ comment.user.fullname }}</Link>
                </p>
                <div v-if="comment.commentmeta && comment.commentmeta.type == 'image' && comment.commentmeta.url"
                    class="mb-2 " style="width:100%;height:200px;object-fit:contain">
                    <GiGridImages :cells="3" :items="[comment.commentmeta.url]" />
                </div>
                <p v-else class="mb-0 " style="white-space: pre-line" v-html="comment.content"></p>
                <p class="text-end mb-0 small">{{ moment(comment.created_at).fromNow() }} <small
                        :title="moment(comment.updated_at).fromNow()"
                        v-if="comment.created_at !== comment.updated_at">(edited)</small></p>
            </div>
            <div class="d-flex align-items-center">
                <Link as="button" :preserve-state="false" :preserve-scroll="true" :href="route('like.destroy')"
                    method="delete"
                    :data="{ likeable_type: 'App\\Models\\Comment', user_id: $page.props.auth.user.id, id: currentUserReaction.id, likeable_id: comment.id, }"
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
                            <Link as="button" :preserve-state="false" :preserve-scroll="true" :href="route('like.store')"
                                method="post"
                                :data="{ likeable_type: 'App\\Models\\Comment', user_id: $page.props.auth.user.id, likeable_id: comment.id, reaction: i }"
                                v-for="i in Object.keys(icons)" :key="i" class="btn" :title="capitalize(i)"><i
                                class="fad font-size-24" :class="`${icons[i].icon} text-${icons[i].color}`"></i></Link>
                        </div>
                    </div>
                </div>
                <template v-if="comment.likes.length">
                    <div class="d-flex align-items-center">
                        <div style="width:16px;height:16px"
                            class=" d-flex justify-content-center align-items-center rounded-circle me-1"
                            v-for="i in postReactions" :key="i" :title="capitalize(i)" :class="`bg-${icons[i].color}`">
                            <i class="fas text-white font-size-10" :class="icons[i].icon"></i>
                        </div>
                        <a @click.prevent="getReactionUsers(`#reaction-users-${comment.id}`)" class="fw-bold btn btn-sm"
                            href="#">{{ comment.likes.length }}</a>
                    </div>
                </template>

                <i style="font-size:3px" class="fa fa-circle px-2"></i> <button @click.prevent="showReplyForm = true"
                    class="btn-link btn small btn-sm">Reply</button>
            </div>
            <button @click.prevent="getComments" v-if="comment.replies_count && !showComments"
                class="btn-link btn d-block"><i class="fal fa-arrow-turn-up fa-rotate-90 me-2"></i> View
                {{ comment.replies_count > 1 ? `${comment.replies_count} replies` : ' reply' }}</button>
            <div v-if="showComments" class="mt-2">
                <comment-item v-for="comm in comments" :key="comm" :comment="comm"></comment-item>
            </div>
            <comment-form @submit="getComments();" v-if="showReplyForm" commentable_type="App\Models\Comment"
                :commentable_id="comment.commentable_id" :parent_id="comment.id" />
            <div class="modal fade" :id="`reaction-users-${comment.id}`" tabindex="-1" data-bs-backdrop="static"
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
                                            class="ms-1 fw-bold">{{ comment.likes.length }}</span></a>
                                </li>
                                <li class="nav-item" role="presentation" v-for="i in postReactions" :key="i">
                                    <a class="nav-link" :class="tab == i ? 'text-bg-primary' : `text-${icons[i].color}`"
                                        type="button" @click.prevent="tab = i">
                                        <span>
                                            <i class="fad me-1" :class="icons[i].icon"></i>
                                            {{ capitalize(i) }}
                                            <span
                                                class="ms-1 fw-bold">{{ comment.likes.filter(e => e.reaction == i).length }}</span>
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
    </div>
</template>