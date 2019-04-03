/*处理登录用户权限的页面*/
import request from '@/helpers/request'
import { JSEncrypt } from 'jsencrypt' //RSA加密传输
import querystring from 'querystring' //序列化请求参数
import { format } from 'util';

let formatData = (data)=>{
    return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
  getBlog:'findAllBlogAndCommit'
  //必应随机图片接口https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture
}

export default {
    getBlog(){
        return request(URL.getBlog,'get')
    }

}