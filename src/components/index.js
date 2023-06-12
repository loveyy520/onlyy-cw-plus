import { loadModules } from '~/utils'

const files = import.meta.globEager('./*/index.js')

export default loadModules(files)

export * from './auto-page-select'
