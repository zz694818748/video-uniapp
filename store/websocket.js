import Vue from 'vue'
import Vuex from 'vuex'
import unisocket from '@/store/unisocket.js'
//挂载vuex
Vue.use(Vuex)

//创建vuex对象
export default new Vuex.Store({

    state: {
        socket: null,
        orderWebSocketMsg: '', //存放的键值对就是所要管理的状态(全局可以访问的state对象)
        userlist: null,
        noRedisMsg:{
            user:{},
            group:{}
        },
        roominfo: null,
        userinfo:null
    },
    getters: {
        // 获取接收的信息
        socketMsgs: state => {
            return state.orderWebSocketMsg
        }
    },
    mutations: {
        WEBSOCKET_INIT(state, url) {
            var socket = unisocket.initWebSocket(function(res){
                state.orderWebSocketMsg = res.data
                
            })
            state.socket = socket
        },
    },
    actions: {
        WEBSOCKET_INIT({
            commit
        }, url) {
            commit('WEBSOCKET_INIT', url)
        },
        WEBSOCKET_SEND({
            commit
        }, p) {
            commit('WEBSOCKET_SEND', p)
        }
    }
})
