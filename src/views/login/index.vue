<template>
<div class="login_container">
  <div class="login_box">
    <div class="box_header">
        <img src="./guanli.png" class="login_img">
        <div class="login-text">核算预约管理系统</div>
    </div>
      <el-form :model="loginForm"  ref="loginFormRef" :rules="loginFormRules" size='mini' class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="agree">
              <el-checkbox v-model="loginForm.agree"><span>我已阅读并同意用户协议和隐私条款</span></el-checkbox>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" size='mini' class="login_btn" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
 </div>
</div>
</template>
<script>
import axios from 'axios'
import { login } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        agree: false
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs.loginFormRef.validate().then(() => {
        this.getLogin()
      })
    },
    getLogin () {
      login(this.loginForm).then(res => {
        if (res.data.code === 0) {
          this.$message.success('登录成功')
          // 本地存储智能存储字符串 通过 JSON 转为字符串进行存储
          sessionStorage.setItem('role', JSON.stringify(res.data.data.identity))
          sessionStorage.setItem('token', JSON.stringify(this.loginForm.username + ';' + res.data.data.userCookie))
          this.$router.push({
            name: 'home'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('登陆失败')
      })
    }
  }
}
</script>
<style lang="less" scoped>
 .login_container {
     position: fixed;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     background:  url('./login.png') no-repeat ;
     background-size: cover;
     .login_box{
         background-color: #fff;
         width: 360px;
         height: 240px;
         border-radius: 3px;
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         .login_form{
             padding: 20px 50px 40px 50px;
             .login_btn{
                 width: 100%;
             }

         }
         .box_header {
             margin-top: 10px;
             width: 100%;
             height: 28px;
            justify-content: center;
            align-items: center;
             display: flex;
             .login_img {
                 width: 40px;
                 height: 40px;
                 margin-right: 5px;
             }
             .login-text {
               font-size: 18px;
               font-weight: 700;
               color: #000;
             }
         }

     }
 }
 span {
     font-size: 12px;
 }

</style>
