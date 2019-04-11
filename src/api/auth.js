/*处理登录用户权限的页面*/
import request from '@/helpers/request'
import { JSEncrypt } from 'jsencrypt' //RSA加密传输
import querystring from 'querystring' //序列化请求参数
import { format } from 'util';

let formatData = (data)=>{
    return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
    register: 'register',
    ISLOGIN:'islogin',
    LOGIN: 'login',
    checkLogin: 'islogin',
    getBlog:'findAllBlogAndCommit'
    //必应随机图片接口https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture
}

export default {
    register({name, password}) {
        return request(URL.register, 'POST', formatData({name, password}))
    },
    login({name,password}) {
        return request(URL.LOGIN,'POST',formatData({name,password}))
    },//登录接口
    checkLogin(){
        return request(URL.checkLogin,'get',formatData({name}))
    },

}