function getDeepProperty(obj, path) {
    const pathChunks = path.split('.')
    let result = obj
    let prop
    while(prop = pathChunks.shift()) {
        result = result[prop]
    }
    return result
}

const loadModules = (files, modules = {}) =>
    Reflect.ownKeys(files).reduce((pre, cur) => ({...pre, ...files[cur]}), modules)

const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration))    

function withInstall(component) {
    component.install = (vue) => vue.component(component.name, component)
    return component
}

export {
    getDeepProperty,
    loadModules,
    withInstall,
    sleep
}
