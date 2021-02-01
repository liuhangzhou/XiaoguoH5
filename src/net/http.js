import axios from 'axios'
import qs from 'qs'

const BASE_URL = 'http://47.116.128.207:8081/wechat'
// const BASE_URL = '/wechat'
// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    var lang = navigator.language === 'en' ? 'us' : 'cn'
    let token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token:'';
    if(config.data) {
      config.data.lang = lang
      config.data.token = token
    }else {
      config.params.lang = lang
      config.params.token = token
    }
    config.data = qs.stringify(config.data)
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
  }else if(code == '40006') {
    sessionStorage.setItem('user','');
  }
  return Promise.reject({ desc, code })
}, error => Promise.reject(error))

const get = (url, params) => service.get(url, { params })
const post = (url, data) => service.post(url, data)

export { get, post }
