<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import axios from "axios";
import { onMounted, ref } from "vue";
import UserCard from '@/Components/UserCard.vue';
let users = ref( [] );

let isLoading = ref( true );
const getSuggestions = async () => {
    isLoading.value = true;
    try {
        let response = await axios.get( route( "users.suggestions" ) );
        users.value = response.data;
    } catch ( error ) {
        console.error( error )
    } finally {
        isLoading.value = false;
    }

}
onMounted( async () => {
    getSuggestions()
} )

</script>
<template>
    <template v-if="isLoading">
        <ul class="list-group list-group-flush" v-for="i in 7" :key="i">
            <li class="list-group-item ">
                <div class="d-flex">
                    <div class="flex-shrink-0 me-2">
                        <div class="avatar placeholder placeholder-wave rounded-circle"></div>
                    </div>
                    <div class="row w-100">
                        <div class="col-7">
                            <h6 class="mb-0 placeholder placeholder-lg w-75 placeholder-wave"></h6>
                            <p class="mb-0 placeholder w-100 placeholder-wave"></p>
                        </div>
                        <div class="col-5 text-end">
                            <a href="#" tabindex="-1"
                                class="btn btn-sm bg-dark disabled placeholder w-100 placeholder-wave"></a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </template>
    <ul class="list-group list-group-flush">
        <template v-if="users.length">
            <li class="list-group-item" v-for="i in users" :key="i">
                <user-card :user="i" mode="list"></user-card>
            </li>
        </template>
        <div v-else class="d-flex justify-content-center align-items-center">
            <button @click.prevent="getSuggestions" class="btn btn-lg d-flex  align-items-center">
                <i class="fal fa-arrows-rotate fa-3x me-2"></i> Reload
            </button>
        </div>
    </ul>
</template>