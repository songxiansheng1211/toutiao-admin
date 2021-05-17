<template>
  <div class="comment_container">
         <el-card>
        <!-- 面包屑导航 -->
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table
        :data="tableList"
        stripe
        style="width: 100%">
          <el-table-column
          prop="title"
          label="标题">
          </el-table-column>
          <el-table-column
          prop="total_comment_count"
          label="总评论数">
          </el-table-column>
          <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
          </el-table-column>
          <el-table-column
          label="状态">
          <template v-slot="scope">
            {{scope.row.comment_status ? '正常' : '关闭'}}
          </template>
          </el-table-column>
          <el-table-column
          prop="date"
          label="操作">
           <template v-slot="{ row }">
              <el-switch
              v-model="row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="row.statusDisabled"
              @change="onStatusChange(row)">
              </el-switch>
           </template>
          </el-table-column>
        </el-table>
          <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="queryForm.page"
           :page-sizes="[10, 20, 30, 50]"
           :page-size="queryForm.per_page"
           background
           layout="total, sizes, prev, pager, next, jumper"
           :total="total">
          </el-pagination>
         </el-card>
  </div>
</template>
<script>
import { getComment, commentStatus } from '@/api/comment'
export default {
  data () {
    return {
      tableList: [],
      queryForm: {
        page: 1,
        per_page: 10,
        response_type: 'comment'
      },
      total: 0
    }
  },
  methods: {
    getCommentList () {
      getComment(this.queryForm).then(res => {
        console.log('11', res)
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.tableList = results
        this.total = res.data.data.total_count
      })
    },
    handleCurrentChange (val) {
      this.queryForm.page = val
      this.getCommentList()
    },
    handleSizeChange (val) {
      this.queryForm.per_page = val
      this.queryForm.page = 1
      this.getCommentList()
    },
    onStatusChange (article) {
      article.statusDisabled = true
      commentStatus(article.id.toString(), article.comment_status).then(res => {
        // console.log(res)
        article.statusDisabled = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启成功' : '关闭成功'
        })
      })
    }
  },
  created () {
    this.getCommentList()
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  text-align: right;
  margin-top: 12px;
}
</style>
