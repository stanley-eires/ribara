<script setup>
import { computed } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps( {
    status: {
        type: String,
    },
} );

const form = useForm( {} );

const submit = () => {
    form.post( route( 'verification.send' ), { preserveState: false } );
};

const verificationLinkSent = computed( () => props.status === 'verification-link-sent' );
</script>

<template>
    <GuestLayout>

        <Head title="Email Verification" />
        <div class=" mt-5 mb-2">
            <h4 class="fw-bold"> Email Verification</h4>
            <p class="">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
                we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </p>
        </div>
        <div v-if="verificationLinkSent" class="alert alert-success alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <p class="d-flex mb-0">
                <i class="fal fa-mail-bulk  me-2 font-size-24  "></i>
                <span class="mb-0"><strong>Link Sent!</strong> A new verification link has been sent to the email
                    address
                    you
                    provided
                    during registration.</span>
            </p>
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 ">
                <button class="btn btn-primary w-100 rounded-pill mb-3" :class="{ 'disabled': form.processing }"
                    :disabled="form.processing">
                    <span v-if="form.processing" class="spinner-grow text-white spinner-grow-sm me-2"></span>Resend
                    Verification Email <i class="fal fa-envelope-open-text ms-2"></i>
                </button>
                <div class="text-end">

                    <Link :href="route('logout')" method="post" as="button" class="rounded-pill btn btn-link"><i
                        class="fal me-2 fa-sign-out" aria-hidden="true"></i>
                    Log Out</Link>
                </div>
            </div>
        </form>
    </GuestLayout>
</template>
