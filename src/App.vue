<template>
  <div id="app">
    <el-container>
        <el-header>
            <Header class='head'></Header>
        </el-header>
        <el-main>
            <transition :name="transitionName">
                <router-view name="default" class="child-view"></router-view>
            </transition>
        </el-main>
        <el-footer>
            <Footer></Footer>
        </el-footer>
    </el-container>
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
        transitionName: 'slide-left' 
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
            console.log('up')
        }else{
            console.log('down')
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
#app{
    height: 100%;
    position: relative;
    overflow: hidden;
}
// .slide-left-enter, .slide-right-leave-active { 
//     opacity: 0; 
//     -webkit-transform: translate(30px, 0); 
// 　　transform: translate(30px, 0); 
// } 
// .slide-left-leave-active, .slide-right-enter { 
// 　　opacity: 0; 
// 　　-webkit-transform: translate(-30px, 0); 
// 　　transform: translate(-30px, 0); 
// }
</style>
