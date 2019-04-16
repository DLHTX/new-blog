<template>
    <div>
        <div class="user_head">
            <img :src="user.headImg" height='100' alt="">
            <span>{{user.name}}</span>
        </div>

        <div class="block" style="width: 50%;margin: 0 auto;" v-if="blogList">
            <el-timeline>
                <el-timeline-item 
                    v-for='blog in blogList' 
                    :key='blog.id'
                    :color="blog.color"
                    :timestamp="blog.update_time  | formateDate" 
                    placement="top" 
                    style="height: 12rem;line-height: 2rem;text-align: start;cursor:pointer" 
                    @click.native="fnGoedit(blog.blogId)"
                >
                    <el-card style="line-height: 1rem;">
                        <p>{{blog.title}}</p>
                        <p>{{blog.userName}} 提交于 {{blog.update_time | formateDate}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
        <div v-if='!blogList'>
            快去写点儿博客吧~
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
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
            blogList: []
        };
    },
    created() {
        this.fnFindBlog()
    },
    methods: {
        ...mapActions(["login", "checkLogin", "logout", "getPermissions"]),
        async fnFindBlog(){
            try{
                let res = await blog.findBlogByUsername({userName:this.user.name})
                if (res.data == '') return
                res.data.forEach(item=>{
                    item.color=this.rgb()
                })
                this.blogList = res.data
            } catch(err){
                console.log(err)
                this.$message.error({message: err.errorMsg})
            }
        },
        rgb() {
            var i = 0;
            var str = "#";
            var random = 0;
            var aryNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
            for(i = 0; i < 6; i++)
            {
                random = parseInt(Math.random() * 16);
                str += aryNum[random];
            }
            return str;
        },
        fnGoedit(blogId){
            console.log(blogId)
            let routeData = this.$router.resolve({ path: '/editBlog', query: {blogId}});
            window.open(routeData.href, '_blank');
        }
    },
    computed: {
        ...mapGetters(["isLogin", "user"])
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
};
</script>

<style lang="less" scoped>
@import "../../assets/css/auth.css";
.user_head{
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 3rem;
    /* border-bottom: 1px solid red; */
    width: 43%;
    margin: 2rem auto;
    img{
        height: 5rem;
    }
    span{
        height: 5rem;
        font-size: 2rem;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 2rem;
    }
}
</style>

t