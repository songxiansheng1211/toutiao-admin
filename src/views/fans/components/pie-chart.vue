<template>
    <div class="pieChart_containner">
    <div ref="main" class="echarts-box"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {}
  },
  mounted () {
    const myChart = echarts.init(this.$refs.main)
    const option = {
      tooltip: {
        show: false,
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          hoverAnimation: false,
          silent: true,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: function () {
                return '总人数\r\n200'
              },
              textStyle: {
                fontSize: 40,
                color: 'yellow'
              }
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' }
          ]
        }
      ]
    }
    option && myChart.setOption(option)
  }
}
</script>
<style lang="less" scoped>
.echarts-box {
    width: 400px;
    height: 400px;
}
</style>
