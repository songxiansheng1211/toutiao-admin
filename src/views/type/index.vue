<template>
    <div>
    <el-card class="card-height">
<el-breadcrumb separator="/" style="margin-bottom:30px;">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>检测类型管理</el-breadcrumb-item>
</el-breadcrumb>
<el-form ref="form" :model="typeForm" label-width="80px" size="mini" label-suffix="：" inline @submit.native.prevent @keyup.enter.native="getTableData({ current: 1 })">
  <el-form-item label="类型名称">
    <el-input v-model="typeForm.name"></el-input>
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="getTableData({current:1})">查询</el-button>
  </el-form-item>
</el-form>
<el-button type="primary" size="mini" @click="addOrEditType">新增检测类型</el-button>
    <el-table
    v-loading="tableLoading"
      style="margin-top:15px;"
      border
      :data="tableData">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="name" label="类型名称" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" align="center">
          <template #default="{row}">
              <span>{{row.price}}元</span>
          </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column  label="操作" align="center">
        <template #default="{row}">
          <el-button type="text" size="mini" @click="addOrEditType(row)">编辑</el-button>
          <el-button type="text" size="mini" style="color:#F56C6C;" @click="removeType(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
          :current-page="typeForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="typeForm.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="val => getTableData({size:val,current: 1})"
          @current-change="val => getTableData({current: val})"
        ></el-pagination>
    </el-card>
    <el-dialog
      :title="addForm.id ? '修改类型' : '新增类型'"
      :visible.sync="typeDialog"
      append-to-body
      @closed="typeClosed"
      width="30%">
      <el-form ref="addFormRef" v-if="typeDialog" :model="addForm" :rules="addFormRules" label-width="90px" size="mini" label-suffix="：">
  <el-form-item label="类型名称" placeholder="请输入类型名称" prop="name">
    <el-input v-model="addForm.name" style="width:220px"></el-input>
  </el-form-item>
  <el-form-item label="价格" placeholder="请输入价格" prop="price">
    <el-input v-model="addForm.price" style="width:80px" type="number"></el-input>
    元
  </el-form-item>
</el-form>
      <span slot="footer" class="dialog-footer">
      <el-button :loading="saveBtnLoading" @click="typeDialog = false" size="mini">取 消</el-button>
      <el-button :loading="saveBtnLoading" type="primary" @click="submit" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>
<script>
import { getTypeData, addTypeData, editTypeData, removeTypeData } from '@/api/type.js'
export default {
  data () {
    return {
      typeForm: {
        name: '',
        current: 1,
        size: 10
      },
      addForm: {
        name: '',
        price: ''
      },
      tableData: [],
      tableLoading: false,
      total: 0,
      typeDialog: false,
      saveBtnLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入类型名称', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'change' }
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
      getTypeData(Object.assign(this.typeForm, params)).then(res => {
        this.tableData = res.data.data.records
        this.tableData.forEach(item => {
          item.createTime = item.createTime.substr(0, 10)
        })
        this.total = res.data.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    addOrEditType (row) {
      if (row.id) {
        this.addForm.name = row.name
        this.addForm.price = row.price
        this.addForm.id = row.id
      }
      this.typeDialog = true
    },
    typeClosed () {
      this.addForm.id = ''
      this.addForm.name = ''
      this.addForm.price = ''
    },
    submit () {
      this.$refs.addFormRef.validate().then(() => {
        if (this.addForm.id) {
          editTypeData(this.addForm).then(() => {
            this.$message.success('修改检测类型成功')
            this.typeDialog = false
            this.getTableData()
          })
        } else {
          addTypeData(this.addForm).then(() => {
            this.$message.success('新增检测类型成功')
            this.typeDialog = false
            this.getTableData()
          })
        }
      })
    },
    removeType (id) {
      this.$confirm('是否确认删除所选类型', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => removeTypeData(id))
        .then(() => {
          this.getTableData()
          this.$message.success('删除类型成功')
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
