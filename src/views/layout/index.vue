<template>
 <div>
<el-container class="container">
  <el-aside width="auto">
      <app-aside class="aside_menu" :is-collapse="isCollapse" />
  </el-aside>
  <el-container>
    <el-header>
        <div>
          <i
          :class="{
          'el-icon-s-fold':isCollapse,
          'el-icon-s-unfold':!isCollapse
          }" @click="toggleCollapse"></i>
          <span style="margin-left:5px;">{{userName}}，欢迎您！</span>
        </div>
        <el-dropdown>
          <div class="avator_warp">
              <img :src="user.photo" class="user_img">
              <span class="font_size">{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown" >
            <!-- <el-dropdown-item @click.native="personel">设置</el-dropdown-item> -->
            <!-- 组件默认不认识别原生事件 除非内部做了处理 要想实现后面加上native -->
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <i class="el-icon-s-unfold"></i> -->
    </el-header>
    <el-main>
         <router-view />
    </el-main>
  </el-container>
</el-container>
    </div>
</template>
<script>
import AppAside from './components/aside'
// import { getUserInfo } from '@/api/user'
// import globalBus from '@/utils/global-bus.js'
export default {
  name: 'layoutIndex',
  data () {
    return {
      user: {},
      isCollapse: false,
      userName: ''
    }
  },
  components: {
    AppAside
  },
  created () {
    // globalBus.$on('global-img', data => {
    //   this.user.photo = data.photo
    // })
    // globalBus.$on('global-user', data => {
    //   this.user.name = data.name
    // })
    // this.loadUser()
    this.userName = JSON.parse(sessionStorage.getItem('username'))
  },
  mounted () {

  },
  methods: {
    // loadUser () {
    //   getUserInfo().then(res => {
    //     this.user = res.data.data
    //   })
    // },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logOut () {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        this.$router.push('/login')
        this.$message.success('退出成功')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
    // 设置
    // personel () {
    //   this.$router.push('/settings')
    // }
  }
}
</script>
<style lang="less" scoped>
.container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .el-aside{
    background-color: #d3dce6;
    overflow: hidden;
    .aside_menu {
    height: 100%;
}
}
.el-header{
        display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    .avator_warp{
        display: flex;
        align-items: center;
        .user_img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 5px;
    }
    .font_size{
        font-size: 12px;
    }
    }
}
.el-main{
    background-color: #eee;
}
}
</style>
