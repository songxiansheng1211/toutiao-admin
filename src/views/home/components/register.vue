<template>
    <div class="user-container">
        <div class="btn-warp">
            <el-button type="success" @click="goToRegister">立即预约</el-button>
            <el-button type="primary" @click="goToReport">查询报告</el-button>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    goToReport () {
      this.$router.push('/report')
    }
  }
}
</script>
<style lang="less" scoped>
.user-container {
    width: 100%;
    height: 100%;
    .btn-warp {
        width: 100%;
        height: 80px;
        background-color: rgba(211,211,211,.1);
display: flex;
justify-content: center;
align-items: center;
    }
}
</style>
