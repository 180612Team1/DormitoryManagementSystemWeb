<template>
  <div class="pageContent">
    <h1 class="addBuild">创建宿舍楼</h1>
    <div class="addInfo">
      <div class="addItem">
        <div style="width: 150px">宿舍楼名</div>
        <el-input v-model="addName"></el-input>
      </div>
      <div class="addItem">
        <div style="width: 150px">宿舍楼Id</div>
        <el-input v-model="addId"></el-input>
      </div>
      <div class="addItem">
        <div style="width: 150px">宿舍楼层数</div>
        <div>
          <el-input-number
            style="width: 150px"
            v-model="addFloor"
            :min="1"
            :max="100"
            label=""
          ></el-input-number>
        </div>
      </div>
      <div class="addItem">
        <div style="width: 150px">每层房间数</div>
        <div>
          <el-input-number
            style="width: 150px"
            v-model="floorRooms"
            :min="1"
            :max="100"
            label=""
          ></el-input-number>
        </div>
      </div>
      <div style="margin-left: auto; margin-right: 30px">
        <el-button
          type="danger"
          style="margin-right: 10px"
          @click="handleDelete()"
          >清空</el-button
        >
        <el-button type="primary" @click="handleAdd()" :disabled="disabled"
          >创建</el-button
        >
      </div>
    </div>
    <h1 class="addBuild">宿舍楼全览</h1>

    <div class="buildWrapper">
      <div v-for="(i,index) in buildInfo" :key="i.key" class="buildCard">
        <div class="cardTitle">
          <div style="padding-left: 20px">
            No.{{ index +1 }}&nbsp;{{ i.buildName }}
          </div>
        </div>
        <div class="cardInfo">
          <div>
            <span style="font-weight: 400">楼层数：</span
            ><span style="font-weight: 600"> {{ i.buildFloor }}</span>
          </div>
          <div>
            <span style="font-weight: 400">房间数：</span
            ><span style="font-weight: 600"> {{ i.roomCount }}</span>
          </div>
          <div>
            <span style="font-weight: 400">已住学生数：</span
            ><span style="font-weight: 600"> {{ i.stuCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'buildManage',
  data() {
    return {
      role: this.$store.state.role,
      buildInfo: [],

      addName: '',
      addId: '',
      addFloor: 1,
      // buildFloor:1
      floorRooms: 1
    }
  },
  methods: {
    async handleMounted() {
      let res = await this.$axios({
        method: 'GET',
        url: 'build/getBuildInfo',
        params: {
          role: this.$store.state.role
        }
      })
      // console.log(res.data.buildInfo)
      for (let v of res.data.buildInfo) {
        let res1 = await this.$axios({
          method: 'get',
          url: 'build/getRoomNumberByBuildId',
          params: {
            buildId: v.buildId
          }
        })
        // console.log(res1)
        v['roomCount'] = res1.data
        let res2 = await this.$axios({
          method: 'get',
          url: 'user/getStudentsByBuildId',
          params: {
            buildId: v.buildId
          }
        })
        console.log(res2)
        v['stuCount'] = res2.data
      }
      this.buildInfo = res.data.buildInfo
    },
    handleDelete() {
      this.addName = ''
      this.addId = ''
      this.addFloor = 1
      this.floorRooms = 1
    },
    async handleAdd() {
      await this.$axios({
        method: 'POST',
        url: 'build/createBuildAndRoom',
        params: {
          buildName: this.addName,
          buildId: this.addId,
          buildFloor: this.addFloor,
          floorRooms: this.floorRooms
        }
      })
      this.handleMounted()
    }
  },
  mounted() {
    this.handleMounted()
  },
  computed: {
    disabled() {
      return !(this.addName && this.addId)
    }
  }

}
</script>

<style lang="less" scoped>
.pageContent {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 3%;
  .addBuild {
    margin: 0;
    padding-left: 15px;
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    color: #303133;
    font-size: 2em;
  }
  .addInfo {
    width: 74%;
    height: 80px;
    line-height: 80px;
    background: #fff;
    margin: 30px 0;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
    display: flex;
    align-items: center;
    .addItem {
      width: 250px;
      // height: 40px;
      margin-left: 30px;
      display: flex;
    }
  }
  .buildWrapper {
    overflow: scroll;
    overflow-y: hidden;
    height: 50rem;
    width: 77%;
    // background: darkblue;
    margin-top: 30px;
    padding-bottom: 35px;
    padding-right: 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    .buildCard {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
      border-radius: 10px;
      width: 450px;
      height: 200px;
      background: #fff;
      margin-right: 30px;
      margin-bottom: 35px;
      .cardTitle {
        border-radius: 10px 10px 0 0;
        font-size: 20px;
        color: #fff;
        font-weight: 700;
        width: 100%;
        height: 70px;
        line-height: 70px;
        background: #1890ff;
      }
      .cardInfo {
        padding: 20px;
        // background: fuchsia;
        div {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
