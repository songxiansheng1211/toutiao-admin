<template>
    <div class="upload_cover" @click="showUploadDialog">
        <div class="cover_warp">
            <img :src="value" class="cover_img" ref="coverImg" >
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          append-to-body
        >
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="first">
              <imagesList :is-show-add = 'false' :is-images-show = 'true' ref="imagesListRef" />
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="second">
              <input type="file" ref="file" @change="onFileChange" />
              <img ref="previewImgRef" alt="">
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="coverImgConfirm">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import imagesList from '@/views/image/components/imagesList'
import { uploadImages } from '@/api/images'
export default {
  name: 'cover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
      // uploadImg: ''
    }
  },
  components: {
    imagesList
  },
  props: ['value'],
  // props: ['transmit-img'],
  methods: {
    showUploadDialog () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      // this.uploadImg = blobData
      this.$refs.previewImgRef.src = blobData
    //   this.$refs.file.value = '' 防止 选择同一个文件的时候 change不触发
    },
    coverImgConfirm () {
      const file = this.$refs.file.files[0]
      if (this.activeName === 'second') {
        if (!file) {
          return this.$message.error('请选择上传封面图片')
        }
        const fd = new FormData()
        // 字段名(对应接口字段) ，文件对象（引用对象）
        fd.append('image', file)
        uploadImages(fd).then(res => {
          // console.log(res)
          // this.$refs.coverImg.src = res.data.data.url
          this.dialogVisible = false
          // this.$emit('updata-cover', res.data.data.url)
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs.imagesListRef
        console.log(imageList)
        const selected = imageList.selected
        if (selected === null) {
          return this.$message('请选择上传的图片')
        }
        // 修改父组件绑定数据
        this.$emit('input', imageList.imagesList[selected].url)
        this.dialogVisible = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
 .cover_warp {
     width: 150px;
     height: 180px;
     border: 1px solid #eee;
     .cover_img {
         max-width: 100%;
         height: 180px;
     }
 }
</style>
