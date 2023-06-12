<template>
    <bk-select
        v-model="value"
        v-bind="$attrs"
        :loading="loading"
        :style="{width: computedWidth}"
        @scroll-end="makeRequest">
        <slot />
    </bk-select>
</template>

<script setup>
import { computed } from 'vue';
import { usePaginationRequest } from '~/composables';
// import { getDeepProperty } from '~/utils';

const props = defineProps({
    modelValue: {
        type: [String, Number, Object],
        default: ''
    },
    width: {
        type: [String, Number],
        default: 'auto'
    },
    remote: {
        type: Boolean,
        default: false
    },
    remoteMethod: {
        type: [Function, null],
        default: () => []
    },
    immediate: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const computedWidth = computed(() => typeof props.width === 'number' ? `${props.width}px` : props.width)

const {
    data: options,
    keyword,
    loading,
    makeRequest,
    reset
} = usePaginationRequest(props.remoteMethod, props.immediate, console.log)

defineExpose({
    options,
    keyword,
    makeRequest,
    reset
})
</script>

<style lang="scss" scoped>

</style>