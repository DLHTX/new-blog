<template>
  <div id="app">
    <el-progress :text-inside="true" :stroke-width="2" :percentage="progress.time" status="exception" v-if='progress.show'></el-progress>
    <router-view></router-view>
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
    //   this.checkLogin()
    //   window.addEventListener('scroll', this.handleScroll, true)
  },
  methods:{
    showUpBtn(){

    }
    // ...mapActions([
    //     'getGrxx',
    //     'getPermissions',
    // ]),
    // checkLogin(){
    //     if(localStorage.getItem('token')){
    //         if(!this.user){
    //             this.getGrxx()//获取user信息
    //         }
    //     }
    // },
    // handleScroll(){
    //     // 页面滚动距顶部距离
    //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //     var scroll = scrollTop - this.i;
    //     this.i = scrollTop;
    //     if(scroll<0){
    //         if(!this.isScroll) return
    //         this.isScroll=false
    //         this.$refs.routerView.showUpBtn(false)
    //     }else{
    //         if(this.isScroll) return
    //         this.isScroll=true
    //         this.$refs.routerView.showUpBtn(true)
    //     }
    // }
  },
  computed:{
    ...mapGetters([
        'isLogin',
        'user',
        'progress'
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
.el-progress {
    z-index: 999!important;
    top: -8px!important;
}
</style>
