// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */ 
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';

import store from './store';
import Util from '@/helpers/util';
import hoverCss from 'hover.css'//hovercss
import anime from 'animejs'//anime库
import vueLazyload from 'vue-lazyload';
import mavonEditor from 'mavon-editor';//makedown编辑器
import VueMarkdown from 'vue-markdown';//makedown转h5
import hljs from 'highlight.js';//代码高亮
import md5 from 'js-md5';
import VueHighlightJS from 'vue-highlightjs'

import 'highlight.js/styles/googlecode.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css'
import "github-markdown-css/github-markdown.css"

Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(anime)
Vue.use(hoverCss)//hoverCss useage:'hvr-xxx' http://ianlunn.github.io/Hover/
Vue.use(ElementUI);
Vue.use(Util);
Vue.use(VueMarkdown);
Vue.use(hljs);

Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;

// 图片在assets文件夹，就需要使用require（）进行引入。
Vue.use(vueLazyload,{
  //error:require('./assets/img/nopic.png'),
  loading:require('./assets/img/lazy.gif')
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
