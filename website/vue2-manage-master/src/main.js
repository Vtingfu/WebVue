import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SlideVerify from 'vue-monoplasty-slide-verify';
import VueParticles from 'vue-particles'
import VueAliplayerV2 from "vue-aliplayer-v2";

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import intrusionInfo from "./page/intrusionInfo";
Vue.use(Viewer)
Viewer.setDefaults({
    Options: {
        'inline': true, // 启用 inline 模式
        'button': true, // 显示右上角关闭按钮
        'navbar': true, // 显示缩略图导航
        'title': true, // 显示当前图片的标题
        'toolbar': true, // 显示工具栏
        'tooltip': true, // 显示缩放百分比
        'movable': true, // 图片是否可移动
        'zoomable': true, // 图片是否可缩放
        'rotatable': true, // 图片是否可旋转
        'scalable': true, // 图片是否可翻转
        'transition': true, // 使用 CSS3 过度
        'fullscreen': true, // 播放时是否全屏
        'keyboard': true, // 是否支持键盘
        'url': 'data-source' // 设置大图片的 url
    }
})

var axios = require('axios')
axios.defaults.baseURL = 'http://192.168.165.60:8083/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(SlideVerify);
Vue.use(VueAliplayerV2);
Vue.use(ElementUI)
Vue.use(VueParticles)

// //路由导航守卫
// router.beforeEach((to,from,next)=>{
//     if(to.path === '/'){
//         // this.$router.replace({path: '/manage'})
//         next()
//     }
//     else{
//         const state=sessionStorage.getItem('state')
//         if(!state){
//             next('/')
//         }else{
//             next()
//         }
//     }
// })

//路由导航守卫
// router.beforeEach((to,from,next)=>{
//     if(to.path === '/'){
//         // this.$router.replace({path: '/manage'})
//         next()
//     }
//     else{
//         const state=sessionStorage.getItem('state')
//         console.log(1)
//         if(1){
//             console.log(1)
//             next('/')
//         }else{
//             next()
//         }
//     }
// })

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})

