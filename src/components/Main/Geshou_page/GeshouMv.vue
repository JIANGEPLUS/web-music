<template>
  <div class="mv">
    <!-- 歌手图片展示 -->
    <div class="main">
      <div class="mvs-container">
        <div v-for="(mv, index) in mvlist" :key="index" class="mv-item"
          @click="tomv(mv.id)">
          <div class="img-div">
            <el-image
              :src="mv.imgurl16v9"
              fit="fill">
              <i class="icon-music-bofang-copy"></i>
            </el-image>
            <!-- <img :src="mv.picUrl" alt="mv avatar"> -->
            
          </div>
          <p class="mv-name">{{ mv.name }}</p>
          <p class="mv-time">{{ Dayjs(mv.publishTime).format('YYYY-MM-DD') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dayjs from 'dayjs'
export default {
  props: {
    singerlist: {
      type: Object,
    }
  },
  created() {
    this.getmvList()
  },
  data() {
    return {
      // 歌手id
      singerid: this.$route.query.id,
      // 专辑获取偏移量
      offsetcount: 0,
      mvlist: []
    }
  },
  methods: {
    Dayjs,
    // 获取歌手专辑
    async getmvList() {
      const { data: res } = await this.$http.get('/artist/mv', { params: { id: this.singerid } })
      if (res.code == 200) {
        // 专辑数组添加新的专辑
        this.mvlist = res.mvs
      }
      console.log(this.mvlist)
    },
    // 滚动获得更多的专辑
    // load() {
    //   this.offsetcount = this.offsetcount + 1
    //   this.getmvList()
    // }
  }
}
</script>

<style lang="less" scoped>
.mv {
  .main {
    .mvs-container {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      margin: 0 auto;
    }

    .mv-item {
      @width: calc(33% - 40px);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: @width;
      margin: 20px;

      .img-div {
        position: relative;
        width: 100%;
        // height: 162px;
        .el-image{
          width: 100%;
          height: 162px;
        }
        .icon-music-bofang-copy {
          position: absolute;
          left: 50%;
          top: 50%;
        }
      }
    }

    .mv-item:hover {
      cursor: pointer;
    }

    .mv-item img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .mv-name {
      font-size: 14px;
      margin-top: 10px;
    }
    .mv-time{
      margin-top: 10px;
      font-size: 6px;
      color: #999;
    }
  }
}
</style>