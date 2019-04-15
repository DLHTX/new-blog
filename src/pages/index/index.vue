



<template>
    <el-container>
        <el-header class='el-header' :class="[isScroll?'scrollToTop':'scrollToDown']">
            <Header></Header>
        </el-header>
        <el-main>
            <!-- 含有过渡动画的router -->
            <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
                <router-view  class="child-view" ref="routerView"></router-view>
            </transition>
        </el-main>
        <el-footer>
            <Footer></Footer>
        </el-footer>
    </el-container>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import blog from "../../api/blog";

export default {
  name: "index",
  components: {
    Header,
    Footer
  },
  data(){
	return{
        showStyle:false,
        isRun:false,
        slogan:null,
        enterAnimate:"animated fadeInUp delay-2s slower",
        leaveAnimate:"animated fadeOut delay-1s slower",
        isScroll:false,
	} 
  },
  mounted(){
      this.checkLogin()
      window.addEventListener('scroll', this.handleScroll, true)
      console.log(this.$refs.routerView)
  },
  methods:{
    ...mapActions([
        'checkLogin',
        'getPermissions',
    ]),
    showUpBtn(){

    },
    handleScroll(){
        // 页面滚动距顶部距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var scroll = scrollTop - this.i;
        this.i = scrollTop;
        if(scroll<0){
            if(!this.isScroll) return
            this.isScroll=false
            this.$refs.routerView.isShow = false 
           
        }else{
            if(this.isScroll) return
            this.isScroll=true
            this.$refs.routerView.isShow = true 
        }
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/common.less";
@import "../../assets/css/animate.css";
.el-header{
    transition: all .3s;
}
.scrollToTop{
   animation-name:scroll;
   animation-duration:.8s;
   animation-fill-mode: forwards;
}
.scrollToDown{
   animation-name:scrollDown;
   animation-duration:.8s;
   animation-fill-mode: forwards;
}
@keyframes scroll{
    0% {
       top:0
    }
    100% {
        top:-70px
    }
}
@keyframes scrollDown{
    0% {
        top:-70px
    }
    100% {
       top:0
    }
}
</style>