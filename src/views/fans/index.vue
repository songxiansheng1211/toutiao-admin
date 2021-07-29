<template>
    <div class="fans_container">
     <el-card>
        <!-- 面包屑导航 -->
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="table">
          <el-tabs type="card">
            <el-tab-pane label="粉丝列表">
              <div class="table_list">
                <el-row>
                  <el-col :span="3" v-for="item in fansDataList" :key="item.id">
                    <div class="fans_list">
                  <el-image
                  class="fans_img"
                    :src="item.photo">
                 </el-image>
                  <span class="fans_name">{{item.name}}</span>
                  <div class="fans_btn">
                  <el-button type="primary" plain size="mini" v-if="!attention" @click="changeAttention">+关注</el-button>
                  <el-button type="primary" plain size="mini" v-else @click="changeAttention">已关注</el-button>
                  </div>
                  </div>
                  </el-col>
                </el-row>
                <pie-chart></pie-chart>
              </div>
            </el-tab-pane>
            <el-tab-pane label="粉丝画像">
              <el-card>
               <div ref="main" style="width: 750px;height:400px;"></div>
               <mapDeom></mapDeom>
               <mapBai></mapBai>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="地图测试">
              <el-card>
                <div class="map-test">
               <bmapDeom></bmapDeom>
               <bar></bar>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="fansList.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="fansList.pe_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
     </el-card>
    </div>
</template>
<script>
import bmapDeom from './components/bmap-demo'
import mapDeom from './components/index'
import mapBai from './components/map'
import bar from './components/bar'
import pieChart from './components/pie-chart.vue'
import * as echarts from 'echarts'
import { getFansData } from '@/api/fans'
export default {
  name: 'fansIndex',
  data () {
    return {
      fansList: {
        page: 1,
        pe_page: 10
      },
      fansDataList: [],
      attention: false,
      total: 0
    }
  },
  components: {
    mapDeom,
    mapBai,
    bmapDeom,
    bar,
    pieChart
  },
  methods: {
    getFansList () {
      getFansData(this.fansList).then(res => {
        console.log(res)
        this.fansDataList = res.data.data.results
        this.total = res.data.data.total_count
      })
    },
    changeAttention () {
      this.attention = !this.attention
    },
    handleCurrentChange (val) {
      this.fansList.page = val
      this.getFansList()
    },
    handleSizeChange (val) {
      this.fansList.pe_page = val
      this.getFansList({ page: 1 })
    }
  },
  created () {
    this.getFansList()
  },
  mounted () {
    var myChart = echarts.init(this.$refs.main)

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>
<style lang="less" scoped>
.fans_list {
  // position: absolute;
  width: 100px;
  height: 165px;
  border: 1px solid #eee;
  display: inline-block;
}
.fans_img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-left: 10px;
  margin-top: 10px;
}
.fans_name {

  margin-left: 35px;
margin-top: 10px;
  display: block;
}
.fans_btn {
  margin-top: 10px;
  text-align: center;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
// .map-test {
//   display: flex;
// }
</style>
