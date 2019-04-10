<template>
    <div id="main">
        <el-input placeholder="请输入内容" v-model="title">
            <template slot="prepend" style="color: #ff6b6b;">标题</template>
        </el-input>
        <div>
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
        markdownValue:''
    };
  },
  mounted() {

  },
  methods: {
    ...mapActions(["login", "checkLogin", "logout", "getPermissions"]),
    showBtn() {},

    async fnSaveBlog(){
        if(this.title==''||this.markdownValue=='') return this.$message({message: '输入内容不可为空',type: 'warning'})
        let res = await blog.saveBlog(this.user.name,this.title,this.markdownValue)
        console.log(res)
        if(res.success){
            this.$message({message: '保存成功',type: 'success'})
            this.title=''
            this.markdownValue = ''
        }
    },

    // 绑定@imgAdd event
    $imgAdd(pos, $file){
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
</style>

