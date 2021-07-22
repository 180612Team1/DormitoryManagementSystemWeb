<template>
  <div class="pageContent">
    <div style="display: flex; width: 100%">
      <h1 class="noticeTitle">公告概览</h1>
      <el-button
        v-if="role === 0 || role === 1"
        type="primary"
        round
        style="margin-left: 60%"
        @click="handleOpenAdd"
        >新增公告</el-button
      >
    </div>
    <div>
      <div class="noticeContent" v-for="i in currentNotices" :key="i.id">
        <!-- {{i.id}} -->
        <div id="noticeName" @click="handleDialog(i.id)">
          {{ i.noticeName }}
        </div>

        <div id="trueName">{{ i.role }}{{ i.trueName }}</div>
        <div id="noticeTime">{{ i.noticeTime }}</div>
        <div id="deleteNotice">
          <i
            v-if="i.schoolId === schoolId || role == 0"
            @click="handleDelete(i.id, i.noticeName)"
            class="el-icon-delete"
          ></i>
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      top="30vh"
      :modal="false"
      :center="true"
    >
      <div slot="title" class="header-title">
        <span>{{ dialogTitle }}</span>
      </div>
      <span v-html="dialogContent">{{ dialogContent }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="deleteVisible"
      width="30%"
      :modal="false"
      :center="true"
    >
      <div slot="title">
        <span>确定删除{{ deleteTitle }}吗</span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="新增公告"
      :visible.sync="dialogFormVisible"
      :modal="false"
      :center="true"
    >
      <div>
        <span>公告名称<el-input v-model="addTitle"></el-input></span>
      </div>
      <div>
        <span>
          公告内容
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 15 }"
            placeholder="请输入内容"
            v-model="addContent"
          >
          </el-input>
        </span>
      </div>
      <div>
        <span>可见范围</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in buildings"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddNotice()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
  data() {
    return {
      role: this.$store.state.role,
      schoolId: this.$store.state.schoolId,
      notice: [],
      buildings: [],
      dialogVisible: false,
      dialogContent: null,
      dialogTitle: null,

      deleteTitle: null,

      page: 1,
      pageSize: 5,

      deleteVisible: false,

      dialogFormVisible: false,
      addTitle: '',
      addContent: '',
      value: null,

      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1 > 10 ? `${new Date().getMonth() + 1}` : `0${new Date().getMonth() + 1}`,
      day: new Date().getDate() > 10 ? `${new Date().getDate()}` : `0${new Date().getDate()}`

    }
  },
  methods: {
    pageChange(val) {
      this.page = val
    },
    async handleMounted() {
      let res = await this.$axios({
        method: 'get',
        url: 'http://localhost:8091/notice/getAllNotices',
        params: {
          schoolId: this.schoolId
        }
      })
      for (let k in res.data.notice) {
        let result = await this.$axios({
          method: 'get',
          url: 'http://localhost:8091/user/getUserRoleAndTrueName',
          params: {
            schoolId: res.data.notice[k].schoolId
          }
        })
        let { trueName, role } = result.data
        res.data.notice[k]['trueName'] = trueName
        res.data.notice[k]['role'] = (Number(role) === 0 ? `系统管理员` : role === 1 ? `宿舍管理员` : `学生`)
      }
      this.notice = res.data.notice
    },
    async handleDialog(id) {
      this.dialogVisible = true
      let dialogContent = await this.notice.filter(item => item.id === id)[0].noticeContent
      let dialogTitle = await this.notice.filter(item => item.id === id)[0].noticeName
      this.dialogContent = dialogContent
      this.dialogTitle = dialogTitle
    },
    async handleDelete(id, name) {
      this.$alert(name, '删除公告', {
        confirmButtonText: '确定',
        callback: async action => {
          let res = await this.$axios({
            method: 'GET',
            url: 'http://localhost:8091/notice/deleteNoticeById',
            params: {
              id: id
            }
          })
          if (res.data === true) {
            this.handleMounted()
            this.$message({
              type: 'success',
              message: `删除${name}成功`
            })
          }
        }
      })
      // this.deleteVisible = true
      this.deleteTitle = name
    },
    async handleOpenAdd() {
      let res = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/build/getAllBuildId'
      })
      if (this.role === 0) {
        this.buildings.push({ value: 0, label: 'all' })
        res.data.allBuildId.forEach(item => this.buildings.push({ value: item.buildId, label: item.buildId }))
      } else {
        this.buildings.push({ value: this.$store.state.buildId, label: this.$store.state.buildId })
      }
      this.dialogFormVisible = true
    },
    async handleAddNotice() {
      await this.$axios({
        method: 'POST',
        url: 'http://localhost:8091/notice/addNotice',
        params: {
          schoolId: this.schoolId,
          noticeName: this.addTitle,
          noticeContent: this.addContent.replace(/\s/g, '<br/>'),
          noticeTime: this.dateNow,
          noticeForBuildId: this.value
        }
      })
      this.handleMounted()
      this.clearAdd()
      this.dialogFormVisible = false
    },
    clearAdd() {
      this.addTitle = ''
      this.addContent = ''
    }
  },
  created() {
    //
  },
  components: {
  },
  computed: {
    total() {
      return this.notice.length
    },
    currentNotices() {
      let list = this.notice.slice() || []
      let size = this.pageSize
      let page = this.page - 1
      return list.splice(page * size, size)
    },
    dateNow() {
      return `${this.year}-${this.month}-${this.day}`
    }
  },
  watch: {
    currentNotices: {
      handler: function (val) {
        let pageNow = this.page
        if (val.length === 0) {
          // this.$router.go(0)
          this.page = pageNow - 1
        }
      },
      deep: true
    }
  },
  mounted() {
    this.handleMounted()
  },
  beforeCreate() { /* */ }, // 生命周期 - 创建之前
  beforeMount() { /* */ }, // 生命周期 - 挂载之前
  beforeUpdate() { /* */ }, // 生命周期 - 更新之前
  updated() { /* */ }, // 生命周期 - 更新之后
  beforeDestroy() { /* */ }, // 生命周期 - 销毁之前
  destroyed() { /* */ }, // 生命周期 - 销毁完成
  activated() { /* */ } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
.pageContent {
  width: 100%;
  height: 100%;
  // box-sizing: border-box;
  padding: 5%;
  // border: 1px solid rgb(230, 235, 245);
  // border-radius: 4px;
  // box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  // background: rgb(255, 255, 255);
  // background: red;
  .noticeTitle {
    color: #303133;
    margin: 0;
    font-size: 2em;
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    padding-left: 15px;
  }
  .noticeContent {
    position: relative;
    box-sizing: border-box;
    width: 75%;
    height: 5rem;
    margin-top: 2%;
    background: darkblue;
    border: 1px solid rgb(230, 235, 245);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    background: rgb(255, 255, 255);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    div {
      position: absolute;
    }
    #noticeName {
      cursor: pointer;
      font-size: 1.5rem;
      left: 2rem;
      top: 1.6rem;
    }
    #trueName {
      top: 1rem;
      right: 4rem;
    }
    #noticeTime {
      bottom: 1rem;
      right: 4rem;
      color: #777777;
    }
    #deleteNotice {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      bottom: 1.5rem;
      right: 1rem;
      color: #777777;
      font-size: 2rem;
    }
  }
  .block {
    position: absolute;
    left: 40rem;
    bottom: 20rem;
  }
}
</style>
