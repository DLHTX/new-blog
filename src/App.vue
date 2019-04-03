<template>
  <div id="app">
    <el-container>
        <el-header class='el-header' :class="[isScroll?'scrollToTop':'scrollToDown']">
            <Header></Header>
        </el-header>
        <el-main>
            <!-- 含有过渡动画的router -->
            <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
                <router-view name="default" class="child-view" ref="routerView"></router-view>
            </transition>
        </el-main>
        <el-footer>
            <Footer></Footer>
        </el-footer>
    </el-container>
    <router-view name="login"></router-view>
  </div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  data(){
	return{
        showStyle:false,
        isRun:false,
        slogan:null,
        enterAnimate: "animated fadeInUp delay-2s slower",
        leaveAnimate:"animated fadeOutDown delay-2s slower",
        isScroll:false
	} 
  },
  mounted(){
      this.checkLogin()
      window.addEventListener('scroll', this.handleScroll, true)
  },
  methods:{
    ...mapActions([
        'getGrxx',
        'getPermissions',
    ]),
    checkLogin(){
        if(localStorage.getItem('token')){
            if(!this.user){
                this.getGrxx()//获取user信息
            }
        }
    },
    handleScroll(){
        // 页面滚动距顶部距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var scroll = scrollTop - this.i;
        this.i = scrollTop;
        if(scroll<0){
            if(!this.isScroll) return
            this.isScroll=false
            this.$refs.routerView.showUpBtn(false)
        }else{
            if(this.isScroll) return
            this.isScroll=true
            this.$refs.routerView.showUpBtn(true)
        }
    }
  },
  computed:{
    ...mapGetters([
        'isLogin',
        'user',
    ]),
    
    
  },
  watch:{
    showStyle:()=>{
        // return console.log('aaaa')
    }
  }
}
</script>

<style lang="less">
@import "./assets/common.less";
@import "assets/css/animate.css";
#app{
    height: 100%;
    position: relative;
    overflow: hidden;
}
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
