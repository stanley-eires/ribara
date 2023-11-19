<script setup>
import { register } from 'swiper/element/bundle';
register();
</script>

<template>
    <div class="auth-bg">
        <div class="container-fluid my-3">
            <Link href="/"><img loading="lazy" class="mb-5" src="/logo.png" height="50"></Link>
            <div class="row align-items-center">
                <div class="col-lg-5 me-lg-auto col-sm-12 order-1 order-md-0">
                    <div class="px-1">

                        <slot />
                    </div>
                </div>
                <div class="col-lg-5 col-sm-12 order-0 order-md-1">
                    <div class="card card-body bg-light mt-1" style="width: 100%; height: 90vh;">
                        <img class="d-block rounded-4 mb-3" src="/assets/images/Rectangle.jpg" alt=""
                            style="height:70vh;width:100%;object-fit: cover;">
                        <swiper-container class="w-100 text-center" autoplay-delay="4000"
                            autoplay-disable-on-interaction="true">
                            <swiper-slide
                                v-for="i in ['Connect with Mentors, Protégés and Peers at Elite Organisations', 'Track your Gaps and Improvements', 'Schedule Informational Interviews with Corporate Giants in your Field', 'Let Elite Organizations Discover You!']"
                                :key="i" class="fs-2 fw-bold text-primary">{{ i }}</swiper-slide>
                        </swiper-container>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style >
.form-floating>label {
    font-weight: 900;
}

a {
    color: #1C156F
}
</style>
