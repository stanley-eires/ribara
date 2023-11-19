<script setup>
import { logout } from "@/Scripts/helpers"
import moment from "moment";
import { onMounted, ref } from "vue";
import SearchForm from '@/Components/SearchForm.vue';
let props = defineProps( { menu: Object } );
let btnclose = ref();
onMounted( () => {
    document.querySelector( 'body' ).classList.remove( 'sidebar-enable' )
} )

</script>
<template>
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <div class="navbar-brand-box pe-0">
                    <Link href="/" class="logo logo-dark">
                    <span class="logo-lg ">
                        <img loading="lazy" src="/logo.png" alt="" style="height:40px">
                    </span>
                    <span class="logo-sm ">
                        <img loading="lazy" src="/favicon.png" alt="" style="height:30px">
                    </span>
                    </Link>
                </div>

                <button type="button" class="btn btn-sm fs-3 header-item waves-effect vertical-menu-btn">
                    <i class="fa fa-fw fa-bars"></i>
                </button>
            </div>

            <div class="d-flex">
                <SearchForm />

                <div class="dropdown d-inline-block">
                    <button type="button" class="btn header-item noti-icon waves-effect"
                        id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i class="fad fa-bell"></i>
                        <span v-show="$page.props.auth.unread_notifications.length > 0"
                            class="badge bg-danger rounded-pill">{{ $page.props.auth.unread_notifications.length }}</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-notifications-dropdown">
                        <div class="p-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h5 class="m-0 font-size-16"> Notifications</h5>
                                </div>
                                <div class="col-auto">
                                    <Link :href="route('notifications.read.all')" class="small"> Mark all as read</Link>
                                </div>
                            </div>
                        </div>
                        <div data-simplebar style="max-height: 230px;">
                            <a href="#" class="text-reset notification-item"
                                v-for="i in $page.props.auth.unread_notifications" :key="i">
                                <div class="d-flex align-items-start">
                                    <div class="avatar-xs me-3 flex-shrink-0">
                                        <span class="avatar-title bg-light rounded-circle font-size-16">
                                            <i v-if="i.data.icon" :class="i.data.icon"></i>
                                            <img v-else-if="i.data.image" class="avatar rounded-circle header-profile-user"
                                                :src="i.data.image ?? '/assets/images/no-profilepics.png'" />
                                            <i v-else class="fas fa-question text-primary"></i>

                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class=" text-muted">
                                            <p class="mb-0" v-html="i.data.content"></p>
                                            <p class="mb-0 small">
                                                {{ moment(i.created_at).fromNow() }}
                                                <Link method="POST" :href="route('notification.read')"
                                                    :preserve-scroll="true" :preserve-state="true" :data="{ id: i.id }"
                                                    class="float-end text-muted">Mark as read
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="p-2 border-top d-grid">
                            <a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                <i class="fa fa-arrow-circle-right me-1"></i> View More
                            </a>
                        </div>
                    </div>
                </div>

                <div class="dropdown">
                    <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img loading="lazy" class="rounded-circle header-profile-user"
                            :src="$page.props.auth.user.avatar ? $page.props.auth.user.avatar : '/assets/images/no-profilepics.png'"
                            alt="Header Avatar">
                        <i class="far fa-angle-down d-none d-xl-inline-block font-size-15"></i>
                    </button>
                    <div class="dropdown-menu">
                        <Link :href="route('profile.index', $page.props.auth.user.slug)" class="dropdown-item"><i
                            class="fal fa-user-circle font-size-18 me-2"></i>View Profile
                        </Link>
                        <button @click.prevent="logout" class="dropdown-item"><i
                                class="fal fa-power-off font-size-18  me-2"></i> Sign
                            Out</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid" v-if="menu">
            <div class="topnav">

                <nav class="navbar navbar-light navbar-expand-lg topnav-menu">

                    <div class="collapse navbar-collapse" id="topnav-menu-content">
                        <ul class="navbar-nav ">
                            <template v-for="item in menu" :key="item">
                                <li v-if="item.submenu" class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle arrow-none" href="#" id="topnav-pages" role="button">
                                        <i :class="item.icon" class="me-2"></i> {{ item.title }}
                                        <div class="arrow-down"></div>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="topnav-pages">
                                        <template v-for="sub_item in item.submenu" :key="sub_item">
                                            <div v-if="sub_item.submenu" class="dropdown">
                                                <a class="dropdown-item dropdown-toggle arrow-none" :href="sub_item.href"
                                                    id="topnav-email" role="button">
                                                    {{ sub_item.title }}
                                                    <div class="arrow-down"></div>
                                                </a>
                                                <div class="dropdown-menu" aria-labelledby="topnav-email">
                                                    <a v-for="ss_sub_item in sub_item.submenu" :key="ss_sub_item"
                                                        :href="ss_sub_item.href"
                                                        class="dropdown-item">{{ ss_sub_item.title }}</a>
                                                </div>
                                            </div>
                                            <a v-else :href="sub_item.href" class="dropdown-item">{{ sub_item.title }}</a>
                                        </template>
                                    </div>
                                </li>
                                <li v-else class="nav-item">
                                    <Link class="nav-link" :href="item.href">
                                    <i :class="item.icon" class="me-2"></i> {{ item.title }}
                                    </Link>
                                </li>
                            </template>

                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>

