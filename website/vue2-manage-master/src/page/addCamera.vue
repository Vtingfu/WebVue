<template>
    <div>
        <head-top></head-top>

<!--        添加图片框选-->
        <div class="content">
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2550960699,1868736188&fm=26&gp=0.jpg" />
            <canvas ref="markCanvas"></canvas>
        </div>

        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="摄像头名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="详细地址" prop="address">
						<el-autocomplete
						  v-model="formData.address"
						  :fetch-suggestions="querySearchAsync"
						  placeholder="请输入地址"
						  style="width: 100%;"
						  @select="addressSelect"
						></el-autocomplete>
						<span>当前城市：{{city.name}}</span>
					</el-form-item>
					<el-form-item label="联系电话" prop="phone">
						<el-input v-model.number="formData.phone" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="摄像头用处" prop="description">
						<el-input v-model="formData.description"></el-input>
					</el-form-item>
<!--					<el-form-item label="场景分类">-->
<!--						<el-cascader-->
<!--						  :options="categoryOptions"-->
<!--						  v-model="selectedCategory"-->
<!--						  change-on-select-->
<!--						></el-cascader>-->
<!--					</el-form-item>-->
					<el-form-item label="使用场景" style="white-space: nowrap;">
						<span>仓库</span>
						<el-switch on-text="" off-text="" v-model="formData.is_premium"></el-switch>
						<span>教室</span>
						<el-switch on-text="" off-text="" v-model="formData.delivery_mode"></el-switch>
						<span>店铺</span>
						<el-switch on-text="" off-text="" v-model="formData.new"></el-switch>
					</el-form-item>
					<el-form-item style="white-space: nowrap;">
						<span>街角</span>
						<el-switch on-text="" off-text="" v-model="formData.bao"></el-switch>
						<span>家庭</span>
						<el-switch on-text="" off-text="" v-model="formData.zhun"></el-switch>
						<span>商场</span>
						<el-switch on-text="" off-text="" v-model="formData.piao"></el-switch>
					</el-form-item>
					<el-form-item label="摄像头使用时间" style="white-space: nowrap;">
						<el-time-select
							placeholder="起始时间"
							v-model="formData.startTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}">
						</el-time-select>
						<el-time-select
							placeholder="结束时间"
							v-model="formData.endTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
						</el-time-select>
					</el-form-item>

					<el-form-item label="上传人脸">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleShopAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="上传警戒区域">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleBusinessAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="上传店铺证明">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleServiceAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.catering_service_license_image" :src="baseImgPath + formData.catering_service_license_image" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
<!--					<el-form-item label="优惠活动">-->
<!--						<el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">-->
<!--						    <el-option-->
<!--						      	v-for="item in options"-->
<!--						      	:key="item.value"-->
<!--						      	:label="item.label"-->
<!--						      	:value="item.value">-->
<!--						    </el-option>-->
<!--						</el-select>-->
<!--					</el-form-item>-->
<!--					<el-table-->
<!--					    :data="activities"-->
<!--					    style="min-width: 600px;margin-bottom: 20px;"-->
<!--						align="cneter"-->
<!--					    :row-class-name="tableRowClassName">-->
<!--					    <el-table-column-->
<!--					      prop="icon_name"-->
<!--					      label="活动标题"-->
<!--					      align="cneter"-->
<!--					      width="120">-->
<!--					    </el-table-column>-->
<!--					    <el-table-column-->
<!--					      prop="name"-->
<!--					      label="活动名称"-->
<!--					      align="cneter"-->
<!--					      width="120">-->
<!--					    </el-table-column>-->
<!--					    <el-table-column-->
<!--					      prop="description"-->
<!--					      align="cneter"-->
<!--					      label="活动详情">-->
<!--					    </el-table-column>-->
<!--					    <el-table-column-->
<!--					    	label="操作"-->
<!--					    	width="120">-->
<!--					    <template slot-scope="scope">-->
<!--					        <el-button-->
<!--					          size="small"-->
<!--					          type="danger"-->
<!--					          @click="handleDelete(scope.$index)">删除</el-button>-->
<!--					    </template>-->
<!--					    </el-table-column>-->
<!--					</el-table>-->
					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
                        <el-button class = "button"type="primary" icon="el-icon-right" @click="sendmsg()">登录</el-button>

                    </el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {draw} from "@/api/draw";
    export default {
        name: 'marks',
    	data(){
    		return {
                markList: [], // 标记内容数组
    			city: {},
    			formData: {
					name: '', //店铺名称
					address: '', //地址
					latitude: '',
					longitude: '',
					description: '', //介绍
					phone: '',
					promotion_info: '',
					float_delivery_fee: 5, //运费
					float_minimum_order_amount: 20, //起价
					is_premium: true,
					delivery_mode: true,
					new: true,
					bao: true,
					zhun: true,
					piao: true,
					startTime: '',
       	 			endTime: '',
       	 			image_path: '',
       	 			business_license_image: '',
       	 			catering_service_license_image: '',

		        },
		        rules: {
					name: [
						{ required: true, message: '请输入店铺名称', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入详细地址', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入联系电话' },
						{ type: 'number', message: '电话号码必须是数字' }
					],
				},
				options: [{
		          	value: '满减优惠',
		          	label: '满减优惠'
		        }, {
		          	value: '优惠大酬宾',
		          	label: '优惠大酬宾'
		        }, {
		          	value: '新用户立减',
		          	label: '新用户立减'
		        }, {
		          	value: '进店领券',
		          	label: '进店领券'
		        }],
       	 		activityValue: '满减优惠',
				activities: [{
		        	icon_name: '减',
		        	name: '满减优惠',
		        	description: '满30减5，满60减8',
			    }],
			    baseUrl,
			    baseImgPath,
			    categoryOptions: [],
			    selectedCategory: ['快餐便当', '简餐']
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
            this.initCanvas(); // 画布初始化
    		this.initData();
    	},
    	methods: {
    		async initData(){
    			try{
    				this.city = await cityGuess();
    				const categories = await foodCategory();
    				categories.forEach(item => {
    					if (item.sub_categories.length) {
    						const addnew = {
    							value: item.name,
						        label: item.name,
						        children: []
    						}
    						item.sub_categories.forEach((subitem, index) => {
    							if (index == 0) {
    								return
    							}
    							addnew.children.push({
    								value: subitem.name,
						        	label: subitem.name,
    							})
    						})
    						this.categoryOptions.push(addnew)

    					}
    				})
    			}catch(err){
    				console.log(err);
    			}
    		},
    		async querySearchAsync(queryString, cb) {
    			if (queryString) {
	    			try{
	    				const cityList = await searchplace(this.city.id, queryString);
	    				if (cityList instanceof Array) {
		    				cityList.map(item => {
		    					item.value = item.address;
		    					return item;
		    				})
		    				cb(cityList)
	    				}
	    			}catch(err){
	    				console.log(err)
	    			}
    			}
		    },
		    addressSelect(address){
		    	this.formData.latitude = address.latitude;
		    	this.formData.longitude = address.longitude;
		    	console.log(this.formData.latitude, this.formData.longitude)
		    },
			handleShopAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.image_path = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			handleBusinessAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.business_license_image = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			handleServiceAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.catering_service_license_image = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeAvatarUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
		    selectActivity(){
		    	this.$prompt('请输入活动详情', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		        }).then(({ value }) => {
		        	if (value == null) {
		        		this.$message({
				            type: 'info',
				            message: '请输入活动详情'
				        });
		        		return
		        	}
		          	let newObj = {};
		          	switch(this.activityValue){
		          		case '满减优惠':
		          			newObj= {
		          				icon_name: '减',
					        	name: '满减优惠',
					        	description: value,
		          			}
		          			break;
		          		case '优惠大酬宾':
		          			newObj= {
		          				icon_name: '特',
					        	name: '优惠大酬宾',
					        	description: value,
		          			}
		          			break;
		          		case '新用户立减':
		          			newObj= {
		          				icon_name: '新',
					        	name: '新用户立减',
					        	description: value,
		          			}
		          			break;
		          		case '进店领券':
		          			newObj= {
		          				icon_name: '领',
					        	name: '进店领券',
					        	description: value,
		          			}
		          			break;
		          	}
		          	this.activities.push(newObj);
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '取消输入'
		          	});
		        });
		    },
		    handleDelete(index){
		    	this.activities.splice(index, 1)
		    },
		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						Object.assign(this.formData, {activities: this.activities}, {
							category: this.selectedCategory.join('/')
						})
						try{
							let result = await addShop(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.formData = {
									name: '', //店铺名称
									address: '', //地址
									latitude: '',
									longitude: '',
									description: '', //介绍
									phone: '',
									promotion_info: '',
									float_delivery_fee: 5, //运费
									float_minimum_order_amount: 20, //起价
									is_premium: true,
									delivery_mode: true,
									new: true,
									bao: true,
									zhun: true,
									piao: true,
									startTime: '',
				       	 			endTime: '',
				       	 			image_path: '',
				       	 			business_license_image: '',
				       	 			catering_service_license_image: '',
						        };
						        this.selectedCategory = ['快餐便当', '简餐'];
						        this.activities = [{
						        	icon_name: '减',
						        	name: '满减优惠',
						        	description: '满30减5，满60减8',
							    }];
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
							console.log(result)
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}

				})
			},
            initCanvas() {
                let that = this
                this.$nextTick(() => {
                    // 初始化canvas宽高
                    let cav = this.$refs.markCanvas;
                    cav.width = '800';
                    cav.height = '600';
                    let ctx = cav.getContext('2d');
                    ctx.strokeStyle = 'blue'
                    cav.style.cursor = 'crosshair'
                    // 计算使用变量
                    let list = this.markList; // 画框数据集合, 用于服务端返回的数据显示和绘制的矩形保存
                    // 若服务端保存的为百分比则此处需计算实际座标, 直接使用实际座标可省略
                    list.forEach(function (value, index, array) {
                        let newValue = {
                            x: value.x * cav.width,
                            y: value.y * cav.height,
                            w: value.w * cav.width,
                            h: value.h * cav.height,
                        }
                        list.splice(index, 1, newValue)
                    })
                    // 若list长度不为0, 则显示已标记框
                    if (list.length !== 0) {
                        list.forEach(function (value, index, array) {
                            // 遍历绘制所有标记框
                            ctx.rect(value.x, value.y, value.w, value.h);

                            ctx.stroke();
                        });
                    }
                    draw(cav,list);
                })
            },
            sendmsg(){
    		    const loc = this.markList[0]
                console.log(loc)
                this.$axios
                    .post("http://192.168.165.77:5000/loc", {
                        x1: loc.x,
                        y1: loc.y,
                        x2: loc.x + loc.w,
                        y2: loc.y + loc.h,

                    })

                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            this.$message.success("登陆成功");
                        }
                    })
                    .catch(failResponse => {
                    })
            }
		}
    }
</script>
<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}
    .content {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateX(-50%);
        width: 800px;
        height: 600px;

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        canvas {
            position: absolute;
            top: 0;
            left: 0;
        }

        .el-table .positive-row {
            background: #e2f0e4;
        }
    }
</style>
