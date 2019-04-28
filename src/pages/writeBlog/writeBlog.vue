<template>
    <div id="main" onbeforeunload="checkLeave()">
        <el-input placeholder="请输入内容" v-model="title">
            <template slot="prepend" style="color: #ff6b6b;">标题</template>
        </el-input>
        
        <el-select placeholder="请选择博客分类" style="width:100%" v-model="blogClass">
            <el-option :label="blogclass.className" :value="blogclass.className" v-for='blogclass in blogClassList' :key="blogclass.id"></el-option>
        </el-select>
      
        <div style="height: 90%;overflow: scroll;">
            <mavon-editor v-model="markdownValue" :ishljs = "true" style="height: 100%;" ref=md @imgAdd="$imgAdd"/>
        </div>
        <div class="btn hvr-hang" @click='fnSaveBlog()'><i class="iconfont icon-baocun"></i></div>
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
            interval:''
        };
    },
    created(){
        this.findBlogClass()
        this.autoSave()
        console.log('created')
        // window.onbeforeunload=function(e){
        // 　　var e = window.event||e;  
        // 　　e.returnValue=("确定离开当前页面吗？");
        // } 
    },
    mounted() {
        console.log('mounted')
        this.initData()
        // window.onbeforeunload=function(e){     
        // 　　var e = window.event||e;  
        // 　　e.returnValue=("确定离开当前页面吗？");
        //     if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){ 
        //         alert("你关闭了浏览器"); 
        //     }else{ 
        //         alert("你正在刷新页面"); 
        //     }
        // } 
    },
    methods: {
        ...mapActions(["login", "checkLogin", "logout", "getPermissions"]),
        showBtn() {},
        async fnSaveBlog(){
            console.log(this.blogClass)
            try{
                if(this.title==''||this.markdownValue==''||this.blogClass=='') return this.$message({message: '输入内容不可为空',type: 'warning'})
                let res = await blog.saveBlog(this.user.name,this.title,this.markdownValue,this.blogClass)
                console.log(res)
                if(res.success){
                    this.$message({message: '保存成功',type: 'success'})
                    //清空数据
                    localStorage.removeItem('blogSave')
                    //clearInterval(this.interval)
                    this.title=''
                    this.markdownValue = ''
                    this.blogClass = ''
                }
            }catch(err){
                console.log(err)
                this.$message.error({message: err.errorMsg})
            }
        },
        //查找博客分类方法
        async findBlogClass(){
            let res = await blog.findBlogClass()
            if(res.success){
               this.blogClassList = res.data
            }
        },
        //初始化数据
        initData(){
            if(localStorage.getItem('blogSave')){
                let blogSave2 = JSON.parse(localStorage.getItem('blogSave'))
                this.title =  blogSave2.title
                this.blogClass = blogSave2.blogClass
                this.markdownValue = blogSave2.body
            }
        },
        autoSave(){
            this.interval = setInterval(()=>{
                //this.$message({message: '自动保存!',type: 'success'})
                let blogSave = {}
                blogSave.title = this.title //自动保存标题
                blogSave.blogClass = this.blogClass//自动保存分类
                blogSave.body = this.markdownValue
                localStorage.setItem('blogSave', JSON.stringify(blogSave))//把用户信息存到localStorage
            },10000)
           
        },
        checkLeave(){
            event.returnValue="确定离开当前页面吗？";
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
        }
    },
    computed: {
        ...mapGetters(["isLogin", "user"])
    }
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

