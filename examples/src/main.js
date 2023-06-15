import Vue from 'vue'
import App from './App1'

// 全量引入UI组件库
import bkMagicVue from '@canway/cw-magic-vue'
import '@canway/cw-magic-vue/dist/bk-magic-vue.min.css'

import { autoPageSelect, autoPageOption, autoSelectSet } from '/src'

Vue.use(autoPageSelect)
Vue.use(autoPageOption)
Vue.use(autoSelectSet)

Vue.use(bkMagicVue, {
    'bk-dialog': {
        heightAdaption: true
    },
    'bk-tag': {
        state: true
    },
    'bk-input': {
        clearable: true,
        showClearOnlyHover: true
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data() {
        return {
            website: '我是全局变量'
        }
    },
    render: (h) => h(App),
    // template: '<App/>'
})
