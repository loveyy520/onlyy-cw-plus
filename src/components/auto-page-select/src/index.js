import select from './auto-page-select.vue'
import autoPageOption from './auto-page-option.js';
import { withInstall } from '../../../utils/index.js';
select.name = 'auto-page-select'
autoPageOption.name = 'auto-page-option'

const autoPageSelect = withInstall(select)

export {
    autoPageOption,
    autoPageSelect
}