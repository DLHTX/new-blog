/* jshint esversion: 6 */
import Vue from 'vue';
import Router from 'vue-router';
/*
import Index from '@/pages/Index/template.vue'
import Login from '@/pages/Login/template.vue'
import Detail from '@/pages/Detail/template.vue'
import Edit from '@/pages/Edit/template.vue'
import Create from '@/pages/Create/template.vue'
import Register from '@/pages/Register/template.vue'
import User from '@/pages/User/template.vue'
import My from '@/pages/My/template.vue'
*/


import store from '../store';
window.store = store;

Vue.use(Router);

const router = new Router({
    routes: [
        // {     
        //   path: '/',
        //   component: () => import('@/pages/login/template.vue')
        // },
        {
            path: '/',
            component: () => import('@/pages/index/index.vue'), //index页面
            meta: {
                title: 'DLHTX的博客园~'
            },
            children:[
                {   
                    path:'',
                    // meta: { requiresAuth: true },
                    name:'blogList',
                    meta: {
                        title: '梦开始的地方~'
                    },
                    component: () => import('@/pages/blogList/blogList.vue') //blog子路由
                },
                {
                    path:'/blogDetail',
                    name:'blogDetail',
                    meta: {
                        title: '博客详情-♪(＾∀＾●)ﾉ~',
                        requiresAuth: true 
                    },
                    component: () => import('@/pages/blogDetail/blogDetail.vue') //blog子路由
                },
                {
                    path:'/myBlog',
                    name:'myBlog',
                    meta: {
                        title: '我的博客-♪(＾∀＾●)ﾉ~',
                        requiresAuth: true 
                    },
                    component: () => import('@/pages/myBlog/myBlog.vue') //我的所有博客
                },
                {
                    path:'/myFabBlog',
                    name:'myFabBlog',
                    meta: {
                        title: '我喜欢的博客-♪(＾∀＾●)ﾉ~',
                        requiresAuth: true 
                    },
                    component: () => import('@/pages/myFabBlog/myFabBlog.vue') //我的所有博客
                },
                {
                    path:'/my',
                    name:'my',
                    meta: {
                        title: '♪(＾∀＾●)ﾉ~',
                        requiresAuth: true 
                    },
                    component: () => import('@/pages/my/my.vue') //个人中心
                },
                {
                    path:'/blogCard',
                    name:'blogCard',
                    meta: {
                        title: '博客列表-♪(＾∀＾●)ﾉ~',
                        requiresAuth: true 
                    },
                    component: () => import('@/pages/blogCard/blogCard.vue') //卡片式的列表
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录'
            },
            component: () => import('@/pages/login/login.vue')  //登录页面
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                title: '注册'
            },
            component: () => import('@/pages/login/registe.vue')  //登录页面
        },
        {
            path: '/writeBlog',
            name: 'writeBlog',
            meta: { requiresAuth: true, title: '书写吧~少年' },
            component: () => import('@/pages/writeBlog/writeBlog.vue')  //写博客页面
        },
        {
            path: '/editBlog',
            name: 'editBlog',
            meta: { requiresAuth: true, title: '书写吧~少年'},
            component: () => import('@/pages/editBlog/editBlog.vue')  //写博客页面
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        store.dispatch('checkLogin').then(isLogin => {
            if (!isLogin) {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        })
    }
    else {
        next() // 确保一定要调用 next()
    }

    if(to.matched.some(record => record.meta.title)){
        console.log(to.meta.title)
        document.title = to.meta.title
    }else {
        next() // 确保一定要调用 next()
    }
})

export default router

