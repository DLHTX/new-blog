<template>
  <div id="app">
    <el-container>
        <el-header>
            <Header class='head'></Header>
        </el-header>
        <el-main>
            <router-view name="default" ></router-view>
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
        slogan:null

	}
  },
  mounted(){
      this.checkLogin()
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
.header {
    box-shadow: 0 1px 5px rgba(0,0,0,.1);
    z-index: 10;
}
</style>
