<script setup>
import { useForm } from "@inertiajs/vue3";
import { debounce, groupBy, sortBy } from "lodash"
import moment from "moment"
import { computed, onMounted, ref } from "vue"
import { toast } from "vue3-toastify";

let props = defineProps( { blank: Boolean, details: Object } )

let chatend = ref();
let conversation_grouped_by_date = computed( () => {
    const groups = props.details.chat.reduce( ( groups, chat ) => {
        const date = moment( chat.created_at ).calendar( null, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY'
        } );
        if ( !groups[ date ] ) {
            groups[ date ] = [];
        }
        groups[ date ].push( chat );
        return groups;
    }, {} );
    const groupArrays = Object.keys( groups ).map( ( date ) => {
        return {
            date,
            chat: groups[ date ]
        };
    } );
    return groupArrays.reverse()
} )
onMounted( () => setTimeout( () => {
    chatend.value?.scrollIntoView( { behavior: 'instant' } )
} ) )
let form = useForm( {
    content: null,
    receiver: props.details?.recepient.id,
    message_id: props.details?.chat[ 0 ]?.message_id
} )

let handleSend = () => form.post( route( 'messages.store' ), { preserveState: false, preserveScroll: false, onSuccess: () => toast.success( "Message Sent" ) } )

</script>



<template>
    <div v-if="blank" class="card card-body h-100 d-flex flex-column text-center justify-content-between"
        style="min-height:75vh">
        <div class="h-100 d-flex flex-column justify-content-center">
            <h2>Start a new conversation</h2>
            <p>Or click on existing to continue conversation</p>
        </div>
        <p class="text-muted text-center">
            <i class="fas fa-lock me-2 "></i> End to end encrypted
        </p>
    </div>
    <div v-else class="card">
        <div class="p-3 px-lg-4 border-bottom">
            <div class="row">
                <div class="col-md-4 col-6">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 me-2 align-self-center">
                            <img :src="details.recepient.avatar ?? 'assets/images/no-profilepics.png'"
                                class="avatar avatar-sm rounded-circle img-thumbnail" alt="">
                        </div>

                        <div class="flex-grow-1">
                            <h6 class="font-size-16 mb-1 text-truncate"><a href="#" class="text-dark">
                                    {{ details.recepient.fullname }} </a>
                            </h6>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-6">
                    <ul class="list-inline user-chat-nav text-end mb-0">
                        <li class="list-inline-item">
                            <div class="dropdown">
                                <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-search"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end dropdown-menu-md">
                                    <form class="p-2">
                                        <div>
                                            <input type="text" class="form-control rounded" placeholder="Search...">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li class="list-inline-item">
                            <div class="dropdown">
                                <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <Link class="dropdown-item"
                                        :href="route('profile.index', { slug: details.recepient.slug })">Profile</Link>
                                    <a class="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <div class="chat-conversation py-3">
                <ul class="list-unstyled mb-0 chat-conversation-message px-3" data-simplebar>
                    <template v-if="details.chat[0].id">

                        <template v-for="days in conversation_grouped_by_date" :key="days">
                            <li class="chat-day-title">
                                <div class="title">{{ days.date }}</div>
                            </li>
                            <template v-for="chat in sortBy(days.chat, (o) => o.created_at)" :key="chat">
                                <li :class="{ right: chat.receiver.id !== $page.props.auth.user.id }">
                                    <div class="conversation-list" style="width:60%">
                                        <div class="ctext-wrap mb-3">
                                            <div class="ctext-wrap-content">
                                                <p class="mb-0" style="white-space: pre-line" v-html="chat.content">
                                                </p>
                                                <div class="justify-content-end align-items-center d-flex">
                                                    <span
                                                        class="d-inline-block font-size-12 text-muted ms-2">{{ moment(chat.created_at).format('hh:mm A') }}</span>
                                                    <template v-if="chat.receiver.id !== $page.props.auth.user.id">
                                                        <i :class="chat.read_at ? 'fa-check-double text-success' : 'fa-check'"
                                                            class="fal ms-1"></i>
                                                    </template>
                                                    <div class="dropdown "
                                                        v-if="chat.receiver.id !== $page.props.auth.user.id">
                                                        <a class="ps-2 text-muted" type="button" data-bs-toggle="dropdown">
                                                            <i class="fa fa-ellipsis-v"></i>
                                                        </a>
                                                        <div class="dropdown-menu">
                                                            <Link :preserve-state="false" class="dropdown-item"
                                                                method="DELETE" :data="{ id: chat.id }"
                                                                :href="route('messages.destroy.conversation')">
                                                            Delete</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </template>
                        </template>
                    </template>
                    <span ref="chatend"></span>
                </ul>
            </div>
        </div>
        <form @submit.prevent="handleSend" class="d-flex border p-2 align-items-end">
            <div class="flex-shrink-0">
                <button type="button" class="btn"><i class="fal fa-paperclip font-size-18"></i></button>
            </div>
            <div class="flex-grow-1 mx-1">
                <c-textarea v-model="form.content" class="form-control" placeholder="Type a message"></c-textarea>
            </div>
            <div v-if="form.content" class="flex-shrink-0">
                <button :disabled="form.processing" class="btn waves-effect waves-light"><span v-if="form.processing"
                        class="spinner-border spinner-border-sm">
                    </span><i v-else class="fa fa-paper-plane"></i> </button>
            </div>
        </form>
    </div>
</template>
<style></style>