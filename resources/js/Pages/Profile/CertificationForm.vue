<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';
import StartAndEndDate from '@/Components/StartAndEndDate.vue';
import { useForm, usePage } from '@inertiajs/vue3';
defineOptions( { layout: AuthenticatedLayoutWithSidebar } )
const props = defineProps( { title: String, certification: Object } )

let form = useForm( {
    user_id: usePage().props.auth.user.id,
    title: props.certification?.title,
    organization: props.certification?.organization,
    issued_date: props.certification?.issued_date,
    url: props.certification?.url,
} )

let submit = () => {
    if ( props.certification?.id ) {
        form.transform( ( data ) => ( { ...data, id: props.certification.id } ) )
    }
    form.post( route( 'certification.save' ) )
}
let handleDelete = () => {
    if ( confirm( "Are you sure you want to remove this content permanently?" ) ) {
        useForm( { id: props.certification.id } ).delete( route( 'certification.destroy' ) )
    }
}
</script>


<template>
    <Head :title="title" />
    <form class="card" @submit.prevent="submit">
        <div class="card-header bg-transparent d-flex align-items-center">
            <Link :href="route('profile.certification', { slug: $page.props.auth.user.slug })" class="btn"><i
                class="fas fa-arrow-left   me-2 "></i>
            </Link>
            <h5 class="mb-0">{{ title }}</h5>
        </div>
        <div class="card-body">
            <div class="form-group">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" maxlength="50" required v-model="form.title">
                    <label>Title *</label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" maxlength="50" required v-model="form.organization">
                    <label>Organization *</label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <input type="month" class="form-control" required v-model="form.issued_date">
                    <label>Issued Date *</label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <input type="url" class="form-control" v-model="form.url">
                    <label>Credential URL</label>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button v-if="props.certification?.id" @click.prevent="handleDelete" type="button"
                class="btn-link btn px-0 text-danger float-start">Delete
                certification</button>
            <button type="submit" class="btn btn-primary float-end px-4"><span v-if="form.processing"
                    class="spinner-grow text-white spinner-grow-sm me-2"></span>Save</button>
        </div>
    </form>
</template>