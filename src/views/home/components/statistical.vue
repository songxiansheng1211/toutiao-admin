<template>
    <div>
    <el-card class="box-card">
        <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
</el-breadcrumb>
      <div class="statistical-container">
          <div class="statistical-item">
              <div class="item-left">
                <img src="./danger-number.png" alt="">
              </div>
              <div class="item-right">
                  <div>检测人次统计</div>
                  <div class="text-size">{{statisticalForm.testSum}}</div>
                  <div>当前检测人数记录数</div>
              </div>
          </div>
          <div class="statistical-item">
              <div class="item-left">
                <img src="./danger-number.png" alt="">
              </div>
              <div class="item-right">
                  <div>今日检测人次统计</div>
                  <div class="text-size">{{statisticalForm.todaySum}}</div>
                  <div>今日检测人数记录数</div>
              </div>
          </div>
          <div class="statistical-item">
              <div class="item-left">
                <img src="./danger-number.png" alt="">
              </div>
              <div class="item-right">
                  <div>用户统计</div>
                  <div class="text-size">{{statisticalForm.userSum}}</div>
                  <div>当前用户记录数</div>
              </div>
          </div>
          <div class="statistical-item">
              <div class="item-left">
                <img src="./danger-number.png" alt="">
              </div>
              <div class="item-right">
                  <div>阳性人次统计</div>
                  <div class="text-size">{{statisticalForm.yangSum}}</div>
                  <div>当前阳性人次记录数</div>
              </div>
          </div>
      </div>
      <div class="echarts-box">
    <div ref="main" class="echarts"></div>
      </div>
    </el-card>
    </div>
</template>
<script>
import { statisticalData } from '@/api/user.js'
import * as echarts from 'echarts'
import { getWeekDay } from './moment'
export default {
  data () {
    return {
      statisticalForm: {},
      dateArr: [],
      week: [],
      date: []
    }
  },
  created () {
    this.getDay()
  },
  mounted () {
    statisticalData().then(res => {
      this.statisticalForm = res.data.data
    }).then(() => {
      const myChart = echarts.init(this.$refs.main)
      const option = {
        title: {
          text: '检测人数统计图表'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.8)',
          textStyle: {
            color: '#fff'
          },
          formatter: '{a}:{c}'
        },
        //   legend: {
        //     // 设置图例的位置
        //     x: 'right',
        //     y: 'top',
        //     padding: [10, 0, 0, 0],
        //     // 设置图例的形状
        //     icon: 'circle',
        //     // 设置图例的大小
        //     itemWidth: 5,
        //     itemHeight: 5,
        //     // 设置两图例之间的间距
        //     itemGap: 10,
        //     data: ['高危人数', '中危人数']
        //   },
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
          data: this.week
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '当日人数',
            type: 'line',
            data: this.statisticalForm.sumList
          },
          {
            name: '阳性人数',
            type: 'line',
            data: this.statisticalForm.yangList
          }
        ]
      }
      option && myChart.setOption(option)
    })
  },
  methods: {
    async getDay () {
      this.dateArr = getWeekDay()
      console.log(this.dateArr)
      this.dateArr.forEach(item => {
        this.week.push(item.week)
        this.date.push(item.date)
      })
    },
    getDate () {
    }
  }
}
</script>
<style lang="less" scoped>
  .statistical-container {
     height: 120px;
     display: flex;
     justify-content: space-between;
     .statistical-item {
        background-color: #f8f8f8;
        height: 100%;
        width:  280px;
        display: flex;
        align-items: center;
        .item-left {
            margin-left: 10px;
            width: 60px;
            height: 60px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .item-right {
            margin-left: 5px;
            .text-size {
                font-size: 24px;
                font-weight: 500;
            }
        }
     }
  }
  .echarts-box {
      margin-top: 80px;
    .echarts {
          width: 1000px;
      height: 500px;
    }
  }
</style>
