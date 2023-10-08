<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';
import StartAndEndDate from '@/Components/StartAndEndDate.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { toast } from 'vue3-toastify';

const props = defineProps( { title: String, education: Object } )
defineOptions( { layout: AuthenticatedLayoutWithSidebar } )

let form = useForm( {
    user_id: usePage().props.auth.user.id,
    degree: props.education?.degree,
    institution: props.education?.institution,
    start_end_date: props.education?.start_end_date,
    study: props.education?.study,
} )

let submit = () => {
    if ( props.education?.id ) {
        form.transform( ( data ) => ( { ...data, id: props.education.id } ) )
    }
    form.post( route( 'education.save' ), { onSuccess: () => toast.success( "Saved successfully" ) } )
}
let handleDelete = () => {
    if ( confirm( "Are you sure you want to remove this content permanently?" ) ) {
        useForm( { id: props.education.id } ).delete( route( 'education.destroy' ), { onSuccess: () => toast.success( "Removed successfully" ) } )
    }
}
</script>


<template>
    <Head :title="title" />

    <form class="card" @submit.prevent="submit">
        <div class="card-header bg-transparent d-flex align-items-center">
            <Link :href="route('profile.education', { slug: $page.props.auth.user.slug })" class="text-muted"><i
                class="fas fa-long-arrow-left me-5"></i>
            </Link>
            <h5 class="mb-0">{{ title }}</h5>
        </div>
        <div class="card-body">
            <div class="form-group">
                <div class="form-floating mb-3">
                    <select class="form-select" required v-model="form.degree">
                        <option :value="i"
                            v-for="(i, index) in ['School Certificate', 'National Diploma', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree']"
                            :key="index">
                            {{ i }}
                        </option>
                    </select>
                    <label>Degree * </label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" maxlength="50" required v-model="form.institution">
                    <label>School / University / Institution *</label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" maxlength="50" required v-model="form.study">
                    <label>Field of Study *</label>
                </div>
            </div>
            <start-and-end-date v-model="form.start_end_date"></start-and-end-date>
        </div>
        <div class="card-footer">
            <button v-if="props.education?.id" @click.prevent="handleDelete" type="button"
                class="btn-link btn px-0 text-danger float-start"><i class="fas fa-trash  me-2  "></i> Delete
                Education</button>
            <button type="submit" class="btn btn-primary float-end px-4"><span v-if="form.processing"
                    class="spinner-grow text-white spinner-grow-sm me-2"></span>Save</button>
        </div>
    </form>
</template>