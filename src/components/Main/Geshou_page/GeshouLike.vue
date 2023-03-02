<template>
  <!--相似歌手 -->
  <div class="geshouLike">
    <!-- 歌手图片展示 -->
    <div class="main">
      <div class="mvs-container">
        <div v-for="(geshouLike, index) in geshouList" :key="index" class="geshouLike-item"
          @click="toGeshou(geshouLike.id)">
          <div class="img-div">
            <el-image :src="geshouLike.img1v1Url" fit="fill">
            </el-image>
          </div>
          <p class="geshouLike-name">{{ geshouLike.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toGeshou } from '@/api/api_main.js';
export default {
  created() {
    this.getGeshouDetail()
  },
  data() {
    return {
      // 歌手id
      singerid: this.$route.query.id,
      geshouList: []
    }
  },
  methods: {
    toGeshou,
    async getGeshouDetail() {
      const { data: res } = await this.$http.get('/simi/artist', { params: { id: this.singerid } })
      if (res.code == 200) {
        // 专辑数组添加新的专辑
        this.geshouList = res.artists
      }
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.geshouLike {
  .main {
    .mvs-container {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      margin: 0 auto;
    }

    .geshouLike-item {
      @width: calc(20% - 20px);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: @width;
      margin: 10px;

      .img-div {
        position: relative;
        width: 100%;

        // height: 162px;
        .el-image {
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

    .geshouLike-item:hover {
      cursor: pointer;
    }

    .geshouLike-item img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .geshouLike-name {
      font-size: 14px;
      margin-top: 10px;
    }

    .geshouLike-time {
      margin-top: 10px;
      font-size: 6px;
      color: #999;
    }
  }
}
</style>