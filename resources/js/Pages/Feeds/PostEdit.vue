<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import CreatePostArticle from "@/Components/CreatePostArticle.vue";

let props = defineProps( { post: Object } )

let form = useForm( props.post )
// let blobs = ref( props.post.attachments.map( e => e.url ) );
// let handleUpload = ( ev ) => {
//     form.attachments.push( ev.target.files[ 0 ] );
//     blobs.value.push( URL.createObjectURL( ev.target.files[ 0 ] ) )
// }
// let resetUpload = () => {
//     blobs.value = [];
//     form.attachments = []
// }
// let handleSubmit = () => {
//     form.transform( ( data ) => ( { ...data, _method: 'put' } ) ).post( route( 'post.update' ) );
// }

</script>


<template>
    <Head title="Edit Post" />
    <AuthenticatedLayoutWithSidebar>
        <div class="card rounded-3  p-3">
            <div class="d-flex mb-3 justify-content-between align-items-center">
                <Link :href="route('post.show', { id: post.id })" class="btn rounded-pill"><i
                    class="fad fa-long-arrow-left me-2"></i>
                Return
                to Post</Link>
            </div>
            <create-post-article v-if="post.type == 'post'" :post="post" />
            <!-- <form @submit.prevent="handleSubmit" class="modal-body">
                <div class="d-flex mb-3">
                    <div class="me-3 flex-shrink-0">
                        <img :src="$page.props.auth.user.avatar ?? '/assets/images/no-profilepics.png'"
                            class="avatar avatar-md rounded-circle img-thumbnail">
                    </div>
                    <div class="flex-grow-1 lh-sm">
                        <h6 class="mb-1 fw-bold">
                            {{ $page.props.auth.user.fullname }}
                        </h6>
                        <div class="dropdown open">
                            <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown">
                                <i class="fal fa-globe me-1"></i> Everyone
                                <i class="fa-chevron-down far"></i> </button>
                            <div class="dropdown-menu">
                                <button disabled class="dropdown-item" href="#"><i class="fad fa-lock-alt me-1"></i>
                                    Only
                                    me</button>
                                <button disabled class="dropdown-item" href="#"> <i
                                        class="fad fa-user-friends me-1"></i>Your
                                    Connections</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <QuillEditor placeholder='What would you like to share today?' v-model:content="form.content"
                        contentType="html" theme="bubble" />
                </div>
                <div v-if="blobs.length" class="p-2 mb-3 border-secondary border  shadow-none rounded-3">
                    <button @click.prevent="resetUpload" style="position: absolute;right:20px;z-index:1"
                        class="btn bg-light rounded-circle"><i class="far fa-times"></i></button>
                    <div class="row">
                        <div class="col-12 mb-2">
                            <button @click.prevent="$refs.inputFile.click()" class="btn btn-dark btn-sm"><i
                                    class="fa fa-plus-circle" aria-hidden="true"></i> Add Photos</button>
                        </div>
                        <div class="col-md-3" v-for="i in blobs" :key="i">
                            <img :src="`${i}`" style="width:100%" />
                        </div>
                    </div>
                </div>
                <button v-else @click.prevent="$refs.inputFile.click()" id="add-image"
                    class="card collapse card-body shadow-none rounded-3 align-items-center w-100 justify-content-center border-secondary"
                    style="height:150px">
                    <i class="fad fa-file-image fa-4x mb-3"></i>
                    <h4>Add photos to post</h4>
                </button>
                <input accept="image/*" @input="handleUpload($event)" type="file" ref="inputFile" class="d-none">
                <div class="d-flex justify-content-between">
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#add-image" class="btn btn-sm"><i
                            class="fat fa-images fa-2x"></i></button>
                    <button type="submit" :disabled="form.content.length < 10 && form.attachments.length == 0"
                        class="btn btn-primary px-4"> Update</button>
                </div>
            </form> -->
        </div>
    </AuthenticatedLayoutWithSidebar>
</template>