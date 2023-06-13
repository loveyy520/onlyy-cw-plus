import { sleep } from '~/utils'
import optionData from './options'

export async function getOptions ({ page, pagesize, keyword }) {
    const start = (page - 1) * pagesize
    const end = page * pagesize
    await sleep(500)
    const options = keyword ? optionData.filter(opt => opt.name.includes(keyword)) : optionData

    return {
        result: true,
        message: 'success',
        data: {
            items: options.slice(start, end),
            count: options.length
        }
    }
}