<template>
    <div>
        <div class="user_head">
            <img :src="user.headImg" height='100' alt="">
            <span>{{user.name}}</span>
        </div>

        <div class="block" style="width: 50%;margin: 0 auto;" v-if="blogList">
            <el-timeline>
                <el-timeline-item 
                    v-for='(blog,index) in blogList' 
                    :key='blog.id'
                    :color="blog.color"
                    :timestamp="blog.update_time  | formateDate" 
                    placement="top" 
                    style="height: 12rem;line-height: 2rem;text-align: start;cursor:pointer!position: relative!important;cursor:pointer;" 
                    @click.native="fnGoDetail(blog.blogId)"
                    @mouseenter.native="enter(index)" 
                    @mouseleave.native="leave(index)"
                > 
                    <el-card style="line-height: 2rem;">
                        <div class='editBtn' :class='animated' v-if='index==animatedIndex'  @click="fnGoedit(blog.blogId)">编辑</div>
                        <p style="font-size: 20px;color: rgb(76, 76, 76);">{{blog.title}} </p>
                        <!-- <div>{{blog.userName}} 提交于 {{blog.update_time | formateDate}}</div> -->
                        <div>
                            <span style="color: rgb(105, 105, 105);"><i class="iconfont icon-aixin"></i><span> {{blog.fabulousCount}}</span></span> 
                            <span style="color: rgb(105, 105, 105);margin-left: 10px;"><i class="iconfont icon-pinglun1"></i><span> {{blog.reviewsCount}}</span></span>
                            <span style="float: right;color: #a2a2a2;">提交于 {{blog.update_time | formateDate}}</span>
                        </div>
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
            blogList: [],
            animated:'',
            animatedIndex:null
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
            event.stopPropagation()
            let routeData = this.$router.resolve({ path: '/editBlog', query: {blogId}});
            window.open(routeData.href, '_blank');
        },
        fnGoDetail(blogId){
            this.$router.push({ path: '/blogDetail', query: {blogId}})
        },
        enter(index){
            this.animatedIndex = index
            this.animated = 'animated flipInX fast'
        },
        leave(index){
            this.animated = 'animated flipOutX fast'
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

.el-card {
    transition:all .3s;
    &:hover{
        box-shadow: none!important;
        // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)!important;
        transition:all .3s;
    }
}
.el-card__body {
    position: relative!important;
}
.editBtn{
    position: absolute;
    top: 33px;
    right: 8px;
    background: #fb7377;
    color: white;
    width: 3.5rem;
    text-align: center;
    border-radius: 30px;
    cursor: pointer;
}
</style>

