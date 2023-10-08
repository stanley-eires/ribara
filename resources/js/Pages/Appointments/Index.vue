<script setup>
import { ref } from "vue";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import AppointmentItem from "@/Components/AppointmentItem.vue";
let props = defineProps( { title: String, appointments: Object, segment: String, stats: Object } )
let menu = ref( [
    { name: "Upcoming", href: "?segment=upcoming", active: props.segment == 'upcoming', count: props.stats[ 'upcoming' ] },
    { name: "Requests", href: "?segment=requests", active: props.segment == 'requests', count: props.stats[ 'requests' ] },
    { name: "All Active", href: "?segment=active", active: props.segment == 'active', count: props.stats[ 'active' ] },
    { name: "Expired", href: "?segment=expired", active: props.segment == 'expired', count: props.stats[ 'expired' ] },
    { name: "Archived", href: "?segment=archived", active: props.segment == 'archived', count: props.stats[ 'archived' ] },
] )

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
            <div class="col-lg-9">
                <div class="card card-body px-3 p-2 mb-3">
                    <div class="nav nav-pills rounded-pill p-0">
                        <template v-for="i in menu" :key="i">
                            <Link class="nav-item btn rounded-pill" :class="{ 'active': i.active }" :href="i.href">
                            {{ i.name }}
                            <span class="badge badge-pill text-bg-light ms-1">{{ i.count }}</span>
                            </Link>
                        </template>
                    </div>
                </div>
                <div class="list-group list-group-flush " v-if="appointments.length">
                    <appointment-item :item="item" v-for="item in appointments" :key="item" />
                </div>
                <div v-else class="card card-body d-flex flex-column justify-content-center text-center align-items-center"
                    style="min-height:40vh">
                    <img loading="lazy" src="/assets/images/coming-soon-img.png" alt=""
                        style="width:300px;object-fit:cover">
                    <h4 class="my-3">No Result returned</h4>
                </div>
            </div>
            <div class="col-lg-3 d-none d-md-block">
                <VCalendar borderless mode="date" expanded title-position="left" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
