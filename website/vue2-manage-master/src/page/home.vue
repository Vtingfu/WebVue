<template>
    <div>
        <head-top></head-top>
		<section class="data_section">

			<header class="section_title">数据统计</header>
            <!-- 将网页划分成若干行，然后每行等分为若干列-->
            <!-- 每行使用<el-row>标签标识，然后每行内的列使用<el-col>标识-->
            <!-- 使用:span属性对每列整行的宽度比例进行设置-->
            <!-- 使用el-row的:gutter属性对不同分栏直接设定一定的间隔，初始默认为0-->
            <!-- 使用offset属性实现分栏偏移，:span表示占据的宽度（总长为24），offset表示偏移量 -->
            <!-- margin-bottom表示指定下外边距-->
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增入侵事件</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增入侵人员</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 总管理员</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 入侵事件</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 总入侵人员</div></el-col>
            </el-row>

		</section>
		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay'>
        </tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency'
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
    			userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
        /*mounted:在html加载完成后执行。执行顺序：子组件-父组件
        * created:html加载完成前执行。执行顺序：父组件-子组件
        * methods:事件方法执行
        * watch:监听一个值的变化，然后执行相应的函数
        * computed:计算属性，依赖其他的属性计算所得出最后的值*/
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
    			const today = dtime().format('YYYY-MM-DD')
    			Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
    			.then(res => {
    				this.userCount = res[0].count;
    				this.orderCount = res[1].count;
                    this.adminCount = res[2].count;
                    this.allUserCount = res[3].count;
                    this.allOrderCount = res[4].count;
                    this.allAdminCount = res[5].count;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
    			const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
    				apiArr[0].push(userCount(item))
    				apiArr[1].push(orderCount(item))
                    apiArr[2].push(adminDayCount(item))
    			})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[]];
					res.forEach((item, index) => {
						if (item.status == 1) {
							resArr[Math.floor(index/7)].push(item.count)
						}
					})
					this.sevenDate = resArr;
    			}).catch(err => {
    				console.log(err)
    			})
    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
