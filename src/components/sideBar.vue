<template>
  <div class="sideBarContent">
    <div class="btnBox" v-for="(i, index) in menu" :key="i.id">
      <button
        class="btn"
        :class="{ show: selectBtn == index }"
        @click="handleClick(index, i.path)"
      >
        {{ i.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data() {
    return {
      role: this.$store.state.role,
      selectBtn: null
    }
  },
  methods: {
    handleClick(index, path) {
      this.selectBtn = index
      this.$router.push(`${path}`)
    }
  },
  computed: {
    menu() {
      let admin = [
        {
          id: 1,
          name: '公告信息',
          path: '/notice'
        },
        {
          id: 2,
          name: '宿舍管理员管理',
          path: '/houseparentManage'
        },
        {
          id: 3,
          name: '学生管理',
          path: '/studentManage'
        },
        {
          id: 6,
          name: '宿舍楼管理',
          path: '/buildManage'
        },
        {
          id: 4,
          name: '报修记录',
          path: '/repairRecord'
        },
        {
          id: 5,
          name: '个人信息',
          path: '/info'
        }
      ]
      let houseparent = [
        {
          id: 1,
          name: '公告信息',
          path: '/notice'
        },
        {
          id: 2,
          name: '学生管理',
          path: '/studentManage'
        },
        {
          id: 3,
          name: '报修记录',
          path: '/repairRecord'
        },
        {
          id: 4,
          name: '个人信息',
          path: '/info'
        }
      ]
      let student = [
        {
          id: 1,
          name: '公告信息',
          path: '/notice'
        },
        {
          id: 2,
          name: '宿舍报修申请',
          path: '/repairApply'
        },
        {
          id: 3,
          name: '个人信息',
          path: '/info'
        }
      ]
      return this.role === 0 ? admin : this.role === 1 ? houseparent : student
    }
  },
  watch: {
    // role: {
    //   handler: function() {
    //     return this.menu
    //   }
    // },
    // deep: true,
    // immediate: true

  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('selectBtn')) {
      this.selectBtn = sessionStorage.getItem('selectBtn')
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('selectBtn', this.selectBtn)
    })
  }

}
</script>

<style lang='less' scoped>
.sideBarContent {
  z-index: 3;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  border:1px solid #30415686;
  border-radius: 0 0px 0px 0;
  position: absolute;
  top: 7%;
  height: 92.8%;
  width: 15%;
  float: left;
  background: #304156;
  .btnBox {
    margin: 0.7rem 0;
    background: none;
    height: 2.5rem;
    border: 0px solid black;
    .btn {
      color: rgb(191, 203, 217);
      cursor: pointer;
      width: 100%;
      border: none;
      // border: 1px solid #7dbcff;
      // background:#7dbcff;
      // background:#abcef3;
      background: transparent;
      height: 2.5rem;
    }
    .show {
      background: #263445;
      color: rgb(64, 158, 255);
    }
  }
}
</style>
