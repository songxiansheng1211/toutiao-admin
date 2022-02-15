<template>
    <div>
    <el-card class="card-height">
<el-breadcrumb separator="/" style="margin-bottom:30px;">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>检测记录</el-breadcrumb-item>
</el-breadcrumb>
<el-form ref="form" :model="recordForm" label-width="80px" size="mini" label-suffix="：" inline @submit.native.prevent @keyup.enter.native="getTableData({ current: 1 })">
  <el-form-item label="用户名称">
    <el-input v-model="recordForm.username"></el-input>
  </el-form-item>
  <el-form-item label="机构名称">
    <el-input v-model="recordForm.hospitalName"></el-input>
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
      <el-table-column prop="hospitalName" label="机构名称" align="center"></el-table-column>
      <el-table-column prop="itemId" label="机构ID" align="center"></el-table-column>
      <el-table-column prop="itemId" label="类型ID" align="center"></el-table-column>
      <el-table-column prop="itemName" label="类型名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
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
    </div>
</template>
<script>
import { getRecordData } from '@/api/type.js'
export default {
  data () {
    return {
      recordForm: {
        hospitalName: '',
        username: '',
        current: 1,
        size: 10
      },
      tableData: [],
      tableLoading: false,
      total: 0
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData (params) {
      this.tableLoading = true
      getRecordData(Object.assign(this.recordForm, params)).then(res => {
        console.log(res)
        this.tableData = res.data.data.records
        this.tableData.forEach(item => {
          item.createTime = item.createTime.substr(0, 10)
        })
        this.total = res.data.data.total
      }).finally(() => {
        this.tableLoading = false
      })
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
</style>
