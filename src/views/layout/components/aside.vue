<template>
    <div>
         <el-menu
      default-active="/"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >
      <el-menu-item>
        <div class="top_image">
            <img src="./guanli.png">
            <div style="margin-left:14px;">核酸预约管理系统</div>
        </div>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="user" v-if="role === '1'">
        <i class="el-icon-office-building"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="org" v-if="role === '1'">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">检测机构管理</span>
      </el-menu-item>
      <el-menu-item index="type" v-if="role === '1'">
        <i class="el-icon-s-custom"></i>
        <span slot="title">检测类型</span>
      </el-menu-item>
        <el-menu-item index="record" v-if="role === '1'">
        <i class="el-icon-s-custom"></i>
        <span slot="title">检测记录</span>
      </el-menu-item>
      <el-menu-item index="register" v-if="role === '3'">
        <i class="el-icon-s-tools"></i>
        <span slot="title">立即预约</span>
      </el-menu-item>
      <el-menu-item index="report" v-if="role === '3'">
        <i class="el-icon-s-tools"></i>
        <span slot="title">报告查询</span>
      </el-menu-item>
       <el-menu-item index="check" v-if="role === '2'">
        <i class="el-icon-s-tools"></i>
        <span slot="title">检测列表</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>
<script>
export default {
  name: 'AppAside',
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: false,
      role: ''
    }
  },
  created () {
    this.role = JSON.parse(sessionStorage.getItem('role'))
  },
  methods: {
  }
}

</script>
<style lang="less" scoped>
.el-menu {
    height: 100%;
       border-right: none;

   span {
       font-size: 12px;
   }
}
.top_image{
  display: flex;
    background-color: #002033;
    // text-align: center;
    // margin-right: 10px !important;
    img{
      // margin-right: 10px !important;
        margin-top: 10px;
            width: 30px;
            height:30px ;
    }
}
i {
    margin-right: 10px;
    padding-left: 5px;
}
</style>
