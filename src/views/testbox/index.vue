<template>
    <div class="testBox_containner">
      <el-card class="query-card"></el-card>
      <div class="table-card">
          <div class="left-box">
              <el-card class="left-box1">
                  123画盒子
              </el-card>
              <el-card class="left-box2">
                  asd画盒子
              </el-card>
          </div>
          <div class="right-box">
            <el-card class="right-box1">
                  456画盒子
              </el-card>
              <el-card class="right-box2">
                  画盒子
                  qwe
              </el-card>
          </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.query-card {
    height: 85px;
    margin-bottom: 10px;
}
.table-card {
    display: flex;
    width: 100%;
    .left-box {
        width: 70%;
        height: 800px;
        .left-box1 {
        background-color: #fff;
        height: 50%;
        margin-bottom: 10px;
        }
        .left-box2 {
        background-color: #fff;
        height: 50%;
        }
    }
    .right-box {
        width: 30%;
        height: 800px;
        margin-left: 5px;
    .right-box1 {
        background-color: #fff;
        height: 70%;
        margin-bottom: 10px;
    }
    .right-box2 {
     background-color: #fff;
        height: 30%;
    }
    }
}
</style>
