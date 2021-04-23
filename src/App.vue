<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Login from './views/login/index'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Login
  }
}
</script>
<style lang="less"></style>
