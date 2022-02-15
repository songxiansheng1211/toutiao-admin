<template>
    <div>
    <el-card class="card-height">
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
<el-button type="primary" size="mini" @click="addOrEditUser">新增用户</el-button>
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
      <el-table-column label="操作" align="center">
          <template #default="{row}">
              <el-button type="text" size="mini" @click="addOrEditUser(row)">编辑</el-button>
              <el-button type="text" size="mini" @click="removeUser(row.id)" style="color:#F56C6C;">删除</el-button>
          </template>
      </el-table-column>
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
    <el-dialog
      :title="addForm.id ? '修改用户信息' : '新增用户'"
      :visible.sync="userDialog"
      append-to-body
      @closed="userClosed"
      width="30%">
      <el-form ref="addFormRef" v-if="userDialog" :model="addForm" :rules="addFormRules" label-width="80px" size="mini" label-suffix="：">
  <el-form-item label="用户名" placeholder="请输入用户名" prop="username">
    <el-input v-model="addForm.username" style="width:220px" :disabled="addForm.id ? true :false"></el-input>
  </el-form-item>
  <el-form-item label="密码" placeholder="请输入密码" prop="password">
    <el-input v-model="addForm.password" style="width:220px"></el-input>
  </el-form-item>
  <el-form-item label="角色" prop="identity">
      <el-select v-model="addForm.identity" placeholder="请选择角色" style="width:220px" :disabled="addForm.id ? true :false">
      <el-option label="系统管理员" value="1"></el-option>
      <el-option label="医院" value="2"></el-option>
      <el-option label="用户" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="机构" prop="userCookie" v-if="addForm.identity === '2'">
      <el-select v-model="addForm.userCookie" placeholder="请选择机构" style="width:220px" :disabled="addForm.id ? true :false">
      <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
</el-form>
      <span slot="footer" class="dialog-footer">
      <el-button :loading="saveBtnLoading" @click="userDialog = false" size="mini">取 消</el-button>
      <el-button :loading="saveBtnLoading" type="primary" @click="submit" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>
<script>
import { getUserData, addUserData, editUserData, removeUserData } from '@/api/user.js'
import { getOrgData } from '@/api/org.js'
export default {
  data () {
    return {
      form: {
        username: '',
        identity: '',
        current: 1,
        size: 10
      },
      addForm: {
        username: '',
        password: '',
        identity: '',
        userCookie: ''
      },
      tableData: [],
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        identity: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        userCookie: [
          { required: true, message: '请选择机构', trigger: 'change' }

        ]
      },
      tableLoading: false,
      total: 0,
      userDialog: false,
      saveBtnLoading: false,
      orgList: []
    }
  },
  created () {
    this.getTableData()
    getOrgData().then((res) => {
      this.orgList = res.data.data.records
    })
  },
  methods: {
    getTableData (params) {
      this.tableLoading = true
      getUserData(Object.assign(this.form, params)).then(res => {
        this.tableData = res.data.data.records
        this.tableData.forEach(item => {
          item.createTime = item.createTime.substr(0, 10)
        })
        this.total = res.data.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    addOrEditUser (row) {
      if (row.id) {
        this.addForm.username = row.username
        this.addForm.identity = row.identity
        this.addForm.password = row.password
        this.addForm.userCookie = row.userCookie
        this.addForm.id = row.id
      }
      this.userDialog = true
    },
    userClosed () {
      this.addForm.id = ''
      this.addForm.username = ''
      this.addForm.identity = ''
      this.addForm.password = ''
      this.addForm.userCookie = ''
    },
    submit () {
      this.saveBtnLoading = true
      this.$refs.addFormRef.validate().then(() => {
        if (this.addForm.id) {
          editUserData(this.addForm).then(() => {
            this.$message.success('修改用户成功')
            this.getTableData()
            this.userDialog = false
          })
        } else {
          addUserData(this.addForm).then(() => {
            this.$message.success('添加用户成功')
            this.getTableData()
            this.userDialog = false
          })
        }
      }).finally(() => {
        this.saveBtnLoading = false
      })
    },
    removeUser (id) {
      this.$confirm('是否确认删除所选用户', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => removeUserData(id))
        .then(() => {
          this.getTableData()
          this.$message.success('删除用户成功')
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
