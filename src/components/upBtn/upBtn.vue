<template>
    <i
      class="iconfont icon-up upBtn animated delay-2s slower"
      :class="[isShow?'zoomIn':'zoomOut']"
      @click="scrollToTop()"
    ></i>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
    name: "Footer",
    components: {},
    data() {
        return {
            isShow:false
        };
    },
    mounted() {
        this.binft(document.getElementById('binft'))
    },
    methods: {
        ...mapActions(["getGrxx", "checkLogin", "logout", "getPermissions"]),

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
    left: 93%;
    cursor: pointer;
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
