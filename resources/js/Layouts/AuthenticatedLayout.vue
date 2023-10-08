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

</script>

<template>
    <div id="layout-wrapper">
        <top-bar></top-bar>
        <side-bar></side-bar>
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
