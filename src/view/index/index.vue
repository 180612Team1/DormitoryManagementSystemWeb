<template>
  <div>
    <side-bar></side-bar>
    <top-bar></top-bar>
    <div class="pageContent">
      <div v-if="$route.path == '/'" class="pageC">
        <div class="carouselBox">
          <el-carousel height="40rem">
            <el-carousel-item v-for="item in imgList" :key="item.id">
              <img :src="item.imgPath" alt="" width="100%" height="100%" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import sideBar from '../../components/sideBar.vue'
import topBar from '../../components/topBar.vue'
export default {
  name: 'index',
  data() {
    return {
      imgList: [
        {
          id: 1,
          imgPath: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F2979799-8bd886c20f29ca2c.png&refer=http%3A%2F%2Fupload-images.jianshu.io&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626686457&t=f804d33376fb6ca3ae6aeb81e93f32c7'
        },
        {
          id: 2,
          imgPath: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgcdn.sdk.cn%2Farticle%2FaxWWqwMzZ-hrJHcG-VKj.png&refer=http%3A%2F%2Fimgcdn.sdk.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626686907&t=8e1e67d4c0fdee68980615c19512ab42'
        }
      ]
    }
  },
  methods: {

  },
  beforeCreate() {
    const token = sessionStorage.getItem('token')

    if (!token) {
      this.$router.push('/login')
    }
  },
  components: {
    sideBar,
    topBar
  }
}
</script>

<style lang='less'>
.pageContent {
  position: fixed;
  left: 15%;
  top: 7%;
  width: 85%;
  height: 93%;
  background: #ccc;
  .pageC {
    width: 100%;
    height: 100%;
    padding: 3%;
    overflow: auto;
  }
  .carouselBox {
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 5rem;
    // background: cadetblue;
    width: 80%;
    height: 80%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
