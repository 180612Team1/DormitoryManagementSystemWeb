<template>
  <div class="loginContent">
    <div class="loginBox">
      <div class="inputBox " @keyup.enter="handleLogin()">
        <el-input :autofocus=true v-model="username" placeholder="用户名"></el-input>
        <el-input show-password v-model="password" placeholder="密码"> </el-input>
      </div>
      <div class="btnBox">
        <button @click="handleLogin()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      let response = await this.$axios({
        method: 'post',
        url: 'user/login',
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
      if (response.data.code === '1000') {
        const { userName, role, trueName, schoolId, roomId, phoneNumber, id, checkTime, buildId, updateTime, deleteTime } = response.data
        sessionStorage.setItem('token', this.username)
        sessionStorage.setItem('role', response.data.role)
        this.$store.state.userName = userName
        this.$store.state.role = role
        this.$store.state.trueName = trueName
        this.$store.state.schoolId = schoolId
        this.$store.state.roomId = roomId
        this.$store.state.phoneNumber = phoneNumber
        this.$store.state.id = id
        this.$store.state.checkTime = checkTime
        this.$store.state.buildId = buildId
        this.$store.state.updateTime = updateTime
        this.$store.state.deleteTime = deleteTime
        this.$router.push('/')
      } else {
        this.$message({
          message: response.data.message,
          type: 'error',
          duration: 1000
        })
      }
    }
  },
  mounted() {
    //
  }
}
</script>

<style lang='less'>
.loginContent {
  background: url(../../assets/login.jpg) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  // background: #eee;
  // background: white;
  .loginBox {
    box-shadow: 0 0 25px #cac6c6;
    border-radius: 1rem;
    margin: auto auto;
    width: 25%;
    height: 30%;
    background: rgba(51, 51, 51, 0.45);
    display: flex;
    flex-direction: column;
    .inputBox {
      margin: 2.5rem auto;
      height: 28%;
      width: 70%;
      display: flex;
      flex-direction: column;
      // background: darkblue;
      input {
        color: #c0c4cc;
        background: none;
        margin: 0.5rem auto;
      }
    }
    .btnBox {
      position: relative;
      margin: auto;
      width: 70%;
      display: flex;
      // background: chocolate;
      button {
        margin: auto;
        width: 60%;
        color: #c0c4cc;
        background: none;
        border: 1px solid #c0c4cc;
        border-radius: 4px;
        padding: 0.4rem 0.8rem;
        font-size: 1rem;
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
      }
      button:active {
        transform: scale(0.98);
      }
    }
  }
}
</style>
