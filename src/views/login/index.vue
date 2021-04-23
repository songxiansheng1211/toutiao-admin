<template>
<div class="login_container">
  <div class="login_box">
    <div class="box_header">
        <img src="./logo_index.png" class="login_img">
    </div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" size='mini' class="login_form">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
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
import { login } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 10, message: '请输入正确验证码', trigger: 'blur' }
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
    //   const user = this.loginForm
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return
        }
        this.getLogin()
      })
    },
    getLogin () {
      login(this.loginForm).then(res => {
        console.log(res)
        this.$message.success('登录成功')
        this.$router.push({
          name: 'home'
        })
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
     background:  url('./back.jpg') no-repeat ;
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
             text-align: center;
             .login_img {
                 width: 140px;
                 height: 100%;
             }
         }

     }
 }
 span {
     font-size: 12px;
 }

</style>
