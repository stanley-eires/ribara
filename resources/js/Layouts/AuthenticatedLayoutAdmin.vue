<script setup>
import { computed, onMounted, watch } from "vue"
import SideBar from "./SideBar.vue"
import TopBar from "./TopBar.vue"
import { init } from "./app.js"
import { usePage } from "@inertiajs/vue3"
import { toast } from "vue3-toastify"
onMounted( () => {
    init();
    const tooltipTriggerList = document.querySelectorAll( '[data-bs-toggle="tooltip"]' )
    const tooltipList = [ ...tooltipTriggerList ].map( tooltipTriggerEl => new bootstrap.Tooltip( tooltipTriggerEl ) )
} )
let message = computed( () => usePage().props.flash.message )

watch( message, ( value ) => {
    if ( value ) {
        toast[ value.status ]( value.content );
    }
}, { deep: true, immediate: true } )

let menu = [
    { title: "Dashboard", icon: "fa-house fat", href: route( 'administrator.index' ), active: false },
    {
        title: "Users", icon: "fat fa-user-group", href: "#", active: false, submenu: [
            {
                title: "Manage", href: route( 'administrator.users' ), submenu: [ { title: "Add New User", href: route( 'administrator.users.create' ) } ]
            },
            { title: "Group", href: "#", submenu: [ { title: "Add New Group", href: "#" } ] },
            { title: "Access Levels", href: "#", submenu: [ { title: "Add New Access Levels", href: "#" } ] },
            { title: "User Actions Log", href: "#" },
            { title: "Mass Mail Users", href: "#" },
        ],
    },
    {
        title: "Content", icon: "fat fa-boxes-packing", href: "#", active: false, submenu: [
            {
                title: "Articles", href: route( 'administrator.articles' ), submenu: [ { title: "Add New Article", href: route( 'administrator.articles.create' ) } ]
            },
            { title: "Categories", href: "#", submenu: [ { title: "Add New Category", href: "#" } ] },
            { title: "Media", href: "#" },
        ]
    },
]
</script>

<template>
    <div id="layout-wrapper">
        <top-bar :menu="menu" />
        <div class="main-content" style="margin-left:0px">
            <div class="page-content">
                <div class="d-none d-md-block" style="height:80px"></div>
                <slot />
            </div>
        </div>
    </div>
</template>
