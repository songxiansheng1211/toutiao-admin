<template>
<div class="login_container">
  <div class="login_box">
    <div class="box_header">
        <img src="./guanli.png" class="login_img">
        <div class="login-text">核酸预约管理系统</div>
    </div>
      <el-form :model="loginForm"  ref="loginFormRef" :rules="loginFormRules" size='mini' class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
         <el-form-item prop="identity">
           <el-select v-model="loginForm.identity" placeholder="请选择登录身份" style="width:260px;">
             <!-- <el-option label="系统管理员" value="1"></el-option>
             <el-option label="医院机构" value="2"></el-option> -->
             <el-option label="用户" value="3"></el-option>
           </el-select>
        </el-form-item>
        <!-- <el-form-item prop="agree">
              <el-checkbox v-model="loginForm.agree"><span>我已阅读并同意用户协议和隐私条款</span></el-checkbox>
        </el-form-item> -->
        <el-form-item>
          <!-- <div class="login_btn"> -->
            <!-- <el-button type="primary" size='mini'  @click="onLogin">登录</el-button> -->
            <el-button type="primary" size='mini' class="login_btn" @click="register">注册</el-button>
          <!-- </div> -->
        </el-form-item>
      </el-form>
 </div>
</div>
</template>
<script>
// import axios from 'axios'
import { addUserData } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        // agree: false,
        identity: '3'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        identity: [
          { required: true, message: '请选择登录身份', trigger: 'change' }
        ]
        // agree: [
        //   {
        //     validator: (rule, value, callback) => {
        //       if (value) {
        //         callback()
        //       } else {
        //         callback(new Error('请勾选同意用户协议'))
        //       }
        //     },
        //     trigger: 'blur'
        //   }
        // ]
        // if (res.code === 1 || res.msg === '用户名已存在') {
        //     this.$message.error('注册失败，请检查用户名是否存在')
        //   }
        // this.$message.success('添加用户成功')
        //   this.$router.push({
        //     path: '/login'
        //   })
        // })
      }
    }
  },
  methods: {
    register () {
      this.$refs.loginFormRef.validate().then(() => {
        addUserData(this.loginForm).then((res) => {
          if (res.data.code === 1 && res.data.msg === '用户名已存在') {
            return this.$message.error('注册失败，请检查用户名是否存在')
          }
          this.$message.success('添加用户成功')
          this.$router.push({
            path: '/login'
          })
        })
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
     background:  url('./aa.jpeg') no-repeat ;
     background-size: cover;
     .login_box{
         background-color: #fff;
         width: 360px;
         height: 290px;
         border-radius: 3px;
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         .login_form{
             padding: 20px 50px 40px 50px;
             .login_btn{
                 width: 100%;
                // text-align: center;
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
                 width: 30px;
                 height: 30px;
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
