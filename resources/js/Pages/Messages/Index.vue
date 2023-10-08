<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Conversation from './Conversation.vue';
import moment from "moment"
import { onMounted, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { sortBy } from 'lodash';
import { _btoa } from '@/Scripts/helpers';

let props = defineProps( { messages: Object, title: String, conversation: Object, friends: Object } );

let showUsers = ref( false );

let conversation_details = ref( null );

onMounted( () => {
    if ( props.conversation ) {
        conversation_details.value = {
            chat: props.conversation,
            recepient: props.conversation.find( ( e ) => e.receiver.id !== usePage().props.auth.user.id ).receiver
        }
    }
} )

</script>

<template>
    <AuthenticatedLayout>

        <Head :title="title" />
        <div class="row gx-0">
            <div class="col-4">
                <div class="offcanvas-md offcanvas-start" tabindex="-1" id="chat-leftsidebar">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                            data-bs-target="#chat-leftsidebar" aria-label="Close"></button>
                    </div>
                    <div class="h-100 card">
                        <div v-if="showUsers" class="p-3">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5>New Message</h5>
                                <button @click="showUsers = false" class="btn btn-md"><i
                                        class="fal font-size-22 fa-times    "></i></button>
                            </div>
                            <form class="chat-message-list" data-simplebar>
                                <div class="mb-3">
                                    <v-select type="search" label="fullname" :options="friends" placeholder="Search">
                                        <template v-slot:option="option">
                                            <Link :preserve-scroll="true"
                                                :href="route('messages.index', { id: _btoa({ type: 'user', id: option.id }) })"
                                                class="d-flex align-items-center mb-2">
                                            <div class="flex-shrink-0 me-2 align-self-center">
                                                <img :src="option.avatar ?? 'assets/images/no-profilepics.png'"
                                                    class="avatar avatar-xs rounded-circle img-thumbnail" alt="">
                                            </div>

                                            <div class="flex-grow-1">
                                                <h6 class="font-size-16 mb-0">
                                                    {{ option.firstname }} {{ option.lastname }}
                                                </h6>
                                            </div>
                                            </Link>

                                        </template>
                                    </v-select>
                                </div>
                            </form>
                        </div>
                        <template v-else>
                            <div class="p-3">
                                <div class="d-flex align-items-center mb-2">
                                    <div class="flex-shrink-0 me-2 align-self-center">
                                        <img :src="$page.props.auth.user.avatar ?? '/assets/images/no-profilepics.png'"
                                            class="avatar avatar-sm rounded-circle img-thumbnail" alt="">
                                    </div>

                                    <div class="flex-grow-1">
                                        <h6 class="font-size-16 mb-0"><a href="#" class="text-dark">
                                                {{ $page.props.auth.user.fullname }} <i
                                                    class="fa fa-circle text-success align-middle font-size-10 ms-1"></i></a>
                                        </h6>
                                        <p class="text-muted mb-0">Available</p>
                                    </div>

                                    <div class="flex-shrink-0">
                                        <button @click="showUsers = true" class="btn">
                                            <i class="fal fa-plus font-size-20 "></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="search-box chat-search-box ">
                                    <div class="position-relative">
                                        <input type="text" class="form-control bg-light border-0 rounded-pill"
                                            placeholder="Search or start a new chat">
                                        <i class="fal fa-search search-icon"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="chat-message-list" data-simplebar>
                                <div class="p-1">
                                    <div>
                                        <ul class="list-unstyled chat-list ">
                                            <li v-for="i in sortBy(messages, (o) => moment(o.last_conversation.created_at).format('X')).reverse() "
                                                :key="i"
                                                :class="{ active: conversation && conversation.length && conversation[0].message_id == i.id }">
                                                <Link preserve-scroll
                                                    :href="route('messages.index', { id: _btoa({ type: 'message', id: i.id }) })">
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-shrink-0 me-2 align-self-center">
                                                        <div class="user-img online">
                                                            <img :src="i[i.user_id == $page.props.auth.user.id ? 'receiver' : 'sender'].avatar ?? 'assets/images/no-profilepics.png'"
                                                                class="avatar avatar-xs rounded-circle img-thumbnail"
                                                                alt="">
                                                            <span class="user-status"></span>
                                                        </div>
                                                    </div>

                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h6 class="text-truncate font-size-14 mb-0">
                                                            {{ i[i.user_id == $page.props.auth.user.id ? 'receiver' : 'sender'].fullname }}
                                                            <div class="font-size-11 float-end fw-normal">
                                                                {{ moment(i.last_conversation.created_at).fromNow() }}
                                                            </div>
                                                        </h6>
                                                        <p class="text-truncate text-muted mb-0 ">
                                                            <template
                                                                v-if="i.last_conversation.receiver !== $page.props.auth.user.id">
                                                                <i :class="i.last_conversation.read_at ? 'fa-check-double' : 'fa-check'"
                                                                    class="fas   me-1  "></i>
                                                            </template>
                                                            {{ i.last_conversation.content }}
                                                        </p>
                                                    </div>

                                                    <!-- <div class="flex-shrink-0">
                                                <div class="unread-message">
                                                    <span class="badge bg-danger rounded-pill">1</span>
                                                </div>
                                            </div> -->
                                                </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-8">
                <div class="w-100 h-100">
                    <a href="#" class="d-md-none" data-bs-toggle="offcanvas" data-bs-target="#chat-leftsidebar">Show
                        Sidebar</a>
                    <conversation :details="conversation_details"
                        v-if="conversation_details && conversation_details.recepient" />
                    <conversation blank v-else />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>