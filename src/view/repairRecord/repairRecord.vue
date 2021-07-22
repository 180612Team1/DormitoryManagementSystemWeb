<template>
  <div class="pageContent">
    <h1 class="searchRecord">记录筛选</h1>
    <div class="searchInfo">
      <div class="searchInput">
        <span>报修状态：</span>
        <el-select  v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button
        @click="displayStatus = value"
        class="searchBtn"
        icon="el-icon-search"
        circle
      ></el-button>
    </div>
    <h1 class="searchRecord">记录详情</h1>
    <div class="infoTable">
      <el-table :data="displayInfo" height="400" style="width: 76%">
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
            <el-button
              @click="dealApply(scope.row.id)"
              round
              size="mini"
              v-if="scope.row.status === 0"
              >处理</el-button
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
  name: 'repairRecord',
  data() {
    return {
      displayStatus: '0',

      role: this.$store.state.role,
      buildId: this.$store.state.buildId,
      recordInfo: [],
      displayInfo: [],

      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '未处理'
      }, {
        value: '2',
        label: '已处理'
      }],
      value: '0'
    }
  },
  methods: {
    async handleMounted() {
      let res = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/repair/adminGetRepair',
        params: {
          role: this.role,
          buildId: this.buildId || ''
        }
      })
      res.data.repairInfo = res.data.repairInfo.sort(function (a, b) { return a.repairTime > b.repairTime ? -1 : 1 })
      this.recordInfo.push(...res.data.repairInfo)
    },

    async dealApply(id) {
      let res = await this.$axios({
        method: 'GET',
        url: 'http://localhost:8091/repair/dealOneRepair',
        params: {
          id: id
        }
      })
      if (res.data === true) {
        for (let v of this.recordInfo) {
          if (v.id === id) {
            v.status = 1
            this.$message({
              type: 'success',
              message: '处理成功'

            })
          }
        }
      }
    }
  },
  mounted() {
    this.handleMounted()
  },
  watch: {
    displayStatus: {
      handler: function (val) {
        if (val === '0') {
          this.displayInfo = this.recordInfo
        }
        if (val === '1') {
          this.displayInfo = this.recordInfo.filter(item => item.status === 0)
        }
        if (val === '2') {
          this.displayInfo = this.recordInfo.filter(item => item.status === 1)
        }
      },
      deep: true,
      immediate: true
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
  .searchRecord {
    margin: 0;
    padding-left: 15px;
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    color: #303133;
    font-size: 2em;
  }
  .searchInfo {
    display: flex;
    justify-content: space-between;
    width: 76%;
    height: 60px;
    line-height: 60px;
    margin: 30px 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
    display: flex;
    align-items: center;
    .searchInput {
      margin-left: 70px;
    }
    .searchBtn {
      margin-right: 90px;
    }
  }
  .infoTable {
    text-align: center;
    height: 600px;
    margin-top: 40px;
  }
}
</style>
