<script setup>
import { Link } from "@inertiajs/vue3"

defineProps( {
    data: Object,
    simple: Boolean
} )
</script>
<template>
    <nav v-if="simple">
        <ul class="pagination pagination-sm mb-0">
            <li class="page-item p-0" :class="{ disabled: !data.prev_page_url }">
                <Link class="page-link" :href="data.prev_page_url">
                <i class="fa fa-long-arrow-left"></i>
                </Link>
            </li>
            <li class="page-item p-0" :class="{ disabled: !data.next_page_url }">
                <Link class="page-link" :href="data.next_page_url">
                <i class="fa fa-long-arrow-right"></i>
                </Link>
            </li>
        </ul>
    </nav>
    <template v-else>
        <nav aria-label="Page navigation" v-if="data.links.length > 3">
            <ul class="pagination  pagination-sm  ">
                <template v-for="(link, index) in data.links" :key="index">
                    <li class="page-item disabled" v-if="link.url === null">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true" v-html="link.label"></span>
                        </a>
                    </li>
                    <li class="page-item" :class="{ 'active': link.active }" aria-current="page" v-else>
                        <Link class="page-link" :href="link.url"><span v-html="link.label"></span>
                        </Link>
                    </li>
                </template>
            </ul>
        </nav>
    </template>
</template>


