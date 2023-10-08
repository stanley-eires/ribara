<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';


defineProps( { title: String } );
defineOptions( { layout: AuthenticatedLayoutWithSidebar } )
</script>


<template>
    <Head :title="`${title} | Under Construction`" />
    <div class="card card-body d-flex flex-column justify-content-center text-center align-items-center"
        style="min-height:80vh">
        <h2>{{ title || 'Under Construction' }}</h2>
        <img src="/assets/images/maintenance.png" alt="" style="width:100%;object-fit:cover">
        <h4 class="my-3">This page is still Under Construction</h4>
        <p>Please check back in sometime</p>
        <Link :href="route('feeds')" class="btn btn-primary">Back to Home</Link>
    </div>
</template>