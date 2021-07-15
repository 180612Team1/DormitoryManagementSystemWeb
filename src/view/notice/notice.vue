<template>
  <div>sdsadasd</div>
</template>

<script>
export default {
  name: 'notice',
  data() {
    return {
      schoolId: this.$store.state.schoolId
    }
  },
  methods: {
    async handleMounted() {
      let res = await this.$axios({
        method: 'get',
        url: 'http://localhost:8091/notice/getAllNotices',
        params: {
          schoolId: this.schoolId
        }
      })
      console.log(res)
    }
  },
  created() {

  },
  components: {
  },
  computed: {},
  watch: {},
  mounted() {
    this.handleMounted()
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
</style>
