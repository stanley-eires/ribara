<script setup>
import AuthenticatedLayoutAdmin from '@/Layouts/AuthenticatedLayoutAdmin.vue';
import Pagination from '@/Components/Pagination.vue';
import { useForm } from '@inertiajs/vue3';
import moment from 'moment';
import { ref } from 'vue';

let props = defineProps( { users: Object, filter: Object } );
let menu = [
    { title: "Users", href: route( 'administrator.users' ) },
    { title: "User Groups", href: "#" },
    { title: "Viewing Access Levels", href: "#" }
]
let id = ref( [] )
let selectAll = ( ev ) => {
    id.value = ev.target.checked ? props.users.data.map( e => e.id ) : [];
}
let filterform = useForm( {
    search: props.filter.search, status: props.filter.status ?? ""
} )
let filter = () => {
    filterform.get( route( 'administrator.users' ), { preserveState: true } )
}
</script>
<template>
    <AuthenticatedLayoutAdmin>
        <div class="container-fluid">
            <div class="d-flex bg-light p-2">
                <Link :href="route('administrator.users.create')" class="btn btn-sm btn-primary px-4 me-2"><i
                    class="fal fa-plus-circle  me-1  "></i> New</Link>
                <template v-if="id.length > 0">
                    <Link :preserve-state="false" :href="route('administrator.users.actions')" method="put"
                        :preserve-scroll="true" :data="{ status: 0, id }" class="btn btn-sm border-dark me-2"><i
                        class="fas fa-times-circle me-1 text-danger"></i>Block</Link>
                    <Link :preserve-state="false" :href="route('administrator.users.actions')" method="put"
                        :preserve-scroll="true" :data="{ status: 1, id }" class="btn btn-sm border-dark me-2"><i
                        class="fas fa-redo me-1"></i>Unblock</Link>
                    <Link :preserve-state="false" :href="route('administrator.users.actions', { action: 'delete' })"
                        :preserve-scroll="true" :data="{ id }" method="put" class="btn btn-sm border-dark me-2"><i
                        class="fas fa-trash me-1"></i>Delete</Link>
                </template>
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
                                    <th style="min-width:220px">Name</th>
                                    <th></th>
                                    <th>Contact</th>
                                    <th>Group</th>
                                    <th>Posts</th>
                                    <th>Invitees</th>
                                    <th>Last Login</th>
                                    <th>Date Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="users.data.length > 0">
                                    <tr v-for=" i  in users.data" :key="i">
                                        <td>
                                            <div class="form-check">
                                                <input class="form-check-input" name="" id="" type="checkbox" :value="i.id"
                                                    v-model="id">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img loading="lazy"
                                                    :src="i.avatar && i.avatar != 'null' ? i.avatar : '/assets/images/no-profilepics.png'"
                                                    class="avatar rounded-circle img-thumbnail">
                                                <div class="ms-2">
                                                    <Link class="d-block text-nowrap fw-bold"
                                                        :href="route('administrator.users.edit', { id: i.id })">
                                                    {{ i.fullname }}
                                                    </Link>
                                                    <small><a target="_blank"
                                                            :href="route('profile.index', { slug: i.slug })">@{{ i.slug }}</a></small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <Link :href="route('administrator.users.actions')" v-if="i.status == 1"
                                                method="put" :preserve-scroll="true" :data="{ status: 0, id: [i.id] }"
                                                class="btn bg-soft-success text-nowrap rounded-0 badge "><i
                                                class="fa fa-check"></i>
                                            </Link>
                                            <Link v-else :href="route('administrator.users.actions')" method="put"
                                                :preserve-scroll="true" :data="{ status: 1, id: [i.id] }"
                                                class="btn bg-soft-danger text-nowrap rounded-0 badge"><i
                                                class="fa fa-times "></i>
                                            </Link>
                                        </td>
                                        <td>
                                            <a class="d-block" :href="`mailto:${i.email}`">{{ i.email }}</a>
                                            {{ i.phone }}
                                        </td>
                                        <td><span v-for="role in i.roles" :key="role">{{ role.name }}</span></td>
                                        <td class="text-center"><a href="#">{{ i.post_count }}</a></td>
                                        <td class="text-center"><a href="#">{{ i.invited_by_count }}</a></td>
                                        <td class="text-nowrap text-center fst-italic">{{ i.login_at
                                            ? moment(i.login_at).fromNow() : "--" }}
                                        </td>
                                        <td class="text-nowrap">{{ moment(i.created_at).format("MMM DD, YYYY") }}
                                        </td>

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
                        <pagination :data="users"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayoutAdmin>
</template>