<template>
    <div class="fans_container">
     <el-card>
        <!-- 面包屑导航 -->
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>粉丝管理小伙子</el-breadcrumb-item>
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
              </div>
            </el-tab-pane>
            <el-tab-pane label="粉丝画像"></el-tab-pane>
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
</style>
