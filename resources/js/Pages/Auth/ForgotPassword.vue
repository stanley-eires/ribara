<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

defineProps( {
    status: {
        type: String,
    },
} );

const form = useForm( {
    email: '',
} );

const submit = () => {
    form.post( route( 'password.email' ), { preserveState: false } );
};
</script>

<template>
    <GuestLayout>

        <Head title="Forgot Password" />

        <div class=" mt-3 mb-2">
            <h3 class="fw-bold">Forgot Password</h3>
            <p>Let us know your email address and we will
                email you a password reset
                link</p>
        </div>
        <div v-if="status" class="alert alert-success alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <p class="d-flex mb-0">
                <i class="fal fa-mail-bulk  me-2 font-size-24  "></i>
                <span class="mb-0">{{ status }}</span>
            </p>
        </div>
        <form @submit.prevent="submit">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" placeholder="" v-model="form.email" required autofocus>
                <label>Email</label>
                <p v-if="form.errors.email" class="small text-danger">
                    {{ form.errors.email }}
                </p>
            </div>
            <div class="mt-4 mb-2">
                <button :class="{ 'disabled': form.processing }" :disabled="form.processing"
                    class="btn btn-primary waves-effect waves-light w-100 rounded-pill" type="submit"><span
                        v-if="form.processing" class="spinner-grow text-white spinner-grow-sm me-2"></span>
                    Send Link</button>
            </div>
            <div class="text-center">
                <span>Already have an account?
                    <Link :href="route('login')">Log in</Link>
                </span>
            </div>
        </form>

    </GuestLayout>
</template>
