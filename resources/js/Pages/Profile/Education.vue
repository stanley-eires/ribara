<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';
import { formatStartEndDate } from '@/Scripts/helpers';


defineProps( { educations: Object } );
defineOptions( { layout: AuthenticatedLayoutWithSidebar } )
</script>


<template>
    <Head title="Education" />
    <div class="card card-body" style="min-height:50vh">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="d-flex align-items-center justify-content-between">
                <Link :href="route('profile.index', { slug: $page.props.auth.user.slug })" class="btn"><i
                    class="fas fa-arrow-left   me-2 "></i>
                </Link>
                <h5 class="mb-0">Education</h5>
            </div>
            <Link :href="route('education.create')" class="btn"><i class="fa fa-plus font-size-18"></i></Link>
        </div>
        <template v-if="educations.length">
            <div class="d-flex justify-content-between align-items-start mb-4" v-for="i in educations" :key="i">
                <div class="d-flex">
                    <div class=" me-3 flex-shrink-0">
                        <img src="/assets/images/education.png" alt="" style="width:100px">
                    </div>
                    <div class="flex-grow-1">
                        <p class="mb-1 fw-bold">{{ i.institution }}</p>
                        <p class="mb-0">{{ formatStartEndDate(i.start_end_date) }}</p>
                        <p class="mb-0 d-flex align-items-center">{{ i.degree }} <i class="fa fa-circle mx-2"
                                aria-hidden="true" style="font-size:3px"></i>
                            {{ i.study }}
                        </p>
                    </div>
                </div>
                <Link :href="route('education.edit', { id: i.id })" class="btn"><i class="fas fa-pen-alt    "></i>
                </Link>
            </div>
        </template>
        <div v-else class="jumbotron">
            <h1 class="fw-bold">No result returned</h1>
            <img src="/assets/images/404-error.png" class="w-100" />
        </div>
    </div>
</template>