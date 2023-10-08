<script setup>
import axios from "axios";
import { uniqBy } from "lodash";
import { onMounted, ref, watch } from "vue"

let results = ref( [] );
let isLoading = ref( false );
let keyword = ref( new URLSearchParams( window.location.search ).get( 'q' ) );
let recents = ref( [] );


let handleSearch = () => {
    if ( keyword.value ) {
        isLoading.value = true;
        axios.get( route( 'search', { q: keyword.value } ) )
            .then( response => {
                results.value = response.data;
            } )
            .catch( error => {
                console.error( error );
            } ).then( () => isLoading.value = false )
    }
}
watch( () => keyword.value, () => handleSearch(), { immediate: true } )
let saveToRecent = ( item, type ) => {
    // deleteRecentItem( item.slug )
    recents.value.unshift( { ...item, type } )
    localStorage.setItem( 'recent_search', JSON.stringify( recents.value ) )
    retrieveRecent();
}
let retrieveRecent = () => {
    if ( !localStorage.getItem( 'recent_search' ) ) {
        recents.value = [];
    } else {
        recents.value = uniqBy( JSON.parse( localStorage.getItem( 'recent_search' ) ), 'slug' );
    }
}
let deleteRecentItem = ( slug, clear = false ) => {
    if ( !clear ) {
        recents.value.splice( recents.value.findIndex( e => e.slug == slug ), 1 );
        localStorage.setItem( 'recent_search', JSON.stringify( recents.value ) )
    } else {
        localStorage.clear();
    }
    retrieveRecent();
}
onMounted( () => retrieveRecent() )
</script>
<template>
    <div class="app-search dropdown">
        <div data-bs-toggle="dropdown" data-bs-auto-close="outside" class="position-relative bg-light rounded-pill">
            <input v-model="keyword" type="search" class="form-control" placeholder="Search Ribara">
            <span class="fad fa-search"></span>
        </div>
        <div class="dropdown-menu" style="min-width:320px">
            <span v-if="isLoading" class="spinner-border spinner-border-sm text-primary text-end" role="status">
            </span>
            <div class="p-2">
                <ul v-if="keyword" class="list-group list-group-flush">
                    <li class="d-flex align-items-center list-group-item list-group-item-action px-0 py-1"
                        v-for="i in results" :key="i">
                        <div class="flex-shrink-0">
                            <img :src="i.avatar && i.avatar != 'null' ? i.avatar : '/assets/images/no-profilepics.png'"
                                class="avatar avatar-xs rounded-circle img-thumbnail">
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <h6 class="mb-0 w-100 text-truncate d-block">
                                <Link @click="saveToRecent(i, 'person')" class="text-dark stretched-link"
                                    :href="route('profile.index', { slug: i.slug })">
                                {{ i.fullname }}
                                </Link>
                            </h6>
                        </div>
                    </li>
                    <li v-if="keyword.length"
                        class="d-flex align-items-center list-group-item list-group-item-action px-0 py-1">
                        <div class="flex-shrink-0">
                            <div
                                class="avatar avatar-xs rounded-circle d-flex align-items-center justify-content-center text-bg-primary  img-thumbnail">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <Link :href="route('search.results', { tab: 'top', q: keyword })" class="text-dark">Search for
                            {{ keyword }}</Link>
                        </div>
                    </li>
                    <div v-if="keyword.length >= 3 && !results.length">
                        <div class="text-end">
                            <Link><i class="fas fa-share-from-square me-1"></i>Share Invite Link
                            </Link>

                        </div>
                    </div>
                </ul>
                <ul v-else-if="recents.length" class="list-group list-group-flush">
                    <div class="d-flex justify-content-between">
                        <h6 class="fw-bold">Recent Searches</h6>
                        <a href="" @click.prevent="deleteRecentItem(null, true)">Clear All</a>
                    </div>
                    <li class="d-flex align-items-center list-group-item list-group-item-action px-0 py-1"
                        v-for="i in recents" :key="i">
                        <div class="flex-shrink-0">
                            <img :src="i.avatar && i.avatar != 'null' ? i.avatar : '/assets/images/no-profilepics.png'"
                                class="avatar avatar-xs rounded-circle img-thumbnail">
                        </div>
                        <div class="flex-grow-1 ms-2 position-relative">
                            <h6 class="mb-0 w-100 text-truncate d-block">
                                <Link class="text-dark stretched-link" :href="route('profile.index', { slug: i.slug })">
                                {{ i.fullname }}
                                </Link>
                            </h6>
                        </div>
                        <a href="" class="btn btn-xs" @click.prevent="deleteRecentItem(i.slug)"><i
                                class="fal fa-times"></i></a>

                    </li>
                </ul>
                <p class="text-center my-2" v-else>No recent searches</p>
            </div>
        </div>
    </div>
</template>