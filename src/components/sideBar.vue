<template>
  <div class="sideBarContent">
    <div class="btnBox" v-for="(i, index) in menu" :key="i.id">
      <button class="btn" :class="{show: selectBtn == index}"  @click="selectBtn = index">{{i.name}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data () {
    return {
      role: 0,
      selectBtn: 0
    }
  },
  methods: {

  },
  computed: {
    menu () {
      let admin = [
        {
          id: 1,
          name: '公告信息'
          // path: '/notice'
        },
        {
          id: 2,
          name: '宿舍管理员信息'
          // path: '/notice'
        },
        {
          id: 3,
          name: '考勤任务'
          // path: '/notice'
        }
      ]
      let houseparent = [
        {
          id: 1,
          name: '公告信息'
          // path
        },
        {
          id: 2,
          name: '个人信息'
        }
      ]
      let student = [
        {
          id: 1,
          name: '个人信息'
        },
        {
          id: 2,
          name: '个人信息'
        }
      ]
      return this.role === 0 ? admin : this.role === 1 ? houseparent : student
    }
  },
  watch: {

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
  background: #fff;
  .btnBox{
    margin:0.7rem 0;
    background:none;
    height:2.5rem;
    border:0px solid black;
    .btn{
      cursor: pointer;
      width:100%;
      border:none;
      // border: 1px solid #7dbcff;
      // background:#7dbcff;
      // background:#abcef3;
      background: transparent;
      height:2.5rem;
    }
    .show{
       background:#b2d5fa;
    }
  }
}
</style>
