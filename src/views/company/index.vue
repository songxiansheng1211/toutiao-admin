<template>
    <div class="company_container">
      <el-card class="company-query">
        <el-form :model="queryForm" label-width="80px" inline size="mini">
          <el-form-item label="工作区">
                <el-select v-model="queryForm.wpId" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="queryForm.sex" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="激活状态">
            <el-select v-model="queryForm.status" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="建档进度">
            <el-select v-model="queryForm.progress" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="搜索查询">
            <el-select v-model="queryForm.wpId" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item class="search-space">
            <el-button size="mini" type="primary">查询</el-button>
            <el-button size="mini" plain>重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="staffList">
          <div class="staffCount">
              员工列表（6）
          </div>
    <el-table
      :data="tableData"
      style="width: 100%">
     <el-table-column label="序号" type="index">
     </el-table-column>
      <el-table-column
        prop="workSpaceName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="workSpaceState"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="validity"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="countPeople"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="activeCount"
        label="所属工作区">
      </el-table-column>
      <el-table-column
        prop="bulidCount"
        label="激活状态">
      </el-table-column>
      <el-table-column
        prop="assessmentCount"
        label="建档进度">
      </el-table-column>
      <el-table-column
        prop="interveneCount"
        label="风险评估量">
      </el-table-column>
      <el-table-column
        prop="followCount"
        label="干预方案量">
      </el-table-column>
        <el-table-column
        prop="riskCount"
        label="随访问卷量">
      </el-table-column>
      <el-table-column label="操作" width="95">
            <el-button style="padding:0" type="text" @click="showDrawer =  true">编辑员工信息</el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
        <div class="drawer" :class="{ show: showDrawer }">
        <!-- <el-button @click="showDrawer = false">关闭</el-button> -->
        <div class="drawer-title">
            <span class="title-text">编辑基本信息</span>
            <i class="el-icon-close title-icon" @click="showDrawer = false"></i>
        </div>
      </div>
      </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      queryForm: {
        wpId: '',
        status: '',
        progress: '',
        sex: ''
      },
      tableData: [
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        },
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        },
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        },
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        },
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        },
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        },
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        },
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        },
        {
          workSpaceName: '宋昊工作区',
          workSpaceState: '医疗工作区使用哈哈哈',
          validity: '2021-1-1',
          countPeople: '200',
          activeCount: '121',
          bulidCount: '111',
          assessmentCount: '300',
          interveneCount: '212',
          followCount: '111',
          riskCount: '222'
        }
      ],
      currentPage4: 10,
      showDrawer: false
    }
  }
}
</script>
<style lang="less" scoped>
 .el-pagination {
     text-align: right;
     margin-top: 15px;
 }
 .staffList {
     margin-top: 10px;
     position: relative;
 }
     .drawer {
      position: absolute;
      z-index: 2000;
      background-color: #fff;
      top: 0px;
      bottom: 0px;
      width: 30%;
      height: 100%;
      box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
      transition: all 0.3s ease;
      right: -50%;
      .drawer-title {
          height: 40px;
          line-height: 40px;
          width: 100%;
          border-bottom: 1px rgba(0, 0, 0, 0.05) solid;
          display: flex;
          justify-content: space-between;
          .title-text {
            font-size: 16px;
            margin-left: 10px;
          }
          .title-icon {
              margin-top: 13px;
              margin-right: 10px;
              font-size: 16px;
          }
      }
    }
    .show {
      right: 0px;
    }
    .search-space {
        margin-left: 80px;
    }
    .staffCount {
        font-size: 16px;
    }
</style>
