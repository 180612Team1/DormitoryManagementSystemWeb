<template>
  <div class="pageContent">
    <h1 class="searchRecord">维修申请</h1>
    <div class="searchInfo">
      <div class="applyGoods">
        <div style="width: 100px">申请物品</div>
        <el-input v-model="applyGoods"></el-input>
      </div>
      <div class="applyReason">
        <div style="width: 100px">申请原因</div>
        <el-input v-model="applyReason"></el-input>
      </div>
      <el-button
        class="applyBtn"
        @click="handleApply()"
        icon="el-icon-plus"
        circle
      ></el-button>
    </div>
    <h1 class="searchRecord">申请记录</h1>
    <div class="infoTable">
      <el-table :data="recordInfo" height="400" style="width: 76%">
        <el-table-column
          align="center"
          prop="roomId"
          label="报修宿舍"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="repairGoods"
          label="报修物品"
          width="270"
        >
        </el-table-column>
        <el-table-column align="center" prop="repairReason" label="报修理由">
        </el-table-column>
        <el-table-column
          align="center"
          prop="repairTime"
          label="报修时间"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="报修状态"
          width="300"
        >
          <template slot-scope="scope">
            <span style="color: #f56c6c" v-if="scope.row.status === 0"
              >未处理</span
            >
            <span style="color: #42b983" v-if="scope.row.status === 1"
              >已处理</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'repairApply',
  data() {
    return {
      recordInfo: [],

      applyGoods: '',
      applyReason: '',

      buildId: this.$store.state.buildId,
      roomId: this.$store.state.roomId || '',

      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1 > 10 ? `${new Date().getMonth() + 1}` : `0${new Date().getMonth() + 1}`,
      day: new Date().getDate() > 10 ? `${new Date().getDate()}` : `0${new Date().getDate()}`
    }
  },
  methods: {
    async handleMounted() {
      let res = await this.$axios({
        method: 'GET',
        url: 'repair/stuGetRepair',
        params: {
          roomId: this.roomId
        }
      })
      this.recordInfo = []
      res.data.repairInfo = res.data.repairInfo.sort(function (a, b) { return a.repairTime > b.repairTime ? -1 : 1 })
      this.recordInfo.push(...res.data.repairInfo)
    },
    async handleApply() {
      await this.$axios({
        method: 'POST',
        url: 'repair/addRepair',
        params: {
          repairTime: this.dateNow,
          repairGoods: this.applyGoods,
          repairReason: this.applyReason,
          buildId: this.buildId,
          roomId: this.roomId
        }
      })
      this.handleMounted()
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

<style lang='less' scoped>
.pageContent {
  width: 100%;
  height: 100%;
  padding: 3%;
  overflow: auto;
  .searchRecord {
    margin: 0;
    padding-left: 15px;
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    color: #303133;
    font-size: 2em;
  }
  .searchInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 76%;
    height: 80px;
    line-height: 80px;
    margin: 30px 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
    .applyGoods,
    .applyReason {
      width: 400px;
      display: flex;
      flex-direction: row;
      margin-left: 40px;
    }
    .applyBtn {
      margin-left: auto;
      margin-right: 120px;
    }
  }
  .infoTable {
    text-align: center;
    height: 600px;
    margin-top: 40px;
  }
}
</style>
