<template>
  <div class="sideBarContent">
    <div style="margin:0.7rem 0;background:none;height:2.5rem;border:0px solid black" v-for="i in menu" :key="i.name">
      <button style="width:100%;border:none;background:#7dbcff;height:2.5rem">{{i.name}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data () {
    return {
      role: 2
    }
  },
  computed: {
    menu () {
      let admin = [
        {
          name: '公告信息'
          // path: '/notice'
        },
        {
          name: '宿舍管理员信息'
          // path: '/notice'
        },
        {
          name: '考勤任务'
          // path: '/notice'
        }
      ]
      let houseparent = [
        {
          name: '公告信息'
          // path
        },
        {
          name: '个人信息'
        }
      ]
      let student = [
        {
          name: '个人信息'
        },
        {
          name: '个人信息'
        }
      ]
      return this.role === 0 ? admin : this.role === 1 ? houseparent : student
    }
  }

}
</script>

<style lang='less' scoped>
.sideBarContent {
  z-index: 3;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  position: fixed;
  top: 7%;
  height: 93%;
  width: 15%;
  float: left;
  background: #b3d8ff;
}
</style>
