<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import countries from "../../Scripts/country_codes.min.js";
let props = defineProps( { title: String, stage: String, country: String, connection: Object | null } );

let country_code = computed( () => countries.countries.find( e => e.name == props.country )?.dial_code );
const form = useForm( {
    firstname: '',
    lastname: "",
    email: '',
    country: 'Nigeria',
    terms: true,
    password: '',
    connection: props.connection
} );

const submit = () => {
    form.post( route( 'register.store' ) );
};
</script>

<template>
    <GuestLayout>

        <Head title="Getting Started" />

        <div class=" mt-3 mb-2">
            <h3 class="fw-bold">Create An Account</h3>
            <p class="small fw-bold ">Lets Get Started</p>
        </div>
        <form @submit.prevent="submit">
            <div class="form-floating mb-3">
                <input class="form-control" placeholder="" v-model="form.firstname" required autofocus>
                <label>Firstname</label>
                <p v-if="form.errors.firstname" class="small text-danger">
                    {{ form.errors.firstname }}
                </p>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" placeholder="" v-model="form.lastname" required>
                <label>Lastname</label>
                <p v-if="form.errors.lastname" class="small text-danger">
                    {{ form.errors.lastname }}
                </p>
            </div>
            <!-- <div class="form-floating mb-3">
                <input class="form-control" placeholder="" v-model="form.phone" required>
                <label>Phone</label>
                <p v-if="form.errors.phone" class="small text-danger">
                    {{ form.errors.phone }}
                </p>
            </div> -->
            <div class="form-floating mb-3">
                <input type="email" class="form-control" placeholder="" v-model="form.email" required>
                <label>Email</label>
                <p v-if="form.errors.email" class="small text-danger">
                    {{ form.errors.email }}
                </p>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" placeholder="" v-model="form.password" required type="password">
                <label>Enter Password</label>
                <p v-if="form.errors.password" class="small text-danger">
                    {{ form.errors.password }}
                </p>
            </div>
            <div class="form-floating mb-3">
                <select class="form-select" v-model="form.country" required>
                    <option value="">Select Country</option>
                    <option :value="i.name" v-for="i in countries.countries" :key="i">
                        {{ i.name }}
                    </option>
                </select>
                <label>Country</label>
                <p v-if="form.errors.country" class="small text-danger">
                    {{ form.errors.country }}
                </p>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input bg-transparent border-dark" id="auth-remember-check"
                    v-model="form.terms">
                <label class="form-check-label fw-bold" for="auth-remember-check">By creating an account you're agreeing to
                    our <a href="#">Terms and
                        Conditions</a></label>
            </div>
            <div class="mt-4 mb-2">
                <button :class="{ 'disabled': form.processing || !form.terms }" :disabled="form.processing || !form.terms"
                    class="btn btn-primary waves-effect waves-light w-100 rounded-pill" type="submit"><span
                        v-if="form.processing" class="spinner-grow text-white spinner-grow-sm me-2"></span>Sign Up</button>
            </div>
            <div class="text-center">
                <span class="fw-bold">Already have an account?
                    <Link :href="route('login')">Log in</Link>
                </span>
            </div>
        </form>
    </GuestLayout>
</template>
