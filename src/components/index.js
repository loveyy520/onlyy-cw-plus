import { loadModules } from '../utils/index.js'

const files = import.meta.globEager('./*/index.js')

export default loadModules(files)

export * from './auto-page-select/index.js'
