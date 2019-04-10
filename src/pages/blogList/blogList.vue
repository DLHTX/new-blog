  <template>
  <div >
    <div class="blog_content"  v-loading="loading">
      <router-link
        :to="{name:'blogDetail',query:{blogId:blog.blogId}}"
        class="blog_item"
        v-for="(blog,index) in blogArr"
        :key="index"
      >
        <div class="img_content">
          <img v-lazy="blog.src" alt>
        </div>
        <div class="blog_item_body">
          <p>{{blog.body | formateVal(blog.body)}}</p>
        </div>
        <div class="blog_item_back"></div>
        <div class="blog_item_title">
          <p>{{blog.title}}</p>
        </div>
        <div class="readCount">{{blog.creat_time | formateDate}}</div>
        <div
          class="tip"
          v-if="blog.className"
          :style="{ 'background-color' : 'rgba'+ blog.color}"
        >{{blog.className}}</div>
      </router-link>
    </div>
    <div style="height: 30px;">
      <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
    <i
      class="iconfont icon-up upBtn animated delay-2s slower"
      :class="[isShow?'zoomIn':'zoomOut']"
      @click="scrollToTop()"
    ></i>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import blog from "../../api/blog";

export default {
    data() {
        return {
            blogArr: [],
            isShow: false,
            loading:false
        };
    },
    created() {
        this.getAllblog();
    },
    methods: {
        getAllblog: async function() {
            this.loading = true
            let res = await blog.getBlog();
            if (res.success){
                this.loading=false
                this.blogArr = res.data;
                this.blogArr.forEach(item => {
                    item.src ="https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&a=" +Math.random();
                    item.color = this.rgb();
                });
                console.log(this.blogArr);
            }

        },

        rgb() {
            //rgb颜色随机
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var rgba = "(" + r + "," + g + "," + b + ",0.5)";
            return rgba;
        },

        showUpBtn(boolean) {
            this.isShow = boolean;
        },

        scrollToTop() {
            scrollTo(0, 0);
        }
    },
    computed: {
        ...mapGetters(["isLogin", "user"])
    },
    filters: {
        formateVal: function(value) {
            if (!value) return "";
            value = value.toString();
            return value.substring(0, 60) + "...";
        },
        formateDate: function(value){
            if (!value) return "";
            value = value.toString();
            return value.split('T')[0]
        }
    }
}
</script>
<style lang="less">
@import "./template.less";
@import "../../assets/common.less";
@import "../../assets/css/animate.css";

</style>
