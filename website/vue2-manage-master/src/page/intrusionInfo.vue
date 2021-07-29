<!--  -->
<template>
    <div class>
        <head-top></head-top>

        <e-table :tableHeadConfig="tableHeadConfig" :tableLoadData="tableLoadData">
            <template v-slot:status="slotData">
                <el-tooltip
                    :content="slotData.data.row.status | tooltipTitle"
                    :popper-class="slotData.data.row.status | tooltipClass"
                    placement="right"
                >
                    <el-switch
                        @change="handleStatusChange(slotData.data.row.status)"
                        :active-value="0"
                        :inactive-value="1"
                        active-color="#67C23A"
                        inactive-color="#909399"
                    ></el-switch>
                    v-model="slotData.data.row.status"
                </el-tooltip>
            </template>
<!--            <template v-slot:operation="slotData">-->
<!--                <el-button type="success" size="mini" @click="onSuccess">分配角色</el-button>-->
<!--                <el-button type="primary" size="mini">编辑{{slotData.data.row.level}}</el-button>-->
<!--                <el-button type="danger" size="mini">删除</el-button>-->
<!--            </template>-->
            <template v-slot:sex="slotData">
                <span>{{slotData.data.row.gender | sexFilter}}</span>
            </template>
            <template v-slot:thumbnail="slotData">
                <el-image
                    style="width: 80px; height: 40px"
                    :src="'data:image/jpeg;base64,' + slotData.data.row.intr_img || 'http://www.bocaibao.com.cn/images/1shouye_logo.png'"
                    :preview-src-list="['data:image/jpeg;base64,' + slotData.data.row.intr_img]"

                ></el-image>
            </template>
        </e-table>
    </div>
</template>

<script>
import eTable from "../components/table";
import headTop from '../components/headTop'

export default {
    name: "",
    components: {
        headTop,
        eTable
    },
    props: {},
    data() {
        return {
            array: [],
            id:1,
            intr_data:"",
            intr_img:"",
            is_admin:"",
            is_car:"",
            // 配置
            tableHeadConfig: [
                {
                    label: "ID",
                    field: "id"
                },
                {
                    label: "入侵时间",
                    field: "intr_data"
                },
                {
                    label: "入侵图像",
                    columnType: "slot",
                    slotName: "thumbnail",
                },
                {
                    label: "管理员",
                    //columnType: "slot",
                    field: "is_admin"
                },
                {
                    label: "车辆",
                    field: "is_car"
                },
                // {
                //     label: "操作",
                //     columnType: "slot",
                //     slotName: "operation",
                //     width: 260
                // }
            ],
            //数据
            tableLoadData: [
                {
                    "id":0,
                    intr_data: "a",
                    intr_img: "a",
                    is_admin: "a",
                    is_car: "a",
                },

            ]
        };
    },
    created() {},
    mounted() {
    },
    beforeCreate() {
        this.$axios
            .post('/intrInfoGet', {
                "request":"Hello!"
                // e_mail:'0',
                // face_path:'0',
                // id:0,
                // phone_num:'0',
                // right:0,
                // state:0,
                // wechat_num:'0'
            })
            .then(successResponse => {
                // console.log(this.tableLoadData);
                // for (const i in successResponse.data) {
                //     this.tableHeadConfig.push(successResponse.data[i])
                // }
                this.tableLoadData = successResponse.data;
                console.log(this.tableLoadData);

                // this.msg = successResponse.data;
                // this.id = this.msg.id
                // this.rows = this.msg.rows
                // const qwe=this.columns
                //console.log(qwe)
                // for (var i = 0; i < successResponse.data.length; i++) {
                //     this.array.push({
                //         id: qwe[i],
                //         value: qwe[i]
                //     });
                // }


            })
            .catch(failResponse => {
            })
    },
    methods: {
        onSuccess(times) {
        }
    },
    computed: {},
    filters: {
        tooltipClass(status) {
            if (status == 0) {
                return "success-tooltip";
            } else {
                return "failed-tooltip";
            }
        },
        tooltipTitle(status) {
            if (status == 0) {
                return "正常";
            } else if (status == 1) {
                return "锁定";
            } else {
                return "封停";
            }
        },
        /**
         * @param {
         *      表单性别过滤器
         * }
         */
        sexFilter(is_admin) {
            if (is_admin == 1) {
                return "yes";
            } else if (is_admin == 0) {
                return "no";
            } else {
                return "未知";
            }
        }
    }
};
</script>
<style lang="scss">
.success-tooltip {
    background: #67c23a !important;
    color: #ffffff !important;

    .popper__arrow {
        border-right-color: #67c23a !important;

        &::after {
            border-right-color: #67c23a !important;
        }
    }
}

.failed-tooltip {
    background: #909399 !important;
    color: #ffffff !important;

    .popper__arrow {
        border-right-color: #909399 !important;

        &::after {
            border-right-color: #909399 !important;
        }
    }
}
</style>
