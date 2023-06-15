<template>
    <div class="p-[20px]">
        <h1>下拉框</h1>
        <bk-form>
            <bk-form-item label="下拉框">
                <auto-select-set
                    ref="selectRef"
                    width="240px"
                    multiple
                    display-tag
                    auto-height
                    searchable
                    clearable
                    enable-scroll-load
                    :value.sync="model.ids"
                    :defaultValue="model.objs"
                    :remote-method="getOptions"
                    @change="handleChange" />
            </bk-form-item>
        </bk-form>
        <bk-button @click="makeRequest">请求数据</bk-button>
    </div>
</template>

<script>
import { getOptions } from '@/api'
export default {
    data() {
        return {
            model: {
                ids: [25],
                objs: [{ id: 25, name: '测试25', en: 'test25' }]
            }
        }
    },
    computed: {
        options() {
            return this.$refs.selectRef?.options
        }
    },
    methods: {
        handleChange(val, oldVal) {
            console.log('ids:',this.model.ids, 'val:', val)
        },
        getOptions,
        makeRequest() {
            this.$refs.selectRef.createRequest()
        }
    },
}
</script>