<template>
  <div class="home-container">
    <!-- 最上面查询 -->
    <div class="queryForm-warp">
      <div class="workArea">
        <span class="work-area-text">工作区：</span>
        <el-select v-model="queryForm.workArea" placeholder="请选择工作区" size="mini">
            <el-option label="北京宝石花" value="shanghai"></el-option>
            <el-option label="泰山医疗" value="beijing"></el-option>
          </el-select>
      </div>
      <div class="queryForm-search">
        <span class="margin-right8">
          <el-button-group>
            <el-button type="primary" size="mini">本周</el-button>
            <el-button type="primary" size="mini">本月</el-button>
            <el-button type="primary" size="mini">本年</el-button>
          </el-button-group>
        </span>
        <span class="margin-right22">
          <el-date-picker
            v-model="queryForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini">
          </el-date-picker>
        </span>
        <span class="margin-right16">
          <el-button type="primary" size="mini">大屏</el-button>
        </span>
      </div>
    </div>
    <!-- 中间5个小盒子 -->
    <div class="management_people">
      <div class="management_box">
        <PeopleCount :num="count"></PeopleCount>
      </div>
      <div class="management_box">
        <PeopleCount :num="mount"></PeopleCount>
      </div>
      <div class="management_box">
        <PeopleCount :num="mount"></PeopleCount>
      </div>
      <div class="management_box">
        <PeopleCount :num="mount"></PeopleCount>
      </div>
      <div class="management_box">
        <PeopleCount :num="mount"></PeopleCount>
      </div>
    </div>
    <!-- 三个中盒子 -->
    <div class="compliance_warp">
      <div class="compliance">
        <Pie class="pie-width-height" :optData="measurement"></Pie>
      </div>
      <div class="compliance">
        <Pie class="pie-width-height" :optData="risk"></Pie>
      </div>
      <div class="compliance">
        <Pie class="pie-width-height" :optData="questionnaire"></Pie>
      </div>
    </div>
    <!-- 两个大盒子 -->
    <div class="statistics">
      <div class="high-five-risk">
        <FiveHigh class="pie-width-height" :optData="fiveHigh"></FiveHigh>
      </div>
      <div class="high-five-risk">
        <RiskCount class="pie-width-height" :optData="riskAssess"></RiskCount>
      </div>
    </div>
  </div>
</template>
<script>
import PeopleCount from './components/people-count.vue'
import Pie from './components/pie.vue'
import FiveHigh from './components/five-high-count.vue'
import RiskCount from './components/risk-count.vue'
export default {
  data () {
    return {
      queryForm: {
        workArea: '',
        date: null
      },
      count: 500,
      mount: 600,
      risk: {
        title: '%健康评估完成率',
        data: [
          { value: 850, name: '已完成', showRatio: true },
          { value: 500, name: '未完成' }
        ]
      },
      questionnaire: {
        title: '年度健康体检完成率%',
        data: [
          { value: 400, name: '已完成', showRatio: true },
          { value: 500, name: '未完成' }
        ]
      },
      measurement: {
        title: '年度职业体检完成率%',
        data: [
          { value: 400, name: '已完成', showRatio: true },
          { value: 500, name: '未完成' }
        ]
      },
      fiveHigh: {
        title: '五高人群统计',
        manData: [879, 1392, 734, 617, 1170],
        womanData: [106, 548, 172, 178, 301]
      },
      riskAssess: {
        title: '风险评估统计',
        data: [960, 319, 832, 1357, 86, 256, 836]
      }
    }
  },
  components: {
    Pie,
    FiveHigh,
    PeopleCount,
    RiskCount
  },
  computed: {},
  created () {
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.management_people {
  display: flex;
  height: 80px;
  margin-top: 8px;
  .management_box {
    width: 20%;
    background-color: #fff;
  }
}
  .management_people .management_box:not(:last-child) {
    margin-right: 8px;
  }
.compliance_warp {
  display: flex;
  height: 236px;
  margin-top: 8px;
  .compliance {
    width: calc(100% - (8px + 8px) / 3);
    background-color: #fff;
  }
}
  .compliance_warp .compliance:not(:last-child) {
    margin-right: 8px;
  }
.statistics {
  height: 338px;
  display: flex;
  margin-top: 8px;
  .high-five-risk {
    width: calc((100% - 8px) / 2);
    background-color: #fff;
  }
}
.statistics .high-five-risk:first-child {
  margin-right: 8px;
}
.pie-width-height {
  width: 100%;
  height: 100%;
}
.queryForm-warp {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding-top: 12px;
  padding-bottom: 12px;
}
/deep/ .el-card__body {
  padding: unset;
}
.workArea {
  margin-left: 16px;
  .work-area-text {
    font-size: 14px;
    color: #666;
  }
}
 .margin-right16 {
   margin-right: 16px;
 }
 .margin-right8 {
   margin-right: 8px;
 }
 .margin-right22 {
   margin-right: 22px;
 }
 .queryForm-search {
   display: flex;
   justify-items: center;
 }
 .home-container {
   height: 738px;
 }
</style>
