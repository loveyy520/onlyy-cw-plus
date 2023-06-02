<!--
 * @Author: loveyy520 201357337@qq.com
 * @Date: 2023-06-02 21:36:07
 * @LastEditors: loveyy520 201357337@qq.com
 * @LastEditTime: 2023-06-02 21:57:15
 * @FilePath: \onlyy-cw-plus\test\demo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <auto-page-select v-model="bizId" />
</template>

<script setup>
import { ref } from 'vue'
import AutoPageSelect from '../src/components/auto-page-select/index.vue'

const bizId = ref('')
</script>

<style lang="scss" scoped>

</style>