<template>
  <div>
    <div v-if="role ===0">所有</div>
    <div v-if="role ===1">本楼</div>
  </div>
</template>

<script>
export default {
  name: 'studentManage',
  data() {
    return {
      role: this.$store.state.role
    }
  }

}
</script>

<style>

</style>
