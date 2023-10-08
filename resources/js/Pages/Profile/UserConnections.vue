<script setup>
import UserCard from "@/Components/UserCard.vue";
import { useForm } from "@inertiajs/vue3";
import { watch } from "vue";
import { reactive } from "vue";
import { computed, onMounted, ref } from "vue";

let props = defineProps( { id: Number, isOwner: Boolean } )
let users = ref( [] );
let accepted = ref( [] )
let peers = []//computed( () => accepted.value.filter( e => e.type == 'peer' ) )
let proteges = []//computed( () => accepted.value.filter( e => e.type == 'protege' ) )
let mentors = []//computed( () => accepted.value.filter( e => e.type == 'mentor' ) )
let requests = []//computed( () => users.value.filter( e => e.status !== 'accepted' ) )

watch( ( users ) => ( value ) => {
    accepted = value
} )

let isLoading = ref( false );
let getUsers = () => {
    isLoading.value = true;
    axios.get( route( "user.connections", { id: props.id } ) ).then( response => {
        users.value = response.data;
        accepted.value = response.data.filter( e => e.status == 'accepted' )
    } )
}

onMounted( () => getUsers() )
let handleDisconnect = ( ev, reject = false ) => {
    let msg = reject ? `Are you sure you want to reject this user's request?` : `Are you sure you want to disconnect from this user?`
    if ( confirm( msg ) ) {
        useForm( ev ).delete( route( 'user.disconnect' ), { preserveState: true, onSuccess: () => getUsers() } )
    }
}
let handleAccept = ( ev ) => {
    useForm( ev ).put( route( 'user.connection.update' ), { preserveState: true, onSuccess: () => getUsers() } )
}
</script>
<template>
    {{ accepted }}
    <ul class="nav nav-tabs  nav-tabs-custom justify-content-center">
        <li class="nav-item" role="presentation">
            <button class="nav-link bg-transparent active" data-bs-toggle="tab" data-bs-target="#all" type="button"
                role="tab">All
                Connections
                <span class="badge rounded-pill bg-primary ms-2">
                    {{ accepted?.length }}</span>
            </button>
        </li>
        <!--  <li class="nav-item" role="presentation">
            <button class="nav-link  bg-transparent" data-bs-toggle="tab" data-bs-target="#peers" type="button"
                role="tab">Peers<span class="badge rounded-pill bg-primary ms-2">
                    {{ peers.length }}</span></button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link bg-transparent" data-bs-toggle="tab" data-bs-target="#proteges" type="button"
                role="tab">Proteges<span class="badge rounded-pill bg-primary ms-2">
                    {{ proteges.length }}</span></button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link bg-transparent" data-bs-toggle="tab" data-bs-target="#mentors" type="button"
                role="tab">Mentors <span class="badge rounded-pill bg-primary ms-2">
                    {{ mentors.length }}</span></button>
        </li> -->
        <!-- <li v-if="isOwner" class="nav-item" role="presentation">
            <button class="nav-link bg-transparent" data-bs-toggle="tab" data-bs-target="#requests" type="button"
                role="tab">Requests <span class="badge rounded-pill bg-primary ms-2">
                    {{ requests.length }}</span></button>
        </li> -->
    </ul>
    <!-- <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
        <span class="spinner-grow text-primary spinner-grow-md me-2" role="status">
        </span>
        <span class="fw-bold">Loading...</span>
    </div>
    <div class="modal-body" style="min-height:50vh">
        <div class="tab-content">
            <div class="tab-pane active" id="all" role="tabpanel">
                <div class="row justify-content-center">
                    <div class="col-md-3 col-6" v-for="user in accepted" :key="user">
                        <user-card @onDisconnect="handleDisconnect($event)" :is-owner="isOwner" :user="user" />
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="peers" role="tabpanel">
                <div class="row justify-content-center">
                    <div class="col-md-3 col-6" v-for="user in peers" :key="user">
                        <user-card @onDisconnect="handleDisconnect($event)" :is-owner="isOwner" :user="user" />
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="proteges" role="tabpanel">
                <div class="row justify-content-center">
                    <div class="col-md-3 col-6" v-for="user in proteges" :key="user">
                        <user-card @onDisconnect="handleDisconnect($event)" :is-owner="isOwner" :user="user" />
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="mentors" role="tabpanel">
                <div class="row justify-content-center">
                    <div class="col-md-3 col-6" v-for="user in mentors" :key="user">
                        <user-card @onDisconnect="handleDisconnect($event)" :is-owner="isOwner" :user="user" />
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="requests" role="tabpanel">
                <div class="row justify-content-center">
                    <div class="col-md-4 col-12" v-for="user in requests" :key="user">
                        <user-card @onAccept="handleAccept($event)" @onDisconnect="handleDisconnect($event, true)"
                            :is-owner="isOwner" :user="user" />
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</template>