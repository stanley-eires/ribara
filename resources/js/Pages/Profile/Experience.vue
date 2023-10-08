<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';
import { formatStartEndDate } from '@/Scripts/helpers';


defineProps( { experiences: Object } );
defineOptions( { layout: AuthenticatedLayoutWithSidebar } )
</script>


<template>
    <Head title="Experiences" />
    <div class="card card-body">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="d-flex align-items-center justify-content-between">
                <Link :href="route('profile.index', { slug: $page.props.auth.user.slug })" class="btn"><i
                    class="fas fa-long-arrow-left   me-2 "></i>
                </Link>
                <h5 class="mb-0">Experience</h5>
            </div>
            <Link :href="route('experience.create')" class="btn"><i class="fa fa-plus font-size-18"></i></Link>
        </div>
        <template v-if="experiences.length">
            <div class="d-flex justify-content-between align-items-start mb-4" v-for="i in experiences" :key="i">
                <div class="d-flex">
                    <div class=" me-3 flex-shrink-0">
                        <img src="/assets/images/business.png" alt="" style="width:100px">
                    </div>
                    <div class="flex-grow-1">
                        <p class="mb-1 fw-bold">{{ i.title }}</p>
                        <p class="mb-0 d-flex align-items-center">{{ i.employer }} <i style="font-size:3px"
                                class="fa fa-circle px-2"></i>
                            {{ i.type }}
                        </p>
                        <p class="mb-0">{{ formatStartEndDate(i.start_end_date) }}</p>
                        <small>{{ i.industry }}</small>
                        <p>{{ i.description }}</p>
                    </div>
                </div>
                <Link :href="route('experience.edit', { id: i.id })" class="btn"><i class="fas fa-pen-alt    "></i>
                </Link>
            </div>
        </template>
        <div v-else class="jumbotron">
            <h1 class="fw-bold">No result returned</h1>
            <img src="/assets/images/404-error.png" class="w-100" />
        </div>
    </div>
</template>