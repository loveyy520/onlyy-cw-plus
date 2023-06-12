import select from './auto-page-select'
import autoPageOption from './auto-page-option';
import { withInstall } from '~/utils';
console.log(autoPageOption);
select.name = 'auto-page-select'
autoPageOption.name = 'auto-page-option'

const autoPageSelect = withInstall(select)

export {
    autoPageOption,
    autoPageSelect
}