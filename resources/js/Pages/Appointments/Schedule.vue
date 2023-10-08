<script setup>
import { _btoa } from "@/Scripts/helpers";
import { router, useForm, usePage } from "@inertiajs/vue3"
import moment from "moment"
import { computed, ref } from "vue"

let props = defineProps( { user: Object } )

let config = ref( {
    durations: [ { label: '30 minutes', value: 30 }, { label: '45 minutes', value: 45 }, { label: '1 hour', value: 60 }, { label: '2 hours', value: 120 } ],
    start: '09:00',
    end: '17:00',
} )
const masks = ref( {
    modelValue: 'YYYY-MM-DD',
} );
let timeslots = computed( () => {
    let slots = [ moment( config.value.start, 'HH:mm' ).format( 'hh:mm A' ) ];
    let start = moment( config.value.start, 'HH:mm' );
    let end = moment( config.value.end, 'HH:mm' );
    while ( start.format( 'X' ) < end.format( 'X' ) ) {
        let x = start;
        let y = moment( x ).add( form.duration, 'minutes' );
        slots.push( y.format( 'hh:mm A' ) )
        start = y
    }
    return slots;
} )
let appointment_timestamp = computed( () => moment( `${ form.appointment_date } ${ form.appointment_time }` ).format( 'X' ) )
let form = useForm( {
    duration: 60,
    appointment_date: null,
    appointment_time: null,
    content: null,
    host: usePage().props.auth.user.id,
    friend: props.user.id,
} )

let handleBooking = () => {
    form.clearErrors();

    if ( !form.appointment_date ) {
        form.setError( 'appointment_date', 'Setting an appointment date is required' );
        return;
    } else if ( !form.appointment_time ) {
        form.setError( 'appointment_time', 'You need to pick a time slot for the appointment' );
        return;
    }
    form.transform( ( data ) => ( { ...data, appointment_timestamp: appointment_timestamp.value } ) ).post( route( 'appointment.store' ), {
        onSuccess: () => {
            router.get( route( 'appointment.index' ) )

        }
    } )
}
</script>

<template>
    <div class="container">
        <form @submit.prevent="handleBooking(); $emit('close')">

            <div class="card card-body shadow-lg">
                <div class="row">
                    <div v-if="$page.props.auth.user.id == user.id" class="col-12">
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            You cannot book an appointment on your self.
                        </div>
                    </div>

                    <div v-if="form.hasErrors" class="col-12">
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <button type="button" class="btn-close" @click.prevent="form.clearErrors()"></button>
                            There seems to be an error on your form.
                        </div>
                    </div>

                    <div class="col-md-5">
                        <div class="form-group mb-3">
                            <label for="">Select an appointment date</label>
                            <VDatePicker mode="date" v-model.string="form.appointment_date" expanded title-position="left"
                                :masks="masks" :min-date="new Date()" />
                            <small class="text-danger"
                                v-if="form.errors.appointment_date">{{ form.errors.appointment_date }} </small>
                        </div>
                        <div class="form-floating mb-3">
                            <select v-model="form.duration" class="form-select">
                                <option :key="i" :value="i.value" v-for="i in config.durations">{{ i.label }}</option>

                            </select>
                            <label>Duration</label>
                        </div>
                    </div>
                    <div class="col-md-7" v-if="form.appointment_date">
                        <div class="mb-3">
                            <label for="">Choose Time</label>
                            <div class="row g-2">
                                <div class="col-3" v-for="i in timeslots" :key="i">
                                    <button @click.prevent="form.appointment_time = i"
                                        class="btn btn-sm btn-outline-primary w-100"
                                        :class="{ 'text-bg-primary': form.appointment_time == i }">{{ i }}</button>
                                </div>
                                <small class="text-danger col-12"
                                    v-if="form.errors.appointment_time">{{ form.errors.appointment_time }} </small>
                            </div>
                        </div>
                        <div class="form-group mb-3" v-if="form.appointment_time">
                            <label>Meeting Details</label>
                            <textarea required v-model="form.content" class="form-control" rows="7"
                                placeholder="Include additional information / Purpose(s) of the meeting"></textarea>
                        </div>
                        <button :disabled="form.processing" v-if="form.content && $page.props.auth.user.id !== user.id"
                            type="submit" class="btn btn-primary float-end px-3 rounded-pill"><span v-if="form.processing"
                                class="spinner-border me-2 spinner-border-sm"></span><i v-else
                                class="fal fa-calendar-plus me-2"></i>
                            Book
                            Request <i class="fat fa-long-arrow-right ms-1"></i></button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>