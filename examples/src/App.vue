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
                    :remote-method="getOptions">
                    <auto-page-option
                        v-for="opt in options"
                        :key="opt.id"
                        :id="opt.id"
                        :name="`${opt.name}【${opt.en}】`" />
                </auto-page-select>
            </bk-form-item>
        </bk-form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getOptions } from '@/api'

const selectRef = ref(null)

const options = computed(() => selectRef.value?.options ??
    [])
</script>

<style lang="scss" scoped>

</style>