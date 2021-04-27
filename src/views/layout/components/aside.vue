<template>
    <div>

         <el-menu
      default-active="/"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >
      <el-menu-item>
        <div class="top_image">
            <img src="../logo_index.png">
        </div>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="iconfont iconindexactive"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont iconcontent"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="image">
        <i class="iconfont iconimage"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
            <el-menu-item index="publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
            <el-menu-item index="comment">
        <i class="iconfont iconcomment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
        <el-menu-item index="fans">
        <i class="iconfont iconfans"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
        <el-menu-item index="settings">
        <i class="iconfont iconsetting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>
<script>
export default {
  name: 'AppAside',
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: false
    }
  },
  methods: {
  }
}

</script>
<style lang="less" scoped>
.el-menu {
    height: 100%;
       border-right: none;

   span {
       font-size: 12px;
   }
}
.top_image{
    background-color: #002033;
    text-align: center;
    img{
        margin-top: 10px;
            width: 150px;
    }
}
i {
    margin-right: 10px;
    padding-left: 5px;
}
</style>
