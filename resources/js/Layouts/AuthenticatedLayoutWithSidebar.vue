<script setup>
import UserLists from '@/Components/UserLists.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

</script>

<template>
    <AuthenticatedLayout>
        <div class="row">
            <div class="col-md-7">
                <!-- <div class="bg-white px-3 p-2 mb-3 d-md-none">
                            <div class="d-flex align-items-center justify-content-between">
                                <div>
                                    <slot name='headerleft'></slot>
                                </div>
                                <div>
                                    <button class="btn btn-light btn-sm " type="button" data-bs-toggle="offcanvas"
                                        data-bs-target="#layoutSidebar"><i class="fa fa-bars"
                                            aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div> -->
                <slot />
            </div>
            <div class="col-md-5">
                <div class="offcanvas-md offcanvas-end" tabindex="-1" id="layoutSidebar">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#layoutSidebar"
                            aria-label="Close"></button>
                    </div>
                    <div style="overflow-y: auto;">
                        <div class="card shadow-sm">
                            <div class="card-header bg-transparent">
                                <h5 class="">Grow your network</h5>
                            </div>
                            <user-lists></user-lists>
                            <div class="card-footer bg-transparent">
                                <a href="#">View all recommendations <i class="fa fa-arrow-right  ms-2  "></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>
