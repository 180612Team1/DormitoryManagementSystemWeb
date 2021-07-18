<template>
  <div class="pageContent">
    <h1 class="searchRecord">维修申请</h1>
    <div class="searchInfo"></div>
    <h1 class="searchRecord">申请记录</h1>
    <div class="infoTable">
      <el-table :data="recordInfo" height="400" style="width: 76%"> </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'repairApply'

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
    height: 160px;
    line-height: 160px;
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
