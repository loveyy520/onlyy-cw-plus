
function getDeepProperty(obj, path) {
    const pathChunks = path.split('.')
    let result = obj
    let prop
    while(prop = pathChunks.shift()) {
        result = result[prop]
    }
    return result
}

export {
    getDeepProperty
}
