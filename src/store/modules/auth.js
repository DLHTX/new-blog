import auth from '@/api/auth'
import { Message } from 'element-ui'
import { rejects } from 'assert';
import { resolve } from 'url';
import Cookie from 'js-cookie'
const state = {
  progress: {progress:{time:0,show:false}},
  user: null,
  isLogin: false,
 
}

const getters = {
  user: state => state.user,
  isLogin: state => state.isLogin,
  progress: state => state.progress,
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  },

  setLogin(state, payload) {
    state.isLogin = payload.isLogin
  },

  setProgress(state, payload) {
    state.progress = payload.progress
  },
}

const actions = {
    async login({commit},{ name,password }) {
        let res = await auth.login({ name, password })
        if(res.success) {
            commit('setLogin',{ isLogin: true })
            commit('setUser',{ user: res.userInfo})
            localStorage.setItem('user', JSON.stringify(res.userInfo))//把用户信息存到localStorage
            return true
        }
        else    
            commit('setLogin',{ isLogin: false })
            commit('setUser',{ user:null})
            return false
    },//登录

    async checkLogin({commit}){
        //let res = await auth.checkLogin({ name })
        if(localStorage.getItem('user')){
            commit('setLogin',{ isLogin: true })
            commit('setUser',{ user: JSON.parse(localStorage.getItem('user'))})
            return true
        }else{
            commit('setLogin',{ isLogin: false })
            commit('setUser',{ user:null})
            return false
        }
    },//检查是否登录

    logout({commit}){
        console.log('bb')
        localStorage.removeItem('user')
        commit('setLogin',{isLogin:false})
        commit('setUser',{user:null})
    },

    showProgress({commit},{status}){
        let timer 
        let linear = 0 
        if(status=='start'){
            timer = setInterval(() => {
                linear += 1;
                commit('setProgress', {progress:{time:linear,show:true}})
                if(this.getters.progress.time>=100){
                    clearInterval(timer)
                    commit('setProgress', {progress:{time:0,show:false}})
                } 
            }, 10)
            console.log(this.getters.progress)
        }else{
            clearInterval(timer)
            commit('setProgress', {progress:{time:0,show:false}})
            console.log(status)
        }
    }
  // async register({ commit }, { username, password }) {
  //   let res = await auth.register({ username, password })
  //   commit('setUser', { user: res.data })
  //   commit('setLogin', { isLogin: true })
  //   return res.data
  // },

  // async logout({ commit }) {
  //   await auth.logout()
  //   commit('setUser', { user: null })
  //   commit('setLogin', { isLogin: false })
  // },

  // async checkLogin({ commit, state}) {
  //   if(state.isLogin) return true
  //   let res = await auth.getInfo()
  //   commit('setLogin', { isLogin: res.isLogin })
  //   if(!res.isLogin) return false
  //   commit('setUser', { user: res.data })
  //   return true
  // }

  /*
    this.logout().then(isLogin=>{
    })
  */
}

export default {
  state,
  getters,
  mutations,
  actions
}