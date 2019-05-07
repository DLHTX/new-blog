<template>
  <div>
    <div v-if="blogArr!=''">
      <div class="blog_content">
        <router-link
          :to="{name:'blogDetail',query:{blogId:blog.blogId}}"
          class="blog_item animated fadeInUp"
          v-for="(blog,index) in blogArr"
          :key="index"
        >
          <div class="img_content">
            <img v-lazy="blog.src" alt download>
          </div>
          <div class="blog_item_body">
            <!-- <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button> -->
            <span class="downloadImg" @click.stop.prevent="downloadImg(blog.src)">查看图片</span>
            <p>{{blog.body | formateVal(blog.body)}}</p>
          </div>
          <div class="blog_item_back"></div>
          <div class="blog_item_title">
            <p>{{blog.title}}</p>
          </div>
          <div class="readCount">{{friendlyDate(blog.creat_time)}}</div>
          <div class="tip" v-if="blog.className">{{blog.className}}</div>
        </router-link>
      </div>
      <div style="height: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="row"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <el-dialog
      width="70%"
      title="查看图片"
      :visible.sync="dialogVisible"
      append-to-body>
        <img :src='downloadSrc' alt="" v-if='downloadSrc' style="width:100%;">
    </el-dialog>
  
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import blog from "../../api/blog";
import saveAs from 'file-saver';

export default {
  data() {
    return {
      blogArr: [],
      isShow: false,
      loading: false,
      total: 10,
      row: 6,
      currentPage: 1,
      downloadSrc:'',
      dialogVisible:false,
    };
  },
  created() {
    this.getAllblog();
  },
  methods: {
    handleCurrentChange() {
      console.log(this.currentPage);
      this.getAllblog();
    },

    getAllblog: async function() {
      this.loading = true;
      try {
        let res = await blog.findAllBlogByclassName({ className:this.$route.query.className , page: this.currentPage, row: this.row });
        this.loading = false;
        this.blogArr = res.data;
        this.blogArr.forEach(item => {
          item.src ="https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&a=" + Math.random();
          item.color = this.rgb();
          item.creat_time = new Date(item.creat_time.split("T")[0]).getTime();
        });
        this.total = res.total;
        console.log(this.blogArr);
      } catch (err) {
        console.log(err);
        // this.$router.push({ path: '/404'})
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

    getMyDate(str) {
      var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime =
          oYear +
          "-" +
          addZero(oMonth) +
          "-" +
          addZero(oDay) +
          " " +
          addZero(oHour) +
          ":" +
          addZero(oMin) +
          ":" +
          addZero(oSen);
      return oTime;
    },

    addZero(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },

    showUpBtn(boolean) {
      this.isShow = boolean;
    },
    downloadImg(src) {
        //let image = new Image();
        this.dialogVisible = true
        this.downloadSrc = src
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
    formateDate: function(value) {
      if (!value) return "";
      value = value.toString();
      var dateTime = value.split("T")[0];
      return new Date(dateTime).getTime();
    }
  }
};
</script>
<style lang="less">
@import "./template.less";
@import "../../assets/common.less";
@import "../../assets/css/animate.css";
.downloadImg {
  position: absolute;
  top: 12px;
  right: 14px;
  background: #6463ef;
  height: 2rem;
  padding: 0 10px;
  font-size: 10px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
