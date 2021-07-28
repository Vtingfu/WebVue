import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addCamera = r => require.ensure([], () => r(require('@/page/addCamera')), 'addCamera');
const addInfo = r => require.ensure([], () => r(require('@/page/addInfo')), 'addInfo');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
    {
        path: '/register',
        name: 'register',
        component: resolve => require(['@/page/register.vue'], resolve),
        meta: {
            title: '注册',
            vist_label: ['super_admin', 'admin', 'user']
        },
    },
    {
        path: '/forget/password',
        name: 'forget_password',
        component: resolve => require(['@/page/ForgetPassword.vue'], resolve),
        // component: () => import('@/views/login/ForgetPassword.vue'),
        meta: {
            title: '找回密码',
            vist_label: ['super_admin', 'admin', 'user']
        },
    },
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addCamera',

			component: addCamera,
			meta: ['添加数据', '添加商铺'],



		},{
			path: '/addInfo',
			component: addInfo,
			meta: ['添加数据', '添加商品'],
		},{
			path: '/userList',
			component: userList,
			meta: ['历史入侵', '用户列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['历史入侵', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['历史入侵', '入侵信息'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['历史入侵', '订单列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['历史入侵', '管理员列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['实时监控', '查看监控'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
            path: '/uploadImg',
            component: uploadImg,
            meta: ['文本编辑', 'MarkDown'],
        },{
            path: '/vueEdit',
            component: vueEdit,
            meta: ['编辑', '文本编辑'],
        },{
            path: '/adminSet',
            component: adminSet,
            meta: ['设置', '管理员设置'],
        },{
            path: '/sendMessage',
            component: sendMessage,
            meta: ['设置', '发送通知'],
        },{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

// routes.beforeEach((to,from,next)=>{
//     if(to.path === '/login'){
//         next()
//     }else{
//         //const state=sessionStorage.getItem('state')
//         // if(1){
//             next('/login')
//         // }else{
//         //     next()
//         // }
//     }
// })


export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})


