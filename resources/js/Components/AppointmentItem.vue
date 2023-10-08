<script setup>
import { _btoa } from "@/Scripts/helpers";
import { useForm, usePage } from "@inertiajs/vue3";
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
let note = ref( null );
let date = ref( moment( props.item.appointment_timestamp, 'X' ).format( 'll' ) );
let start_time = ref( moment( props.item.appointment_timestamp, 'X' ) );
let modal = ref();
let showModal = ( id ) => {
    note.value = props.item.content;
    setTimeout( () => {
        modal = new bootstrap.Modal( id, {} );
        modal.show()
    } );
}
let closeModal = () => {
    note.value = null;
    modal.hide();
}

let handleDelete = () => {
    if ( confirm( `Are you sure you want to delete your appointment with (${ user.value.fullname }) which is scheduled to hold  ${ moment( props.item.appointment_timestamp, 'X' ).format( 'LLL' ) }` ) ) {
        useForm( {
            id: props.item.id
        } ).delete( route( 'appointment.destroy' ), { preserveScroll: true, preserveState: false } )
    }
}
let handleActions = ( action ) => {
    if ( confirm( `Are you sure you want to ${ action == 'accepted' ? 'accept' : 'decline' } appointment with (${ user.value.fullname }) which is scheduled to hold  ${ moment( props.item.appointment_timestamp, 'X' ).format( 'LLL' ) }` ) ) {
        useForm( {
            id: props.item.id, status: action
        } ).put( route( 'appointment.actions' ), { preserveScroll: true, preserveState: false } )
    }
}


</script>
<template>
    <div class="card card-body list-group-items" :class="item.status">
        <div class="d-flex justify-content-between">
            <div class="d-flex flex-shrink-0">
                <div class="me-3">
                    <img :src="user.avatar ?? 'assets/images/no-profilepics.png'"
                        class="avatar avatar-md rounded-circle img-thumbnail">
                </div>
            </div>
            <div class="flex-grow-1">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <p class="fw-bold font-size-16 mb-1">
                            <Link :href="route('profile.index', { slug: user.slug })">{{ user.fullname }}</Link>
                        </p>
                    </div>
                    <div class="col-md-4">
                        <label class="d-none d-md-block">Schedule Details</label>
                        <div class="d-flex flex-column">
                            <p class="mb-1 me-3"><i class="fad fa-calendar-check  me-1"></i>
                                {{ date }}
                            </p>
                            <p class="mb-1"><i class="fad fa-clock me-1"></i>
                                {{ start_time.format('hh:mm a') }} -
                                {{ start_time.add(item.duration, 'minutes').format('hh:mm a') }}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <template v-if="item.status == 'pending'">
                            <p v-if="moment(item.appointment_timestamp) < moment().format('X')"
                                class="mb-0 text-primary fw-bold"><i class="fas fa-stopwatch    "></i> Expired Schedule</p>
                            <template v-else-if="!isHost">
                                <button @click.prevent="handleActions('accepted')"
                                    class="btn btn-sm fw-bold btn-outline-success rounded-pill  px-3 me-2"><i
                                        class="fas fa-check me-1"></i>
                                    Accept</button>
                                <button @click.prevent="handleActions('declined')"
                                    class="btn btn-sm text-danger fw-bold rounded-pill px-3"><i
                                        class="fas fa-times me-1"></i>
                                    Decline</button>
                            </template>


                            <button @click.prevent="handleDelete" v-if="isHost"
                                class="btn btn-sm btn-danger rounded-pill px-3"><i class="fal fa-trash me-1"></i>
                                Delete</button>
                        </template>

                        <strong class="d-flex align-items-center text-success" v-else-if="item.status == 'accepted'"> <i
                                class="fas fa-check-circle me-2"></i>Confirmed</strong>
                        <strong class="d-flex align-items-center text-danger" v-else-if="item.status == 'declined'"> <i
                                class="fas fa-check-circle me-2"></i>Declined</strong>
                        <small v-if="item.status !== 'pending'">Last activity:
                            {{ moment(item.updated_at).fromNow() }}</small>

                    </div>
                </div>
            </div>
            <div class="d-flex flex-column  align-items-start justify-content-start">
                <a :href="`tel:${user.phone}`" v-if="!isHost" class="btn text-primary"><i class="fad fa-phone"></i></a>
                <Link :href="route('messages.index', { id: _btoa({ type: 'user', id: user.id }) })"
                    class="btn text-primary"><i class="fad fa-comments"></i></Link>
                <button data-bs-toggle="collapse" :href="`#appointment_note_${item.id}`" class="btn text-primary"><i
                        class="fad fa-sticky-note"></i></button>
            </div>
        </div>
        <div class="collapse" :id="`appointment_note_${item.id}`">
            {{ item.content }}
        </div>
    </div>
</template>
<style scoped>
.pending {
    border-left: 7px solid rgba(228, 192, 14, 0.712);
}

.declined {
    border-left: 7px solid rgba(228, 28, 14, 0.712);
}

.accepted {
    border-left: 7px solid rgba(40, 139, 9, 0.712);
}

/* 
.quote-container {
    margin-top: 25px;
    position: relative;
}

.note {
    color: #333;
    position: relative;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 10px 10px 2px rgba(0, 0, 0, 0.3);
}

.yellow {
    background: #eae672;
    transform: rotate(4deg);
}

.pin {
    background-color: #aaa;
    display: block;
    height: 32px;
    width: 2px;
    position: absolute;
    left: 50%;
    top: -16px;
    z-index: 1;
}

.pin:after {
    background-color: #A31;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 0%, .1), inset 3px 3px 3px hsla(0, 0%, 100%, .2), inset -3px -3px 3px hsla(0, 0%, 0%, .2), 23px 20px 3px hsla(0, 0%, 0%, .15);
    content: '';
    height: 12px;
    left: -5px;
    position: absolute;
    top: -10px;
    width: 12px;
}

.pin:before {
    background-color: hsla(0, 0%, 0%, 0.1);
    box-shadow: 0 0 .25em hsla(0, 0%, 0%, .1);
    content: '';

    height: 24px;
    width: 2px;
    left: 0;
    position: absolute;
    top: 8px;
    transform: rotate(57.5deg);
    transform-origin: 50% 100%;
} */
</style>