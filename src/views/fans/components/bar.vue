<template>
  <div class="bar_containner">
    <!-- 制定容器 -->
    <div ref="main" class="echarts-box"></div>
  </div>
</template>
<script>
// 引入 echarts
import * as echarts from 'echarts'
export default {
  data () {
    return {}
  },
  mounted () {
    // 初始化
    var myChart = echarts.init(this.$refs.main)
    var option = {
      // 设置颜色
      color: ['rgb(11,185,118)', 'rgb(255,145,2)'],
      title: {
        text: '健康情况'
      },
      tooltip: {
        // 设置鼠标经过图标内容时 背景色
        backgroundColor: 'rgba(0,0,0,0.8)',
        trigger: 'axis',
        textStyle: {
          color: '#fff'
        }
        // formatter: function (params) {
        //   console.log('ssssssss', params)
        // }
      },
      legend: {
        // 设置图例的位置
        x: 'right',
        y: 'top',
        padding: [10, 100, 0, 0],
        // 设置图例的形状
        icon: 'circle',
        // 设置图例的大小
        itemWidth: 5,
        itemHeight: 5,
        // 设置两图例之间的间距
        itemGap: 100,
        data: ['男', '女']
      },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          // 设置y轴上的间距
          axisLabel: {
            interval: 0
            // 不显示坐标轴样式
          },
          // 不显示x轴坐标样式
          axisLine: {
            show: false
          },
          // 不显示刻度
          axisTick: {
            show: false
          },
          data: [
            '血糖异常',
            '血压超高',
            '血压超高',
            '血压超高',
            '血压超高',
            '血压超高',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '男',
          type: 'bar',
          data: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3
          ]
        },
        {
          name: '女',
          type: 'bar',
          // 设置两个柱状图之间的距离
          barGap: 0,
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3
          ]
        }
      ]
    }
    option && myChart.setOption(option)
    window.addEventListener('resize', function () {
      myChart.resize()
    })
  }
}
</script>
<style lang="less" scoped>
.echarts-box {
  width: 800px;
  height: 400px;
}
</style>
