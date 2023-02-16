<template>
  <div class="paihangbang">
    <h3>官方版</h3>
    <el-row :gutter="20" v-for="item in toplist.topArray.slice(0,4)" :key="item.id">
      <div class="div-top">
        <el-col :span="6" class="image">
          <div @click="toGeDan(item.id)">
            <el-image :src="item.coverImgUrl"></el-image>
            <div class="play">
              <img src="./play.png">
            </div>
          </div>
        </el-col>
        <!--  -->
        <el-col :span="17">
          <el-table :data="item.tracks.slice(0, 5)" stripe style="width: 100%" :show-header="false" height="160">
            <el-table-column type="index">
              <template slot-scope="scope">
                <div :class="{ 'red-index': scope.$index < 3 }">{{ scope.$index + 1 }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name">
            </el-table-column>
            <el-table-column width="150px" show-overflow-tooltip :align="'right'">
              <template slot-scope="scope">
                <!-- 用map把歌手name取出然后使用'/'分隔 -->
                {{ scope.row.ar.map(singer => singer.name).join('/') }}
              </template>
            </el-table-column>
          </el-table>
          <div class="font-12 left mtop-10" @click="toGeDan(item.id)">查看全部 ></div>
        </el-col>
      </div>
    </el-row>

    <!--全球榜 -->
    <h3 class="">全球榜</h3>
    <div class="image-grid mtop-20">
      <div v-for="item in toplist.topArray.slice(4)" :key="item.id" class="grid-item">
        <img :src="item.coverImgUrl" />
        <div class="play-count"><i class="el-icon-video-play"></i>{{ numberFormat(item.playCount) }}</div>
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormat, toGeDan } from '@/api/api_main.js'
export default {
  created() {
    this.getAllList()
  },
  data() {
    return {
      // 所有榜单接口地址
      allList: [],
      // 飙升榜，新歌榜等等榜单
      toplist: {
        topArray: []
      }
    }
  },
  methods: {
    toGeDan,
    numberFormat,
    // 获得全部榜单接口
    async getAllList() {
      const { data: res } = await this.$http.get('/toplist')
      if (res.code == 200) {
        // this.allList = res.list.slice(0, 4)
        this.allList = res.list
      }
      this.setTopList()
      console.log(this.allList)
    },
    // 获取飙升榜，新歌榜等等榜单
    async getTopList(id) {
      const { data: res } = await this.$http.get('/playlist/detail', { params: { id } })
      if (res.code == 200) {
        this.toplist.topArray.push(res.playlist)
      }
      // console.log(res)
    },
    setTopList() {
      for (let key of this.allList) {
        this.getTopList(key.id)
      }
      console.log(this.toplist)
    }
  }
}
</script>

<style lang="less" scoped>
.paihangbang {
  h3 {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
  }

  .div-top {

    margin: 20px 0;

    .image {
      position: relative;
    }

    .el-image {

      border-radius: 4px;
    }

    .image:hover,
    .left {
      cursor: pointer;

      .play {
        opacity: 1;
      }
    }

    .play {
      position: absolute;
      width: 40px;
      height: 40px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      /* 有了这个就自动居中了 */
      //按钮隐藏显示
      opacity: 0;
      transition: opacity 0.5s;

      .icon-yinlequan {
        font-size: 40px;
      }
    }

    .red-index {
      color: red;
    }
  }

  /deep/.el-table__body tr,
  /deep/ .el-table__body td {
    padding: 0;
    height: 32px;
    font-size: 6px;
  }


  // 全球榜的css
  .image-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;

    .grid-item {
      position: relative;
      //设置每个盒子大小为父盒子的百分之20-10px
      flex-basis: calc(20% - 10px);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .grid-item img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    .play-count {
      position: absolute;
      top: 2px;
      right: 2px;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
    }

    .text {
      text-align: center;
      padding: 10px;
      font-size: 14px;
    }
  }
}
</style>