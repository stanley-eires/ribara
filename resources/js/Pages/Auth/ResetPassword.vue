<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps( {
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
} );

const form = useForm( {
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
} );

const submit = () => {
    form.post( route( 'password.store' ), {
        onFinish: () => form.reset( 'password', 'password_confirmation' ),
    } );
};
</script>

<template>
    <GuestLayout>

        <Head title="Reset Password" />

        <div class="mt-5 mb-2">
            <h3 class="fw-bold">Reset Password</h3>
            <p class="text-muted">Enter your new password </p>
        </div>
        <form @submit.prevent="submit">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" placeholder="" readonly v-model="form.email" required autofocus>
                <label>Email</label>
                <p v-if="form.errors.email" class="small text-danger">
                    {{ form.errors.email }}
                </p>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="" v-model="form.password" required>
                <label>Password</label>
                <p v-if="form.errors.password" class="small text-danger">
                    {{ form.errors.password }}
                </p>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="" v-model="form.password_confirmation" required>
                <label>Confirm Password</label>
                <p v-if="form.errors.password_confirmation" class="small text-danger">
                    {{ form.errors.password_confirmation }}
                </p>
            </div>
            <div class="mt-4 mb-2">
                <button :class="{ 'disabled': form.processing }" :disabled="form.processing"
                    class="btn btn-primary waves-effect waves-light w-100 rounded-pill" type="submit"><span
                        v-if="form.processing" class="spinner-grow text-white spinner-grow-sm me-2"></span> Reset
                    Password</button>
            </div>
        </form>
    </GuestLayout>
</template>
