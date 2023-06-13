<template>
    <bk-select
        v-model="value"
        v-bind="$attrs"
        :loading="loading"
        :style="{width: computedWidth}"
        :remote-method="setKeyword"
        @scroll-end="makeRequest"
        @selected="(...args) => $emit('selected', ...args)"
        @toggle="(...args) => $emit('toggle', ...args)"
        @change="(...args) => $emit('change', ...args)"
        @clear="(...args) => $emit('clear', ...args)"
        @tab-remove="(...args) => $emit('tab-remove', ...args)">
        <template #default="{option, optionIndex, group, groupIndex}">
            <slot
                :option="option"
                :optionIndex="optionIndex"
                :group="group"
                :groupIndex="groupIndex" />
        </template>
        <template #extension>
            <slot name="extension" />
        </template>
        <!-- 加上trigger插槽后下拉框初始placeholder空白 -->
        <!-- <template #trigger="triggerScope">
            <slot name="trigger" :scope="{...triggerScope}" />
        </template> -->
        <template #selectedNameLeft>
            <slot name="selectedNameLeft" />
        </template>
    </bk-select>
</template>

<script setup>
import { computed } from 'vue'
import { usePaginationRequest } from '~/composables'

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
    },
    keywordKey: {
        type: String,
        default: 'keyword'
    },
    extraParams: {
        type: Object,
        default: () => ({})
    },
    warning: {
        type: Function,
        default: () => {}
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
    setKeyword,
    reset
} = usePaginationRequest(
    props.remoteMethod,
    props.immediate,
    props.keywordKey,
    props.extraParams,
    props.warning,
    scrollToTop)

function scrollToTop() {
    const wrapper = document.querySelector('.bk-options')
    if (!wrapper) return
    const firstOpt = wrapper.firstElementChild
    if (!firstOpt) return
    firstOpt.scrollIntoView()
}

defineExpose({
    options,
    keyword,
    makeRequest,
    reset
})
</script>

<style lang="scss" scoped>

</style>