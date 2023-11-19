<script setup>
import AuthenticatedLayoutAdmin from '@/Layouts/AuthenticatedLayoutAdmin.vue';
import Pagination from '@/Components/Pagination.vue';
import { useForm } from '@inertiajs/vue3';
import moment from 'moment';
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

let props = defineProps( { post: Object } );

let form = useForm( {
    content: props.post?.content ?? null,
    type: props.post?.type ?? 'post',
    status: props.post?.status ?? 'published',
    admin_post: 1,
    postmeta: { type: '', video_url: '', images: [], },
} );
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

</script>
<template>
    <AuthenticatedLayoutAdmin>
        <form class="container-fluid" id="form">
            <h3 class="fw-bold">Articles: New</h3>
            <div class="d-flex bg-light p-2 mb-3">
                <button type="submit" @click.prevent="handleSubmit('save')" class="btn btn-sm btn-primary px-4 me-2"><i
                        class="fal fa-edit  me-1  "></i> Save</button>
                <button type="submit" @click.prevent="handleSubmit('close')" class="btn btn-sm btn-light px-4 me-2"><i
                        class="fal fa-check  me-1  "></i> Save & Close</button>
                <button type="submit" @click.prevent="handleSubmit('new')" class="btn btn-sm btn-light px-4 me-2"><i
                        class="fal fa-plus  me-1  "></i> Save & New</button>
                <Link :href="route('administrator.articles')" class="btn btn-sm btn-light px-4 me-2"><i
                    class="fal fa-times  me-1  "></i> Cancel
                </Link>
            </div>
            <div class="row">
                <div class="col-md-9">
                    <QuillEditor style="min-height:300px" placeholder='Share career updates, trends and opportunities'
                        v-model:content="form.content" contentType="html" theme="snow" />
                </div>
                <div class="col-md-3">
                    <div class="form-group mb-3">
                        <label>Status</label>
                        <select class="form-select" required v-model="form.status">
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                        </select>
                    </div>
                    <div class="form-group mb-4">
                        <label>Post Format</label>
                        <select class="form-select" name="">
                            <option value="post">Standard</option>
                            <option disabled value="event">Events</option>
                            <option disabled value="opportunities"> Opportunity</option>
                        </select>
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
                                <div class="row g-2">
                                    <div class="col-md-6" v-for="i in blobs" :key="i">
                                        <img loading="lazy" :src="`${i}`" style="width:100%" />
                                    </div>
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
                                title="Complete College Management System using PHP MySQL | Free Source Code Download"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen></iframe>
                        </div>
                    </div>

                    <input accept="image/*" @input="handleUpload($event)" type="file" ref="inputFile" class="d-none">
                    <div class="form-control">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <strong class="fw-bold">Add to your post</strong>
                            </div>
                            <div class="col-6 text-end">
                                <button type="button" @click.prevent="form.postmeta.type = 'image'"
                                    class="btn btn-sm text-primary"><i class="fal fa-images fa-2x"></i></button>
                                <button type="button" @click.prevent="form.postmeta.type = 'video'"
                                    class="btn btn-sm text-primary"><i class="fal  fa-film fa-2x"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </AuthenticatedLayoutAdmin>
</template>