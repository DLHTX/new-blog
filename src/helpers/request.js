import axios from 'axios'
import { Message } from 'element-ui'
import querystring from 'querystring' //序列化请求参数
// console.log(getLocalStorage("token"))
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://g4ksmv.natappfree.cc/'
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
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
            resolve(res.data)
        } else {
            reject(res.data)
            console.log('用户名或者密码错误')
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