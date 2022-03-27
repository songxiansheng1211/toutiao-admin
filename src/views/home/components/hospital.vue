<template>
    <div class="container-warp">
        <div class="user-warp">Hello,{{orgItem}}</div>
        <div class="system-warp">欢迎使用核酸预约管理系统！</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      orgItem: ''
    }
  },
  created () {
    this.orgItem = JSON.parse(sessionStorage.getItem('username'))
  }
}
</script>
<style lang="less" scoped>
.container-warp {
    margin-left: 60px;
    padding-top: 220px;
    // text-align: center;
}
.user-warp {
    font-size: 32px;
    color: #0064cc;
    font-weight: 700;
}
.system-warp {
     font-size: 32px;
    color: #0064cc;
    font-weight: 700;
}
</style>
