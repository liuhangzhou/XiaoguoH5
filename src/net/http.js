import axios from 'axios'

// const BASE_URL = 'http://47.116.128.207:8081/wechat'
const BASE_URL = '/wechat'
console.log(BASE_URL)
// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Credentials'] = true
    return config
  },
  error => {
    console.error("Http request error: ", error)
    return Promise.reject(error)
  }
)

// response interceptors
service.interceptors.response.use(response => {
  const { data: { code, desc, data } } = response
  if (code === '0') {
    return Promise.resolve(data)
  }
  return Promise.reject({ desc, code })
}, error => Promise.reject(error))

const get = (url, params) => service.get(url, { params })
const post = (url, data) => service.post(url, data)

export { get, post }
