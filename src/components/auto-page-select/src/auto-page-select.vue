<template>
    <bk-select
        v-model="modelValue"
        v-bind="$attrs"
        :loading="loading"
        :style="{width: computedWidth}"
        :remote-method="setKeyword"
        @scroll-end="createRequest"
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
import { usePaginationRequest } from '../../../composables/index.js'

const props = defineProps({
    modelValue: {
        type: [String, Number, Array],
        default: ''
    },
    value: {
        type: [String, Number, Array],
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
    },
    defaultValue: {
        type: Array,
        default: () => []
    },
    uniqueField: {
        type: String,
        default: 'id'
    }
})

const emit = defineEmits(['update:value', 'change'])
const modelValue = computed({
    get() {
        return props.value
    },
    set(val) {
        emit('update:value', val)
    }
})

const computedWidth = computed(() => typeof props.width === 'number' ? `${props.width}px` : props.width)

const {
    data: options,
    keyword,
    loading,
    createRequest,
    setKeyword,
    reset
} = usePaginationRequest(
    props.remoteMethod,
    props.immediate,
    props.keywordKey,
    props.extraParams,
    props.defaultValue,
    props.uniqueField,
    props.warning,
    scrollToTop
)

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
    createRequest,
    reset
})
</script>