<script setup>
import { sum } from "lodash";
import { computed } from "vue"

let props = defineProps( { user: Object } )

let total_connects = computed( () => sum( Object.values( props.user.connection_stats ) ) )
</script>

<template>
    <div class="text-end">
        <button @click.prevent="$emit('action', 'close')" class="btn ">Close</button>
    </div>
    <div class="row g-5 align-items-center">
        <div class="col-md-5">
            <img loading="lazy" src="/assets/images/ribara-woman.gif" alt="" style="width:100%;object-fit: contain;">
        </div>
        <div class="col-md-7">
            <h1 class="my-3"><span>Welcome onboard</span><br> <b
                    class="text-primary fw-bold display-5">{{ user.fullname }}</b></h1>
            <p class="lead fw-bold">Ribara is about Discovering and being Discovered.</p>
            <ol class="list-group list-group-flush">
                <li class="list-group-item ">
                    <div class=" row">
                        <div class="col-md-8 ">
                            <p class="m-0 d-flex"><i
                                    :class="!user.email_verified_at ? 'fa-exclamation-circle text-danger' : 'fa-check-circle text-success'"
                                    class="fa  me-2 font-size-24"></i>Your Email is one channel we would be sending
                                notifications to. We need to be sure it works.</p>
                        </div>
                        <div class=" col-md-4 text-end">
                            <Link disabled as="button" :href="route('verification.send')" method="POST"
                                class="btn btn-light fw-bold btn-sm disabled">
                            Verify
                            Email <i class="fa fa-angle-right ms-1"></i></Link>
                        </div>
                    </div>
                </li>
                <li class="list-group-item ">
                    <div class=" row">
                        <div class="col-md-8 ">
                            <p class="m-0 d-flex"><i
                                    :class="!user.avatar ? 'fa-exclamation-circle text-danger' : 'fa-check-circle text-success'"
                                    class="fa  me-2 font-size-24"></i> A
                                good
                                profile picture speaks thousand words.</p>
                        </div>
                        <div class=" col-md-4 text-end">
                            <button :disabled="user.avatar" @click.prevent="$emit('action', 'avatar')"
                                class="btn btn-light fw-bold btn-sm">Upload
                                Avatar <i class="fa fa-angle-right ms-1"></i></button>
                        </div>
                    </div>
                </li>
                <li class="list-group-item ">
                    <div class=" row">
                        <div class="col-md-8">
                            <p class="m-0 d-flex"><i
                                    :class="!user.headline ? 'fa-exclamation-circle text-danger' : 'fa-check-circle text-success'"
                                    class="fa me-2 font-size-24"></i> Let
                                people know who you are easily. Complete your profile
                                information</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <button :disabled="user.headline != ''" @click.prevent="$emit('action', 'profile')"
                                class="btn btn-light fw-bold btn-sm">Edit
                                profile <i class="fa fa-angle-right ms-1"></i></button>
                        </div>
                    </div>
                </li>
                <li class="list-group-item ">
                    <div class=" row">
                        <div class="col-md-8">
                            <p class="m-0 d-flex"><i
                                    :class="user.experience.length == 0 ? 'fa-exclamation-triangle text-warning' : 'fa-check-circle text-success'"
                                    class="fa me-2 font-size-24"></i>
                                Add
                                any relevant work experience</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <Link @click="$emit('action', 'close')" :href="route('experience.create')"
                                class="btn btn-light fw-bold btn-sm">Add Experience <i class="fa fa-angle-right ms-1"></i>
                            </Link>
                        </div>
                    </div>
                </li>
                <li class="list-group-item ">
                    <div class=" row">
                        <div class="col-md-8">
                            <p class="m-0 d-flex"><i
                                    :class="user.education.length == 0 ? 'fa-exclamation-triangle text-warning' : 'fa-check-circle text-success'"
                                    class="fa me-2 font-size-24"></i>
                                Add
                                any relevant education history</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <Link @click="$emit('action', 'close')" :href="route('education.create')"
                                class="btn btn-light fw-bold btn-sm">Add Education <i class="fa fa-angle-right ms-1"></i>
                            </Link>
                        </div>
                    </div>
                </li>
                <li class="list-group-item ">
                    <div class=" row">
                        <div class="col-md-8">
                            <p class="m-0 d-flex"><i
                                    :class="total_connects == 0 ? 'fa-exclamation-triangle text-warning' : 'fa-check-circle text-success'"
                                    class="fa  me-2 font-size-24"></i>
                                Connect with atleast one person</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <Link @click="$emit('action', 'close')" :preserve-state="false" :href="route('search.people')"
                                class="btn btn-light fw-bold btn-sm">Explore People <i class="fa fa-angle-right ms-1"></i>
                            </Link>
                        </div>
                    </div>
                </li>
            </ol>
            <em class="mt-4">Do you find this popup annoying. We do too. So please finish up with the checklist so we could
                all move to greater
                things</em>
        </div>
    </div>
</template>