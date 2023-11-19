<script setup>
import AuthenticatedLayoutAdmin from '@/Layouts/AuthenticatedLayoutAdmin.vue';
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { ref } from 'vue';

ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement )
let props = defineProps( { stats: Object, engagements: Object } );
let engagement_by_post_data = ref( {
    labels: props.engagements.posts.map( e => e.user.fullname ),
    datasets: [ { label: 'Post Published', data: props.engagements.posts.map( e => e.total ), backgroundColor: '#1c156f', borderColor: '#000', } ],

} );
let engagement_by_comment_data = ref( {
    labels: props.engagements.comments.map( e => e.user.fullname ),
    datasets: [ { label: 'Comment Published', data: props.engagements.comments.map( e => e.total ), backgroundColor: '#1c156f', borderColor: '#000', } ],

} );
let engagement_by_invited_data = ref( {
    labels: props.engagements.invited.map( e => e.fullname ),
    datasets: [ { label: 'Invitation', data: props.engagements.invited.map( e => e.total ), backgroundColor: props.engagements.invited.map( e => `#${ Math.random().toString( 16 ).substring( 2, 8 ) }` ) } ],

} );
let chartOptions = ref( {
    responsive: true,
    maintainAspectRatio: true
} );

</script>
<template>
    <AuthenticatedLayoutAdmin>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 col-xl-3">
                    <div class="card card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-3">Total Posts</p>
                                <h4 class="fw-bold">{{ stats.posts }}</h4>
                            </div>
                            <i class="fat fa-file-lines fa-4x"> </i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="card card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-3">Comment By Users</p>
                                <h4 class="fw-bold">{{ stats.comments }}</h4>
                            </div>
                            <i class="fat fa-comments fa-4x"> </i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="card card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-3">All Users</p>
                                <h4 class="fw-bold">{{ stats.users }}</h4>
                            </div>
                            <i class="fat fa-user-group fa-4x"> </i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="card card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-3">All Appointments</p>
                                <h4 class="fw-bold">{{ stats.appointments }}</h4>
                            </div>
                            <i class="fat fa-user-group fa-4x"> </i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-8">
                    <h5 class="mb-4">Top Engagements</h5>
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="card">
                                <Bar style="height:250px" id="my-chart-id" :options="chartOptions"
                                    :data="engagement_by_post_data" />
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="card">
                                <Bar style="height:250px" id="my-chart-id" :options="chartOptions"
                                    :data="engagement_by_comment_data" />
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="card">
                                <h6 class="card-title mb-0 p-3 fw-bold">By Invitations</h6>
                                <Doughnut :data="engagement_by_invited_data" :options="chartOptions" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card bg-primary">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-sm-8">
                                    <p class="text-white font-size-18">Enhance your <b>Campaign</b> for better outreach <i
                                            class="mdi mdi-arrow-right"></i></p>
                                    <div class="mt-4">
                                        <a href="javascript: void(0);" class="btn btn-success waves-effect waves-light">Mass
                                            Mail Users</a>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- end card-body-->
                    </div> <!-- end card-->
                </div> <!-- end Col -->
            </div> <!-- end row-->
        </div>
    </AuthenticatedLayoutAdmin>
</template>