import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers  选项设置请求头
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTA2MDkxNTYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.2z-sIrqVd9UQJ0MeWFr4S6gqURm24F4ssR2YT14Hc34'
    }
  })
}
// getLogin () {
//     login(this.loginForm).then(res => {
//       console.log(res)
//       this.$message({
//         message: '登录成功',
//         type: 'success'
//       })
//     }).catch(err => {
//       console.log(err)
//       this.$message.error('登录失败')
//     })
//   }

// onLogin () {
//     //   const user = this.loginForm
//       this.$refs.loginFormRef.validate(valid => {
//         if (!valid) {
//           return
//         }
//         this.getLogin()
//       })
//     },
