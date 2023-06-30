import select from './auto-page-select.vue'
import selectSet from './select-set.vue'
import autoPageOption from './auto-page-option.js';
import { withInstall } from '../../../utils/index.js';

select.name = 'auto-page-select'
autoPageOption.name = 'auto-page-option'
selectSet.name = 'auto-select-set'

const autoPageSelect = withInstall(select)
const autoSelectSet = withInstall(selectSet)

export {
    autoPageOption,
    autoPageSelect,
    autoSelectSet
}