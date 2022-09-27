export const replaceRouteApi = (path = '', param = 'id', value = null) => {
    return path.replace(`:${param}`, value);
}