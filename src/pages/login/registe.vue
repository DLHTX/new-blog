<template>
    <div>
        <h1></h1>
        <div class="login-form">
            <div class="close"> </div>
            <div class="head-info">
                <label class="lbl-1"> </label>
                <label class="lbl-2"> </label>
                <label class="lbl-3"> </label>
            </div>
            <div class="clear"> </div>
            <div class="avtar">
                <img src="http://dlhtx.zicp.vip:3000/img/logo.png"  style="height: 12vh;"/>
            </div>

            <input type="text" class="text" value="Username"  v-model='registerName' placeholder="请输入用户名">
            <div class="key">
                <input type="password" value="Password"  v-model="registerPassword" placeholder="请输入密码">
            </div>
            <div class="key">
                <input type="password" value="Password"  v-model="registerPassword2" placeholder="请确认密码">
            </div>
            <div class="" style="color: #cecece; margin: 17px;cursor: pointer;" @click='goLogin()'>
                已注册?
            </div>

            <div class="signin">
                <input type="submit" value="注册" @click='fnregister()'>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import auth from "../../api/auth";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import Auth from "../../helpers/loginAnimate.js";

export default {
    name: "index",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            signInName: '',
            signInPassword: '',
            registerName: '',
            registerPassword: '',
            registerPassword2:'',
            Auth: '',

        };
    },
    mounted() {
        // this.initAnimate()//初始化动画组件
    },
    methods: {
        ...mapActions(["login", "checkLogin", "logout", "getPermissions"]),
        showBtn() { },

        async fnLogin() {
            try {
                let res = await this.login({ name: this.signInName, password: this.$md5(this.signInPassword) })
                if (res) this.$router.push({ path: '/' })
            } catch (err) {
                console.log(err)
                this.$message.error({ message: err.errorMsg })

            }
        },

        async fnregister() {
            console.log('fnregister')
            var uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
            if (this.registerPassword != this.registerPassword2) return this.$message({ message: '两次密码不一致', type: 'warning' })
            if (!uPattern.test(this.registerName)) return this.$message({ message: '用户名为4到16位', type: 'warning' })
            try {
                if (this.registerName == '' || this.registerPassword == '') return this.$message({ message: '输入内容不可为空', type: 'warning' })
                let res = await auth.register({ name: this.registerName, password: this.$md5(this.registerPassword) })
                this.$message({ message: '注册成功', type: 'success' })
                this.$router.push({ path: '/login' })
            } catch (err) {
                console.log(err)
                this.$message.error({ message: err.errorMsg })

            }
        },
        goLogin(){
            this.$router.push('/login')
        }

    },
    computed: {
        ...mapGetters(["isLogin", "user"])
    }
};
</script>

<style scoped lang='less'>
@import url("./style.css");
.login-form {
    transition: all 0.3s;
    &:hover {
        box-shadow: 0 -10px 15px 6px #dcdcdc;
        transition: all 0.3s;
    }
}
</style>