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
        <imagesList></imagesList>
      </el-card>
    </div>
</template>
<script>
import imagesList from './components/imagesList'
export default {
  components: {
    imagesList
  }
}
</script>
<style lang="less" scoped>
</style>
