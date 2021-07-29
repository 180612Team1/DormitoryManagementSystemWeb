<template>
  <div class="pageContent">
    <!-- 添加 第一栏 -->
    <h1 class="addTitle">添加管理员</h1>
    <div class="addContent">
      <!-- 添加 左边 -->
      <div class="adminCount">
        <div class="countAll">总数：{{ allAdmin.length }}</div>
        <div class="countAdmin">
          <i class="el-icon-user"></i>系统管理员：{{ admin.length }}
        </div>
        <div class="countHp">
          <i class="el-icon-user"></i>宿舍管理员：{{ houseParent.length }}
        </div>
      </div>
      <!--添加  右边  -->
      <div class="adminInfo">
        <div class="addUsername">
          <div style="margin-bottom: 10px">管理员账号</div>
          <el-input v-model="addUsername" placeholder="请输入账号"></el-input>
        </div>
        <div class="addPassword">
          <div style="margin-bottom: 10px">管理员密码</div>
          <el-input
            v-model="addPassword"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </div>
        <div class="addSchoolId">
          <div style="margin-bottom: 10px">学工号</div>
          <el-input v-model="addSchoolId" placeholder="请输入学工号"></el-input>
        </div>
        <div class="addPhoneNumber">
          <div style="margin-bottom: 10px">手机号</div>
          <el-input
            v-model="addPhoneNumber"
            placeholder="请输入手机号"
            :suffix-icon="iconChoose"
          ></el-input>
        </div>
        <div class="addTrueName">
          <div style="margin-bottom: 10px">真实姓名</div>
          <el-input
            v-model="addTrueName"
            placeholder="请输入真实姓名"
          ></el-input>
        </div>

        <div class="roleSelect">
          <span>选择身份</span>
          <el-radio v-model="addRole" label="1">宿舍管理员</el-radio>
          <el-radio v-model="addRole" label="0">系统管理员</el-radio>
        </div>

        <div class="addBuildId" v-if="selectshow">
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

        <div class="btnPosition">
          <el-button
            class="addBtn"
            style="width: 50px; height: 50px"
            type="primary"
            icon=""
            @click="handleAddAdmin()"
            :disabled="disabled"
            circle
            >添加</el-button
          >
        </div>
      </div>
    </div>
    <!-- 显示查询 -->
    <!-- {{allAdmin}} -->
    <h1 class="infoTitle">已有管理员列表</h1>
    <!-- 弹框 :before-close="handleClose"-->
    <el-dialog
      title="管理员信息修改"
      :center="true"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      style="text-align: left !important"
    >
      <el-form :model="form" label-width="100px" ref="form">
        <el-form-item label="姓名" prop="trueName">
          <el-input v-model="form.trueName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="schoolId">
          <el-input
            v-model="form.schoolId"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="trueRole">
          <el-input v-model="form.trueRole" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理宿舍楼" prop="buildId">
          <el-input v-model="form.buildId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button type="primary" @click="dialog = false">取 消</el-button>
        <el-button type="success" @click="saveInfo(form)">保存</el-button>
      </div>
    </el-dialog>

    <!--搜索 查询 -->
    <div class="searchInfo">
      <div style="margin-left: 50px">
        搜索查询：
        <el-input
          style="margin-left: 20px; width: 300px"
          v-model="searchValue"
          placeholder="请输入姓名或工号"
        ></el-input>
      </div>
      <div style="margin-right: 200px">
        <el-button
          type="primary"
          @click="handleSelect()"
          class="searchBtn"
          icon="el-icon-search"
          circle
        ></el-button>
        <el-button
          @click="handleRefresh()"
          icon="el-icon-refresh"
          circle
        ></el-button>
      </div>
    </div>

    <div class="infoTable">
      <el-table :data="displayInfo" height="400" style="width: 75%">
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
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleChange(scope.$index, scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-dialog
  title="提示"
  :center="true"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"

  :visible.sync="dialog"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialog = false">确 定</el-button>
  </span>
</el-dialog> -->
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

      // addUsername: '',
      // addPassword: '',
      // addSchoolId: '',
      // addPhoneNumber: '',
      // addTrueName: '',

      // addBuildId: '',
      addRole: '1',

      searchValue: '',
      saveList: [],
      displayInfo: [],
      dialog: false,
      form: {}

    }
  },
  methods: {
    async handleMounted() {
      let res = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/user/getAllAdmin'
      })
      // console.log(res)

      this.admin = []
      this.houseParent = []
      this.buildings = []

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
      console.log(addBuildId)
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
    },

    async handleSelect() {
      console.log(this.saveList)
      this.displayInfo = this.saveList.filter(
        item => item.trueName === this.searchValue || item.schoolId == this.searchValue
      )
      if (this.searchValue == '') {
        alert('请输入正确的姓名或工号')
      }
    },

    handleRefresh() {
      this.searchValue = ''

      this.handleMounted()
    },

    async handleDelete(index) {
      this._index1 = index
      console.log(this._index1)
      let name = this.saveList[this._index1].trueName
      if (confirm('确定删除吗?')) { console.log('删除') }
      this.$alert(this.saveList[ this._index1].trueName, '删除管理者', {

        confirmButtonText: '确定',

        callback: async action => {
          let res = await this.$axios({
            method: 'GET',
            url: 'http://localhost:8091/user/deleteAdminBySchoolId', // deleteAdminBySchoolId
            params: {
              schoolId: this.saveList[ this._index1].schoolId
            }
          })
          console.log('发送删除请求' + this.saveList[ this._index1].schoolId)
          console.log(res.data)
          if (res.data === true) {
            //  if (true) {
            this.handleMounted()
            this.$message({
              type: 'success',
              message: `删除${name}成功`
            })
          }
        }

      })
    },

    handleChange(id, row) {
      this.dialog = true
      this._index = id
      this.form = Object.assign({}, row)
      console.log(this.form)
    },

    async saveInfo(form) {
      this.saveList[this._index] = this.form

      this.dialog = false
      this.form = {}
      console.log(this.saveList)
      console.log(this.saveList[this._index].schoolId)
      // callback: async action => {
      let res = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/user/deleteAdminBySchoolId', // deleteAdminBySchoolId
        params: {
          schoolId: this.saveList[this._index].schoolId
        }
      })
      console.log('发送删除请求' + this.saveList[this._index].schoolId)
      console.log(res.data)

      let rest = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/user/addAdmin',
        params: {
          userName: this.saveList[this._index].userName,
          schoolId: this.saveList[this._index].schoolId,
          passWord: this.saveList[this._index].passWord,
          phoneNumber: this.saveList[this._index].phoneNumber,
          trueName: this.saveList[this._index].trueName,
          role: Number(this.saveList[this._index].role),
          buildId: this.saveList[this._index].buildId,
          checkTime: this.dateNow
        }
      })

      console.log(rest.data.code)
      if (rest.data.code === '1000') {
        this.handleMounted()
        this.$message({
          type: 'success',
          message: `修改${name}成功`
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
  },
  computed: {
    // change(){
    //   console.log('change')
    // },

    selectshow() {
      // console.log(typeof this.addRole,this.addRole)
      if (this.addRole == '0') {
        // this.addBuildId='全体宿舍';
        this.addBuildId = 'All'
        console.log('addBuildId:' + this.addBuildId)
        return false
      } else {
        return true
      }
    },

    // addUnAndPd(){
    //   if (this.addUsername==this.passWord){
    //     alert('用户名和密码不能一样')
    //   }
    // },
    iconChoose() {
      if (this.addPhoneNumber == null) {
        return ''
      } else if (this.addPhoneNumber.length == '11') {
        console.log('true')
        return 'el-icon-success'
      } else {
        return 'el-icon-error'
      }
    },

    allAdmin() {
      let table = [...this.admin, ...this.houseParent]
      for (let v of table) {
        if (v.role === 0) {
          v.trueRole = '系统管理员'
          v.buildId = '全体宿舍'
        } else if (v.role === 1) { v.trueRole = '宿舍管理员' }
      }
      this.displayInfo = table
      this.saveList = table
      return table
    },
    dateNow() {
      return `${this.year}-${this.month}-${this.day}`
    },
    disabled() {
      if (this.addRole == '0') {
        return !(this.addPhoneNumber && this.addTrueName && this.addRole && this.addUsername && this.addPassword)
      } else {
        return !(this.addPhoneNumber && this.addTrueName && this.addBuildId && this.addRole && this.addUsername && this.addPassword)
      }
    }
  }

}
</script>

<style lang='less' scoped>
.pageContent {
  width: 100%;
  height: 100%;
  padding: 3%;
  overflow: auto;
  .addTitle {
    color: #303133;
    margin: 0;
    font-size: 2em;
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    padding-left: 15px;
  }
  .addContent {
    width: 75%;
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
      position: relative;
      // background: orange;

      .addBtn {
        position: absolute;
        bottom: 25px;
        right: 25px;
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
  .searchInfo {
    display: flex;
    justify-content: space-between;
    width: 75%;
    height: 80px;
    line-height: 60px;
    margin: 20px 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
    align-items: center;
    .searchInput {
      width: 120px;
    }
  }
  .infoTable {
    text-align: center;
    height: 600px;
    margin-top: 40px;
  }
}
</style>
