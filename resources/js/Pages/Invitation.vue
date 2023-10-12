<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import QRCodeVue3 from "qrcode-vue3";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { toast } from "vue3-toastify";
import { stripHtml } from '@/Scripts/helpers';

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
    invitation_url.value = `${ usePage().props.ziggy.url }/register?hook=${ btoa( JSON.stringify( {
        user_id: usePage().props.auth.user.id,
        type: form.type
    } ) ) }`
    if ( value == 'mentor' ) {
        message.value = `is inviting you to be ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } mentor on Ribara. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is truly inspired by your achievements. Your expertise is something she greatly admires and aspires to attain in ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } own career. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is reaching out with a sincere request for your mentorship. We believe your guidance would be invaluable in navigating the path ahead.  ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is committed to investing the necessary time and effort, and is flexible to accommodate your schedule. Your mentorship would not only be an honor but a catalyst for ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } professional growth. Thank you for considering ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } request`
    } else if ( value == 'protege' ) {

        message.value = `wants to be your mentor on Ribara. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is truly impressed by your dedication and potential. Your passion is evident and ${ usepage.auth.user.usermeta.gender == 'Male' ? 'he' : 'she' } believes it deserves the right guidance to reach its fullest potential. With that in mind, ${ usepage.auth.user.usermeta.gender == 'Male' ? 'he' : 'she' } would be honored to offer you mentorship. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } is eager to share ${ usepage.auth.user.usermeta.gender == 'Male' ? 'his' : 'her' } experiences and insights to support you in your professional journey. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } understands the value of time and would ensure your interactions are convenient for you. Your growth is important to ${ usepage.auth.user.usermeta.gender == 'Male' ? 'him' : 'her' }, and is committed to helping you achieve your goals. Please feel free to let ${ usepage.auth.user.usermeta.gender == 'Male' ? 'him' : 'her' } know if you have any preferences or specific areas you'd like to focus on. Looking forward to the opportunity to work together`
    } else if ( value == 'peer' ) {
        message.value = `wants to connect with you on Ribara. ${ usepage.auth.user.usermeta.gender == 'Male' ? 'He' : 'She' } admires your drive, creativity, and the unique perspective you bring in your field. It's clear to her you share a common goal - to push boundaries and grow in your respective careers. With that in mind, She believe that by supporting and challenging each other, you both would achieve remarkable things together. You can both share insights, set goals, and hold each other accountable for each other's progress. Connect on Ribara to discuss this further and brainstorm on how you both can best support each other's growth. Looking forward to the incredible possibilities that lie ahead.`
    }
    form.message = `<p>${ usepage.auth.user.fullname } ${ message.value }</p><p>Accept the invite by clicking the link: <a href='${ invitation_url.value }'>${ invitation_url.value }</a></p>`
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