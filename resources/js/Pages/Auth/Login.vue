<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

defineProps( {
    status: String,
} );

const form = useForm( {
    email: '',
    password: '',
    remember: false,
} );

const submit = () => {
    form.post( route( 'login' ) );
};
</script> 

<template>
    <GuestLayout>

        <Head title="Log in" />
        <div v-if="status" class="alert alert-success alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <p class="d-flex mb-0">
                <i class="fal fa-exclamation  me-2 font-size-24  "></i>
                <span class="mb-0">{{ status }}</span>
            </p>
        </div>
        <div class=" mt-5 mb-2">
            <h4 class="fw-bold">Login to your Account</h4>
            <p class="text-muted"></p>
        </div>
        <form @submit.prevent="submit">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" placeholder="" v-model="form.email" required autofocus>
                <label>Email</label>
                <p v-if="form.errors.email" class="small text-danger">
                    {{ form.errors.email }}
                </p>
            </div>
            <div class="text-end">
                <Link :href="route('password.request')" class="text-black fw-bold">Forgot your
                password?
                </Link>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="" v-model="form.password" required>
                <label>Password</label>
                <p v-if="form.errors.password" class="small text-danger">
                    {{ form.errors.password }}
                </p>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input bg-transparent border-dark" id="auth-remember-check"
                    v-model="form.remember">
                <label class="form-check-label fw-bold" for="auth-remember-check">Remember me</label>
            </div>
            <div class="mt-4 mb-2">
                <button :class="{ 'disabled': form.processing }" :disabled="form.processing"
                    class="btn rounded-pill btn-primary waves-effect waves-light w-100" type="submit"><span
                        v-if="form.processing" class="spinner-grow text-white spinner-grow-sm me-2"></span> Log
                    In</button>
            </div>
            <div class="text-center fw-bold">
                <span>Don't have an account?
                    <Link class="fw-bold" style="color:#1C156F" :href="route('register')">Sign Up</Link>
                </span>
            </div>
        </form>
        <div class="mt-3">
            <a :href="route('auth.social', { type: 'google' })" class="btn btn-light w-100 my-3 text-danger fw-bold"><i
                    class="fab fa-google me-2 "></i> Continue via
                Google</a>
            <a :href="route('auth.social', { type: 'linkedin' })" class="btn btn-light w-100 text-info fw-bold"><i
                    class="fab fa-linkedin-in fa me-2"></i> Continue
                via
                Linkedin
            </a>
        </div>
    </GuestLayout>
</template>
