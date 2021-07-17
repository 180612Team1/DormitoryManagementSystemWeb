<template>
  <div class="pageContent">
    <h1 class="addTitle">添加管理员</h1>
    <div class="addContent">
      <div class="adminCount">
        <div class="countAll">总数：{{ allAdmin.length }}</div>
        <div class="countAdmin">
          <i class="el-icon-user"></i>系统管理员：{{ admin.length }}
        </div>
        <div class="countHp">
          <i class="el-icon-user"></i>宿舍管理员：{{ houseParent.length }}
        </div>
      </div>
      <div class="adminInfo">
        <div class="addUsername">
          <div style="margin-bottom: 10px">管理员账号</div>
          <el-input v-model="addUsername"></el-input>
        </div>
        <div class="addPassword">
          <div style="margin-bottom: 10px">管理员密码</div>
          <el-input v-model="addPassword" show-password></el-input>
        </div>
        <div class="addSchoolId">
          <div style="margin-bottom: 10px">学工号</div>
          <el-input v-model="addSchoolId"></el-input>
        </div>
        <div class="addPhoneNumber">
          <div style="margin-bottom: 10px">手机号</div>
          <el-input v-model="addPhoneNumber"></el-input>
        </div>
        <div class="addTrueName">
          <div style="margin-bottom: 10px">真实姓名</div>
          <el-input v-model="addTrueName"></el-input>
        </div>
        <div class="addBuildId">
          <div style="margin-bottom: 10px">管理楼号</div>
          <el-select v-model="addBuildId" placeholder="请选择">
            <el-option
              v-for="item in buildings"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="roleSelect">
          <span>选择身份</span>
          <el-radio v-model="addRole" label="1">宿舍管理员</el-radio>
          <el-radio v-model="addRole" label="0">系统管理员</el-radio>
        </div>
        <el-button
          class="addBtn"
          style="width: 50px; height: 50px"
          type="primary"
          icon="el-icon-plus"
          @click="handleAddAdmin()"
          :disabled="disabled"
          circle
        ></el-button>
      </div>
    </div>
    <!-- {{allAdmin}} -->
    <h1 class="infoTitle">已有管理员列表</h1>
    <div class="infoTable">
      <el-table :data="allAdmin" height="400" style="width: 76%">
        <el-table-column
          align="center"
          prop="trueName"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="schoolId"
          label="工号"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="phoneNumber" label="手机号">
        </el-table-column>
        <el-table-column align="center" prop="trueRole" label="权限">
        </el-table-column>
        <el-table-column align="center" prop="buildId" label="管理宿舍楼">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'houseparentManage',
  data() {
    return {
      role: this.$store.state.role,

      admin: [],
      houseParent: [],

      buildings: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1 > 10 ? `${new Date().getMonth() + 1}` : `0${new Date().getMonth() + 1}`,
      day: new Date().getDate() > 10 ? `${new Date().getDate()}` : `0${new Date().getDate()}`,

      addUsername: null,
      addPassword: null,
      addSchoolId: null,
      addPhoneNumber: null,
      addTrueName: null,

      addBuildId: null,
      addRole: '1'

    }
  },
  methods: {
    async handleMounted() {
      let res = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/user/getAllAdmin'
      })
      // console.log(res.data)
      for (let v of res.data) {
        v.role === 0 ? this.admin.push(v) : this.houseParent.push(v)
      }
      let result = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/build/getAllBuildId'
      })
      result.data.allBuildId.forEach(item => this.buildings.push({ value: item.buildId, label: item.buildId }))
    },
    async handleAddAdmin() {
      const { addSchoolId, addUsername, addPassword, addPhoneNumber, addTrueName, addRole, addBuildId } = this.$data
      let res = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/user/addAdmin',
        params: {
          userName: addUsername,
          schoolId: addSchoolId,
          passWord: addPassword,
          phoneNumber: addPhoneNumber,
          trueName: addTrueName,
          role: Number(addRole),
          buildId: addBuildId,
          checkTime: this.dateNow
        }
      })
      console.log(res)
      if (res.data.code === '1000') {
        this.$message({
          message: res.data.message,
          type: 'success',
          duration: 1000
        })
        this.$router.go(0)
      } else if (res.data.code === '1001') {
        this.$message({
          message: res.data.message,
          type: 'error',
          duration: 1000
        })
      } else {
        this.$message({
          message: 'fail',
          type: 'error',
          duration: 1000
        })
      }
    }
  },
  created() {
    if (this.role !== 0) {
      this.$router.push('/')
    }
  },
  mounted() {
    this.handleMounted()
    console.log(this.allAdmin)
  },
  computed: {
    allAdmin() {
      let table = [...this.admin, ...this.houseParent]
      for (let v of table) {
        if (v.role === 0) {
          v.trueRole = '系统管理员'
          v.buildId = '全体宿舍'
        } else if (v.role === 1) { v.trueRole = '宿舍管理员' }
      }
      console.log(table)
      return table
    },
    dateNow() {
      return `${this.year}-${this.month}-${this.day}`
    },
    disabled() {
      return !(this.addPhoneNumber && this.addTrueName && this.addBuildId && this.addRole && this.addUsername && this.addPassword)
    }
  }

}
</script>

<style lang='less' scoped>
.pageContent {
  width: 100%;
  height: 100%;
  padding: 3%;
  overflow: scroll;
  .addTitle {
    color: #303133;
    margin: 0;
    font-size: 2em;
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    padding-left: 15px;
  }
  .addContent {
    width: 80%;
    display: flex;
    flex-direction: row;
    // background: darkblue;
    .adminCount {
      background: #fff;
      width: 330px;
      height: 500px;
      margin-top: 40px;
      margin-right: 30px;
      border-radius: 5px;
      display: flex;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      // text-align: center;
      .countAll {
        color: #606266;
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .countAdmin,
      .countHp {
        box-sizing: border-box;
        width: 100%;
        height: 4rem;
        line-height: 2rem;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 1rem;
        margin-bottom: 1rem;
        color: #fff;
        font-weight: 400;
      }
      .countAdmin {
        background: #1474ced0;
      }
      .countHp {
        background: #c44e2ad0;
      }
    }
    .adminInfo {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      background: #fff;
      width: 1000px;
      margin-top: 40px;
      height: 500px;
      border-radius: 5px;
      padding: 20px;
      // background: orange;
      .addBtn {
        position: absolute;
        top: 650px;
        left: 1300px;
      }
    }
    .adminInfo > div {
      margin-top: 10px;
    }
  }
  .infoTitle {
    color: #303133;
    margin: 0;
    font-size: 2em;
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    margin-top: 40px;
    padding-left: 15px;
  }
  .infoTable {
    text-align: center;
    height: 600px;
    margin-top: 40px;
  }
}
</style>
