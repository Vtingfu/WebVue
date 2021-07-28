import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SlideVerify from 'vue-monoplasty-slide-verify';
import VueParticles from 'vue-particles'
import VueAliplayerV2 from "vue-aliplayer-v2";

var axios = require('axios')
axios.defaults.baseURL = 'http://192.168.2.60:8083/api'
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
