<template>
    <div class="header_container">
        <!--Breadcrimb面包屑显示当前页面的路径，快速返回之前的任意界面-->
        <!--在el-breadcrimb中使用el-breadcrumb-item标签表示从首页开始的每一级-->
        <!--el-breadcrumb 的separator属性可以决定分隔符，只能是字符串，默认为“/”-->
        <!--通过设置el-breadcrumb 的separator-class可使用相应的iconfont作为分隔符，同时这将使separator设置失效-->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
        <!--el-dropdown将动作或菜单折叠到下拉菜单中 -->
        <!--通过组件slot来设置下拉触发的元素以及需要通过具名slot为dropdown来设置下拉菜单-->
        <!--默认情况下，下拉按钮只需要hover即可，无需点击也会显示下拉菜单 -->
		<el-dropdown @command="handleCommand" menu-align='start'>
			<img :src="baseImgPath + adminInfo.avatar" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
    		return {
    			baseImgPath,
    		}
    	},
    	created(){
    		if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
        /*this.$router.push()可以通过修改url实现路由跳转
        *push后面可以是字符串也可以是对象*/
		methods: {
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'signout'){
					const res = await signout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
