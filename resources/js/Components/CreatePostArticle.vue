<script setup>
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
let props = defineProps( { post: Object } );
let emit = defineEmits( [ 'close' ] );

let form = useForm( props.post ? props.post : {
    type: 'post', content: "", audience: 'public',
    postmeta: { type: '', video_url: '', images: [], },
} )

let blobs = ref( props.post?.postmeta && props.post.postmeta.type == 'image' && props.post.postmeta.images.length ? props.post.postmeta.images : [] );
let handleUpload = ( ev ) => {
    form.postmeta.images.push( ev.target.files[ 0 ] );
    blobs.value.push( URL.createObjectURL( ev.target.files[ 0 ] ) )
}
let resetUpload = () => {
    blobs.value = [];
    form.postmeta.type = "";
    form.postmeta.video_url = "";
    form.postmeta.images = [];
}
let handleSubmit = () => {
    if ( props.post ) {
        form.transform( ( data ) => ( { ...data, _method: 'put' } ) ).post( route( 'post.update' ) );
    } else {
        form.post( route( 'post.save' ), { preserveState: false, preserveScroll: true, onStart: () => emit( 'close' ) } );
    }
}
let embedUrl = ( url ) => {
    let id = url.split( '?v=' )[ 1 ];
    if ( id ) {
        return `https://www.youtube.com/embed/${ id }`
    }
}
</script>
<template>
    <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="d-flex mb-3">
            <div class="me-3 flex-shrink-0">
                <img loading="lazy" :src="$page.props.auth.user.avatar ?? '/assets/images/no-profilepics.png'"
                    class="avatar avatar-sm rounded-circle img-thumbnail">
            </div>
            <div class="flex-grow-1 lh-sm">
                <h6 class="mb-1 fw-bold">
                    <strong>{{ $page.props.auth.user.fullname }}</strong>
                </h6>
                <div class="dropdown open">
                    <button class="btn text-bg-secondary btn-sm badge p-1" type="button" data-bs-toggle="dropdown">
                        <span v-if="form.audience == 'public'"><i class="fal fa-globe me-1"></i> Public</span>
                        <span v-else-if="form.audience == 'connections'"><i class="fal fa-user-friends me-1"></i> Your
                            connections</span>
                        <span v-else-if="form.audience == 'only-me'"><i class="fal fa-lock-alt me-1"></i> Only me</span>

                        <i class="fa-chevron-down far ms-2"></i> </button>
                    <div class="dropdown-menu">
                        <button @click.prevent="form.audience = 'public'" class="dropdown-item" href="#"><i
                                class="fad fa-globe me-1"></i>Public</button>
                        <button @click.prevent="form.audience = 'connections'" class="dropdown-item" href="#"> <i
                                class="fad fa-user-friends me-1"></i>Your
                            Connections</button>
                        <button @click.prevent="form.audience = 'only-me'" class="dropdown-item" href="#"><i
                                class="fad fa-lock-alt me-1"></i>
                            Only me</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group mb-3">
            <QuillEditor style="min-height:150px" placeholder='Share career updates, trends and opportunities'
                v-model:content="form.content" contentType="html" theme="snow" />
        </div>
        <div v-if="form.postmeta.type == 'image'" class="form-control position-relative mb-2">
            <button @click.prevent="resetUpload" class="position-absolute top-0 btn rounded-circle btn-light"
                style="right:0"><i class="fas fa-times"></i></button>
            <div v-if="blobs.length" class="p-2 mb-3 border-secondary border  shadow-none rounded-3">
                <div class="row">
                    <div class="col-12">
                        <button @click.prevent="$refs.inputFile.click()" class="btn btn-light btn-sm mb-1"><i
                                class="fa fa-plus-circle" aria-hidden="true"></i> Add Photos</button>
                    </div>
                    <div class="col-md-3" v-for="i in blobs" :key="i">
                        <img loading="lazy" :src="`${i}`" style="width:100%" />
                    </div>
                </div>
            </div>
            <button v-else @click.prevent="$refs.inputFile.click()" type="button" id="add-image"
                class="btn d-flex flex-column align-items-center stretched-links w-100 justify-content-center"
                style="height:150px">
                <i class="fad rounded-circle bg-light fa-file-image fa-2x mb-3"></i>
                <p>Add photos to post</p>
            </button>
        </div>
        <div v-if="form.postmeta.type == 'video'" class="position-relative mb-2">
            <h6>Post a video</h6>
            <button @click.prevent="resetUpload" class="position-absolute top-0 btn rounded-circle btn-light"
                style="right:0;z-index: 2"><i class="fas fa-times"></i></button>
            <div>

                <div class="mb-3">
                    <input class="form-control" v-model="form.postmeta.video_url"
                        placeholder="Paste URL (example: https://www.youtube.com/watch?v=1sSz4F3TarI)">
                </div>
            </div>
            <div v-if="form.postmeta.type == 'video' && form.postmeta.video_url" class="ratio ratio-16x9">
                <iframe :src="embedUrl(form.postmeta.video_url)"
                    title="Complete College Management System using PHP MySQL | Free Source Code Download" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
            </div>
        </div>

        <input accept="image/*" @input="handleUpload($event)" type="file" ref="inputFile" class="d-none">
        <div class="form-control">
            <div class="row align-items-center">
                <div class="col-6">
                    <strong>Add to your post</strong>
                </div>
                <div class="col-6">
                    <button type="button" @click.prevent="form.postmeta.type = 'image'" class="btn btn-sm text-primary"><i
                            class="fad fa-images fa-2x"></i></button>
                    <button type="button" @click.prevent="form.postmeta.type = 'video'" class="btn btn-sm text-primary"><i
                            class="fad  fa-film fa-2x"></i></button>
                </div>
            </div>
        </div>
        <button type="submit" :disabled="!form.content && !form.postmeta.type" class="btn btn-primary mt-2 px-4 w-100">
            {{ form.id ? 'Update' : 'Create' }} {{ form.type }}
            <span v-if="form.processing" class="spinner-grow text-white spinner-grow-sm ms-2"></span></button>
    </form>
</template>