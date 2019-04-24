<template>
<div style="margin:0;padding:0;">
    <div class="blog_content" >
        <div class="blog_head">
            <div class="title" v-if='title' style="font-size: 36px;">
                {{title}}
                <span class="title_class">{{titleClass}}</span>
                <span class="title_class">{{blogDetail.userName}}</span>
            </div>
            <div class="title_detail">
                <span><i class="iconfont icon-time" style="font-size: 17px;"></i>{{blogDetail.update_time | formateDate}} ·</span>
                <span><i class="iconfont icon-aixin" style="font-size: 14px;"></i> 10赞 ·</span>
                <span><i class="iconfont icon-pinglun1" style="font-size: 14px;"></i> 21评 ·</span>
                <span><i class="iconfont icon-yuedu" style="font-size: 15px;"></i> 21读 ·</span>
                <!-- 作者:{{blogDetail.userName}}　最后编辑于: -->
            </div>
        </div>
        <div class="blog_body markdown-body">
            <vue-markdown :source="content" class="" ref='md' v-highlightjs="sourcecode"></vue-markdown>
        </div>
    </div>
    
    <div class="fave_box"  @click='toggleClass()' :class="fave_active" >
         <div class="fave" :class="active" ></div> <span>点赞</span> 
    </div>
   
    <div class="blog_commit">
            <div style="padding: 1rem;">评论</div>
            <!-- <div class="commit_box">
                    <textarea name="text" v-model="commitBody" placeholder="please write your commit here"></textarea>
                    <div class="btn" @click='fnaddCommit()'>提交</div>
            </div> -->
            <div class="comment-view"> 
                    <div class="comment-header"> 
                        <img class="avatar" :src="user.headImg" width="80" height="80"> 
                        <span class="comment-author">{{user.name}}</span> 
                    </div> 
                    <div class="comment-content"> 
                        <span class="comment-author-at"></span>
                        <textarea name="text" v-model="commitBody" placeholder="留下你的踪迹~~"></textarea>
                    </div> 
                    <div class="comment-meta"> 
                        <div class="commit_btn" @click='fnaddCommit()'>提交</div>
                    </div> 
            </div>
            <div v-if='blogCommitList'>
                <div class="comment-view" v-for="commit in blogCommitList" :key="commit.id"> 
                    <div class="comment-header"> 
                        <img class="avatar" :src="commit.avatar" width="80" height="80"> 
                        <span class="comment-author"><a href="" target="_blank" rel="external nofollow">{{commit.commitName}}</a></span> 
                    </div> 
                    <div class="comment-content"> 
                        <span class="comment-author-at"></span>
                        <p>{{commit.commitBody}}</p>
                        <p></p> 
                    </div> 
                    <div class="comment-meta"> 
                        <time class="comment-time">{{commit.creat_time | formateDate}}</time>
                        <!-- <span class="comment-reply">
                            <a href="https://www.linpx.com/p/mat-analysis-of-indicators-for-heap-dump.html/comment-page-1?replyTo=2743#respond-post-334" rel="nofollow" onclick="return TypechoComment.reply('comment-2743', 2743);">Reply</a>
                        </span>  -->
                    </div> 
                </div>
            </div>

           
            <div v-if='!blogCommitList' class="comment-view"> 
                还没有评论哦~
            </div>
    </div>

    <i
      class="iconfont icon-up upBtn animated delay-2s slower"
      :class="[isShow?'zoomIn':'zoomOut']"
      @click="scrollToTop()"
    ></i>
</div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import auth from '../../api/auth';
import blog from '../../api/blog';
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
            blogDetail:{},
            value:'1111',
            content:'',
            isShow:false,
            title:'',
            titleClass:'',
            loading:false,
            blogCommitList:[],
            commitBody:'',
            active:'',
            fave_active:''
        }
    },
    created () {
        this.getBlog()
    },
    mounted(){
        console.log(this.$refs.md)
    },
    methods:{
        ...mapActions([
            'getGrxx',
            'checkLogin',
            'logout',
            'getPermissions'
        ]),
        async getBlog(){
            this.loading = true
            let res = await blog.findBlogByBlogId(this.$route.query.blogId)
            if(res.success){
                let date = res.data[0]
                this.blogDetail.content= date.body
                this.blogDetail.title= date.title
                this.blogDetail.titleClass= date.className
                this.blogDetail.update_time = date.update_time
                this.blogDetail.userName = date.userName

                this.content = date.body
                this.title = date.title
                this.titleClass = date.className
                this.loading = false
                this.getBlogCommit()
            }
     
        },
        async getBlogCommit(){
            let blogCommitList = await blog.findBlogCommitByBlogId(this.$route.query.blogId)
            if(blogCommitList.success){
                this.blogCommitList = blogCommitList.data
            }
        },
        async fnaddCommit(){
            if(this.commitBody=='') return this.$message({message: '评论内容不可为空',type: 'warning'})
            let res = await blog.addCommit(this.user.name,this.$route.query.blogId,this.commitBody,this.user.headImg)
            if(res.success) {
                this.$message({message: '评论成功',type: 'success'})
                this.getBlogCommit()
            }
        },
        async addFabulous(){
            try{
                let res = await blog.addFabulous(this.user.name,this.$route.query.blogId)
                if(res.success) {
                    this.$message({message: '点赞成功!',type: 'success'})
                }
            }catch(err){
                if(err.msg == "已经点赞过了,不要重复点赞") return this.$message({message: '已经点赞过了!',type:"warning"})
                this.$message.error({message: '点赞失败!'})
            }

        },
        async cancelFabulous(){
            try{
                let res = await blog.cancelFabulous(this.user.name,this.$route.query.blogId)
                if(res.success) {
                    this.$message({message: '取消成功!',type: 'success'})
                }
            }catch(err){
                this.$message.error({message: '取消失败!'})
            }
           
        },
        showUpBtn(boolean){   
            this.isShow = boolean;
        },

        scrollToTop() {
            scrollTo(0, 0);
        },

        toggleClass(){
            if(this.fave_active == ''){
                this.active = 'active'
                this.fave_active = 'faveActive'
                this.addFabulous()
            }else{
                this.active = ''
                this.fave_active = ''
                this.cancelFabulous()
            }
        },


        
    },
    computed:{
        ...mapGetters([
            'isLogin',
            'user',
        ]),
        
    },
    filters: {
        formateDate: function(value){
            if (!value) return "";
            value = value.toString();
            var year = value.split('T')[0], 
                time = value.split('T')[1].split(':')[0] + ':' + value.split('T')[1].split(':')[1] 
            return year + ' ' + time
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/common.less";
@import "../../assets/markdown.css";

.upBtn {
    font-size: 40px;
    color: #a1a1a1;
    position: fixed;
    top: 80%;
    left: 93%;
    cursor: pointer;
  }
  .img_content {
    height: 320px;
    width: 100%;
    justify-content: center;
    display: flex;
    img {
      height: 100%;
      width: auto;
      -webkit-transition: all 0.4s;
      transition: all 0.4s;
    }
  }

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
            font-size: 15px;
            color: #a0a0a0;
            margin-top: 8px;
            margin-left: 8px;
            // border-top: 1px solid #d4d4d4;
            // border-bottom: 1px solid #d4d4d4;
            padding: 10px 0;
        }
        .line{
            border-bottom: 1px solid #ababab;
        }
    }
}
.title_class{
    background: #969696;
    color: white;
    font-size: 18px;
    border-radius: 4px;
    padding: 0 10px;
    border-left: 5px solid #ff8e91;
    cursor: pointer;
}
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
.commit_btn{
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
                margin: 0 10px;
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

.fave_box{
    margin: 2rem auto;
    width: 105px;
    height: 40px;
    border: 1px solid #f78589;
    -webkit-transition: all 0.6s;
    transition: all 0.6s;
    display: flex;
    border-radius: 37px;
    align-items: center;
    color: #f78589;
    cursor:pointer;
}
.fave {
  width: 50px;
  height: 50px;
  background: url('http://dlhtx.zicp.vip:3000/img/dianzan.png') no-repeat;
  background-position: left;
  background-size: auto 100%;
}

.faveActive{
  background-color: #EA6F5A!important;
  transition:all .6s;
  color: white;
}

.active {
  background-position: right;
  /* 主要在这一步 */
  transition: background .6s steps(19);
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>

