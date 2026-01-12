

const initRequest = async (url:string, method:any, params: object, immediate = false) => {
  try {
    const data = await $fetch(url, {
      immediate, // 设置为 false，不在组件加载时立即执行
      method,
      body: {
        ...params
      },
    })
    return data
  } catch (err) {
    throw(new Error(err))
  }
}
const initGetRequest = async (url:string, params = {}, immediate = false) => {
  const _params = Object.keys(params).map(key => {
    return `${key}=${encodeURIComponent(params[key])}`
  }).join('&')
  try {
    const finalUrl = _params ? `${url}?${_params}` : url
    const data = await $fetch(finalUrl, {
      immediate, // 设置为 false，不在组件加载时立即执行
      method: 'GET'
    })
    return data
  } catch (err) {
    throw(new Error(err))
  }
}

export const deleteWord = (params) => initRequest('/api/words', 'DELETE', params)

export const addWords = (params) => initRequest('/api/words', 'POST', params)

export const queryWords = (params) => initGetRequest('/api/words', params)

export const updateWord = (params) => initRequest('/api/words', 'PUT', params)

export const addTask = (params) => initRequest('/api/task', 'POST', params)

export const queryTask = (params) => initGetRequest('/api/task', params)