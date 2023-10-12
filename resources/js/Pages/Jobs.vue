<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
defineProps( { title: String, jobs: Object } );
</script>

<template>
    <AuthenticatedLayout>

        <Head :title="title" />
        <div class="mb-4 page-title-box d-flex align-items-center justify-content-between">
            <h3 class="mb-0 fw-bold">{{ title }}</h3>
            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                        <Link href="/"><i class="fa fa-home"></i></Link>
                    </li>
                    <li class="breadcrumb-item active">{{ title }}</li>
                </ol>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4 col-md-6 mb-3" v-for="i in jobs.data" :key="i">
                <div class="card card-body h-100 pb-0 shadow-md">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <img :src="i.logo ? i.logo : `/assets/images/posts/${i.company}.png`" class="avatar avatar-sm"
                                alt="">
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
        </div>
    </AuthenticatedLayout>
</template>