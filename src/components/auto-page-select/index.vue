<template>
    <bk-select v-model="value">
        <bk-option
            v-for="opt in data"
            :key="opt[getDeepProperty(keyPath)]"
            :id="opt[getDeepProperty(idPath)]"
            :name="opt[getDeepProperty(namePath)]" />
    </bk-select>
</template>

<script setup>
import { computed } from 'vue';
import { usePaginationRequest } from '../../hooks';
import { getDeepProperty } from '../../utils';

const props = defineProps({
    modelValue: {
        type: [String, Number, Object],
        default: ''
    },
    keyPath: {
        type: String,
        default: 'id'
    },
    idPath: {
        type: String,
        default: 'id'
    },
    nameFormatter: {
        type: Function,
        default: (opt) => opt.name
    },
    remote: {
        type: Boolean,
        default: false
    },
    remoteMethod: {
        type: [Function, null],
        default: () => null
    }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const {
    data: options,
    keyword,
    makeRequest,
    // resetPage
} = usePaginationRequest(remoteMethod)

defineExpose({
    options,
    keyword,
})
</script>

<style lang="scss" scoped>

</style>