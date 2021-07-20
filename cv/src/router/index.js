import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/TheLogin'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/Home',
      name: 'Home',
      component: Home
    }
  ]
})
