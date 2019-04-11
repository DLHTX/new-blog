<template>
  <div class="social-list">
    <a class="social weibo" target="blank" href="https://weibo.com/lauzexu">WEIXIN</a>
    <a class="social zhihu" target="blank" href="https://www.zhihu.com/people/chakhsu/">QQ</a>
    <a class="social github" target="blank" href="https://github.com/chakhsu">GITHUB</a>
    <a class="social twitter" target="blank" href="https://twitter.com/chakhsu_lau">TWITTER</a>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
    name: "Footer",
    components: {},
    data() {
        return {};
    },
    created() {},
    methods: {
        ...mapActions(["getGrxx", "checkLogin", "logout", "getPermissions"])
    },
    computed: {
        ...mapGetters(["isLogin", "user"])
    }
};
</script>

<style lang="less">
@import "../../assets/common.less";
.social-list a {
    margin: 20px;
}
</style>
