<template>
  <div>
    <side-bar></side-bar>
    <top-bar></top-bar>
  </div>
</template>

<script>

import sideBar from '../../components/sideBar.vue'
import topBar from '../../components/topBar.vue'
export default {
  name: 'index',
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    sideBar,
    topBar
  }
}
</script>

<style lang='less'>

</style>
