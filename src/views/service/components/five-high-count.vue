<template>
  <div class="five-high">
      <BaseEChart :option="optionData"/>
  </div>
</template>
<script>
import BaseEChart from './BaseEChart'
import { getBarOption } from './baroption'
export default {
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
  components: {
    BaseEChart
  },
  created () {
    setTimeout(() => {
      this.optionData =
      getBarOption(
        this.optData.title,
        this.optData.manData,
        this.optData.womanData)
    }, 10)
  }
}
</script>
<style lang="less" scoped>
.pieBasic {
    width: 100%;
    height: 100%;
}
</style>
