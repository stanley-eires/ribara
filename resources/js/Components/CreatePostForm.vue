<script setup>
import { useForm } from "@inertiajs/vue3";
import { computed, onMounted, ref } from "vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import CreatePostArticle from "./CreatePostArticle.vue";

let modal = null;
let type = ref( 'post' )
onMounted( () => {
    modal = new bootstrap.Modal( "#createPostModal", {} )
} )
let hideModal = ( ev ) => {
    modal.hide();
}


</script>
<template>
    <div @click="modal.show()" class="card card-body shadow-sm">
        <div class="d-flex">
            <div class="me-2 flex-shrink-0">
                <img :src="$page.props.auth.user.avatar ?? '/assets/images/no-profilepics.png'"
                    class="avatar avatar-xs rounded-circle shadow-sm border-secondary border-2 border">
            </div>
            <div class="flex-grow-1 lh-sm">
                <input class="form-control border-secondary border-2 border p-2 rounded-pill rounded-4 bg-light"
                    placeholder="Share career updates and opportunities">
                <hr class="my-1">
                <div class="d-flex justify-content-around align-items-center">
                    <button class="btn text-nowrap w-100 border-0"><i class="fad me-2 fas fa-photo-film text-primary"></i>
                        Photo/video</button>
                    <button class="btn  w-100 border-0"><i class="fad me-2 fa-calendar-days text-primary"></i>
                        Event</button>
                    <button class="btn d-none d-md-block w-100"><i class="fad me-2 fa-file-lines text-primary"></i> Write
                        post</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="createPostModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog">
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
</template>