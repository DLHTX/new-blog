<template>
  <div class="lowin lowin-red" style="height: 90vh;overflow: hidden;" ref="lowin">
    <div class="lowin-brand" ref="lowin_brand">
      <img src="../../assets/img/kodinger.jpg" alt="logo">
    </div>
    <div class="lowin-wrapper" ref="lowin_wrapper">
      <div class="lowin-box lowin-login" ref="lowin_login">
        <div class="lowin-box-inner">
          <form>
            <p>Sign in to continue</p>
            <div class="lowin-group">
              <label>
                UserName
                <a href="#" class="login-back-link" ref="login_back_link">Sign in?</a>
              </label>
              <input type="text"  class="lowin-input" v-model='signInName'>
            </div>
            <div class="lowin-group password-group" ref="password_group">
              <label>
                Password
                <a href="#" class="forgot-link" ref="forgot_link">Forgot Password?</a>
              </label>
              <input
                type="password"
                name="password"
                autocomplete="current-password"
                class="lowin-input"
                v-model="signInPassword"
              >
            </div>
            <div class="lowin-btn login-btn" ref="login_btn" @click='fnLogin()' style="text-align: center;">登录</div>

            <div class="text-foot">
              Don't have an account?
              <span class="register-link" ref="register_link" style="border-bottom: 1px dashed #ffaaaa;color: #ff6464;cursor:pointer;" >Register</span>
            </div>
          </form>
        </div>
      </div>

      <div class="lowin-box lowin-register" ref="lowin_register">
        <div class="lowin-box-inner">
          <form>
            <p>Let's create your account</p>
            <div class="lowin-group">
              <label>Name</label>
              <input type="text" name="name" autocomplete="name" class="lowin-input" v-model="registerName">
            </div>
            <!-- <div class="lowin-group">
              <label>Email</label>
              <input type="email" autocomplete="email" name="email" class="lowin-input">
            </div> -->
            <div class="lowin-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                autocomplete="current-password"
                class="lowin-input"
                v-model='registerPassword'
              >
            </div>
            <div class="lowin-btn" @click='fnregister()' style="text-align: center;">注册</div>

            <div class="text-foot">
              Already have an account?
              <span class="login-link" ref="login_link" style="border-bottom: 1px dashed #ffaaaa;color: #ff6464;cursor:pointer;">Login</span>
            </div>
          </form>
        </div>
      </div>
    </div>

    <footer class="lowin-footer" ref="lowin_footer">
      Design By
      <a href="http://fb.me/itskodinger">@itskodinger</a>
    </footer>
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
        signInName:'',
        signInPassword:'',
        registerName:'',
        registerPassword:'',
        Auth:'',
    };
  },
  mounted() {
      this.initAnimate()//初始化动画组件
  },
  methods: {
    ...mapActions(["login", "checkLogin", "logout", "getPermissions"]),
    showBtn() {},
    
    initAnimate() {
        var Auth = {
            vars: {
            lowin: this.$refs.lowin,
            lowin_brand: this.$refs.lowin_brand,
            lowin_wrapper: this.$refs.lowin_wrapper,
            lowin_login: this.$refs.lowin_login,
            lowin_wrapper_height: 0,
            login_back_link: this.$refs.login_back_link,
            forgot_link: this.$refs.forgot_link,
            login_link: this.$refs.login_link,
            login_btn: this.$refs.login_btn,
            register_link: this.$refs.register_link,
            password_group: this.$refs.password_group,
            password_group_height: 0,
            lowin_register: this.$refs.lowin_register,
            lowin_footer: this.$refs.lowin_footer,
            box: [this.$refs.lowin_login, this.$refs.lowin_register],
            option: {}
            },
            register(e) {
            Auth.vars.lowin_login.className += " lowin-animated";
            setTimeout(() => {
                Auth.vars.lowin_login.style.display = "none";
            }, 500);
            Auth.vars.lowin_register.style.display = "block";
            Auth.vars.lowin_register.className += " lowin-animated-flip";

            Auth.setHeight(
                Auth.vars.lowin_register.offsetHeight +
                Auth.vars.lowin_footer.offsetHeight
            );

            e.preventDefault();
            },
            login(e) {
            Auth.vars.lowin_register.classList.remove("lowin-animated-flip");
            Auth.vars.lowin_register.className += " lowin-animated-flipback";
            Auth.vars.lowin_login.style.display = "block";
            Auth.vars.lowin_login.classList.remove("lowin-animated");
            Auth.vars.lowin_login.className += " lowin-animatedback";
            setTimeout(() => {
                Auth.vars.lowin_register.style.display = "none";
            }, 500);

            setTimeout(() => {
                Auth.vars.lowin_register.classList.remove(
                "lowin-animated-flipback"
                );
                Auth.vars.lowin_login.classList.remove("lowin-animatedback");
            }, 1000);

            Auth.setHeight(
                Auth.vars.lowin_login.offsetHeight +
                Auth.vars.lowin_footer.offsetHeight
            );

            e.preventDefault();
            },
            forgot(e) {
            Auth.vars.password_group.classList += " lowin-animated";
            Auth.vars.login_back_link.style.display = "block";

            setTimeout(() => {
                Auth.vars.login_back_link.style.opacity = 1;
                Auth.vars.password_group.style.height = 0;
                Auth.vars.password_group.style.margin = 0;
            }, 100);

            Auth.vars.login_btn.innerText = "Forgot Password";

            Auth.setHeight(
                Auth.vars.lowin_wrapper_height - Auth.vars.password_group_height
            );
            Auth.vars.lowin_login
                .querySelector("form")
                .setAttribute("action", Auth.vars.option.forgot_url);

            e.preventDefault();
            },
            loginback(e) {
            Auth.vars.password_group.classList.remove("lowin-animated");
            Auth.vars.password_group.classList += " lowin-animated-back";
            Auth.vars.password_group.style.display = "block";

            setTimeout(() => {
                Auth.vars.login_back_link.style.opacity = 0;
                Auth.vars.password_group.style.height =
                Auth.vars.password_group_height + "px";
                Auth.vars.password_group.style.marginBottom = 30 + "px";
            }, 100);

            setTimeout(() => {
                Auth.vars.login_back_link.style.display = "none";
                Auth.vars.password_group.classList.remove("lowin-animated-back");
            }, 1000);

            Auth.vars.login_btn.innerText = "登录";
            Auth.vars.lowin_login
                .querySelector("form")
                .setAttribute("action", Auth.vars.option.login_url);

            Auth.setHeight(Auth.vars.lowin_wrapper_height);

            e.preventDefault();
            },
            setHeight(height) {
            Auth.vars.lowin_wrapper.style.minHeight = height + "px";
            },
            brand() {
            Auth.vars.lowin_brand.classList += " lowin-animated";
            setTimeout(() => {
                Auth.vars.lowin_brand.classList.remove("lowin-animated");
            }, 1000);
            },
            init(option) {
            // console.log(Auth.vars.box[0].offsetHeight)
            Auth.setHeight(
                Auth.vars.box[0].offsetHeight + Auth.vars.lowin_footer.offsetHeight
            );

            Auth.vars.password_group.style.height =
                Auth.vars.password_group.offsetHeight + "px";
            Auth.vars.password_group_height =
                Auth.vars.password_group.offsetHeight;
            Auth.vars.lowin_wrapper_height = Auth.vars.lowin_wrapper.offsetHeight;

            Auth.vars.option = option;
            Auth.vars.lowin_login
                .querySelector("form")
                .setAttribute("action", option.login_url);

            var len = Auth.vars.box.length - 1;

            for (var i = 0; i <= len; i++) {
                if (i !== 0) {
                Auth.vars.box[i].className += " lowin-flip";
                }
            }

            Auth.vars.forgot_link.addEventListener("click", e => {
                Auth.forgot(e);
            });

            Auth.vars.register_link.addEventListener("click", e => {
                Auth.brand();
                Auth.register(e);
            });

            Auth.vars.login_link.addEventListener("click", e => {
                Auth.brand();
                Auth.login(e);
            });

            Auth.vars.login_back_link.addEventListener("click", e => {
                Auth.loginback(e);
            });
            }
        };
        Auth.init({
            login_url: "#login",
            forgot_url: "#forgot"
        });
        this.Auth = Auth
    },

    async fnLogin(){
        try{
            let res = await this.login({name:this.signInName,password:this.$md5(this.signInPassword)})
            if(res)  this.$router.push({path:'/'})
        } catch(err){
            console.log(err)
            this.$message.error({message: err.errorMsg})

        }
    },

    async fnregister(){
        console.log('fnregister')
        var uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
        if(!uPattern.test(this.registerName)) return this.$message({message: '用户名为4到16位',type: 'warning'})
        try{
            if(this.registerName==''||this.registerPassword=='') return this.$message({message: '输入内容不可为空',type: 'warning'})
            let res = await auth.register({name:this.registerName,password:this.$md5(this.registerPassword)})
            this.$message({message: '注册成功',type: 'success'})
            this.$router.push({path:'/login'})
        } catch(err){
            console.log(err)
            this.$message.error({message: err.errorMsg})

        }
    }

  },
  computed: {
    ...mapGetters(["isLogin", "user"])
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/auth.css";
</style>

