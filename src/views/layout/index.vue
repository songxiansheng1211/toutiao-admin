<template>
 <div>
<el-container class="container">
  <el-aside width="200px" >
      <app-aside class="aside_menu" />
  </el-aside>
  <el-container>
    <el-header>
        <div>
          <i class="el-icon-s-fold"></i>
          <span>泰山信息科技有限公司</span>
        </div>
        <el-dropdown>
          <div class="avator_warp">
              <img :src="user.photo" class="user_img">
              <span class="font_size">{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
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
import { getUserInfo } from '@/api/user'
export default {
  name: 'layoutIndex',
  data () {
    return {
      user: {}
    }
  },
  components: {
    AppAside
  },
  created () {
    this.loadUser()
  },
  methods: {
    loadUser () {
      getUserInfo().then(res => {
        this.user = res.data.data
      })
    }
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
    background-color: pink;
}
}

// }

</style>
