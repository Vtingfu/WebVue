<template>
    <div id="login" >

        <vue-particles
            class="login-bg"
            color="#fcfcfc"
            :particleOpacity="0.7"
            :particlesNumber="100"
            shapeType="circle"
            :particleSize="4"
            linesColor="#8DD1FE"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        >
        </vue-particles>

        <div id="form_space">

            <div class="iconPic" align="center">
                <img :src="imgSrc" width="30%" height="30%" alt="" />
            </div>
            <div align="center">
                <h1>{{login_title }}</h1>
                <p>{{login_adress}}</p>
            </div>

            <div style="padding:20px">
                <el-form ref="form" :model="login_form" >
                    <el-form-item>
                        <el-input v-model="login_form.user_name" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="login_form.user_password" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
                    </el-form-item>

                    <el-form-item >
                        <div class="pop" v-if="showModal" >
                            <!--滑块验证-->
                            <slide-verify ref="slideblock" @success="onSuccess" @again="onAgain" @fulfilled="onFulfilled" @fail="onFail" @refresh="onRefresh" :slider-text="text" :imgs="imgs" :accuracy="accuracy"></slide-verify>
                            <div>{{msg}}</div>
                        </div>
                        <el-button class = "button"type="primary" icon="el-icon-right" @click="login();showModal=true">登录</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-checkbox v-model="remember_password">记住密码</el-checkbox>
                    </el-form-item>

                    <el-form-item>
                        <el-link type="danger" style="float:left" @click="to('/register')">注册</el-link>
                        <el-link type="primary" style="float:right" @click="to('/forget/password')">找回密码</el-link>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgSrc:require('../assets/img/guard.gif'),
            showModal: false,
            login_title: "天眼监控系统",
            login_adress: "你身边的好保安，你值得拥有",
            msg: '',
            text: '向右滑动->',
            accuracy: 1, // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
            login_form: {
                user_name: '',
                user_password: '',
            },
            responseResult: [],
            remember_password: true,
        };
    },
    methods: {
        onSuccess(times){
            console.log('验证通过');
            this.msg = `验证成功！ 耗时${(times / 1000).toFixed(1)}s`;
            this.$axios
                .post('/login', {
                    username: this.login_form.user_name,
                    password: this.login_form.user_password,
                    // e_mail:'0',
                    // face_path:'0',
                    // id:0,
                    // phone_num:'0',
                    // right:0,
                    // state:0,
                    // wechat_num:'0'
                })

                .then(successResponse => {
                    if (successResponse.data.code === 200) {
                        this.$router.replace({path: '/manage'})
                    }
                })
                .catch(failResponse => {
                })

            //本地存储state用户登录状态
            // sessionStorage.setItem('state',state)
            // setTimeout(()=>{this.$router.replace({path: '/manage'})},450);

        },
        onFail(){
            console.log('验证不通过');
            this.msg = '验证不通过'
        },
        onRefresh(){
            console.log('点击了刷新小图标');
            this.msg = ''
        },
        onFulfilled() {
            console.log('刷新成功啦！');
        },
        onAgain() {
            console.log('检测到非人为操作的哦！');
            this.msg = '请再次尝试';
            // 刷新
            this.handleClick();
        },
        login () {

            // this.$axios
            //     .post('/login', {
            //         username: this.login_form.user_name,
            //         password: this.login_form.user_password,
            //         // e_mail:'0',
            //         // face_path:'0',
            //         // id:0,
            //         // phone_num:'0',
            //         // right:0,
            //         // state:0,
            //         // wechat_num:'0'
            //     })
            //
            //     .then(successResponse => {
            //         if (successResponse.data.code === 200) {
            //             this.$router.replace({path: '/manage'})
            //         }
            //     })
            //     .catch(failResponse => {
            //     })
            // this.$router.replace({path: '/manage'})

        },
        to(link){
            this.$router.push(link)
        }
    },
    mounted() {
        if (this.$cookies.get("setting") == null) {
            this.setting_web();
        }
    },
};
</script>
<style scoped>
h1 {
    color: rgba(255, 255, 255, 0.91);
}
p {
    color: #ffffff;
}

#login {

    min-height: 100vh;
    background: #0a0a0a;
}
.button{
    width:100%;
    margin-bottom:1px;
}
#form_space {
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 400px;
    width: 400px;
}
.login-bg{
    background: url("../assets/img/123.jpg");
}
.mask {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1
}
.pop {
    background-color: #fff;

    position: fixed;
    top: 330px;
    left: 1100px;
    width:5%;
    height:1%;
    z-index: 2
}
.button{

}

</style>
