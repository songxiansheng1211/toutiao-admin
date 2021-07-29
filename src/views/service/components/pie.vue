<template>
  <div class="pie-container">
      <BaseEChart :option="optionData"/>
  </div>
</template>
<script>
import { getPieOption } from './options'
import BaseEChart from './BaseEChart'
export default {
  name: 'pie',
  components: {
    BaseEChart
  },
  data () {
    return {
      optionData: {}
    }
  },
  props: {
    optData: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    setTimeout(() => {
      this.optionData = getPieOption(this.optData.title, this.optData.data)
    }, 10)
  }
}
</script>
<style lang="less" scoped>
</style>
