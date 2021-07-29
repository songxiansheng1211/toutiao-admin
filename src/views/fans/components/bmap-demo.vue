<template>
    <div class="bmap" id="container"></div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    // 使用第三方的全局数据 要加前缀 window
    var map = new window.BMap.Map('container')
    var point = new window.BMap.Point(117.08941492, 36.18807776)
    map.centerAndZoom(point, 15)
    var mapStyle = { style: 'midnight' }
    map.setMapStyle(mapStyle)
    var geolocation = new window.BMap.Geolocation()
    geolocation.getCurrentPosition(function (r) {
      // eslint-disable-next-line no-undef
      if (this.getStatus() === BMAP_STATUS_SUCCESS) {
        var mk = new window.BMap.Marker(r.point)
        map.addOverlay(mk)
        map.panTo(r.point)
        // alert('泰山信息科技' + r.point.lng + ',' + r.point.lat)
      } else {
        alert('failed' + this.getStatus())
      }
    })
  },
  methods: {},
  created () {}
}
</script>
<style lang="less" scoped>
 .bmap {
     width: 500px;
     height: 500px;
     border: 1px solid #eee;
 }
</style>
