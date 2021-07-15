<template>
  <div>
    <side-bar></side-bar>
    <top-bar></top-bar>
    <div class="pageContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import sideBar from '../../components/sideBar.vue'
import topBar from '../../components/topBar.vue'
export default {
  name: 'index',
  data() {
    return {

    }
  },
  methods: {

  },
  beforeCreate() {
    const token = sessionStorage.getItem('token')

    if (!token) {
      this.$router.push('/login')
    }
  },
  components: {
    sideBar,
    topBar
  }
}
</script>

<style lang='less'>
.pageContent{
  position:fixed;
  left: 15%;
  top: 7%;
  width: 85%;
  height: 93%;
  background: #ccc;
}
</style>
