<!--
 * @Author: loveyy520 201357337@qq.com
 * @Date: 2023-06-13 23:16:22
 * @LastEditors: loveyy520 201357337@qq.com
 * @LastEditTime: 2023-06-13 23:16:49
 * @FilePath: \onlyy-cw-plus\examples\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
import { ref, reactive, computed } from 'vue'
import { getOptions } from '@/api'

const selectRef = ref(null)

const options = computed(() => selectRef.value?.options ??
    [])

const model = reactive({
    ids: [25],
    objs: [{ id: 25, name: '测试25', en: 'test25' }]
})

function handleChange(val, oldVal) {
    console.log('ids:', model.ids, 'val:', val);
}
</script>

<style lang="scss" scoped>

</style>