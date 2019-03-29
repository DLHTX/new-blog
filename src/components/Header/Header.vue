<template>
    <div class="navbar-container"> 
        <a href="https://www.linpx.com/" class="navbar-logo"> 
            <img src="https://www.linpx.com/usr/themes/pinghsu/images/logo.png" alt="LiNPX"> 
        </a> 
        <div class="navbar-menu"> 
            <a href="https://www.linpx.com/archives.html">Archives</a> 
            <a href="https://www.linpx.com/links.html">Links</a> 
            <a href="https://www.linpx.com/about.html">About</a>
        </div> 
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios'

export default {
  name: 'Header',
  components: {
  },
  data(){
	return{
		
	}
  },
  created(){

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
.navbar-container {
    position: relative;
    width: 1040px;
    max-width: 100%;
    height: 70px;
    margin: 0 auto;
}
.navbar-logo {
    font-size: 22px;
    line-height: 22px;
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: auto;
    max-width: 50%;
    height: 22px;
    margin-top: -10px;
    margin-left: 25px;
    text-decoration: none;
}
.navbar-logo img {
    width: auto;
    height: 22px;
    outline: 0;
}
.navbar-menu {
    z-index: 10;
    display: inline-block;
    width: auto;
    padding-right: 5px;
    float:right;
}
.navbar-menu a {
    font-size: 14px;
    padding: 0 15px;
     transition: all .3s;
}
a:active, a:focus, a:hover {
    color: #eb5055;
    outline: 0;
    transition: all .3s;
}
.navbar-search {
    line-height: 70px;
    display: inline-block;
    width: 20px;
    padding: 0 40px 0 0;
    cursor: pointer;
}
.icon-search {
    position: relative;
    z-index: 1;
    display: inline-block;
    width: 13px;
    height: 13px;
    margin: 2px 0 0 3px;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    color: #313131;
    border: solid 2px currentColor;
    border-radius: 50%;
}
.icon-search:before {
    position: absolute;
    top: 11px;
    left: 3px;
    width: 2px;
    height: 4px;
    content: '';
    background-color: currentColor;
}
</style>
