<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import axios from 'axios';
import { ref } from 'vue';
let props = defineProps( { title: String, jobs: Object } );
let next_page_url = ref( props.jobs.next_page_url )
let alljobs = ref( props.jobs.data )
let loadMore = () => {
    if ( next_page_url.value ) {
        axios.get( next_page_url.value, { headers: { 'via-axios': true } } )
            .then( response => {
                alljobs.value = alljobs.value.concat( response.data.data );
                next_page_url.value = response.data.next_page_url
            } )
            .catch( error => {
                console.error( error );
            } )
    }
}
</script>

<template>
    <AuthenticatedLayout>

        <Head :title="title" />
        <div class="mb-4 page-title-box d-flex align-items-center justify-content-between">
            <h3 class="mb-0 fw-bold"> Internship Opportunities</h3>
            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                        <Link href="/"><i class="fa fa-home"></i></Link>
                    </li>
                    <li class="breadcrumb-item active">Opportunities</li>
                </ol>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4 col-md-6 mb-3" v-for="i in alljobs" :key="i">
                <div class="card card-body h-100 pb-0 shadow-md">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <img :src="i.logo ? i.logo : `/assets/images/posts/${i.company}.png`" class="avatar avatar-sm"
                                style="object-fit: contain;">
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="m-0 fw-bold"><a target="_blank" :href="i.url">{{ i.title }}</a></h6>
                            <p class="my-1"><i class="fad text-primary fa-city me-1"></i> {{ i.company }}</p>
                            <a target="_blank" :href="i.url" class="btn btn-outline-primary btn-sm">Apply Now <i
                                    class="fal fa-long-arrow-right ms-2" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <infinite-loading v-if="next_page_url" distance="50" direction="bottom" @infinite="loadMore"
                :firstload="true" />
        </div>
    </AuthenticatedLayout>
</template>