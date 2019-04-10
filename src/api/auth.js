/*处理登录用户权限的页面*/
import request from '@/helpers/request'
import { JSEncrypt } from 'jsencrypt' //RSA加密传输
import querystring from 'querystring' //序列化请求参数
import { format } from 'util';

let formatData = (data)=>{
    return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
  REGISTER: 'islogin',
  ISLOGIN:'islogin',
  LOGIN: 'login',
  GET_GRXX: 'jcpt/app/common/grxx',
  checkLogin: 'islogin',
  getBlog:'findAllBlogAndCommit'
  //必应随机图片接口https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture
}

export default {
    register({username, password}) {
        return request(URL.REGISTER, 'POST', { username, password })
    },
    login({name,password}) {
        return request(URL.LOGIN,'POST',formatData({name,password}))
    },//登录接口
    getGrxx(username){
        return request(URL.GET_GRXX,'GET')
    },//获取个人信息
    checkLogin(){
        return request(URL.checkLogin,'get',formatData({name}))
    },
    getBlog(){
        return request(URL.getBlog,'get')
    }

}