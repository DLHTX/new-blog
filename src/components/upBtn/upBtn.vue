<template>
    <span :class="[isShow?'fadeInRight':'fadeOutRight']">
        <i
        class="iconfont icon-shang  animated delay-2s slower upBtn"
        :class="[isShow?'fadeInRight':'fadeOutRight']"
        style="font-size:25px;color:white;"
        @click="scrollToTop()"
        ></i>
    </span>

</template>


<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
    name: "upBtn",
    components: {},
    data() {
        return {
            isShow:false
        };
    },
    mounted() {
        ///this.handleScroll()
        console.log('upbtn mounted...')
         window.addEventListener('scroll', this.handleScroll, true);  
    },
    methods: {
        ...mapActions(["getGrxx", "checkLogin", "logout", "getPermissions"]),
        handleScroll(){
            // 页面滚动距顶部距离
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                      document.body.scrollTop
            var scroll = scrollTop - this.i;
            this.i = scrollTop;
            if(scroll<0){
                this.isShow = false
            }else{
                this.isShow = true
            }
        },
        scrollToTop() {
            this.scrollAnimation(document.documentElement.scrollTop || document.body.scrollTop, 0)
        },
        scrollAnimation(currentY, targetY) {
            // 获取当前位置方法
            // const currentY = document.documentElement.scrollTop || document.body.scrollTop
            // 计算需要移动的距离
            let needScrollTop = targetY - currentY
            let _currentY = currentY
            setTimeout(() => {
            // 一次调用滑动帧数，每次调用会不一样
                const dist = Math.ceil(needScrollTop / 10)
                _currentY += dist
                window.scrollTo(_currentY, currentY)
                // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
                if (needScrollTop > 10 || needScrollTop < -10) {
                    this.scrollAnimation(_currentY, targetY)
                } else {
                    window.scrollTo(_currentY, targetY)
                }
            }, 1)
        },
    },
    computed: {
        ...mapGetters(["isLogin", "user","progress"])
    }
};
</script>

<style lang="less">
@import "../../assets/common.less";
.upBtn {
    font-size: 40px;
    color: #f78286;
    position: fixed;
    top: 80%;
    right: 0;
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    border-radius: 2px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #dedede;
  }
  .img_content {
    height: 320px;
    width: 100%;
    justify-content: center;
    display: flex;
    img {
      height: 100%;
      width: auto;
      -webkit-transition: all 0.4s;
      transition: all 0.4s;
    }
  }
</style>
