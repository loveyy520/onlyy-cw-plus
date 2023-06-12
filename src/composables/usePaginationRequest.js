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
 * @param { string } keywordKey 搜索关键字在请求参数中的名称，默认为keyword
 * @param { object } extraParams 除了分页和搜索关键字以外的其他参数, 应当是一个Ref或ComputedRef, 或者返回一个对象的函数以兼容选项式API
 * @param { (msg: string) => void } warning 异常提示方法
 * @param { boolean } replace 旧数据的处理方式: true - 替换; false - 并入。默认false
 * @param { number } pagesize 每页数据数量
 * @param { string } dataKey 列表数据在返回参数中的路径，默认为data.items
 * @param { string } countKey 数据总量在返回参数中的路径，默认为data.count
 * @param { string } resultKey 表示本次查询是否成功的字段在返回参数中的路径，默认为result
 * @param { string } messageKey 提示信息在返回参数中的路径，默认为message
 */
function usePaginationRequest(
    request,
    immediate = false,
    keywordKey = 'keyword',
    extraParams = {},
    warning = () => {},
    replace = false,
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

    watch(keyword, async (val) => {
        console.log('watch:', val);
        await resetPage()
        await makeRequest(false)
    }, { immediate })

    /**
     * 获取分页数据
     * @returns { void }
     */
    async function makeRequest(merge = true) {
        try {
            if (merge && data.value.length >= count.value) return
            const params = {
                ...pagination,
                ...(typeof extraParams === 'function' ? extraParams() : extraParams)
            }
            // 添加关键字参数
            keywordKey && (params[keywordKey] = keyword.value)
            console.log('params:',  keyword.value, params);
            loading.value = true
            const res = await request(params)
            
            // 获取数据失败提示
            if (resultKey && !getDeepProperty(res, resultKey))  return warning(getDeepProperty(res, messageKey))
            
            // 解决搜索时关键字变化过快，导致多次请求使page参数异常
            !merge && resetPage()

            // 获取数据成功
            // 处理数据
            const currentData = getDeepProperty(res, dataKey)
            count.value = getDeepProperty(res, countKey)
            data.value = replace || !merge ? currentData : [...data.value, ...currentData]

            // 处理分页
            pagination.page++
        } catch(e) {
            // warning(e.message || e)
            console.log(e.message);
        } finally {
            loading.value = false
        }
    }
    
    async function resetPage() {
        pagination.page = 1
        count.value = 1
        data.value = []
    }

    function setKeyword(value) {
        keyword.value = value
    }

    function resetKeyword() {
        setKeyword('')
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
        setKeyword,
        resetPage,
        reset
    }
}

export {
    usePaginationRequest
}
