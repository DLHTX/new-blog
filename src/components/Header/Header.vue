<template>
  <div class="navbar-container">
    <router-link :to="{path:'/'}" class="navbar-logo">
      <img src="../../../img/logo.png">
    </router-link>
    <div class="userInfo">
      <div v-if="!isLogin">
        <router-link :to="{name: 'login'}" class="login">SignIn</router-link>
        <router-link :to="{name: 'login'}" class="register">register</router-link>
      </div>
      <el-dropdown v-if="isLogin" class="avatar">
        <span class="el-dropdown-link avatar">
          <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
          <img :src="user.headImg" alt style="border-radius:50%;">
        </span>
        <el-dropdown-menu slot="dropdown" class="dropdown">
          <el-dropdown-item >
            <router-link :to="{path:'/myBlog' , query: { userName: user.name}}">
                <i class="iconfont icon-wodedangxuan icon" style="color:#eb5055;padding-right: 15px;"></i>我的博客
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{path:'/myFabBlog' , query: { userName: user.name}}">
                <i class="iconfont icon-xihuan icon" style="color:#eb5055;padding-right: 15px;"></i>我的点赞
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{path:'/my' , query: { userName: user.name}}">
                <i class="iconfont icon-shezhi icon" style="color:#eb5055;padding-right: 15px;"></i>个人中心
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="fnLogout()">
            <i class="iconfont icon-tuichu icon" style="color:#eb5055;padding-right: 15px;"></i>注销用户
          </el-dropdown-item>
        </el-dropdown-menu>
        <router-link :to="{path:'/writeBlog'}" target="_blank" class="writeBtn">
          <i class="iconfont icon-shuxiegongju"></i>写博客
        </router-link>
      </el-dropdown>
    </div>      
    <div class="navbar-menu">
        <router-link :to="{path:'/myBlog' , query: {userName: 'dlhtx'}}">文章</router-link>
        <router-link :to="{name:'blogDetail',query:{blogId:666}}">友链</router-link>
        <router-link :to="{name:'blogDetail',query:{blogId:888}}">关于</router-link>
        <router-link :to="{name:'blogDetail',query:{blogId:12319}}">更新日志</router-link>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Header",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapActions(["getGrxx", "checkLogin", "logout", "getPermissions",]),
    
    fnLogout() {
      console.log("click");
      this.logout(); //注销登录
    }
  },
  computed: {
    ...mapGetters(["isLogin", "user"])
  }
};
</script>

<style lang="less">
@import "../../assets/common.less";

.userInfo {
  float: right;
  margin-right: 3rem;
  .writeBtn {
    background: linear-gradient(45deg,rgb(241, 81, 86), #f3d922);
    display: flex;
    height: 2rem;
    justify-content: center;
    align-items: center;
    color: WHITE;
    border-radius: 22px;
    padding: 0 0.4rem;
    margin-left: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    i {
      margin-right: 3px;
    }
    &:hover {
      box-shadow: 0 0 10px 2px #ffc9cb;
      transition: all 0.3s;
    }
    &:hover i {
      animation: write 2s infinite;
      transition: all 0.3s;
    }
  }
  .login {
    background: #eb5055;
    color: white;
    margin: 0 25px;
    padding: 2px 8px;
    border-radius: 19px;
    font-size: 14px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: #ff365b;
      transition: all 0.3s;
    }
  }
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    img {
      height: 35px;
      cursor: pointer;
    }
    .dropdown {
      .icon {
        color: #eb5055;
      }
    }
  }
  .register {
    color: #eb5055;
    cursor: pointer;
    &:hover {
      color: #ff365b;
      transition: all 0.3s;
    }
  }
}
.navbar-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 60px;
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
  cursor: pointer;
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
  float: right;
}
.navbar-menu a {
  font-size: 14px;
  padding: 0 15px;
  transition: all 0.3s;
}
a:active,
a:focus,
a:hover {
  color: #eb5055;
  outline: 0;
  transition: all 0.3s;
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
  content: "";
  background-color: currentColor;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #e6e6e6;
  color: #f55b60;
}
@keyframes write {
  0% {
    transform: rotateZ(-7deg);
  }
  10% {
    transform: rotateZ(7deg);
  }
  20% {
    transform: rotateZ(-4deg);
  }
  30% {
    transform: rotateZ(3deg);
  }
  40% {
    transform: rotateZ(-8deg);
  }
  50% {
    transform: rotateZ(8deg);
  }
  60% {
    transform: rotateZ(-6deg);
  }
  70% {
    transform: rotateZ(6deg);
  }
  80% {
    transform: rotateZ(-5deg);
  }
  90% {
    transform: rotateZ(3deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>