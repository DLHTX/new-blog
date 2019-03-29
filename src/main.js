// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */ 
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import Util from '@/helpers/util';
import hoverCss from 'hover.css'//hovercss
import anime from 'animejs'//anime库
import vueLazyload from 'vue-lazyload';

Vue.use(anime)
Vue.use(hoverCss)//hoverCss useage:'hvr-xxx' http://ianlunn.github.io/Hover/
Vue.use(ElementUI);
Vue.use(Util);

Vue.config.productionTip = false;

// 图片在assets文件夹，就需要使用require（）进行引入。
Vue.use(vueLazyload);
Vue.use(vueLazyload,{
  //error:require('./assets/img/nopic.png'),
  loading:'../static/lazy.jpg'
})
// 图片在static文件夹，就可以直接写路径了
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   loading: '../static/123.gif',
//   attempt: 1
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
