<script setup>
import AuthenticatedLayoutAdmin from '@/Layouts/AuthenticatedLayoutAdmin.vue';
import Pagination from '@/Components/Pagination.vue';
import { useForm } from '@inertiajs/vue3';
import { truncate } from "lodash";
import { stripHtml } from '@/Scripts/helpers';
import moment from 'moment';
import { ref } from 'vue';

let props = defineProps( { posts: Object, filter: Object } );
let menu = [
    { title: "Posts", href: route( 'administrator.articles' ) },
    { title: "Featured Posts", href: route( 'administrator.articles' ) },
    { title: "Categories", href: "#" },
]
let id = ref( [] )
let selectAll = ( ev ) => {
    id.value = ev.target.checked ? props.posts.data.map( e => e.id ) : [];
}
let filterform = useForm( {
    search: props.filter.search, status: props.filter.status ?? ""
} )
let filter = () => {
    filterform.get( route( 'administrator.articles' ), { preserveState: true } )
}
</script>
<template>
    <AuthenticatedLayoutAdmin>
        <div class="container-fluid">
            <div class="d-flex bg-light p-2">
                <Link :href="route('administrator.articles.create')" class="btn btn-sm btn-primary px-4 me-2"><i
                    class="fal fa-plus-circle  me-1  "></i> New</Link>
                <!-- <template v-if="id.length > 0">
                    <Link :preserve-state="false" :href="route('administrator.users.actions')" method="put"
                        :preserve-scroll="true" :data="{ status: 0, id }" class="btn btn-sm border-dark me-2"><i
                        class="fas fa-times-circle me-1 text-danger"></i>Block</Link>
                    <Link :preserve-state="false" :href="route('administrator.users.actions')" method="put"
                        :preserve-scroll="true" :data="{ status: 1, id }" class="btn btn-sm border-dark me-2"><i
                        class="fas fa-redo me-1"></i>Unblock</Link>
                    <Link :preserve-state="false" :href="route('administrator.users.actions', { action: 'delete' })"
                        :preserve-scroll="true" :data="{ id }" method="put" class="btn btn-sm border-dark me-2"><i
                        class="fas fa-trash me-1"></i>Delete</Link>
                </template> -->
            </div>
            <div class="row">
                <div class="col-md-2">
                    <div class="card rounded-0 bg-light my-2">
                        <ul class="list-group list-group-flush bg-light">
                            <Link v-for=" i  in  menu " :key="i" class="list-group-item list-group-item-action"
                                :href="i.href">
                            {{ i.title }}</Link>
                        </ul>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="row my-2">
                        <div class="col-md-6">
                            <div class="d-flex align-items-center">
                                <div class="input-group me-2 border border-light rounded">
                                    <input v-model="filterform.search" type="search" class="form-control border-0"
                                        placeholder="Search">
                                    <button @click.prevent="filter" class="btn" type="button"><i
                                            class="fas fa-search"></i></button>
                                </div>
                                <button data-bs-toggle="collapse" data-bs-target="#searchtools"
                                    class="btn btn-primary text-nowrap">Search Tools</button>
                            </div>
                        </div>
                        <div class="col-md-6"></div>
                        <div class="col-12 my-2 collapse" id="searchtools">
                            <div class="d-flex">
                                <select @change="filter" v-model="filterform.status" class="form-select me-1">
                                    <option value="">- Select Status -</option>
                                    <option :value="1">Active</option>
                                    <option :value="0">Blocked</option>
                                </select>
                                <select class="form-select me-1">
                                    <option value="">- Select Group -</option>
                                    <option value="">Administrator</option>
                                    <option value="">Registered</option>
                                </select>
                                <select class="form-select me-1">
                                    <option value="">- Last Visited Date -</option>
                                    <option value="">Today</option>
                                    <option value="">In the last week</option>
                                    <option value="">In the last month</option>
                                    <option value="">Never</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="form-check">
                                            <input @change="selectAll($event)" class="form-check-input" type="checkbox">
                                        </div>
                                    </th>
                                    <th style="min-width:220px">Content</th>
                                    <th></th>
                                    <th>Author</th>
                                    <th>Date Created</th>
                                    <th>Engagements</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="posts.data.length > 0">
                                    <tr v-for=" i  in posts.data" :key="i">
                                        <td>
                                            <div class="form-check">
                                                <input class="form-check-input" name="" id="" type="checkbox" :value="i.id"
                                                    v-model="id">
                                            </div>
                                        </td>
                                        <td><a target="_blank"
                                                :href="route('post.show', i.id)">{{ truncate(stripHtml(i.content), { length: 100 }) }}</a>
                                        </td>
                                        <td></td>
                                        <td>{{ i.user.fullname }}</td>
                                        <td class="text-nowrap">{{ moment(i.created_at).format("DD/MM/YYYY") }}
                                        </td>
                                        <td> {{ i.comments_count + i.likes_count }} <small>({{ i.comments_count }} comments
                                                ; {{ i.likes_count }} reactions)</small></td>

                                    </tr>
                                </template>
                                <tr v-else>
                                    <td colspan="9">
                                        <div class="alert alert-warning" role="alert">
                                            No matching Results
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                        <pagination :data="posts"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayoutAdmin>
</template>