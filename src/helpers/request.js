import axios from 'axios'
import store from '../store';
import { Message } from 'element-ui'
import querystring from 'querystring' //序列化请求参数
// console.log(getLocalStorage("token"))
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://dlhtx.zicp.vip:3000/'
axios.defaults.withCredentials = true
window.store = store;

export default function request(url, type = 'GET', data = {},showProgress=true) {
  return new Promise((resolve, reject) => {
    // url = url + '?_=' + new Date().getTime() //防止get请求缓存返回304
    store.dispatch('showProgress',{status:'start'})
    let option = {
        url,
        method: type
    }
    if(type.toLowerCase() === 'get') {
        option.params = data
    }else {
        option.data = data
    }

    axios(option).then(res => {//axios的res被封装了一次 所以真实数据在res.data中
        if (res.data.success) {
            store.dispatch('showProgress',{status:'over'})
            resolve(res.data)
        } else {
            reject(res.data)
        }
    }).catch(err=>{
        reject({msg: '网络异常:'+ err})
    })
  })
}


// request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })