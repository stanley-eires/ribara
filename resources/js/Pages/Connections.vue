<script setup>
import { ref } from "vue";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
let props = defineProps( { title: String, users: Object, stream: String, stats: Object } )
import UserCard from '@/Components/UserCard.vue';
import { sum } from "lodash";

let menu = ref( [
    { title: "All Connections", icon: 'fal fa-person-circle-check', href: route( 'connections' ), active: !props.stream, count: sum( [ props.stats[ 'peer' ], props.stats[ 'protege' ], props.stats[ 'mentor' ] ] ) },
    { title: " Requests", icon: 'fal fa-person-circle-exclamation', href: route( 'connections', { stream: 'requests' } ), active: props.stream == 'requests', count: props.stats[ 'requests' ] },
    { title: "Mentors", icon: 'fal fa-person-breastfeeding', href: route( 'connections', { stream: 'mentor' } ), active: props.stream == 'mentor', count: props.stats[ 'mentor' ] },
    { title: "Proteges", icon: 'fal fa-baby', href: route( 'connections', { stream: 'protege' } ), active: props.stream == 'protege', count: props.stats[ 'protege' ] },
    { title: "Peers", icon: 'fal fa-person-dots-from-line', href: route( 'connections', { stream: 'peer' } ), active: props.stream == 'peer', count: props.stats[ 'peer' ] },
] )
</script>
<template>
    <AuthenticatedLayout>

        <Head :title="title" />
        <div class="row">
            <div class="col-md-3">
                <div class="fixed-sidebar">
                    <h5 class="fw-bold mb-0 p-3">{{ title }}</h5>
                    <div class="card overflow-auto rounded-0">
                        <div class="list-group lh-lg flex-row flex-md-column list-group-flush ">
                            <Link :href="i.href" v-for="i in  menu " :key="i" class="list-group-item list-group-item-action"
                                :class="{ 'text-white active': i.active }">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" font-size-22" :class="i.icon"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="mb-0 text-reset text-nowrap">{{ i.title }}</h6>
                                </div>
                                <div class="text-nowrap">
                                    <span class="badge text-bg-dark mx-2">{{ i.count }}</span>
                                    <i class="fal fa-angle-right"></i>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9 main">
                <div class="row">
                    <template v-if="users.length">
                        <div class="col-xl-3  col-md-4 col-6" v-for=" i  in  users " :key="i">
                            <user-card :user="i" />
                        </div>
                    </template>
                    <div v-else class="col-md-8 text-center">
                        <div class="jumbotron">
                            <img src="/assets/images/404-error.png" class="w-100" />
                            <h1 class="fw-bold">No result returned</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
.fixed-sidebar {
    position: fixed;
    width: 250px;
    z-index: 1;
}

@media (max-width: 767.98px) {
    .fixed-sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        margin-top: 70px;
        background-color: #f8f9fa;
        border-right: 1px solid #dee2e6;

    }

    .main {
        margin-top: 100px
    }
}
</style>