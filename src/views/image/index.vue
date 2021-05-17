<template>
    <div class="images_container">
      <el-card>
        <!-- 面包屑导航 -->
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>素材管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="table_header">
        <el-radio-group v-model="imagesForm.collect" size="mini" @change="radioChange">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="mini" @click="showImagesDialog">添加素材</el-button>
        </div>
        <div class="images_list">
          <el-row>
            <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="item in imagesList" :key="item.id" class="farther_box">
                 <el-image
                    style="width: 100px; height: 100px"
                    :src="item.url">
                 </el-image>
                 <div class="operation_image">

                   <!-- <i :class="{
                     'el-icon-star-on':item.is_collected,
                     'el-icon-star-off':!item.is_collected
                   }" @click="onCollect(item)"></i> -->
                    <el-button type="warning"
                     :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off' "
                      circle
                       size="mini"
                       :loading = "item.loading"
                       @click="onCollect(item)"></el-button>
                   <i class="el-icon-delete-solid" @click="removeImage(item.id)"></i>
                 </div>
            </el-col>
          </el-row>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="imagesForm.page"
          :page-sizes="[20, 40, 60, 80]"
          :page-size="imagesForm.per_page"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
      </el-card>
      <!-- 通过v-if跟随dialog的显示隐藏 销毁上传日志 -->
<el-dialog
v-if="imagesDialog"
  title="上传"
  :visible.sync="imagesDialog"
  width="410px"
  :append-to-body="true">
  <el-upload
  class="upload-demo"
  drag
  action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
  :headers="uploadHeaders"
  name="image"
  :on-success="uploadSuccess"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-dialog>
    </div>
</template>
<script>
import { getImages, collectImages, deleteImages } from '@/api/images'
export default {
  name: 'imagesIndex',
  data () {
    const user = JSON.parse(sessionStorage.getItem('token'))
    return {
      imagesForm: {
        collect: false,
        page: 1,
        per_page: 20
      },
      imagesList: [],
      total: 0,
      imagesDialog: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  created () {
    this.loadImages(false)
  },
  methods: {
    loadImages () {
      getImages(this.imagesForm).then(res => {
        // console.log(res)
        const results = res.data.data.results
        // 手动添加数据来控制 loading 的状态
        results.forEach(item => {
          item.loading = false
        })
        this.imagesList = results
        this.total = res.data.data.total_count
      })
    },
    radioChange (value) {
      this.imagesForm.page = 1
      this.loadImages(value)
    },
    showImagesDialog () {
      this.imagesDialog = true
    },
    uploadSuccess () {
      this.imagesDialog = false
      this.loadImages()
      this.$message.success('上传成功')
    },
    handleSizeChange (val) {
      this.imagesForm.per_page = val
      this.imagesForm.page = 1
      this.loadImages()
    },
    handleCurrentChange (val) {
      this.imagesForm.page = val
      this.loadImages()
    },
    onCollect (item) {
      // 更新视图状态
      item.loading = true
      collectImages(item.id, !item.is_collected).then(res => {
        item.is_collected = !item.is_collected
        item.loading = false
      })
    },
    removeImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImages(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadImages(this.page)
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.table_header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
}
.el-image {
    padding-bottom: 20px;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
.operation_image {
  height: 30px;
  width: 100px;
  // border-color: rgb(204,204,204, 0.5);
  background-color: rgba(204,204,204, 0.3);
  // opacity: 0.5;
  position: absolute;
  // top: 0;
  left: 0;
  bottom: 23px;
  right: 0;
    font-size: 20px;
  // display: flex;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
}
.farther_box {
  position: relative;
}

</style>
