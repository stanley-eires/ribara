<script setup>
import AuthenticatedLayoutWithSidebar from '@/Layouts/AuthenticatedLayoutWithSidebar.vue';
import StartAndEndDate from '@/Components/StartAndEndDate.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import industries from '@/Scripts/industries.json'
import { toast } from 'vue3-toastify';

const props = defineProps( { title: String, experience: Object } )
defineOptions( { layout: AuthenticatedLayoutWithSidebar } )

let form = useForm( {
    user_id: usePage().props.auth.user.id,
    title: props.experience?.title,
    employer: props.experience?.employer,
    start_end_date: props.experience?.start_end_date,
    type: props.experience?.type,
    industry: props.experience?.industry,
    description: props.experience?.description,
} )

let submit = () => {
    if ( props.experience?.id ) {
        form.transform( ( data ) => ( { ...data, id: props.experience.id } ) )
    }
    form.post( route( 'experience.save' ), { onSuccess: () => toast.success( "Saved successfully" ) } )
}
let handleDelete = () => {
    if ( confirm( "Are you sure you want to remove this content permanently?" ) ) {
        useForm( { id: props.experience.id } ).delete( route( 'experience.destroy' ), { onSuccess: () => toast.success( "Removed successfully" ) } )
    }
}
</script> 


<template>
    <Head :title="title" />
    <form class="card" @submit.prevent="submit">
        <div class="card-header bg-transparent d-flex align-items-center">
            <Link :href="route('profile.experience', { slug: $page.props.auth.user.slug })" class="text-muted"><i
                class="fas fa-long-arrow-left me-5"></i>
            </Link>
            <h5 class="mb-0">{{ title }}</h5>
        </div>
        <div class="card-body">
            <div class="form-group">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" maxlength="50" required v-model="form.title">
                    <label>Job Title *</label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" maxlength="50" required v-model="form.employer">
                    <label>Employer *</label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <select class="form-select" required v-model="form.type">
                        <option value="">--Choose One--</option>
                        <option :value="i"
                            v-for="(i, index) in ['Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Contract', 'Internship']"
                            :key="index">
                            {{ i }}
                        </option>
                    </select>
                    <label>Employment Type * </label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <textarea class="form-control" maxlength="200" style="height:100px"
                        v-model="form.description"></textarea>
                    <label>Description</label>
                </div>
            </div>
            <div class="form-group mb-3">
                <start-and-end-date v-model="form.start_end_date"></start-and-end-date>
            </div>
            <div class="form-group">
                <div class="form-floating mb-3">
                    <select class="form-select" required v-model="form.industry">
                        <option value="null">--Choose One--</option>
                        <option :value="i" v-for="(i, index) in industries" :key="index">
                            {{ i }}
                        </option>
                    </select>
                    <label>Industry *</label>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button v-if="props.experience?.id" @click.prevent="handleDelete" type="button"
                class="btn-link btn px-0 text-danger float-start"><i class="fas fa-trash  me-2  "></i> Delete
                experience</button>
            <button type="submit" class="btn btn-primary float-end px-4"><span v-if="form.processing"
                    class="spinner-grow text-white spinner-grow-sm me-2"></span>Save</button>
        </div>
    </form>
</template>