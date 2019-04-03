<template>
<div style="margin:0;padding:0;">
    <div class="blog_content">
        <div class="blog_head">
            <div class="title">
                MAT 分析 Heap Dump 需要关注的指标
            </div>
            <div class="title_detail">Published on Jan 20, 2019 in Tutorials with 2 comments</div>
            <div class="title_class">Java</div>
            <p class="line"></p>
        </div>
        <div class="blog_body markdown-body">
            <vue-markdown :source="content" class=""></vue-markdown>
        </div>
    </div>
    <div class="blog_commit">
            <div style="padding: 1rem;">评论</div>
            <div class="commit_box">
                    <textarea name="text" id="" placeholder="please write your commit here"></textarea>
                    <div class="btn">提交</div>
            </div>
            <div class="comment-view"> 
                <div class="comment-header"> 
                    <img class="avatar" src="https://secure.gravatar.com/avatar/42c40e3e677d051d7079b2a1f08807b2?s=80&amp;r=G&amp;d=mm" width="80" height="80"> 
                    <span class="comment-author"><a href="http://www.miaowenwu.com" target="_blank" rel="external nofollow">妙文屋</a></span> 
                </div> 
                <div class="comment-content"> 
                    <span class="comment-author-at"></span>
                     <p>写的很好，很喜欢</p>
                     <p></p> 
                </div> 
                <div class="comment-meta"> 
                    <time class="comment-time">Mar 29, 2019</time>
                     <span class="comment-reply">
                         <a href="https://www.linpx.com/p/mat-analysis-of-indicators-for-heap-dump.html/comment-page-1?replyTo=2743#respond-post-334" rel="nofollow" onclick="return TypechoComment.reply('comment-2743', 2743);">Reply</a>
                    </span> 
                </div> 
            </div>
              <div class="comment-view"> 
                <div class="comment-header"> 
                    <img class="avatar" src="https://secure.gravatar.com/avatar/42c40e3e677d051d7079b2a1f08807b2?s=80&amp;r=G&amp;d=mm" width="80" height="80"> 
                    <span class="comment-author"><a href="http://www.miaowenwu.com" target="_blank" rel="external nofollow">妙文屋</a></span> 
                </div> 
                <div class="comment-content"> 
                    <span class="comment-author-at"></span>
                     <p>写的很好，很喜欢</p>
                     <p></p> 
                </div> 
                <div class="comment-meta"> 
                    <time class="comment-time">Mar 29, 2019</time>
                     <span class="comment-reply">
                         <a href="https://www.linpx.com/p/mat-analysis-of-indicators-for-heap-dump.html/comment-page-1?replyTo=2743#respond-post-334" rel="nofollow" onclick="return TypechoComment.reply('comment-2743', 2743);">Reply</a>
                    </span> 
                </div> 
            </div>
    </div>
</div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import auth from '../../api/auth'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import VueMarkdown from 'vue-markdown'

export default {
    name: 'index',
    components: {
        Header,
        Footer,
        VueMarkdown
    },
    data(){
        return{
            value:'1111',
            content:''
        }
    },
    created () {
        this.getBlog()
        // auth.getBlog().then(res=>{
        //     this.content = res.data[0].body
        //     console.log(this.content)
        // })
        // this.content = auth
    },
    methods:{
        ...mapActions([
            'getGrxx',
            'checkLogin',
            'logout',
            'getPermissions'
        ]),
        getBlog:async function(){
            let content = await auth.getBlog()
            this.content = content.data[0].body
            console.log(this.content)
        },
        
    },
    computed:{
        ...mapGetters([
            'isLogin',
            'user',
        ]),
        
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/common.less";
@import "../../assets/markdown.css";

.blog_content{
    background-color: white;
    width: 70%;
    margin: 0 auto;
    max-width: 880px;
    min-width: 820px;
    margin-top: 3rem;
    line-height: normal;
    text-align: left;
    .blog_head{
        width: 90%;
        margin: 0 auto;
        .title{
            font-size: 21px;
            padding-top: 2rem;
        }
        .title_detail{
            font-size: 12px;
            color: #5f5f5f;
            margin-top: 8px;
        }
        .title_class{
            color: #fff;
            border: 1px solid #6fa3ef;
            display: inline-block;
            border-radius: 15px;
            background: #6fa3ef;
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 8px;
        }
        .line{
            border-bottom: 1px solid #ababab;
        }
    }
}
.blog_commit{
    width: 100%;
    height: 100%;
    line-height: normal;
    background: #f3f3f3;
    margin: 0;
    padding: 0;
    margin-top: 3rem;
    border-radius: 3px;
    .commit_box{
        width: 55%;
        height: 10rem;
        margin: 0 auto;
        background-color: white;
        position: relative;
        border-radius: 4px;
        box-shadow: 0 0 12px -1px #efefef;
        textarea{
            width: 90%;
            border: none;
            padding: 1rem;
            margin: 0px;
            resize: none;
            overflow: hidden;
            padding: 20px 0;
            resize: none;
            border-radius: 0;
            outline:none
        }
        .btn{
            position: absolute;
            top: 73%;
            right: 2%;
            display: flex;
            height: 28px;
            margin: 0 auto;
            padding: 0 20px;
            justify-content: center;
            -webkit-transition-duration: .4s;
            transition-duration: .4s;
            text-align: center;
            color: #444444;
            border: 1px solid #f7f7f7;
            border-radius: 30px;
            background-color: #f7f7f7;
            align-items: center;
            cursor: pointer;
            font-size: 15px;
            &:hover{
                border:1px solid #eb5055;
                color:  #eb5055;
            }
        }
    }
    .comment-view{
        width: 52%;
        margin: 2rem auto;
        background-color: white;
        position: relative;
        padding: 20px;
        cursor: pointer;
        .comment-header{
            display: inline-block;
            width: 100%;
            img {
                display: inline-block;
                float: left;
                width: 40px;
                height: 40px;
                border: 1px solid #eaeaea;
                border-radius: 50%;
            }
            span {
                font-size: 13px;
                line-height: 45px;
                display: inline-block;
                float: left;
                margin: 0 20px;
            }
        }
        .comment-content {
            margin-bottom: 10px;
            color: #313131;
            text-align: left;
        }
        .comment-meta {
            font-size: 12px;
            text-align: left;
        }
    }
}
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 0 45px;
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>

