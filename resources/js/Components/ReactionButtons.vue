<script setup>
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";
let props = defineProps( { likeable: Object } )

let likeObject = computed( () => {
    let likes = props.likeable.likes.filter( e => e.reaction == 'like' );
    return {
        liked: likes.map( e => e.user_id ).includes( usePage().props.auth.user.id ),
        count: likes.length
    }
} );
let dislikeObject = computed( () => {
    let likes = props.likeable.likes.filter( e => e.reaction == 'dislike' );
    return {
        liked: likes.map( e => e.user_id ).includes( usePage().props.auth.user.id ),
        count: likes.length
    }
} );

</script>
<template>
    <Link :href="route('comment.actions')" method="POST"
        :data="{ likeable_id: likeable.id, reaction: 'like', user_id: $page.props.auth.user.id }" :preserve-scroll="true"
        :preserve-state="false" class="text-body me-3">
    <i class="fa-thumbs-up me-1" :class="likeObject.liked ? 'text-primary fas' : 'fal'"></i>
    <span>{{ likeObject.count }}</span>
    </Link>
    <Link :href="route('comment.actions')" method="POST"
        :data="{ likeable_id: likeable.id, reaction: 'dislike', user_id: $page.props.auth.user.id }" :preserve-scroll="true"
        :preserve-state="false" class="text-body me-3">
    <i class="fa-thumbs-down me-1" :class="dislikeObject.liked ? 'text-primary fas' : 'fal'"></i>
    <span>{{ dislikeObject.count }}</span>
    </Link>
</template>