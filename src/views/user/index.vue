<template>
    <div>
    <el-card>
<el-breadcrumb separator="/" style="margin-bottom:30px;">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
</el-breadcrumb>
<el-form ref="form" :model="form" label-width="80px" size="mini" label-suffix="：" inline @submit.native.prevent @keyup.enter.native="getTableData({ current: 1 })">
  <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="角色">
      <el-select v-model="form.identity" placeholder="请选择角色">
      <el-option label="系统管理员" value="1"></el-option>
      <el-option label="医院" value="2"></el-option>
      <el-option label="用户" value="3"></el-option>
    </el-select>
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
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="password" label="密码" align="center"></el-table-column>
      <el-table-column prop="identity" label="角色" align="center">
          <template #default="{row}">
              <span v-if="row.identity === '1'">系统管理员</span>
              <span v-if="row.identity === '2'">医院</span>
              <span v-if="row.identity === '3'">用户</span>
          </template>
      </el-table-column>
      <el-table-column prop="loginTime" label="登陆时间" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
    </el-table>
    <el-pagination
          :current-page="form.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="form.size"
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
import { getUserData } from '@/api/user.js'
export default {
  data () {
    return {
      form: {
        username: '',
        identity: '',
        current: 1,
        size: 10
      },
      tableData: [],
      tableLoading: false
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.tableLoading = true
      getUserData(this.form).then(res => {
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
</style>
