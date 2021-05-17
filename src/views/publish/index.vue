<template>
    <div class="publish_container">
      <el-card>
          <!-- 面包屑导航 -->
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 文章发布表单 -->
        <el-form :model="publishForm" :rules="publishFormRules" ref="publishFormRef" label-width="100px" label-suffix="：" size="mini">
          <el-form-item label="标题" prop="title">
            <el-input v-model="publishForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
              <quill-editor v-model="publishForm.content" class="quill-editor"></quill-editor>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="publishForm.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="publishForm.channel_id" placeholder="请选择">
              <el-option label="全部" :value="null"></el-option>
              <el-option v-for="(item,index) in channel" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" @click="onPublish(false)">发表</el-button>
             <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
     </el-card>
    </div>
</template>
<script>
import 'element-tiptap/lib/index.css'
import { getChannel, newPublish, getPublish, editPublish } from '@/api/article'
export default {
  data () {
    return {
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channel: [],
      publishFormRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 15, message: '最多输入15个字符', trigger: 'blur' }
        ],
        content: [
          // 这个自定义校验 如果我们输入一些内容 再把他删除掉 会存留一个<p><p>标签但内容还是空的
          {
            validator (rule, value, callBack) {
              if (value === '<p><p>') {
                callBack(new Error('请输入文章内容'))
              } else {
                callBack()
              }
            }
          },
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loadChannel () {
      getChannel().then(res => {
        // console.log(res)
        this.channel = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      this.$refs.publishFormRef.validate(vaild => {
        if (!vaild) {
          return
        }
        const articleId = this.$route.query.id
        if (articleId) {
          editPublish(articleId, this.publishForm, draft).then(res => {
            console.log(res)
            this.$message.success('修改文章成功')
            this.$router.push('/article')
          })
        } else {
          newPublish(this.publishForm, draft).then(res => {
            console.log(res)
            this.$message.success('发表文章成功')
            this.$router.push('/article')
          })
        }
      })
    },
    showArticle () {
      getPublish(this.$route.query.id).then(res => {
        console.log(res)
        this.publishForm = res.data.data
      })
    }
  },
  created () {
    this.loadChannel()
    if (this.$route.query.id) {
      this.showArticle()
    }
  }
}
</script>
<style lang="less" scoped>
.quill-editor {
    line-height: normal;
}
</style>
