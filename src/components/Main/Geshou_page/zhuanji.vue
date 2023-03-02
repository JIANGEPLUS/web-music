<template>
  <div class="zhuanji">
    <!-- 歌手图片展示 -->
    <div class="main" v-infinite-scroll="load" style="overflow:visible" infinite-scroll-delay="500"
      infinite-scroll-distance="100">
      <div class="zhuanjis-container">
        <div v-for="(zhuanji, index) in zhuanjilist" :key="index" class="zhuanji-item"
          @click="toZhuanJi(zhuanji.id)">
          <div class="img-div">
            <el-image
              :src="zhuanji.picUrl">
              <i class="icon-music-bofang-copy"></i>
            </el-image>
            <!-- <img :src="zhuanji.picUrl" alt="zhuanji avatar"> -->
            
          </div>
          <p class="zhuanji-name" @click="toZhuanJi(zhuanji.id)">{{ zhuanji.name }}</p>
          <p class="zhuanji-time">{{ Dayjs(zhuanji.publishTime).format('YYYY-MM-DD') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dayjs from 'dayjs'
import {toZhuanJi} from '@/api/api_main.js'
export default {
  props: {
    singerlist: {
      type: Object,
    }
  },
  created() {
    this.getZhuanjiList()
  },
  data() {
    return {
      // 歌手id
      id: this.$route.query.id,
      // 专辑获取偏移量
      offsetcount: 0,
      zhuanjilist: []
    }
  },
  methods: {
    Dayjs,
    toZhuanJi,
    // 获取歌手专辑
    async getZhuanjiList() {
      const { data: res } = await this.$http.get('/artist/album', { params: { id:this.id , offset: this.offsetcount * 30 } })
      if (res.code == 200) {
        // 专辑数组添加新的专辑
        this.zhuanjilist = [...this.zhuanjilist, ...res.hotAlbums]
      }

      console.log(this.zhuanjilist)
    },
    // 滚动获得更多的专辑
    load() {
      this.offsetcount = this.offsetcount + 1
      this.getZhuanjiList()
    }
  }
}
</script>

<style lang="less" scoped>
.zhuanji {
  .main {
    .zhuanjis-container {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      margin: 0 auto;
    }

    .zhuanji-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: calc(25% - 40px);
      margin: 20px;

      .img-div {
        position: relative;

        .icon-music-bofang-copy {
          position: absolute;
          left: 50%;
          top: 50%;
        }
      }
    }

    .zhuanji-item:hover {
      cursor: pointer;
    }

    .zhuanji-item img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .zhuanji-name {
      font-size: 14px;
      margin-top: 10px;
    }
    .zhuanji-time{
      margin-top: 10px;
      font-size: 6px;
      color: #999;
    }
  }
}
</style>