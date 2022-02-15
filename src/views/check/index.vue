<template>
    <div>
    <el-card class="card-height">
<el-breadcrumb separator="/" style="margin-bottom:30px;">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>检测列表</el-breadcrumb-item>
</el-breadcrumb>
<el-form ref="form" :model="recordForm" label-width="120px" size="mini" label-suffix="：" inline @submit.native.prevent @keyup.enter.native="getTableData({ current: 1 })">
  <el-form-item label="身份证号码">
          <el-input v-model="recordForm.idCard"></el-input>
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="getTableData({current:1})">查询</el-button>
  </el-form-item>
</el-form>
    <el-table
    v-loading="tableLoading"
      style="margin-top:15px;"
      border
      :data="tableData">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="idCard" label="身份证" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="hospitalName" label="机构名称" align="center"></el-table-column>
      <el-table-column prop="itemName" label="类型名称" align="center"></el-table-column>
      <el-table-column prop="result" label="检测结果" align="center">
        <template #default="{row}">
            <span v-if="row.result === '0'">阴性</span>
            <span v-if="row.result === '1'">阳性</span>
            <span v-else>未查询到检测结果</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
          <template #default="{row}">
          <el-button type="text" size="mini" @click="checkDetail(row)">上传检查结果</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
          :current-page="recordForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="recordForm.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="val => getTableData({size:val,current: 1})"
          @current-change="val => getTableData({current: val})"
        ></el-pagination>
    </el-card>
        <el-dialog
      title="上传检查结果"
      :visible.sync="detailDialog"
      append-to-body
      width="650px">
      <el-form ref="addFormRef"  :model="detailForm" label-width="80px" size="mini" label-suffix="：">
        <el-select v-model="detailForm.idCard">
      <el-option label="阴性" value="0"></el-option>
      <el-option label="阴性" value="1"></el-option>
    </el-select>
      </el-form>
      </el-dialog>
    </div>
</template>
<script>
import { getRecordData } from '@/api/type.js'
import { resultData } from '@/api/org.js'
export default {
  data () {
    return {
      recordForm: {
        username: '',
        current: 1,
        size: 10,
        idCard: ''
      },
      tableData: [],
      tableLoading: false,
      total: 0,
      detailDialog: false,
      detailForm: {}
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData (params) {
      const user = JSON.parse(sessionStorage.getItem('userCookie'))
      this.tableLoading = true
      getRecordData(Object.assign(this.recordForm, params, { hospitalId: user })).then(res => {
        this.tableData = res.data.data.records
        this.tableData.forEach(item => {
          item.createTime = item.createTime.substr(0, 10)
        })
        this.total = res.data.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    checkDetail (row) {
      this.detailDialog = true
      this.detailForm.id = row.id
      this.detailForm.name = row.name
      this.detailForm.idCard = row.idCard
      this.detailForm.hospitalName = row.hospitalName
      this.detailForm.username = row.username
      this.detailForm.itemName = row.itemName
      this.detailForm.createTime = row.createTime
      this.detailForm.result = row.result || '未查询到检测结果'
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
    text-align: right;
    margin-top: 15px;
}
.card-height {
  height: 100vh;
}
.excel-btn {
  position: absolute;
  right: 30px;
  bottom: 15px;
}
</style>
