<template>
    <div id="main">
        <el-input placeholder="请输入内容" v-model="title">
            <template slot="prepend" style="color: #ff6b6b;">标题</template>
        </el-input>
        
        <el-select placeholder="请选择博客分类" style="width:100%" v-model="blogClass">
            <el-option :label="blogclass.className" :value="blogclass.className" v-for='blogclass in blogClassList' :key="blogclass.id"></el-option>
        </el-select>
      
        <div style="height: 90%;overflow: scroll;">
            <mavon-editor :ishljs = "true" v-model="markdownValue"  style="height: 100%;" ref=md @imgAdd="$imgAdd"/>
        </div>
        <div class="btn hvr-hang" @click='fnEditBlog()'><i class="iconfont icon-baocun"></i></div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import auth from "../../api/auth";
import blog from "../../api/blog";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import Auth from "../../helpers/loginAnimate.js";

export default {
    name: "index",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            title:'',
            markdownValue:'',
            blogClass:'',
            blogClassList:[],
            blogUserName:'',
            interval:''
        };
    },
    created(){
        this.findBlogClass()
    },
    mounted() {
        this.getBlog()
    },
    methods: {
        ...mapActions(["login", "checkLogin", "logout", "getPermissions"]),
        showBtn() {},
        checkSame(){
            if(localStorage.getItem('blogSave_edit')){
                let blogSave2 = JSON.parse(localStorage.getItem('blogSave_edit'))
                console.log(this.title ==  blogSave2.title,this.title, blogSave2.title)
                if(this.title ==  blogSave2.title){
                    console.log('标题相同可以渲染!')
                    this.title =  blogSave2.title
                    this.blogClass = blogSave2.blogClass
                    this.markdownValue = blogSave2.body
                    this.autoSave()
                }else{
                    console.log('标题不相同不可以渲染!')
                    this.autoSave()
                }
            }
        },
        async getBlog(){
            let res = await blog.findBlogByBlogId(this.$route.query.blogId)
            if(res.success){
                let date = res.data[0]
                this.markdownValue = date.body
                this.title = date.title
                this.blogClass = date.className
                this.blogUserName = date.userName
                this.checkSame() //判断自动保存是否一致
            }
            this.autoSave()
        },
        async fnEditBlog(){
            //if(this.blogUserName !=this.user.name) return this.$message.error({message: '该博客不是你的,无法更改!'})
            if(this.title==''||this.markdownValue==''||this.blogClass=='') return this.$message({message: '输入内容不可为空',type: 'warning'})
            let res = await blog.updateBlog(this.title,this.markdownValue,this.blogClass,this.$route.query.blogId,this.getToday())
            console.log(res)
            if(res.success){
                this.$message({message: '保存成功',type: 'success'})
                //清空数据
                this.title=''
                this.markdownValue = ''
                this.blogClass = ''
                localStorage.removeItem('blogSave_edit')
                //clearInterval(this.interval)
            }
        },
        //查找博客分类方法
        async findBlogClass(){
            let res = await blog.findBlogClass()
            if(res.success){
               this.blogClassList = res.data
            }
        },
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            //上传图片接口
            blog.upImg($file.miniurl).then(res=>{
                if(res.success){
                    this.$message({message: '图片上传成功',type: 'success'})
                    this.$refs.md.$img2Url(pos, res.data);
                }else{
                    this.$message.error({message: '上传图片失败'})
                }
                
            })
        },
        getToday(){
            var data = new Date(),
                year = data.getFullYear(),
                month = ((data.getMonth() + 1)) < 10?'0'+(data.getMonth() + 1):(data.getMonth() + 1),
                day = data.getDate()<10?'0'+data.getDate():data.getDate(),
                hours = data.getHours()<10?'0'+data.getHours():data.getHours(),
                minutes = data.getMinutes()<10?'0'+data.getMinutes():data.getMinutes(),
                seconds = data.getSeconds()<10?'0'+data.getSeconds():data.getSeconds()
            return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds
        },
        autoSave(){
            this.interval = setInterval(()=>{
                //this.$message({message: '自动保存!',type: 'success'})
                let blogSave = {}
                blogSave.title = this.title //自动保存标题
                blogSave.blogClass = this.blogClass//自动保存分类
                blogSave.body = this.markdownValue
                localStorage.setItem('blogSave_edit', JSON.stringify(blogSave))//把用户信息存到localStorage
            },10000)
        },
    },
    computed: {
        ...mapGetters(["isLogin", "user"])
    },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/auth.css";
#main{
    height: 100vh;
}
.v-note-op{
    border: 1px solid #e6e6e6!important;
    box-shadow:none!important;
}
.btn{
    position: fixed;
    top: 87%;
    right: 3%;
    z-index: 9999;
    height: 50px;
    width: 50px;
    background: #f97575;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .3s;
    &:hover{
        background: #ff6262;
        box-shadow: 0 0 6px 1px #ff8888;
        transition: all .3s;
    }
}
.markdown-body img{
    max-height: 40rem;
}
</style>

