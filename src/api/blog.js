/*处理登录用户权限的页面*/
import request from '@/helpers/request'
import { JSEncrypt } from 'jsencrypt' //RSA加密传输
import querystring from 'querystring' //序列化请求参数
import { format } from 'util';

let formatData = (data)=>{
    return querystring.stringify(data)
}//序列化请求参数 封装函数

const URL = {
  getBlog:'findAllBlogAndCommit',
  saveBlog:'addBlog',
  findBlogByBlogId:"findBlogByBlogId",
  upImg:'upImg',
  findBlogCommitByBlogId:'findBlogCommitByBlogId',
  addCommit:"addCommit",
  findBlogClass:"findBlogClass",
  findBlogByUsername:'findBlogByUsername',
  updateBlog:"updateBlog"
  //必应随机图片接口https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture
}

export default {
    getBlog({page,row}){
        return request(URL.getBlog,'get',{page,row})
    },
    saveBlog(name,title,body,className){
        return request(URL.saveBlog,'post',formatData({name,title,body,className}),false)
    },
    findBlogByBlogId(blogId){
        return request(URL.findBlogByBlogId,'get',{blogId})
    },
    upImg(imgData){
        return request(URL.upImg,'post',formatData({imgData}))
    },
    findBlogCommitByBlogId(blogId){
        return request(URL.findBlogCommitByBlogId,'get',{blogId})
    },
    addCommit(commitName,blogId,commitBody,avatar){
        return request(URL.addCommit,'post',formatData({commitName,blogId,commitBody,avatar}))
    },
    findBlogClass(){
        return request(URL.findBlogClass,'get')
    },
    findBlogByUsername(userName){
        return request(URL.findBlogByUsername,'get',userName)
    },
    updateBlog(title,body,className,blogId,update_time){
        return request(URL.updateBlog,'post',formatData({title,body,className,blogId,update_time}))
    }

}