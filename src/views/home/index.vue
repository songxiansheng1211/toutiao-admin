<template>
 <div class="home_container">
   <div class="user-container" v-if="role ==='3'">
     <!-- 检测人次统计
     今日检测统计
     用户统计
     阳性人次统计 -->
     <Register class="register"></Register>
   </div>
   <div v-if="role === '2'" class="hospital-container">
     <Hospital></Hospital>
   </div>
   <div v-if="role === '1'">
     <Statistical></Statistical>
   </div>
</div>
</template>
<script>
import Statistical from '../home/components/statistical.vue'
import Register from '../home/components/register.vue'
import Hospital from '../home/components/hospital.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      role: ''
    }
  },
  components: {
    Statistical,
    Register,
    Hospital
  },
  created () {
    this.role = JSON.parse(sessionStorage.getItem('role'))
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.home_container {
  width: 100%;
  height: 100%;
  .user-container {
    width: 100%;
    height: 100%;
    background: no-repeat url('../home/components/11.png');
    background-size:100% 100%;
    .register {
      width: 100%;
      height: 100%;
    }
}
.hospital-container {
    width: 100%;
    height: 100%;
    background: no-repeat url('../home/components/br.png');
    background-size:100% 100%;
    .register {
      width: 100%;
      height: 100%;
    }
}
}
</style>
