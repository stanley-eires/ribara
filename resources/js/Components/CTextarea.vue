<script setup>
import { onMounted, ref } from "vue";
const props = defineProps( [ 'modelValue' ] );
let textarea = ref();
const emit = defineEmits( [ 'update:modelValue' ] )

let autoExpand = () => {
    textarea.value.style.height = props.modelValue ? textarea.value.scrollHeight : '25px';
    textarea.value.style.height = textarea.value.scrollHeight < 100 ? textarea.value.scrollHeight + 'px' : '100px';
}
onMounted( () => autoExpand() )
let handleChange = ( ev ) => {
    emit( 'update:modelValue', ev );
    autoExpand();
}
</script>
<template>
    <textarea class="overflow-hidden" :value="modelValue" @input="handleChange($event.target.value)" @focus="autoExpand"
        @blur="autoExpand" ref="textarea" :style="{ 'resize': 'none' }"></textarea>
</template>