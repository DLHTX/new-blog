<template>
    <div>
        <div class="blog_content"> 
            <router-link :to="{name:'blog',query:{id:'blog.src',name:'blog.src'}}" class='blog_item' v-for="(blog,index) in blogArr" :key="index">
                <div class="img_content"><img v-lazy="blog.src" alt=""></div>
                <div class='blog_item_body'><p>我是文字我是文字我是文字我是文字我是文字我是文字我是文字</p></div>
                <div class="blog_item_back">
                </div>
                <div class='blog_item_title'><p> 我是标题我是标题我是标题我是标题我是标题我是标题我是标题</p></div>
                <div class='tip'>#css</div>
            </router-link>
        </div>
        <div style="height: 30px;">
            <el-pagination
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>

</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default {
  name: 'index',
  components: {
      Header,
      Footer
  },
  data(){
	return{
        blogArr:[{},{},{},{},{},{},{}]
	}
  },
  created(){
        this.blogArr.forEach(item=>{
            item.src = 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&a='+Math.random()

           
        })
  },
  methods:{
        ...mapActions([
            'getGrxx',
            'checkLogin',
            'logout',
            'getPermissions'
        ]),

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
.img_content{
    height: 320px;
    width: 100%;
    justify-content: center;
    display: flex;
    img{
        height: 100%;
        width: auto;
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
    }
}

.blog_content{
    width: 80%;
    margin: 0 auto;
    max-width: 880px;
    min-width: 820px;
    margin-top: 3rem;
}
.blog_item{
    margin: -1rem 0.9rem;
    height: 400px;
    display: inline-block;
    width: 30%;
    background: white;
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,.04);
    transition: all .4s;
    cursor: pointer;
    .tip{
        position: absolute;
        top: 90%;
        left: 77%;
        height: 23px;
        display: flex;
        justify-content: center;
        background-color: #f56969;
        align-items: center;
        color: white;
        width: 45px;
        border-radius: 24px;
        font-size: 14px;
    }
    &:hover .blog_item_body{
        opacity: 1;
        transition: all .4s;
        animation: move .4s;
    }
    &:hover img{
        transform: scale(1.1);
        transition: all .4s;
        filter:blur(3px) brightness(0.6);
    }
    &:hover{
        box-shadow: 2px 2px 4px rgba(0,0,0,.1);
    }
}
.blog_item_back{
position: absolute;
    height: 330px;
    width: 380px;
    background: #fff;
    top: 65%;
    left: -30%;
    -webkit-transform: rotate(7deg);
    transform: rotate(10deg);
}
.blog_item_title{
    width: 100%;
    position: absolute;
    top: 69%;
    p{
        font-size: 17px;
        display: flex;
        line-height: 24px;
        padding: 0px 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
}
.blog_item_body{
    position: absolute;
    top: 0;
    color: white;
    width: 100%;
    opacity: 0;
    p{
        height: 15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 25px;
        padding: 0px 20px;
    }
}
@keyframes move{
    0%   {top: 10%;}
    100% {top: 0;}
}

.el-pager li {
    background: #f7f7f7;
     transition: all .3s;
}
.el-pagination .btn-next {
    background: #f7f7f7;
}
.el-pagination .btn-prev {
      background: #f7f7f7;
}
.el-pagination button:disabled {
    background: #f7f7f7;
}
.el-pager li.active {
    color: #eb5055;
    transition: all .3s;
}
</style>

