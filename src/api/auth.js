/*处理登录用户权限的页面*/
import request from '@/helpers/request'
import { JSEncrypt } from 'jsencrypt' //RSA加密传输
import querystring from 'querystring' //序列化请求参数
import { format } from 'util';

let formatData = (data)=>{
    return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
  REGISTER: '/auth/register',
  LOGIN: 'platform/app/login',
  GET_GRXX: 'jcpt/app/common/grxx',
  TEST: 'bgyd/app/hotel/pageList1',
  getBlog:'findAllBlogAndCommit'
  //必应随机图片接口https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture
}

export default {
    register({username, password}) {
        return request(URL.REGISTER, 'POST', { username, password })
    },
    login({username,password}) {
        // console.log(password)
        let user =  { 
            'username': username + systemType, 
            'password':encrypt.encrypt(password),
            'clientType':'iOS',
            'loginType':'3'
        }
        let _token = {"_token": JSON.stringify(user)}
        localStorage.setItem('_token',JSON.stringify(user))
        // console.log(user.password)
        return request(URL.LOGIN,'POST',querystring.stringify(_token))
    },//登录接口
    getGrxx(username){
        return request(URL.GET_GRXX,'GET')
    },//获取个人信息
    test(){
        return request(URL.TEST,'POST',formatData({'page':1,'rows':3}))
    },
    getBlog(){
        return request(URL.getBlog,'get')
    }

}