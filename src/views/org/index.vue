<template>
    <div>
    <el-card class="card-height">
<el-breadcrumb separator="/" style="margin-bottom:30px;">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>检测机构管理</el-breadcrumb-item>
</el-breadcrumb>
<el-form ref="form" :model="orgForm" label-width="80px" size="mini" label-suffix="：" inline @submit.native.prevent @keyup.enter.native="getTableData({ current: 1 })">
  <el-form-item label="机构名称">
    <el-input v-model="orgForm.name"></el-input>
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="getTableData({current:1})">查询</el-button>
  </el-form-item>
</el-form>
<el-button type="primary" size="mini" @click="addOrEditOrg">新增检测机构</el-button>
    <el-table
    v-loading="tableLoading"
      style="margin-top:15px;"
      border
      :data="tableData">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="name" label="机构名称" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column  label="操作" align="center">
        <template #default="{row}">
          <el-button type="text" size="mini" @click="addOrEditOrg(row)">编辑</el-button>
          <el-button type="text" size="mini" style="color:#F56C6C;" @click="removeOrg(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
          :current-page="orgForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="orgForm.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="val => getTableData({size:val,current: 1})"
          @current-change="val => getTableData({current: val})"
        ></el-pagination>
    </el-card>
    <el-dialog
      :title="addForm.id ? '修改机构信息' : '新增机构'"
      :visible.sync="orgDialog"
      append-to-body
      @closed="orgClosed"
      width="30%">
      <el-form ref="addFormRef" v-if="orgDialog" :model="addForm" :rules="addFormRules" label-width="110px" size="mini" label-suffix="：">
  <el-form-item label="机构名称" placeholder="请输入机构名称" prop="name">
    <el-input v-model="addForm.name" style="width:220px"></el-input>
  </el-form-item>
  <el-form-item label="联系方式" placeholder="请输入联系方式" prop="phone">
    <el-input v-model="addForm.phone" style="width:220px" type="number"></el-input>
  </el-form-item>
</el-form>
      <span slot="footer" class="dialog-footer">
      <el-button :loading="saveBtnLoading" @click="orgDialog = false" size="mini">取 消</el-button>
      <el-button :loading="saveBtnLoading" type="primary" @click="submit" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>
<script>
import { getOrgData, addOrgData, editOrgData, removeOrgData } from '@/api/org.js'
export default {
  data () {
    return {
      orgForm: {
        name: '',
        current: 1,
        size: 10
      },
      addForm: {
        name: '',
        phone: ''
      },
      tableData: [],
      tableLoading: false,
      total: 0,
      orgDialog: false,
      saveBtnLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData (params) {
      this.tableLoading = true
      getOrgData(Object.assign(this.orgForm, params)).then(res => {
        this.tableData = res.data.data.records
        this.tableData.forEach(item => {
          item.createTime = item.createTime.substr(0, 10)
        })
        this.total = res.data.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    addOrEditOrg (row) {
      if (row.id) {
        this.addForm.name = row.name
        this.addForm.phone = row.phone
        this.addForm.id = row.id
      }
      this.orgDialog = true
    },
    orgClosed () {
      this.addForm.id = ''
      this.addForm.name = ''
      this.addForm.phone = ''
    },
    submit () {
      this.$refs.addFormRef.validate().then(() => {
        if (this.addForm.id) {
          editOrgData(this.addForm).then(() => {
            this.$message.success('修改检测机构成功')
            this.orgDialog = false
            this.getTableData()
          })
        } else {
          addOrgData(this.addForm).then(() => {
            this.$message.success('新增检测机构成功')
            this.orgDialog = false
            this.getTableData()
          })
        }
      })
    },
    removeOrg (id) {
      this.$confirm('是否确认删除所选机构', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => removeOrgData(id))
        .then(() => {
          this.getTableData()
          this.$message.success('删除机构成功')
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
