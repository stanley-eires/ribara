<script setup>
import AuthenticatedLayoutAdmin from '@/Layouts/AuthenticatedLayoutAdmin.vue';
import Pagination from '@/Components/Pagination.vue';
import { useForm } from '@inertiajs/vue3';
import moment from 'moment';
import { ref } from 'vue';

let props = defineProps( { user: Object, roles: Object } );
let form = useForm( {
    id: props.user.id ?? null,
    firstname: props.user.firstname ?? "",
    lastname: props.user.lastname ?? "",
    email: props.user.email ?? "",
    slug: props.user.slug ?? "",
    phone: props.user.phone ?? "",
    status: props.user.status ?? 1,
    role: props.user.roles ? props.user.roles[ 0 ].id : null,
    password: null,
} )

let handleSubmit = ( callback ) => {
    let form_ele = document.querySelector( '#form' );
    if ( form_ele.checkValidity() === false ) {
        form_ele.reportValidity();
        return;
    }
    form.transform( ( data ) => ( { ...data, callback } ) )
        .post( route( 'administrator.users.store' ), { preserveState: false } );
}


</script>
<template>
    <AuthenticatedLayoutAdmin>
        <form class="container-fluid" id="form">
            <div class="d-flex bg-light p-2 mb-3">
                <button type="submit" @click.prevent="handleSubmit('save')" class="btn btn-sm btn-primary px-4 me-2"><i
                        class="fal fa-edit  me-1  "></i> Save</button>
                <button type="submit" @click.prevent="handleSubmit('close')" class="btn btn-sm btn-light px-4 me-2"><i
                        class="fal fa-check  me-1  "></i> Save & Close</button>
                <button type="submit" @click.prevent="handleSubmit('new')" class="btn btn-sm btn-light px-4 me-2"><i
                        class="fal fa-plus  me-1  "></i> Save & New</button>
                <Link :href="route('administrator.users')" class="btn btn-sm btn-light px-4 me-2"><i
                    class="fal fa-times  me-1  "></i> Cancel
                </Link>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group row align-items-center mb-3">
                        <label class="col-md-3">Firstname *</label>
                        <div class="col-md-9">
                            <input class="form-control" v-model="form.firstname" type="text" required>
                        </div>
                    </div>
                    <div class="form-group row align-items-center mb-3">
                        <label class="col-md-3">Lastname *</label>
                        <div class="col-md-9">
                            <input class="form-control" v-model="form.lastname" type="text" required>
                        </div>
                    </div>
                    <div v-if="!user.id" class="form-group row align-items-center mb-3">
                        <label class="col-md-3">Password *</label>
                        <div class="col-md-9">
                            <input class="form-control" v-model="form.password" type="password" required>
                        </div>
                    </div>
                    <div class="form-group row align-items-center mb-3">
                        <label class="col-md-3">Email *</label>
                        <div class="col-md-9">
                            <input class="form-control" v-model="form.email" type="email" required>
                        </div>
                    </div>
                    <div class="form-group row align-items-center mb-3">
                        <label class="col-md-3">Phone </label>
                        <div class="col-md-9">
                            <input class="form-control" v-model="form.phone" type="tel" required>
                        </div>
                    </div>
                    <div class="form-group row align-items-center mb-3">
                        <label class="col-md-3">Registration Date </label>
                        <div class="col-md-9">
                            <input class="form-control bg-light" readonly disabled
                                :value="user.created_at ? moment(user.created_at).format('lll') : ''" type="text" required>
                        </div>
                    </div>
                    <div class="form-group row align-items-center mb-3">
                        <label class="col-md-3">Last Visit Date</label>
                        <div class="col-md-9">
                            <input class="form-control  bg-light" readonly disabled
                                :value="user.login_at ? moment(user.login_at).format('lll') : ''" required>
                        </div>
                    </div>
                    <div class="form-group row align-items-center mb-3">
                        <label class="col-md-3">User Status</label>
                        <div class="col-md-9">
                            <div class="btn-group w-100 btn-group-sm btn-group-toggle" role="group" aria-label="button">
                                <button @click.prevent="form.status = 0" :class="{ 'btn-danger': form.status == 0 }"
                                    class="btn border ">Blocked</button>
                                <button @click.prevent="form.status = 1" :class="{ 'btn-success': form.status == 1 }"
                                    class="btn border">Active</button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row align-items-center mb-3">
                        <label class="col-md-3">Username *</label>
                        <div class="col-md-9">
                            <input class="form-control" v-model="form.slug" type="text" required>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 ms-auto">
                    <h6 class="fw-bold mb-2">Assigned User Role</h6>
                    <div class="form-check mb-2" v-for="i in roles" :key="i">
                        <input class="form-check-input" v-model="form.role" type="radio" name="roles" :value="i.id" required
                            :id="`_${i.id}`">
                        <label class="form-check-label" :for="`_${i.id}`">
                            {{ i.name }}
                        </label>
                    </div>
                    <template v-if="user.id">
                        <h6 class="fw-bold mt-5 mb-3">Account Management</h6>
                        <div class="form-group row align-items-center mb-3">
                            <label class="col-md-3">New Password </label>
                            <div class="col-md-9">
                                <button class="btn btn-outline-dark btn-sm">Set New Password</button>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </form>
    </AuthenticatedLayoutAdmin>
</template>