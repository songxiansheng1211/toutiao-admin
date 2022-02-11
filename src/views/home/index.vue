<template>
 <div class="home_container">
   <div>
     <!-- 检测人次统计
     今日检测统计
     用户统计
     阳性人次统计 -->
     <Statistical></Statistical>
   </div>
</div>
</template>
<script>
import Statistical from '../home/components/statistical.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
    }
  },
  components: {
    Statistical
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
</style>
