<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
let emit = defineEmits( [ 'submit' ] )
let props = defineProps( { commentable_id: String, commentable_type: String, content: String, commentId: Number, parent_id: Number } )

let form = useForm( {
    content: props.content,
    user_id: usePage().props.auth.user.id,
    commentable_id: props.commentable_id,
    commentable_type: props.commentable_type,
    parent_id: props.parent_id
} )

let submitComment = () => {
    if ( props.commentId ) {
        form.transform( ( data ) => ( { ...data, id: props.commentId } ) ).put( route( 'comment.update' ), { preserveState: false, preserveScroll: true, onSuccess: () => emit( 'submit' ) } );
    } else {
        form.post( route( 'comment.store' ), { preserveState: true, preserveScroll: true, onSuccess: () => { emit( 'submit' ); form.reset() } } );
    }
}

let handleUpload = ( ev ) => {
    let file = ( ev.target.files[ 0 ] );
    useForm( {
        commentable_id: props.commentable_id,
        user_id: usePage().props.auth.user.id,
        commentable_type: props.commentable_type,
        parent_id: props.parent_id,
        commentmeta: {
            type: 'image',
            url: file,

        }
    } ).post( route( 'comment.store' ), { preserveState: false, preserveScroll: true } )
}

</script>
<template>
    <div class="d-flex align-items-center mb-3">
        <div class="me-1 flex-shrink-0">
            <img :src="$page.props.auth.user.avatar ?? '/assets/images/no-profilepics.png'"
                class="avatar avatar-sm rounded-circle img-thumbnail">
        </div>
        <div class="flex-grow-1 lh-sm">
            <form @submit.prevent="submitComment">
                <div class="d-flex justify-content-between align-items-end bg-light px-2 py-0 border-secondary border-2 border"
                    style="border-radius: 25px;">
                    <c-textarea required v-model="form.content" class="form-control-plaintext ms-2"
                        placeholder="Write a comment"></c-textarea>
                    <button v-if="!form.content" @click.prevent="$refs.inputFile.click()" type="button"
                        class="btn p-0 font-size-20 rounded-circle border"><i class="fa fa-image"></i></button>
                </div>
                <input accept="image/*" @input="handleUpload($event)" type="file" ref="inputFile" class="d-none">

                <button v-if="form.content" :class="{ disabled: form.processing }" :disabled="form.processing" type="submit"
                    class="btn-sm mt-2 btn-primary btn rounded-pill px-3">Send</button>
            </form>
            <slot name="footer"></slot>
        </div>
    </div>
</template>