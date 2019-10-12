    <template>
    <div style="margin:0;padding:0;" class='animated fadeIn'>
        <upBtn></upBtn>
        <div class="blog_content">
            <div class="blog_head">
                <div class="title" v-if='title' style="font-size: 36px;font-weight: 300;">
                    {{title}}
                    <router-link :to="{name:'blogCard',query:{className:titleClass}}">
                        <span class="title_class">{{titleClass}}</span>
                    </router-link>
                    <span class="title_class" style="background-image: linear-gradient(45deg, #0081ff, #1cbbb4);"
                        @click='fnGoedit()' v-if='user.name==blogDetail.userName'>编辑</span>
                    <!-- <span class="title_class">{{blogDetail.userName}}</span> -->
                </div>
                <div class="title_detail">
                    <span>{{blogDetail.creat_time | formateDate}} By <span
                            style="color: #fb7377;">{{blogDetail.userName}}</span>&nbsp&nbsp</span>
                    <span><i class="iconfont icon-aixin" style="font-size: 14px;"></i> {{blogDetail.fabulousCount}}
                        &nbsp&nbsp</span>
                    <span><i class="iconfont icon-pinglun1" style="font-size: 14px;"></i> {{blogDetail.reviewsCount}}
                        &nbsp&nbsp</span>
                    <span><i class="iconfont icon-yuedu" style="font-size: 15px;"></i> {{blogDetail.readcount}}</span>
                    <!-- 作者:{{blogDetail.userName}}　最后编辑于: -->
                </div>
                <hr style="    width: 100%;
    height: 1px;
    border: 0;
    background: #EFEFEF;
    margin: 15px 0;">
            </div>
            <div class="blog_body markdown-body" v-highlight>
                <vue-markdown :source="content" class="" ref='md'></vue-markdown>
            </div>
        </div>

        <div class="fave_box" @click='toggleClass()' :class="fave_active">
            <div class="fave" :class="active"></div> <span>点赞</span>
        </div>

        <div class="blog_commit">
            <div style="padding: 1rem;">评论</div>
            <!-- <div class="commit_box">
                    <textarea name="text" v-model="commitBody" placeholder="please write your commit here"></textarea>
                    <div class="btn" @click='fnaddCommit()'>提交</div>
            </div> -->
            <div class="comment-view">
                <div class="comment-header">
                    <img class="avatar" :src="user.headImg" width="80" height="80">
                    <span class="comment-author" v-if='!user.nickName'>{{user.name}}</span>
                    <span class="comment-author" v-if='user.nickName'>{{user.nickName}}</span>
                </div>
                <div class="comment-content">
                    <span class="comment-author-at"></span>
                    <textarea name="text" v-model="commitBody" placeholder="留下你的踪迹~~"></textarea>
                </div>
                <div class="comment-meta">
                    <div class="commit_btn" @click='fnaddCommit()'>评论</div>
                </div>
            </div>
            <div v-if='blogCommitList'>
                <div class="comment-view" v-for="(commit,index) in blogCommitList" :key="commit.id">
                    <div class="comment-header">
                        <img class="avatar" :src="commit.avatar" width="80" height="80">
                        <span class="comment-author" v-if='!commit.nickName'>{{commit.commitName}}
                            <span v-if='commit.sex=="男"' style="float: right;"><i class="iconfont icon-nan"
                                    style="font-size: 17px;color: #73b5fb;"></i></span>
                            <span v-if='commit.sex=="女"' style="float: right;"><i class="iconfont icon-nv"
                                    style="font-size: 17px;color: #fb7377;"></i></span>
                            <span v-if='commit.sex=="外星人"' style="float: right;"><i class="iconfont icon-waixingren"
                                    style="font-size: 17px;color: #c76aff;"></i></span>
                        </span>
                        <span class="comment-author" v-if='commit.nickName'>{{commit.nickName}}
                            <span v-if='commit.sex=="男"' style="float: right;"><i class="iconfont icon-nan"
                                    style="font-size: 17px;color: #73b5fb;"></i></span>
                            <span v-if='commit.sex=="女"' style="float: right;"><i class="iconfont icon-nv"
                                    style="font-size: 17px;color: #fb7377;"></i></span>
                            <span v-if='commit.sex=="外星人"' style="float: right;"><i class="iconfont icon-waixingren"
                                    style="font-size: 17px;color: #c76aff;"></i></span>
                        </span>
                        <span class='review' style='color: #737373;float: right;' @click='showRe(index)'>回复</span>
                    </div>
                    <div class="comment-content">
                        <span class="comment-author-at"></span>
                        <p>{{commit.commitBody}}</p>
                        <p></p>
                    </div>
                    <div class="comment-meta">
                        <time class="comment-time" style="color: #ababab;">{{commit.update_time | formateDate}}</time>
                    </div>
                   
                    <!-- 评论回复查看 -->
                        <div class="commitReview" v-if='commit.children.length != 0'>
                            <div v-for="(review, index2) in commit.children" :key="index2"
                                style="text-align: left;padding: 10px 15px;">
                                <div style="height: 35px;line-height: 35px;">
                                    <img class="avatar" :src="review.fromUserImg" alt="" style="display: inline-block;float: left;width: 30px;height: 30px;border: 1px solid #eaeaea;border-radius: 50%;margin-right: 10px;">
                                    {{review.fromUser}} <span style="color: #9e9e9e;">回复</span> {{review.toUser}} <span class='review' style='    color: rgb(183, 183, 183);float: right;font-size: 10px;' @click='showRe2(commit.id,review.fromUser)'>回复</span>
                                </div>
                                <div style="padding: 10px 0;">
                                    {{review.reviewBody}}
                                </div>
                                <div class="comment-meta">
                                    <time class="comment-time"
                                        style="color: #ababab;">{{review.review_time | formateDate}}</time>
                                </div>
                            </div>
                        </div>
                    <!-- 评论回复查看 -->

                    <!-- 评论回复书写 -->
                        <div class="commit-review" v-if='showCommitReviewIndex==index'>
                            <div class="comment-content">
                                <span class="comment-author-at"></span>
                                <textarea name="text" v-model="commitReview" placeholder="请输入您的回复内容~~"></textarea>
                            </div>
                            <div class="comment-meta">
                                <div class="commit_btn" @click='closeRe()' style='right: 20%;background: none;'>取消回复</div>
                                <div class="commit_btn" @click='fnreviewCommit(commit.id,commit.name||commit.nickName)'>提交回复
                                </div>
                            </div>
                        </div>
                    <!-- 评论回复书写 -->
               
                </div>
            </div>

            <div v-if='!blogCommitList' class="comment-view">
                还没有评论哦~
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import auth from '../../api/auth';
import blog from '../../api/blog';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import VueMarkdown from 'vue-markdown'
import upBtn from '../../components/upBtn/upBtn'

export default {
    name: 'index',
    components: {
        Header,
        Footer,
        VueMarkdown
    },
    data() {
        return {
            blogDetail: {},
            value: '1111',
            content: '',
            title: '',
            titleClass: '',
            loading: false,
            blogCommitList: [],
            commitBody: '',
            active: '',
            fave_active: '',
            showCommitReview: false,
            showCommitReviewIndex: -1,
            showCommitReviewIndex2: -1,
            commitReview: ''
        }
    },
    created() {
        this.getBlog()
        this.addReadCount()//阅读数量
    },
    mounted() {
        console.log(this.$refs.md)
    },
    methods: {
        closeRe() {
            this.showCommitReviewIndex = -1
            this.commitReview = ''
        },
        showRe(index) {
            this.showCommitReviewIndex = index
        },
        showRe2(id, name){
            this.$prompt(`你将要回复${name}`, '回复', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then((value ) => {
                        console.log( value )
                        if(value.value){
                            this.fnreviewCommit2(id, name ,value.value)
                        }else{
                            this.$message({
                            type: 'error',
                            message: '不可为空'
                        });     
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });       
            });
        },
        ...mapActions([
            'getGrxx',
            'checkLogin',
            'logout',
            'getPermissions'
        ]),
        async getBlog() {
            this.loading = true
            let res = await blog.findBlogByBlogId(this.$route.query.blogId)
            if (res.success) {
                let date = res.data[0]
                this.blogDetail = date
                this.content = date.body
                this.title = date.title
                this.titleClass = date.className
                this.loading = false
                this.getBlogCommit()
            }

        },
        async getBlogCommit() {
            let blogCommitList = await blog.findBlogCommitByBlogId(this.$route.query.blogId)
            if (blogCommitList.success) {
                var arr = this.formatData(blogCommitList.data)
                arr.forEach((item, index) => {
                    console.log(item)
                    item.children.forEach((item2, index2) => {
                        if (item2.toUser == null) {
                            arr[index].children.splice(index2, 1)
                        }
                    })
                })
                this.blogCommitList = arr
                console.log('11111111111111111', this.blogCommitList)
            }
        },
        async fnaddCommit() {
            if (this.commitBody == '') return this.$message({ message: '评论内容不可为空', type: 'warning' })
            let res = await blog.addCommit(this.user.name, this.$route.query.blogId, this.commitBody, this.user.headImg, String(new Date()))
            if (res.success) {
                this.$message({ message: '评论成功', type: 'success' })
                this.commitBody = ''
                this.blogDetail.reviewsCount = this.blogDetail.reviewsCount + 1
                this.getBlogCommit()
            }
        },
        async fnreviewCommit(id, name) {
            if (this.commitReview == '') return this.$message({ message: '评论内容不可为空', type: 'warning' })
            if(this.user.name == name ) return this.$message({ message: '你怎么能给自己回复呢~', type: 'warning' })
            let res = await blog.reviewCommit(id, this.commitReview, name, this.user.name, String(new Date()),this.user.headImg)
            if (res.success) {
                this.$message({ message: '回复成功', type: 'success' })
                this.closeRe()
                this.getBlogCommit()
            }
        },
         async fnreviewCommit2(id, name ,commitReview) {//回复回复的人
            if(this.user.name == name ) return this.$message({ message: '你怎么能给自己回复呢~', type: 'warning' })
            let res = await blog.reviewCommit(id, commitReview, name, this.user.name, String(new Date()),this.user.headImg)
            if (res.success) {
                this.$message({ message: '回复成功', type: 'success' })
                this.closeRe()
                this.getBlogCommit()
            }
        },
        async addFabulous() {
            try {
                let res = await blog.addFabulous(this.user.name, this.$route.query.blogId)
                if (res.success) {
                    this.$message({ message: '点赞成功!', type: 'success' })
                    this.blogDetail.fabulousCount = this.blogDetail.fabulousCount + 1
                }
            } catch (err) {
                if (err.msg == "已经点赞过了,不要重复点赞") return this.$message({ message: '重复点赞伤身体哦~!', type: "warning" })
                this.$message.error({ message: '点赞失败!' })
            }
        },
        async cancelFabulous() {
            try {
                let res = await blog.cancelFabulous(this.user.name, this.$route.query.blogId)
                if (res.success) {
                    this.$message({ message: '取消成功!', type: 'success' })
                }
            } catch (err) {
                this.$message.error({ message: '取消失败!' })
            }
        },
        async addReadCount() {
            try {
                let res = await blog.addReadCount(this.$route.query.blogId)
                if (res.success) {
                    //this.$message({message: '阅读成功!',type: 'success'})
                }
            } catch (err) {
                //this.$message.error({message: '阅读失败!'})
            }
        },
        formatData(arr) {
            var map = {},
                dest = [];
            for (var i = 0; i < arr.length; i++) {
                var ai = arr[i];
                if (!map[ai.id]) {
                    dest.push({
                        id: ai.id,
                        blogId: ai.blogId,
                        commitBody: ai.commitBody,
                        update_time: ai.update_time,
                        avatar: ai.headImg,
                        sex: ai.sex,
                        commitName: ai.name,
                        nickName: ai.name,
                        children: [ai]
                    });
                    map[ai.id] = ai;
                } else {
                    for (var j = 0; j < dest.length; j++) {
                        var dj = dest[j];
                        if (dj.id == ai.id) {
                            dj.children.push(ai);
                            break;
                        }
                    }
                }
            }
            return dest;
        },
        fnGoedit(blogId) {
            event.stopPropagation()
            let routeData = this.$router.resolve({ path: '/editBlog', query: { blogId: this.$route.query.blogId } });
            window.open(routeData.href, '_blank');
        },
        toggleClass() {
            if (this.fave_active == '') {
                this.active = 'active'
                this.fave_active = 'faveActive'
                this.addFabulous()
            } else {
                this.active = ''
                this.fave_active = ''
                this.cancelFabulous()
            }
        },



    },
    computed: {
        ...mapGetters([
            'isLogin',
            'user',
        ]),

    },
    filters: {
        formateDate: function (value) {//时间是没有问题的
            var data = new Date(value)
            return data.getFullYear() + "-" + ((data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)) + '-' + (data.getDate() < 10 ? '0' + data.getDate() : data.getDate()) + ' ' + (data.getHours() < 10 ? '0' + data.getHours() : data.getHours()) + ':' + (data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()) + ':' + (data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds())
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/common.less";
@import "../../assets/markdown.css";
.review {
    transition: all 0.3s;
    &:hover {
        color: #f78589 !important;
        transition: all 0.3s;
    }
}
.upBtn {
    font-size: 40px;
    color: #a1a1a1;
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

.blog_content {
    background-color: white;
    width: 70%;
    margin: 0 auto;
    max-width: 880px;
    min-width: 820px;
    margin-top: 3rem;
    line-height: normal;
    text-align: left;
    .blog_head {
        width: 90%;
        margin: 0 auto;
        .title {
            font-size: 21px;
            padding-top: 2rem;
        }
        .title_detail {
            font-size: 15px;
            color: #a0a0a0;
            margin-top: 8px;
            // border-top: 1px solid #d4d4d4;
            // border-bottom: 1px solid #d4d4d4;
            padding: 10px 0;
        }
        .line {
            border-bottom: 1px solid #ababab;
        }
    }
}
.title_class {
    color: white;
    height: 1rem;
    font-size: 18px;
    background-image: linear-gradient(45deg, #39b54a, #8dc63f);
    border-radius: 3px;
    transition: all 0.5s;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
        transition: all 0.5s;
        color: #5f5f5f !important;
        outline-style: none;
        background: #f7f7f7 !important;
    }
}
textarea {
    width: 90%;
    border: none;
    padding: 1rem;
    margin: 0px;
    resize: none;
    overflow: hidden;
    padding: 20px 0;
    resize: none;
    border-radius: 0;
    outline: none;
}
.commit_btn {
    position: absolute;
    top: 73%;
    right: 2%;
    display: flex;
    height: 28px;
    margin: 0 auto;
    padding: 0 20px;
    justify-content: center;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    text-align: center;
    color: #444444;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    background-color: #f7f7f7;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    &:hover {
        border: 1px solid #eb5055;
        color: #eb5055;
    }
}
.blog_commit {
    width: 100%;
    height: 100%;
    line-height: normal;
    background: #ffffff;
    margin: 0;
    padding: 0;
    margin-top: 3rem;
    border-radius: 3px;
    .commit_box {
        width: 55%;
        height: 10rem;
        margin: 0 auto;
        background-color: white;
        position: relative;
        border-radius: 4px;
        box-shadow: 0 0 12px -1px #efefef;
        textarea {
            width: 90%;
            border: none;
            padding: 1rem;
            margin: 0px;
            resize: none;
            overflow: hidden;
            padding: 20px 0;
            resize: none;
            border-radius: 0;
            outline: none;
        }
        .btn {
            position: absolute;
            top: 73%;
            right: 2%;
            display: flex;
            height: 28px;
            margin: 0 auto;
            padding: 0 20px;
            justify-content: center;
            -webkit-transition-duration: 0.4s;
            transition-duration: 0.4s;
            text-align: center;
            color: #444444;
            border: 1px solid #f7f7f7;
            border-radius: 30px;
            background-color: #f7f7f7;
            align-items: center;
            cursor: pointer;
            font-size: 15px;
            &:hover {
                border: 1px solid #eb5055;
                color: #eb5055;
            }
        }
    }
    .comment-view {
        width: 52%;
        margin: 2rem auto;
        background-color: white;
        position: relative;
        padding: 20px;
        transition: all 0.5s;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 10px -1px #eaeaea;
            // background:#f3f3f3;
            transition: all 0.5s;
        }
        .comment-header {
            display: inline-block;
            width: 100%;
            img {
                display: inline-block;
                float: left;
                width: 40px;
                height: 40px;
                border: 1px solid #eaeaea;
                border-radius: 50%;
            }
            span {
                font-size: 13px;
                line-height: 45px;
                display: inline-block;
                float: left;
                margin: 0 10px;
            }
        }
        .comment-content {
            margin-bottom: 10px;
            color: #313131;
            text-align: left;
        }
        .comment-meta {
            font-size: 12px;
            text-align: left;
        }
    }
}
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 0 45px;
}

.fave_box {
    margin: 2rem auto;
    width: 105px;
    height: 40px;
    border: 1px solid #f78589;
    -webkit-transition: all 0.6s;
    transition: all 0.6s;
    display: flex;
    border-radius: 37px;
    align-items: center;
    color: #f78589;
    cursor: pointer;
}
.fave {
    width: 50px;
    height: 50px;
    background: url("http://dlhtx.zicp.vip:3000/img/dianzan.png") no-repeat;
    background-position: left;
    background-size: auto 100%;
}

.faveActive {
    background-color: #ea6f5a !important;
    transition: all 0.6s;
    color: white;
}

.active {
    background-position: right;
    /* 主要在这一步 */
    transition: background 0.6s steps(19);
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>

