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
            children:[
                {   
                    path:'',
                    meta: { requiresAuth: true },
                    name:'blogList',
                    component: () => import('@/pages/blogList/blogList.vue') //blog子路由
                },
                {
                    path:'/blogDetail',
                    meta: { requiresAuth: true },
                    name:'blogDetail',
                    component: () => import('@/pages/blogDetail/blogDetail.vue') //blog子路由
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login/login.vue')  //登录页面
        },
        {
            path: '/writeBlog',
            name: 'writeBlog',
            meta: { requiresAuth: true },
            component: () => import('@/pages/writeBlog/writeBlog.vue')  //写博客页面
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log('aa')
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
    } else {
        next() // 确保一定要调用 next()
    }
})

export default router

