<script setup>

</script>

<template>
    <div class="auth-bg">
        <div class="container-fluid p-0 ">
            <div class="row gx-0">
                <div class="col-lg-5 col-xl-4 col-md-6 col-sm-12 sidepanel">
                    <div class="blur"></div>
                    <div class="p-5 unblurred w-100 text-black">
                        <Link href="/"><img loading="lazy" class="mb-5" src="/logo.png" height="50"></Link>
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.auth-bg {
    background-image: url(/assets/images/bg.jpg);
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    min-height: 100%;
}

.blur {
    height: 100%;
    backdrop-filter: blur(5px);
    filter: blur(5px);
    background-color: #ffffff57
}

.sidepanel {
    min-height: 100vh;
    box-shadow: 0px 0px 1rem rgb(0, 0, 0);

}

.unblurred {
    position: absolute;
    top: 0px;
}

.form-control,
.form-select,
.form-control:focus {
    background: transparent;
    border: 2px solid #1c1b1bed;
}

.form-floating>label {
    font-weight: 900;
}

a {
    color: #1C156F
}
</style>
