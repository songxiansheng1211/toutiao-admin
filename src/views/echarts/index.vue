<template>
  <div class="echarts_container">
    <el-card>
    <div ref="main" class="echarts-box"></div>
    </el-card>
  </div>
</template>
<script>
import data from './data'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      preData: data
    }
  },
  created () {
    console.log(this.preData)
  },
  mounted () {
    const myChart = echarts.init(this.$refs.main)
    const option = {
      title: {
        text: '危急值监控·趋势图'
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.8)',
        textStyle: {
          color: '#fff'
        },
        formatter: '{a}:{c}'
      },
      legend: {
        // 设置图例的位置
        x: 'right',
        y: 'top',
        padding: [10, 0, 0, 0],
        // 设置图例的形状
        icon: 'circle',
        // 设置图例的大小
        itemWidth: 5,
        itemHeight: 5,
        // 设置两图例之间的间距
        itemGap: 10,
        data: ['高危人数', '中危人数', '低危人数', '正常人数']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // 不显示x轴坐标样式
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '高危人数',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '中危人数',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '低危人数',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '正常人数',
          type: 'line',
          data: [320, 332, 301, 334, 390, 330, 320]
        }
      ]
    }
    option && myChart.setOption(option)
  }
}
</script>
<style lang="less" scoped>
.echarts-box {
  width: 800px;
  height: 500px;
}
</style>
