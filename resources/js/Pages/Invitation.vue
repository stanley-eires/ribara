<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import QRCodeVue3 from "qrcode-vue3";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { toast } from "vue3-toastify";
import { _btoa, generateInviteMessage, stripHtml } from '@/Scripts/helpers';

defineProps( { title: String } );
let invitation_url = ref( null );
let copy = () => {
    navigator.clipboard.writeText( stripHtml( form.message ) ).then( () => toast.success( "Invitation link copied" ) ).catch( ( err ) => toast.error( err ) )
}
let message = ref( "" );
let form = useForm( {
    email: [],
    type: 'peer',
    message: "",
} )
watch( () => form.type, ( value ) => {
    let usepage = usePage().props;
    invitation_url.value = `${ usePage().props.ziggy.url }/register?hook=${ _btoa( {
        user_id: usePage().props.auth.user.id,
        type: form.type
    } ) }`
    form.message = generateInviteMessage( value );
}, { immediate: true } )
let sendInvite = () => {
    form.post( route( 'users.invitation' ), { onSuccess: () => form.reset() } )
}
let share = ( media ) => {
    let url = null;
    let user = usePage().props.auth.user;
    let desc = `${ user.fullname } ${ message.value }`;
    switch ( media ) {
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent( invitation_url.value ) }`
            break;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?url=${ encodeURIComponent( invitation_url.value ) }&text=${ encodeURIComponent( desc ) }`
            break;
        case 'whatsapp':
            url = `whatsapp://send?text=${ encodeURIComponent( desc + ' ' + invitation_url.value ) }`
            break;
        case 'telegram':
            url = `https://t.me/share/url?url=${ encodeURIComponent( invitation_url.value ) }&text=${ encodeURIComponent( desc ) }`
            break;
        default:
            url = `whatsapp://send?text=${ encodeURIComponent( desc + ' ' + invitation_url.value ) }`
    }
    window.open( url, '_blank', 'width=600,height=400' );
}
</script>
<template>
    <AuthenticatedLayout>

        <Head :title="title" />
        <div class="mb-2 page-title-box d-flex align-items-center justify-content-between">
            <h3>Inviting Others</h3>
        </div>
        <div class="row">
            <div class="col-lg-10">
                <form @submit.prevent="sendInvite" class="row align-items-center">
                    <div class="col-md-7">
                        <div class="card card-body">
                            <div class="form-group mb-3">
                                <label>Enter valid email of users</label>
                                <v-select placeholder="Press enter after each email" v-model="form.email" taggable
                                    :autocomplete="true" multiple push-tags :loading="false" :select-on-tab="true"
                                    :no-drop="true" :dropdown-should-open="(VueSelect) => VueSelect.open">
                                    <template #search="{ attributes, events }">
                                        <input class="vs__search" :required="!form.email.length" v-bind="attributes"
                                            v-on="events" />
                                    </template>
                                </v-select>
                            </div>
                            <div class="form-group mb-3">
                                <label class="">Action to perform:</label>
                                <select v-model="form.type" class="form-select text-capitalize">
                                    <option class="text-capitalize" v-for="i in 
                                    [
                                        { title: 'Request to be a protégé', value: 'mentor' },
                                        { title: 'Offer to be a mentor', value: 'protege' },
                                        { title: 'Connect as peers', value: 'peer' }
                                    ]" :key="i" :value="i.value">{{ i.title }}
                                    </option>

                                </select>
                            </div>
                            <div class="form-group mb-3">
                                <label>Invitation Message</label>
                                <QuillEditor class="form-control px-0" toolbar="minimal" v-model:content="form.message"
                                    contentType="html" theme="snow" />
                            </div>
                            <div class="form-group">
                                <button :class="{ 'disabled': form.processing || !form.message }"
                                    :disabled="form.processing || !form.message"
                                    class="btn btn-primary waves-effect waves-light w-100" type="submit"><span
                                        v-if="form.processing" class="spinner-grow text-white spinner-grow-sm me-2"></span>
                                    Send
                                    Invitation{{ form.email.length > 1 ? 's' : '' }}</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 text-center">
                        <QRCodeVue3 :width="300" :height="300" :value="invitation_url" image="/logo.png" :dotsOptions="{
                            type: 'dots',
                            color: '#26249a'
                        }" />
                        <button @click.prevent="copy" class="btn btn-light btn-xs my-2"><i class="fas fa-copy me-2"></i>
                            Copy ({{ form.type }})
                            invitation link
                        </button>
                        <div class="d-flex flex-wrap justify-content-center">
                            <button @click.prevent="share('facebook')"
                                class="share-button rounded-0 p-0 btn text-bg-primary me-2">
                                <span class="icon">
                                    <i class="fab fa-facebook font-size-20"></i>
                                </span>
                                <span class="vr"></span>
                                <span class="px-2">Facebook</span>
                            </button>
                            <button @click.prevent="share('twitter')"
                                class="share-button rounded-0 p-0 btn text-bg-dark me-2">
                                <span class="icon">
                                    <i class="fab fa-x font-size-20"></i>
                                </span>
                                <span class="vr"></span>
                                <span class="px-2">Twitter</span>
                            </button>
                            <button @click.prevent="share('whatsapp')"
                                class="share-button rounded-0 p-0 btn text-bg-success me-2">
                                <span class="icon">
                                    <i class="fab fa-whatsapp font-size-20"></i>
                                </span>
                                <span class="vr"></span>
                                <span class="px-2">Whatsapp</span>
                            </button>
                            <button @click.prevent="share('telegram')" class="share-button rounded-0 p-0 btn text-bg-info">
                                <span class="icon">
                                    <i class="fab fa-telegram font-size-20"></i>
                                </span>
                                <span class="vr"></span>
                                <span class="px-2">Telegram</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
.share-button {
    height: 2.5em;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 0 5 grey;
    margin-bottom: .5rem;
}

.share-button .icon {
    display: flex;
    align-self: stretch;
    justify-content: center;
    align-items: center;
    width: 2.5em;
    position: relative;
}
</style>