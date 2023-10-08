<script setup>
import { computed } from "vue";

let props = defineProps( { post: Object, mode: String } )
let commentObject = computed( () => {
    let count = props.post.comments_count;
    return {
        count,
        label: `${ count } ${ count == 0 || count > 1 ? "Comments" : "Comment" }`
    }
} );
</script>
<template>
    <button v-if="mode == 'button'" data-bs-toggle="collapse" :data-bs-target="`#post${post.id}`" class="btn ps-0"><i
            class="fal fa-comments"></i></button>
    <span v-else-if="mode = 'label'" data-bs-toggle="collapse"
        :data-bs-target="`#post${post.id}`">{{ commentObject.label }}</span>
</template>