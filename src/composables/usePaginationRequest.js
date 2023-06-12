/*
 * @Author: loveyy520 201357337@qq.com
 * @Date: 2023-06-02 19:38:29
 * @LastEditors: loveyy520 201357337@qq.com
 * @LastEditTime: 2023-06-02 21:47:11
 * @FilePath: \onlyy-cw-plus\src\hooks\usePaginationRequest.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive, ref, watch } from 'vue'
import { getDeepProperty } from '~/utils'

/**
 * 请求自动分页
 * @param { (...args) => Promise } request 请求方法
 * @param { boolean } immediate 是否立即请求选项数据，默认false
 * @param { (msg: string) => void } warning 异常提示方法
 * @param { object } extraParams 除了分页和搜索关键字以外的其他参数, 应当是一个Ref或ComputedRef, 或者返回一个对象的函数以兼容选项式API
 * @param { boolean } replace 旧数据的处理方式: true - 替换; false - 并入。默认false
 * @param { string } keywordKey 搜索关键字在请求参数中的名称，默认为keyword
 * @param { number } pagesize 每页数据数量
 * @param { string } dataKey 列表数据在返回参数中的路径，默认为data.items
 * @param { string } countKey 数据总量在返回参数中的路径，默认为data.count
 * @param { string } resultKey 表示本次查询是否成功的字段在返回参数中的路径，默认为result
 * @param { string } messageKey 提示信息在返回参数中的路径，默认为message
 */
function usePaginationRequest(
    request,
    immediate = false,
    warning = () => {},
    extraParams = {},
    replace = false,
    keywordKey = 'keyword',
    pagesize = 10,
    dataKey = 'data.items',
    countKey = 'data.count',
    resultKey = 'result',
    messageKey = 'message',
) {
    const data = ref([]) // 展示的数据
    const keyword = ref('') // 搜索关键字
    const count = ref(1) // 服务端数据总量
    const loading = ref(false)

    // 分页
    const pagination = reactive({
        page: 1,
        pagesize: pagesize
    })

    watch(keyword, (val) => {
        resetPage()
        makeRequest()
    }, { immediate })

    /**
     * 获取分页数据
     * @returns { void }
     */
    async function makeRequest() {
        try {
            if (data.value.length >= count.value) return
            const params = {
                ...pagination,
                ...(typeof extraParams === 'function' ? extraParams() : extraParams),
                [keywordKey]: keyword.value
            }
            loading.value = true
            const res = await request(params)
            // 获取数据失败提示
            if (resultKey && !getDeepProperty(res, resultKey))  return warning(getDeepProperty(res, messageKey))

            // 获取数据成功
            // 处理数据
            const currentData = getDeepProperty(res, dataKey)
            count.value = getDeepProperty(res, countKey)
            data.value = replace ? currentData : [...data.value, ...currentData]

            // 处理分页
            pagination.page++
            console.log('opts:', data.value);
        } catch(e) {
            warning(e.message || e)
        } finally {
            loading.value = false
        }
    }
    
    function resetPage() {
        pagination.page = 1
        count.value = 1
        data.value = []
    }

    function resetKeyword() {
        keyword.value = ''
    }

    function reset() {
        resetPage()
        resetKeyword()
    }

    return {
        data,
        count,
        keyword,
        pagination,
        loading,
        makeRequest,
        resetPage,
        reset
    }
}

export {
    usePaginationRequest
}
