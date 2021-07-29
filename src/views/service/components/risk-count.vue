<template>
  <div class="risk-count-container">
      <BaseEChart :option="optionData"/>
  </div>
</template>
<script>
import { getRiskOption } from './riskoption'
import BaseEChart from './BaseEChart'
export default {
  data () {
    return {
      optionData: {}
    }
  },
  components: {
    BaseEChart
  },
  props: {
    optData: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    setTimeout(() => {
      this.optionData = getRiskOption(this.optData.title, this.optData.data)
    }, 10)
  }
}
</script>
<style lang="less" scoped>
</style>
