<script setup>
import { onMounted, ref } from "vue";
import moment from 'moment';
const props = defineProps( [ 'modelValue' ] );

let isCurrent = ref( true );
let start = ref( null );
let end = ref( null );

const emit = defineEmits( [ 'update:modelValue' ] )

onMounted( () => {
    let [ prefix, suffix ] = props.modelValue ? props.modelValue.split( ' - ' ).map( e => e.trim() ) : [];
    if ( suffix?.toLowerCase() === "current" ) {
        isCurrent.value = true;
    } else {
        isCurrent.value = false;
        end.value = suffix;
    }
    start.value = prefix;
} )
let handleChange = () => {
    let val = `${ start.value } - ${ isCurrent.value ? 'Current' : end.value }`;
    emit( 'update:modelValue', val );
}

</script>

<template>
    <div class="row row-cols-md-2">
        <div class="form-group">
            <div class="form-floating mb-3">
                <input type='month' required class='form-control' v-model="start" :max="moment().format('YYYY-MM')"
                    @input="handleChange">
                <label>Start Date *</label>
            </div>
        </div>
        <div class="form-group">
            <div class="form-floating mb-3">
                <input type='month' :min="start" required v-model="end" :disabled="isCurrent" class='form-control'
                    @input="handleChange">
                <label>End Date *</label>
            </div>
            <div class="form-check form-switch ">
                <input class="form-check-input" type="checkbox" @change="handleChange" id="flexSwitchCheckChecked"
                    v-model="isCurrent">
                <label class="form-check-label" for="flexSwitchCheckChecked">
                    Present (Current)</label>
            </div>
        </div>
    </div>
</template>

