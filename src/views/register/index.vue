<template>
    <div>
        <el-card class="container">
            <div class="form-item">
            <el-form ref="form" :model="form" label-width="80px" size="mini" :rules="formRules">
              <el-form-item label="用户名">
                <el-input v-model="form.username" disabled style="width:220px;"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" style="width:220px;"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="form.idCard" style="width:220px;"></el-input>
              </el-form-item>
              <el-form-item label="检测机构" prop="hospitalId">
                <el-select v-model="form.hospitalId" placeholder="请选择检查机构" style="width:220px;">
                   <el-option
                     v-for="item in hospitalList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
                   </el-option>
                 </el-select>
              </el-form-item>
              <el-form-item label="检测项目" prop="itemId">
                <el-select v-model="form.itemId" placeholder="请选择检测项目" style="width:220px;" @change="typeChanged">
                   <el-option
                     v-for="item in itemList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
                   </el-option>
                 </el-select>
                <el-input v-model="form.price" disabled style="width:60px;"></el-input>
                元
              </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="submitRegister">立即预约</el-button>
              </el-form-item>
            </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getOrgData } from '@/api/org.js'
import { getTypeData } from '@/api/type.js'
import { registerData } from '@/api/register.js'
export default {
  data () {
    return {
      form: {
        username: '',
        name: '',
        idCard: '',
        itemId: '',
        hospitalId: '',
        price: '',
        userId: ''
      },
      hospitalList: [],
      itemList: [],
      formRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'change' }
        ],
        hospitalId: [
          { required: true, message: '请选择医院机构', trigger: 'change' }
        ],
        itemId: [
          { required: true, message: '请选择检测项目', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.form.username = JSON.parse(sessionStorage.getItem('username'))
    this.form.userId = JSON.parse(sessionStorage.getItem('userId'))
    getOrgData().then(res => {
      this.hospitalList = res.data.data.records
    })
    getTypeData().then(res => {
      this.itemList = res.data.data.records
    })
  },
  methods: {
    typeChanged (val) {
      this.form.price = this.itemList.find(item => item.id === val)?.price
    },
    submitRegister () {
      this.$refs.form.validate().then(() => {
        registerData(this.form).then(() => {
          this.$message.success('预约成功，请及时线下就诊')
          this.$refs.form.resetFields()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container {
    height: 100vh;
    .form-item {
        margin-top: 50px;
        display: flex;
        justify-content: center;
    }
}
</style>
