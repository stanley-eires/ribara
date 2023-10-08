<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { router, useForm } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';
import VOtpInput from "vue3-otp-input";
defineProps( { title: String, token: String | Number } );

let timer = null;
let time = ref( 0 );
const form = useForm( {
    token: ''
} );

const submit = () => {
    form.post( route( 'register' ), { onError: () => form.reset() } );
};

onMounted( () => start_timer() )
let start_timer = () => {
    clearInterval( timer )
    time.value = 60;
    timer = setInterval( () => {
        time.value = time.value - 1
        if ( time.value < 1 ) {
            clearInterval( timer )
        }
    }, 1000 )
}
let resendToken = () => {
    router.post( route( 'register.resend-code' ), { onSubmit: () => { form.clearErrors(); start_timer(); } } )
}
</script>

<template>
    <GuestLayout>

        <Head :title="title" />
        <template v-if="true">
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
                    <p class=" text-end"><span class="badge text-bg-info me-2">Debug</span>{{ token }}</p>
                    <div class="text-center mt-2">
                        <h3 class="text-dark">Account Verification</h3>
                        <p class="text-muted">Please enter code that was sent to your phone number in the form below. This
                            code
                            will expire in 00:{{ time.toLocaleString('en-US', { minimumIntegerDigits: 2 }) }} seconds.</p>
                    </div>
                    <div class="p-2 mt-4">
                        <form @submit.prevent="submit">
                            <div class="d-flex justify-content-center">
                                <v-otp-input v-model:value="form.token" req input-classes="text-center form-control mx-2"
                                    separator="" :num-inputs="4" :should-auto-focus="true" input-type="letter-numeric"
                                    @on-complete="submit" :placeholder="['*', '*', '*', '*']" />
                            </div>

                            <p v-if="form.errors.token" class="small text-danger">
                                {{ form.errors.token }}
                            </p>
                            <p class="text-center">Didn't receive code,
                                <a @click.prevent="resendToken" href="#" class="text-decoration-underline">Resend</a>
                            </p>
                            <div class="mt-5 mb-2">
                                <button :class="{ 'disabled': form.processing || !form.token }"
                                    :disabled="form.processing || !form.token"
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
<style scoped>
.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
    background-color: #e4e4e4;
}

input::placeholder {
    font-size: 30px;
    text-align: center;
    font-weight: 600;
}
</style>