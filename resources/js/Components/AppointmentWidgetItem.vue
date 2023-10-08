<script setup>
import { usePage } from "@inertiajs/vue3";
import moment from "moment";
import { computed, ref } from "vue"

let props = defineProps( { item: Object, mode: String } )
let isHost = computed( () => {
    let current_user = usePage().props.auth.user.id;
    return props.item.host == current_user;
} )
let user = computed( () => {
    return isHost.value ? props.item.friend_user : props.item.host_user
} )

</script>
<template>
    <a href="#" @click.prevent="$emit('onClick', { item, user })"
        class="list-group-item mb-2 list-group-item-action p-1 bordered-item list-group-item-action">
        <div class="row align-items-center g-1">
            <div class="col-10 text-truncate">
                <img :src="user.avatar ?? 'assets/images/no-profilepics.png'"
                    class="avatar rounded-circle float-start me-1">
                <span class="w-100">Appointment with {{ user.fullname }}
                </span>
                <small class="d-block text-muted">
                    {{ moment(props.item.appointment_timestamp, 'X').fromNow().replace('in', 'in about') }} time</small>
            </div>
            <div class="col-2 small text-end fw-bold">{{ moment(props.item.appointment_timestamp, 'X').format('hh:mm a') }}
            </div>
        </div>
    </a>
</template>