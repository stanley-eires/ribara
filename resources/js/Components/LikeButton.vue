<script setup>
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

let props = defineProps( { post: Object, mode: String } )

let likeObject = computed( () => {
    let likeCount = props.post.likes.length;
    return {
        liked: props.post.likes.map( e => e.user_id ).includes( usePage().props.auth.user.id ),
        label: `${ likeCount } ${ likeCount == 0 || likeCount > 1 ? "Likes" : "Like" }`
    }
} );
</script>
<template>
    <button v-if="mode == 'button'" as="button" method="POST"
        @click.prevent="$emit('onPress', { user_id: $page.props.auth.user.id, likeable_id: post.id })" class="btn"><i
            class="fa-heart" :class="likeObject.liked ? 'text-danger fas' : 'fal'"></i>
    </button>
    <span v-else-if="mode = 'label'">{{ likeObject.label }}</span>
</template>