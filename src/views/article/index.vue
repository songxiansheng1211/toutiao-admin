<template>
 <div class="article_container">
    <el-card class="margin_buttom">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
<!-- 表单 -->
<el-form ref="queryFormRef" :model="queryForm" label-width="60px" size="mini">
  <el-form-item label="状态：">
    <!-- el-radio默认把 label 作为文本和选中之后的value值  要想把他们分开 就把文本放在摘出来-->
    <el-radio-group v-model="queryForm.status">
      <el-radio :label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道：">
    <el-select v-model="queryForm.channel_id" placeholder="请选择">
      <el-option label="全部" :value="null"></el-option>
      <el-option v-for="(item,index) in channel" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="日期：">
      <el-date-picker
      v-model="rangeDate"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOption">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <!-- 查询加载期间 禁用按钮 -->
      <el-button type="primary" @click="loadArticles" :disabled="loading">筛选</el-button>
  </el-form-item>
</el-form>
     </el-card>
     <!-- 数据主体 -->
    <el-card>
      <div  slot="header" class="clearfix">根据筛选条件共查询到{{total}}条结果：</div>
  <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="loading">
    <el-table-column label="封面">
      <template v-slot="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.cover.images[0]"
          fit="cover">
        </el-image>
        <!-- <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" class="article_cover">
        <img v-else src="./no-cover.jpg" class="article_cover"> -->
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template v-slot="scope">
        <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
        <!-- <el-tag  v-if="scope.row.status === 0" >草稿</el-tag>
        <el-tag type="warning" v-else-if="scope.row.status === 1" >待审核</el-tag>
        <el-tag type="success" v-else-if="scope.row.status === 2" >审核通过</el-tag>
        <el-tag type="danger" v-else-if="scope.row.status === 3" >审核失败</el-tag>
        <el-tag type="info" v-else-if="scope.row.status === 4" >已删除</el-tag> -->
      </template>
    </el-table-column>
    <el-table-column prop="pubdate" label="发布时间"></el-table-column>
    <el-table-column label="操作">
        <template v-slot="scope">
        <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="onDeleteArticle(scope.row.id)"></el-button>
        </template>
    </el-table-column>
  </el-table>
  <!-- 分页 在loading加载时禁用分页按钮 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryForm.page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="queryForm.per_page"
      :disabled="loading"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    </div>
</template>
<script>
import { getArticle, getChannel, deleteEssay } from '@/api/article'
export default {
  data () {
    return {
      queryForm: {
        per_page: 10,
        page: 1,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      loading: false,
      // rangeDate: [],
      total: 0,
      value1: '',
      channel: [],
      tableData: [],
      articleStatus: [
        { text: '草稿', type: '' },
        { text: '待审核', type: 'warning' },
        { text: '审核通过', type: 'success' },
        { text: '审核失败', type: 'danger' },
        { text: '已删除', type: 'info' }
      ],
      // 限制选择今天之前的日期
      pickerOption: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  methods: {
    loadArticles () {
      // this.queryForm.begin_pubdate = this.rangeDate ? this.rangeDate[0] : null
      // this.queryForm.end_pubdate = this.rangeDate ?  this.rangeDate[1] : null
      this.loading = true
      getArticle(this.queryForm).then(res => {
        console.log(res)
        this.tableData = res.data.data.results
        this.total = res.data.data.total_count
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.queryForm.per_page = val
      this.loadArticles()
    },
    handleCurrentChange (val) {
      this.queryForm.page = val
      this.loadArticles()
    },
    loadChannel () {
      getChannel().then(res => {
        this.channel = res.data.data.channels
      })
    },
    onDeleteArticle (id) {
      this.$alert('是否要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEssay(id).then(res => {
          console.log(res)
          this.loadArticles()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.loadChannel()
    this.loadArticles()
  },
  computed: {
    rangeDate: {
      get () {
        return (
          this.queryForm.begin_pubdate && [this.queryForm.begin_pubdate, this.queryForm.end_pubdate]
        )
      },
      set (range) {
        this.queryForm.begin_pubdate = range && range[0]
        this.queryForm.end_pubdate = range && range[1]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.margin_buttom {
    margin-bottom: 10px;
}
.el-pagination {
    text-align: right;
    margin-top: 15px;
}
.article_cover {
  width: 60px;
  background-size:cover ;
  height: 80px;
}
</style>
