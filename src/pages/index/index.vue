<template>
    <div>
        <lottieLoading v-if='progress.show'></lottieLoading>
        
        <el-container>
            <el-header class="el-header" :class="[isScroll?'scrollToTop':'scrollToDown']">
                <Header></Header>
            </el-header>
            <el-main>
                <!-- 含有过渡动画的router -->
                <transition name="custom-classes-transition" :enter-active-class="enterAnimate">
                    <keep-alive include="blogList">
                        <router-view class="child-view" ref="routerView" :key='nowTime'></router-view>
                    </keep-alive>
                </transition>

                <upBtn ref="upBtn"></upBtn>
            </el-main>
            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import upBtn from "../../components/upBtn/upBtn";
import blog from "../../api/blog";

export default {
    name: "index",
    components: {
        Header,
        Footer,
        upBtn
    },
    data() {
        return {
            showStyle: false,
            isRun: false,
            slogan: null,
            enterAnimate: "animated fadeIn",
            leaveAnimate: "animated fadeOut",
            isScroll: false,
            nowTime: '',
            top: 0,//滚动条位置
        };
    },
    watch: {
        '$route': function (newUrl, oldUrl) {
            this.nowTime = new Date().getTime();
        }
    },
    mounted() {
        this.checkLogin();
        //window.addEventListener('scroll', this.handleScroll, true)

        console.log(this.$refs.routerView);
    },
    methods: {
        ...mapActions(["checkLogin", "getPermissions", "progress"]),
        showUpBtn() { },
    },
    computed: {
        ...mapGetters([
            'isLogin',
            'user',
            'progress'
        ]),
    },
    watch: {
   
    }
};
</script>

<style lang="less" scoped>
@import "../../assets/common.less";
@import "../../assets/css/animate.css";
.el-header {
    transition: all 0.3s;
}
.el-footer {
    height: 10vh !important;
    background: rgb(46, 48, 51);
    color: white;
    padding: 2vh;
}
.scrollToTop {
    animation-name: scroll;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
}
.scrollToDown {
    animation-name: scrollDown;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
}
@keyframes scroll {
    0% {
        top: 0;
    }
    100% {
        top: -70px;
    }
}
@keyframes scrollDown {
    0% {
        top: -70px;
    }
    100% {
        top: 0;
    }
}
</style>