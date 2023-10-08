<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';
import moment from 'moment';
defineOptions( { layout: AuthenticatedLayoutWithSidebar } )

defineProps( { certifications: Object } );
</script>


<template>
    <Head title="Certification" />
    <div class="card card-body" style="min-height:50vh">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="d-flex align-items-center justify-content-between">
                <Link :href="route('profile.index', { slug: $page.props.auth.user.slug })" class="btn"><i
                    class="fas fa-arrow-left   me-2 "></i>
                </Link>
                <h5 class="mb-0">Certifications</h5>
            </div>
            <Link :href="route('certification.create')" class="btn"><i class="fa fa-plus font-size-18"></i>
            </Link>
        </div>
        <template v-if="certifications.length">
            <div class="d-flex justify-content-between align-items-start mb-4" v-for="i in certifications" :key="i">
                <div class=" me-3 flex-shrink-0">
                    <img src="/assets/images/certificate.png" alt="" style="width:100px">
                </div>
                <div class="flex-grow-1 lh-sm">
                    <p class="mb-1 fw-bold">{{ i.title }}</p>
                    <p class="mb-1">{{ i.organization }}</p>
                    <p class="mb-1">Issued {{ moment(i.issued_date).format("MMM, YYYY") }}</p>
                    <a v-if="i.url" class="btn rounded-pill btn-sm border-primary text-primary" :href="i.url"
                        target="_blank"><i class="fa fa-link"></i> Show
                        Credentials</a>
                </div>
                <Link :href="route('certification.edit', { id: i.id })" class="btn"><i class="fas fa-pen-alt    "></i>
                </Link>
            </div>
        </template>
        <div v-else class="jumbotron">
            <h1 class="fw-bold">No result returned</h1>
            <img src="/assets/images/404-error.png" class="w-100" />
        </div>
    </div>
</template>