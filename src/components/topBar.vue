<template>
  <div class="topBarContent">
    <div class="titleBox"><span class="titleText">宿舍管理系统</span></div>
    <div class="whoBox">
      <span class="whoText">{{ who }}</span>
    </div>
    <div class="btnBox"><button class="btn" @click="handleLogout()">退出登录</button></div>
  </div>
</template>

<script>
export default {
  name: 'topBar',
  data () {
    return {
      username: '测试1',
      role: 0
    }
  },
  methods: {
    handleLogout () {
      this.$router.push('/login')
    }
  },
  watch: {

  },
  computed: {
    who () {
      let whoName = `欢迎您,${this.username}`
      let whoRole = this.role === 0 ? `系统管理员` : this.role === 1 ? `宿舍管理员` : `同学`
      return whoName + whoRole
    }
  }
  // created () {
  //   //
  // }
  // mounted () {
  // }

}
</script>

<style lang='less'>
.topBarContent {
  color: #FFF;
  position: fixed;
  display: flex;
  width: 100%;
  // left: 15%;
  height: 6.97%;
  background: #001529;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  // line-height: max-content;
  .titleBox {
    display: flex;
    // background: green;
    font-size: 2rem;
    // width: max-content;
    width: max-content;
    padding-left: 24rem;
    margin: auto;
    .titleText {
      margin: auto;
    }
  }
  .whoBox {
    // background: wheat;
    display: flex;
    font-size: 1rem;
    width: max-content;
    margin-right: 0.5rem;
    .whoText {
      margin: auto;
    }
  }
  .btnBox {
    display: flex;
    margin-right: 2rem;
    // background: fuchsia;
    .btn {
      margin: auto;
      background: #f56c6c;
      color: white;
      margin-left: 2rem;
      padding: 0.2rem 0.8rem;
      font-size: 1rem;
      border: 0.1rem solid #f56c6c;
      border-radius: 3rem;
    }
  }
}
</style>
