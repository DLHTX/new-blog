  <template>
  <div>
    <div class="blog_content">
      <router-link
        :to="{name:'blogDetail',query:{blogId:blog.blogId}}"
        class="blog_item animated fadeInUp"
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
        <div class="readCount">{{friendlyDate(blog.creat_time)}}</div>
        <div
          class="tip"
          v-if="blog.className"
        >{{blog.className}}</div>
      </router-link>
    </div>
    <div style="height: 30px;">
      <el-pagination  
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="row"
      layout="total, prev, pager, next"
      :total="total"></el-pagination>
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
            loading:false,
            total:10,
            row:6,
            currentPage:1,
        };
    },
    created() {
        this.getAllblog();
    },
    methods: {
        handleCurrentChange(){
            console.log(this.currentPage)
            this.getAllblog()
        },
        getAllblog: async function() {
            this.loading = true
            let res = await blog.getBlog({page:this.currentPage,row:this.row});
            if (res.success){
                this.loading = false
                this.blogArr = res.data;
                this.blogArr.forEach(item => {
                    item.src ="https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&a=" +Math.random();
                    item.color = this.rgb();
                    item.creat_time =  new Date(item.creat_time.split('T')[0]).getTime()
                });
                this.total = res.total
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
        getMyDate(str) {
            var oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay) +' '+ addZero(oHour) +':'+ addZero(oMin) +':'+addZero(oSen);
            return oTime;
        },
        addZero(num){
            if(parseInt(num) < 10){
                num = '0'+num;
            }
            return num;
        },
        showUpBtn(boolean) {
            this.isShow = boolean;
        },

        scrollToTop() {
            //scrollTo(0, 0);
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
            var dateTime =  value.split('T')[0]
            return  new Date(dateTime).getTime()
        }
    }
}
</script>
<style lang="less">
@import "./template.less";
@import "../../assets/common.less";
@import "../../assets/css/animate.css";

</style>
