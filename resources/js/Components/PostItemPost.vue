<script setup>
import { truncate } from "lodash";
import { stripHtml } from '@/Scripts/helpers';
import { ref } from 'vue';
import GiGridImages from '@chinhpd/vue3-grid-images';
let props = defineProps( { post: Object, full: Boolean } )
let viewfull = ref();
let embedUrl = ( url ) => {
    let id = url.split( '?v=' )[ 1 ];
    if ( id ) {
        return `https://www.youtube.com/embed/${ id }`
    }
}
</script>
<template>
    <div class="row">
        <div class="col-12" :class="{ 'order-1': full }">
            <div v-if="full" style="white-space: pre-wrap;" v-html="post.content"> </div>
            <a v-else class="text-reset" href="" @click.prevent="viewfull = !viewfull">
                <div v-if="viewfull">
                    <div v-html="post.content"></div>
                </div>
                <p v-else>
                    {{ truncate(stripHtml(post.content), { length: 200, omission: "... see more", separator: /,? +/ }) }}
                </p>
            </a>
        </div>
        <div class="col-12" :class="{ 'order-0': full }">
            <div v-if="post.postmeta.type == 'image' && post.postmeta.images.length" class="w-100 mb-2 "
                style="height:300px">
                <GiGridImages class="rounded-4 overflow-hidden" :cells="3" :items="post.postmeta.images" />
            </div>
            <div v-else-if="post.postmeta.type == 'video' && post.postmeta.video_url"
                class="ratio ratio-16x9 rounded-4 overflow-hidden">
                <iframe :src="embedUrl(post.postmeta.video_url)"
                    title="Complete College Management System using PHP MySQL | Free Source Code Download" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>
<style scoped>
.gi-more {
    z-index: 1
}
</style>