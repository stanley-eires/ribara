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
    phone: '',
    connection: props.connection
} );

const submit = () => {
    if ( form.phone ) {
        form.transform( ( data ) => ( { data, phone: `${ country_code.value }${ form.phone }` } ) )
            .post( route( 'register' ) );
    }
    form.post( route( 'register' ) );
};
</script>

<template>
    <GuestLayout>

        <Head :title="title" />
        <!--CREATE ACCOUNT-->
        <template v-if="stage == 'create'">
            <nav class="breadcrumb justify-content-center text-muted"
                style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);">
                <span class="breadcrumb-item text-muted"><span
                        class="badge badge-pill border border-secondary text-muted me-1">1</span>
                    Create
                    an
                    Account</span>
                <span class="breadcrumb-item "><span
                        class="badge badge-pill border border-secondary text-muted me-2">2</span>Verify
                    Phone
                    Number</span>
                <span class="breadcrumb-item"><span
                        class="badge badge-pill border border-secondary text-muted me-1">3</span>Create
                    Password</span>
            </nav>
            <div class="card">
                <div class="p-md-5">
                    <div class="text-center mt-2">
                        <h3 class="fw-bold">Create An Account</h3>
                        <p class="text-muted"></p>
                    </div>
                    <div class="p-2 mt-4">
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
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" placeholder="" v-model="form.email" required>
                                <label>Email</label>
                                <p v-if="form.errors.email" class="small text-danger">
                                    {{ form.errors.email }}
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
                            <div class="text-end">
                                <Link :href="route('login')" class="text-muted small fst-italic">Already have an account?
                                Login
                                </Link>
                            </div>
                            <div class="mt-4 mb-2">
                                <button :class="{ 'disabled': form.processing }" :disabled="form.processing"
                                    class="btn btn-primary waves-effect waves-light w-100" type="submit"><span
                                        v-if="form.processing"
                                        class="spinner-grow text-white spinner-grow-sm me-2"></span>Continue <i
                                        class="ms-1 fal fa-chevron-right"></i></button>
                            </div>
                            <div class="text-center">
                                <small>By creating an account you're agreeing to our <a href="#">Terms and
                                        Conditions</a></small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </template>
        <!--ENTER PHONE-->
        <template v-if="stage == 'phone'">
            <nav class="breadcrumb justify-content-center text-muted"
                style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);">
                <span class="breadcrumb-item text-primary fw-bold"><span
                        class="badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1"><i
                            class="fa fa-check"></i></span>
                    Create
                    an
                    Account</span>
                <span class="breadcrumb-item "><span
                        class="badge badge-pill border border-primary text-primary me-2">2</span>Verify
                    Phone
                    Number</span>
                <span class="breadcrumb-item"><span
                        class="badge badge-pill border border-secondary text-muted me-1">3</span>Create
                    Password</span>
            </nav>
            <div class="card">
                <div class="p-md-5">
                    <div class="text-center mt-2">
                        <h3 class="text-dark">Enter Phone Number</h3>
                        <p class="text-muted">A verification code will be sent to this number</p>
                    </div>
                    <div class="p-2 mt-4">
                        <form @submit.prevent="submit">
                            <div class="input-group mb-3 border border-secondary overflow-hidden rounded">
                                <span class="input-group-text bg-transparent border-0"
                                    style="border-right:2px solid grey !important">{{ country_code }}</span>
                                <input type="tel" class="form-control border-0" required
                                    :placeholder="country_code == '+234' ? 'example: 7031234564' : ''" v-model="form.phone">
                            </div>
                            <p v-if="form.errors.phone" class="small text-danger">
                                {{ form.errors.phone }}
                            </p>
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
                            <p class="mt-4">Need to make changes?
                                <Link as="button" :href='route("forget-session")' method='post'
                                    class="fw-bold btn btn-link p-0"> Forget
                                this
                                session.
                                </Link> And start over. We haven't persisted any
                                data
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </template>
    </GuestLayout>
</template>
