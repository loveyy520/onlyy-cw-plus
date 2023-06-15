<template>
    <div class="p-[20px]">
        <h1>下拉框</h1>
        <bk-form>
            <bk-form-item label="下拉框">
                <auto-page-select
                    ref="selectRef"
                    width="240px"
                    immediate
                    multiple
                    display-tag
                    auto-height
                    searchable
                    clearable
                    enable-scroll-load
                    :value.sync="model.ids"
                    :defaultValue="model.objs"
                    :remote-method="getOptions"
                    @change="handleChange">
                        <auto-page-option
                            v-for="opt in getValue(options)"
                            :key="opt.id"
                            :id="opt.id"
                            :name="`${opt.name}【${opt.en}】`" />
                            <template #extension>
                                <span>
                                    extension
                                </span>
                            </template>
                </auto-page-select>
            </bk-form-item>
        </bk-form>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { getOptions } from '@/api'

const selectRef = ref(null)

const model = reactive({
    ids: [25],
    objs: [{ id: 25, name: '测试25', en: 'test25' }]
})
const options = computed(() => selectRef.value?.options ??
    [])

function getValue(val){
    console.log(val);
    return val
}

function handleChange(val, oldVal) {
    console.log('ids:', model.ids, 'val:', val);
}
</script>