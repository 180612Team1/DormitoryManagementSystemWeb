<template>
  <div class="pageContent">
    <h1 class="searchRecord">记录筛选</h1>
    <div class="searchInfo"></div>
    <h1 class="searchRecord">记录详情</h1>
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
          prop="repairReason"
          label="报修时间"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="repairReason"
          label="报修状态"
          width="300"
        >
          <button v-if="status === 1">处理</button>
          <span>已处理</span>
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
      role: this.$store.state.role,

      recordInfo: [{}]
    }
  },
  methods: {
    async handleMounted() {
      // let res = await this.$axios({
      //   method: 'GET',
      //   url: 'http://localhost:8091/repair/'
      // })
      // console.log(res)
    }
  },
  mounted() {
    this.handleMounted()
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
    width: 76%;
    height: 60px;
    line-height: 60px;
    margin: 30px 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
    display: flex;
    align-items: center;
  }
  .infoTable {
    text-align: center;
    height: 600px;
    margin-top: 40px;
  }
}
</style>
