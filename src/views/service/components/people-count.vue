<template>
  <div class="count_container">
    <div class="count-content">
      <div class="image-warp">
        <img src="./jianguan.png" class="image-size">
      </div>
      <div class="count_num">
        <div>
          <div class="count_amount">{{num}}</div>
          <div class="count_scale">健管人数·男300人·女30人</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    num: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.image-size {
  width: 46px;
  height: 46px;
}
.count-content {
    display: flex;
    margin-left: 16px;
    .image-warp {
    margin-top: 16px;
    }
    .count_num {
        margin-left: 8px;
        margin-top: 10px;
        .count_amount {
            font-size: 24px;
            color: #333;
            padding-bottom: 6px;
        }
        .count_scale {
            // padding-top: 6px;
            font-size: 12px;
            color: #666;
        }
    }
}
</style>
