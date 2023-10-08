<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import AppointmentWidgetItem from "./AppointmentWidgetItem.vue";
import moment from "moment";
import { usePage } from "@inertiajs/vue3";

let item = ref( null )
let appointments = ref( [] );
let attributes = computed( () => {
    let att = [];
    appointments.value.forEach( ( x ) => {
        att.unshift( {
            dot: {},
            dates: moment( x.appointment_timestamp, 'X' ).format( 'LL' ),
            popover: {
                label: `Appointment with ${ x.host == usePage().props.auth.user.id ? x.friend_user.fullname : x.host_user.fullname } at ${ moment( x.appointment_timestamp, 'X' ).format( 'hh:mm A' ) }`,
            },
        } )
    } )

    return att;
} )
let selected_appointment = computed( () => {

    return ( appointments.value.filter( e => moment( e.appointment_timestamp, 'X' ).format( 'LL' ) == moment( selected_date.value ).format( 'LL' ) ) );
} );
let isLoading = ref( true );
const loadData = async () => {
    isLoading.value = true;
    try {
        let response = await axios.get( route( 'appointment.get' ) );
        appointments.value = response.data;
    } catch ( error ) {
        console.log( error )
    } finally {
        isLoading.value = false;
    }
}
let selected_date = ref( new Date() )
onMounted( async () => {
    loadData()
} )

</script>

<template>
    <template v-if="!item">
        <VDatePicker :attributes='attributes' mode="date" v-model="selected_date" expanded title-position="left" borderless>
        </VDatePicker>
        <template v-if="selected_appointment.length">
            <div class="list-group list-group-flush p-2">
                <appointment-widget-item @onClick="item = $event" :item="appointment"
                    v-for="appointment in selected_appointment" :key="appointment" />
            </div>
        </template>
        <p v-else class="text-center"><i class="fas fa-calendar me-2"></i> No Scheduled Appointment</p>
    </template>
    <div v-else class="card-body">
        <div class="d-flex align-items-center mb-4">
            <a href="#" @click.prevent="item = null" class="me-5"><i class="fas fa-chevron-left me-2   "></i>Back</a>
            <p class="mb-0 fw-bold">Appointment Details</p>
        </div>
        <h5>Appointment with {{ item.user.fullname }}</h5>
        <p v-html="item.item.content"></p>
        <div>
            <label class="text-muted mb-0">Proposed Start time</label>
            <p>{{ moment(item.item.appointment_timestamp, 'X').format('dddd, LL fro\\m hh:mm A') }} to 11:00 AM
            </p>
        </div>
        <div>
            <label class="text-muted mb-0">Participants</label>
            <div class="row">
                <div class="col-md-6">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <img :src="item.item.host_user.avatar ?? 'assets/images/no-profilepics.png'"
                                class="avatar rounded-circle img-thumbnail">
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <small class="mb-0 text-muted">Invitation From</small>
                            <h6>
                                <Link :href="route('profile.index', { slug: item.item.host_user.slug })">
                                {{ item.item.host_user.fullname }}</Link>
                            </h6>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <img :src="item.item.friend_user.avatar ?? 'assets/images/no-profilepics.png'"
                                class="avatar rounded-circle img-thumbnail">
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <small class="mb-0 text-muted">Invitee</small>
                            <h6>
                                <Link :href="route('profile.index', { slug: item.item.friend_user.slug })">
                                {{ item.item.friend_user.fullname }}</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.bordered-item {
    border-left: 3px solid rgba(40, 139, 9, 0.712);
}
</style>