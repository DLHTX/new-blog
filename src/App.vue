<template>
    <div id="app">
        <!-- <lottieLoading v-if='showAni'></lottieLoading> -->
        <router-view class="child-view" ref="routerView"></router-view>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default {
    name: 'App',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            showStyle: false,
            isRun: false,
            slogan: null,
            enterAnimate: "animated fadeInUp",
            leaveAnimate: "animated fadeOutDown",
            isScroll: false,
            showAni:false,
        }
    },
    mounted() {
        // setInterval(()=>{
        //     console.log(this.showAni)
        // },20)
    },
    methods: {
        showUpBtn() {

        }

    },
    computed: {
        ...mapGetters([
            'isLogin',
            'user',
            'progress'
        ]),
    },
   
}
</script>

<style lang="less">
@import "./assets/common.less";
@import "assets/css/animate.css";
#app {
    height: 100%;
    position: relative;
    // overflow: hidden;
}
.el-progress {
    position: absolute !important;
    height: 8px !important;
    z-index: 99999 !important;
    width: 100% !important;
    top: -8px;
}
</style>
