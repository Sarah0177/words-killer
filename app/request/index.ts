

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
const initGetRequest = async (url:string, params: object, immediate = false) => {
  try {
    const data = await $fetch(url, {
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
