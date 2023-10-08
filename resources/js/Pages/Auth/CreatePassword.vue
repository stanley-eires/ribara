<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';
defineProps( { title: String } );

const form = useForm( {
    password: '',
    password_confirmation: "",
} );

const submit = () => {
    form.post( route( 'register' ) );
};
</script>

<template>
    <GuestLayout>

        <Head :title="title" />
        <nav class="breadcrumb justify-content-center text-muted"
            style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);">
            <span class="breadcrumb-item text-primary fw-bold"><span
                    class="badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1"><i
                        class="fa fa-check"></i></span>
                Create
                an
                Account</span>
            <span class="breadcrumb-item text-primary fw-bold"><span
                    class="badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1"><i
                        class="fa fa-check"></i></span>Verify
                Phone
                Number</span>
            <span class="breadcrumb-item"><span
                    class="badge badge-pill border border-primary text-primary me-1">3</span>Create
                Password</span>
        </nav>
        <div class="card">
            <div class="p-md-5">
                <div class="text-center mt-2">
                    <h3 class="text-dark">Create a Password</h3>
                    <p class="text-muted">Creating a strong password is an important step in securing your accounts and
                        personal information</p>
                </div>
                <div class="p-2 mt-4">
                    <form @submit.prevent="submit">
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="" v-model="form.password" required type="password">
                            <label>Enter Password</label>
                            <p v-if="form.errors.password" class="small text-danger">
                                {{ form.errors.password }}
                            </p>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="" v-model="form.password_confirmation" required
                                type="password">
                            <label>Confirm Password</label>
                            <p v-if="form.errors.password_confirmation" class="small text-danger">
                                {{ form.errors.password_confirmation }}
                            </p>
                        </div>
                        <div class="mt-5 mb-2">
                            <button :class="{ 'disabled': form.processing }" :disabled="form.processing"
                                class="btn btn-primary btn-lg waves-effect waves-light w-100" type="submit"><span
                                    v-if="form.processing"
                                    class="spinner-grow text-white spinner-grow-sm me-2"></span>Continue <i
                                    class="ms-1 fal fa-chevron-right"></i></button>
                        </div>
                        <div class="text-center">
                            <small>By creating an account you're agreeing to our <a href="#">Terms and
                                    Conditions</a></small>
                        </div>
                    </form>
                    <p class="mt-4">Need to make changes?
                        <Link as="button" :href='route("forget-session")' method='post' class="fw-bold btn btn-link p-0">
                        Forget
                        this
                        session.
                        </Link> And start over. We haven't persisted any
                        data
                    </p>

                </div>
            </div>
        </div>
    </GuestLayout>
</template>