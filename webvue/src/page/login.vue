<template>
    <div id="login">
        <div id="form_space">
            <div align="center">
                <h1>{{login_title}}</h1>
                <p>{{login_adress}}</p>
            </div>
            <div style="padding:20px">
                <el-form ref="form" :model="login_form">
                    <el-form-item>
                        <el-input v-model="login_form.user_name" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="login_form.user_password" prefix-icon="el-icon-lock" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="remember_password">记住密码</el-checkbox>
                    </el-form-item>
                    <el-form-item >
                        <el-button class = "button"type="primary" icon="el-icon-right" @click="login()">登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-link type="danger" style="float:left" @click="to('/register')">注册</el-link>
                        <el-link type="primary" style="float:right" @click="to('/forget/password')">找回密码？</el-link>
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
            login_title: "天眼监控系统",
            login_adress: "你身边的好保安，你值得拥有",
            login_form: {
                user_name: '',
                user_password: '',
            },
            responseResult: [],
            remember_password: false,
        };
    },
    methods: {
        login () {
        /*    this.$axios
                .post('/login', {
                    username: this.login_form.user_name,
                    password: this.login_form.user_password
                })

                .then(successResponse => {
                    if (successResponse.data.code === 200) {
                        this.$router.replace({path: '/manage'})
                    }
                })
                .catch(failResponse => {
                })*/
            this.$router.replace({path: '/manage'})

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
    color: #606266;
}
p {
    color: #606266;
}
#login {

    min-height: 100vh;
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
</style>
