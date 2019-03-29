<template>
    <div class="blog_content"> 
        <div class='blog_item' v-for="(blog,index) in blogArr" :key="index">
            <img src="{{blog.src}}" alt="">
            <div class='blog_item_body'>我是里面的文字文字文字文字</div>
            <div class="blog_item_back">
            </div>
            <div class='blog_item_title'>我是标题</div>
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
        blogArr:[{},{}]
	}
  },
  created(){
        blogArr.forEach(item=>{
            item.src = 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
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

<style lang="less">
@import "../../assets/common.less";
img{
  height:320px;
  width: 250px;
  transition: all .4s;

}
.blog_item{
    height: 400px;
    display: inline-block;
    width: 250px;
    background: white;
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,.04);
    transition: all .4s;
    &:hover .blog_item_body{
        opacity: 1;
        transition: all .4s;
        animation: move .4s;
    }
    &:hover img{
        transform: scale(1.1);
        transition: all .4s;
        filter:blur(3px);
    }
    &:hover{
        box-shadow: 0 1px 10px rgba(144, 144, 144, 0.45);
    }
}
.blog_item_back{
    position: absolute;
    height: 324px;
    width: 338px;
    background: #fff;
    top: 63%;
    left: -29%;
    -webkit-transform: rotate(7deg);
    transform: rotate(11deg);
}
.blog_item_title{
    width: 100%;
    position: absolute;
    top: 60%;
}
.blog_item_body{
    position: absolute;
    top: 0;
    color: white;
    width: 100%;
    opacity: 0;
}
@keyframes move{
    0%   {top: 10%;}
    100% {top: 0;}
}

</style>
