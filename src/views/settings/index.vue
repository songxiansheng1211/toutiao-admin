<template>
    <div class="settings_container">
      <el-card>
        <!-- 面包屑导航 -->
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-row>
          <el-col :span="14">
            <el-form :model="queryForm"  ref="queryFormRef" label-width="80px">
              <el-form-item label="编号" prop="id">
                 {{queryForm.id}}
              </el-form-item>
              <el-form-item label="手机" prop="mobile">
                  {{queryForm.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称" prop="name">
                <el-input v-model="queryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍" prop="intro">
                <el-input type="textarea" v-model="queryForm.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="queryForm.email"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitInfo">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
            <el-col :span="4" :offset="4">
              <!-- 点击文字或者头像弹出选择图片 使用label和点击事件都可以实现  label给 input添加 id='' -->
                <el-avatar shape="square"
                 :size="150" fit="cover"
                 :src="queryForm.photo"
                 @click.native="$refs.file.click()"
                ></el-avatar>
                <p  class="text_position" @click="$refs.file.click()">修改头像</p>
                <!-- <label for="file">
                <el-avatar shape="square" :size="150" fit="cover" :src="queryForm.photo"></el-avatar>
                <p  class="text_position">修改头像</p>
                </label> -->
                <input type="file" hidden  ref="file" @change="onFileChange">
            </el-col>
        </el-row>
      </el-card>
      <el-dialog
      title="修改头像"
      :visible.sync="photoDialogVisible"
      width="30%"
      @opened="onOpenedChange"
      @closed="onDialogClosed"
      :append-to-body="true">
      <div class="preview_image_warp">
      <img :src="previewImg" alt=""  class="prview_image" ref="previewImage">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="photoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCropperPreviewImg">确 定</el-button>
     </span>
    </el-dialog>
    </div>
</template>
<script>
import { getUserInfo, userPreviewImg, editUserInfo } from '@/api/user.js'
// 裁剪图片步骤  第一步引入
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus.js'

export default {
  name: 'settingsIndex',
  data () {
    return {
      queryForm: {
        id: null,
        mobile: '',
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      photoDialogVisible: false,
      previewImg: '',
      // 裁切器
      cropper: null
    }
  },
  methods: {
    showUserInfo () {
      getUserInfo().then(res => {
        // console.log('123', res)
        this.queryForm = res.data.data
      })
    },
    onFileChange () {
      this.photoDialogVisible = true
      // 让选中的图片在对话框中预览 （记住）
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImg = blobData
      // 解决在选择相同文件时 change不触发的问题
      this.$refs.file.value = ''
      // console.log('sadsadsa')
    },
    // 图片裁剪器必须基于 img 进行初始化
    // img必须是完全可视状态 才可进行初始化
    // 第三步 在dialog 打开动画结束之后的回调函数中调用
    onOpenedChange () {
      // 获取 img 的 DOM 元素
      const image = this.$refs.previewImage
      // 第一次初始化后，预览裁切器的图片发生变化，默认裁切器预览的图片是不会发生改变的。
      // 解决方法 1. 裁切器的 replace方法  2.销毁裁切器重新初始化 destroy（）
      //  第一种方法  if (this.cropper) {
      //   this.cropper.replace(this.previewImg)
      //   return
      // }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        // 限制裁切框不要超过画布大小
        viewMode: 1,
        // 默认拖动创建新的 裁剪框 这里设置不创建
        dragMode: 'none',
        cropBoxResizable: false,
        movable: false,
        background: false
      })
    },
    onCropperPreviewImg () {
      // 获取裁切的用户头像
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求更新用户头像更新提交 fd（formdata对象）
        userPreviewImg(fd).then(res => {
          console.log(res)
          // 直接把裁切结果的文件对象转为blob 数据本地预览
          this.queryForm.photo = window.URL.createObjectURL(file)
          // 把服务器端返回的图片展示有点慢
          // this.queryForm.photo = res.data.data.photo
        }).finally(() => {
          this.$message.success('更换头像成功')
          this.photoDialogVisible = false
          const userImg = { photo: this.queryForm.photo }
          globalBus.$emit('global-img', userImg)
          this.showUserInfo()
        })
      })
    },
    submitInfo () {
      editUserInfo(this.queryForm).then(res => {
        console.log(res)
        this.$message.success('保存成功')
        const user = { name: this.queryForm.name }
        globalBus.$emit('global-user', user)
        this.showUserInfo()
      })
    },
    onDialogClosed () {
      // 在dialog关闭后 销毁裁切器
      this.cropper.destroy()
    }
  },
  created () {
    this.showUserInfo()
  }
}
</script>
<style lang="less" scoped>
.text_position{
  width: 150px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.el-avatar {
  cursor: pointer;
}
//第二步 设置图片样式
.preview_image_warp{
  .prview_image {
  display: block;
  max-width: 100%;
  height: 220px;
  }
}

</style>
