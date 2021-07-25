<template>
  <div class="pageContent">
    <h1 class="searchRecord">
      学生查找&nbsp;&nbsp;&nbsp;
      <div
        v-if="role === 0"
        @click="dialogFormVisible = true"
        class="addStu"
        style="font-size: 18px"
      >
        新增学生
      </div>
    </h1>
    <div class="searchInfo">
      <div style="margin-left: 50px">
        <el-select class="searchInput" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          style="margin-left: 20px; width: 200px"
          v-model="searchValue"
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
    <h1 class="searchRecord">信息详情</h1>
    <div class="infoTable">
      <el-table :data="displayInfo" height="400" style="width: 76%">
        <!-- 姓名，学号，手机号，房间号，楼号 -->
        <el-table-column
          align="center"
          prop="trueName"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="schoolId"
          label="学号"
          width=""
        ></el-table-column>
        <el-table-column
          align="center"
          prop="phoneNumber"
          label="手机号"
          width=""
        ></el-table-column>
        <el-table-column
          align="center"
          prop="roomId"
          label="房间号"
          width=""
        ></el-table-column>
        <el-table-column
          v-if="role === 0"
          align="center"
          prop="buildId"
          label="楼号"
          width=""
        ></el-table-column>
      </el-table>
    </div>
    <el-dialog
      :center="true"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="新增学生"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            style="width: 200px"
            v-model="form.trueName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input
            style="width: 200px"
            v-model="form.schoolId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            style="width: 200px"
            v-model="form.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            style="width: 200px"
            v-model="form.passWord"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input
            style="width: 200px"
            v-model="form.phoneNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属宿舍楼" :label-width="formLabelWidth">
          <el-select style="width: 200px" v-model="form.buildId" placeholder="">
            <el-option
              v-for="item in allBuildId"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属宿舍" :label-width="formLabelWidth">
          <span>
            {{ form.buildId }}
          </span>
          <el-input
            style="width: 100px"
            v-model="form.roomId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddStu()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'studentManage',
  data() {
    return {
      role: this.$store.state.role,
      buildId: this.$store.state.buildId,

      displayInfo: [],
      saveList: [],
      allBuildId: [],

      options: [{
        value: 'buildId',
        label: '楼号'
      }, {
        value: 'roomId',
        label: '宿舍号'
      }, {
        value: 'trueName',
        label: '姓名'
      }, {
        value: 'schoolId',
        label: '学号'
      }],
      value: 'buildId',
      searchValue: '',

      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1 > 10 ? `${new Date().getMonth() + 1}` : `0${new Date().getMonth() + 1}`,
      day: new Date().getDate() > 10 ? `${new Date().getDate()}` : `0${new Date().getDate()}`,

      dialogFormVisible: false,
      form: {
        userName: '',
        passWord: '',
        schoolId: '',
        trueName: '',
        phoneNumber: '',
        buildId: '',
        roomId: ''

      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async handleMounted() {
      let res = await this.$axios({
        method: 'GET',
        url: 'user/getAllStudent',
        params: {
          role: this.role,
          buildId: this.buildId || ''
        }
      })

      let result = await this.$axios({
        method: 'GET',
        url: 'build/getAllBuildId'
      })
      result.data.allBuildId.forEach(item => this.allBuildId.push({ value: item.buildId, label: item.buildId }))
      this.displayInfo = []
      this.displayInfo.push(...res.data)
      this.saveList = this.displayInfo
    },
    async handleSelect() {
      switch (this.value) {
        case 'buildId': this.displayInfo = this.saveList.filter(item => item.buildId === this.searchValue)
          break
        case 'roomId': this.displayInfo = this.saveList.filter(item => item.roomId === this.roomId)
          break
        case 'trueName': this.displayInfo = this.saveList.filter(item => item.trueName === this.searchValue)
          break
        case 'schoolId': this.displayInfo = this.saveList.filter(item => item.schoolId === this.searchValue)
          break

        default:
          break
      }
    },

    handleRefresh() {
      this.searchValue = ''
      this.value = 'buildId'
      this.handleMounted()
    },

    async handleAddStu() {
      const { userName, passWord, schoolId, trueName, phoneNumber, buildId, roomId } = this.form
      let res = await this.$axios({
        method: 'POST',
        url: 'user/addStu',
        params: {
          userName: userName,
          passWord: passWord,
          schoolId: schoolId,
          trueName: trueName,
          phoneNumber: phoneNumber,
          buildId: buildId,
          roomId: roomId,

          checkTime: this.dateNow,
          updateTime: this.dateNow

        }
      })
      if (res.data) {
        this.form.userName = ''
        this.form.passWord = ''
        this.form.schoolId = ''
        this.form.trueName = ''
        this.form.phoneNumber = ''
        this.handleMounted()
      }
    }
  },
  mounted() {
    this.handleMounted()
  },
  computed: {
    dateNow() {
      return `${this.year}-${this.month}-${this.day}`
    }
  }

}
</script>

<style lang="less" scoped>
.pageContent {
  width: 100%;
  height: 100%;
  padding: 3%;
  overflow: auto;
  .searchRecord {
    display: flex;
    margin: 0;
    padding-left: 15px;
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    color: #303133;
    font-size: 2em;
    align-items: center;
    .addStu {
      cursor: pointer;
      border: 1px solid #000;
      border-radius: 20px;
      margin-top: 4px;
      padding: 5px 8px;
    }
  }
  .searchInfo {
    display: flex;
    justify-content: space-between;
    width: 76%;
    height: 80px;
    line-height: 60px;
    margin: 30px 0;
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
