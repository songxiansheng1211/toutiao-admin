<template>
  <div ref="chart" class="base-chart"/>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BaseEChart',
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option: {
      immediate: true,
      deep: true,
      handler (newOption) {
        if (!this.chart) {
          this.$nextTick(() => {
            this.chart.setOption(newOption)
          })
        } else {
          this.chart.setOption(newOption)
        }
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  methods: {
    onWindowResize () {
      this.chart.resize()
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    window.addEventListener('resize', this.onWindowResize)
  },
  unMounted () {
    window.removeEventListener('resize', this.onWindowResize)
  }
}
</script>

<style lang="less" scoped>
.base-chart{
    width: 100%;
    height: 100%;
}
</style>
