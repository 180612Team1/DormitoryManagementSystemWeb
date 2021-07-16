<template>
  <div class="pageContent">
    <div class="headInfos">
      <div class="headImage">
        <img
          src="http://study.esunr.xyz/1582549904311.png"
          width="130px"
          height="130px"
          style="margin: auto"
          alt=""
        />
      </div>
      <div class="headInfo">
        <div class="trueName">
          <div>{{ formData[3].value }}</div>
        </div>
        <div class="role">
          <div>{{ formData[0].value }}</div>
        </div>
      </div>
    </div>
    <div class="mainInfo">
      <div class="leftInfo">
        <div class="leftTitle">个人信息</div>
        <hr />
        <div v-for="i in formData" :key="i.key">
          <span>{{ i.key }}</span>
          <span>{{ i.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  data() {
    return {
      formData: [
        {
          key: '身份',
          value: this.$store.state.role === 0 ? `系统管理员` : this.role === 1 ? `宿舍管理员` : `学生`
        },
        {
          key: 'schoolId',
          value: this.$store.state.schoolId
        },
        {
          key: '用户名',
          value: this.$store.state.userName
        },
        {
          key: '真实姓名',
          value: this.$store.state.trueName
        },
        {
          key: '联系方式',
          value: this.$store.state.phoneNumber
        },
        {
          key: '楼号',
          value: this.$store.state.buildId
        },
        {
          key: '房间号',
          value: this.$store.state.roomId
        },
        {
          key: '注册日期',
          value: this.$store.state.checkTime
        },
        {
          key: '入住日期',
          value: this.$store.state.updateTime
        },
        {
          key: '离住日期',
          value: this.$store.state.deleteTime
        }
      ],

      id: this.$store.state.id,
      checkTime: this.$store.state.checkTime
    }
  },
  mounted() {
    //

  }

}
</script>

<style lang='less' scoped>
.pageContent {
  display: flex;
  flex-direction: column;
  // z-index: 33;
  background: rgb(227, 227, 227);
  .headInfos {
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    margin: 0 auto;
    margin-top: 2%;
    width: 90%;
    height: 27%;
    border-radius: 10px;
    background: rgb(255, 255, 255);
    .headImage {
      display: flex;
      width: 100%;
      height: 65%;
    }
    .headInfo {
      width: 100%;
      height: 35%;

      display: flex;
      flex-direction: column;
      .trueName {
        display: flex;
        width: 100%;
        height: 55%;
        text-align: center;
        font-size: 2rem;
        div {
          margin: auto;
        }
      }
      .role {
        display: flex;
        width: 100%;
        height: 45%;
        text-align: center;

        color: #777777;
        font-size: 1rem;
        div {
          margin: auto;
        }
      }
    }
  }
  .mainInfo {
    display: flex;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    width: 90%;
    height: 60%;
    margin: 0 auto;
    margin-top: 2%;
    padding: 2rem;
    border: 1px solid rgb(230, 235, 245);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    .leftInfo {
      // background: red;
      width: 100%;
      height: 100%;
      .leftTitle {
        color: #1890ff;
        font-weight: 700;
        font-size: 22px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
