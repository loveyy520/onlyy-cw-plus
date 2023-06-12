import { sleep } from '~/utils'
import options from './options'

export async function getOptions ({ page, pagesize }) {
    const start = (page - 1) * pagesize
    const end = page * pagesize
    await sleep(500)
    return {
        result: true,
        message: 'success',
        data: {
            items: options.slice(start, end),
            count: options.length
        }
    }
}