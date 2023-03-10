<template>
  <!-- 搜索界面视频板块 -->
  <div class="searchVideo">
    <!-- 搜索结果视频展示 -->
      <div class="viedeo-div">
        <div v-for="video in SearchList.videos" :key="video.vid" class="video-item">
          <div class="img-div">
            <el-image
              :src="video.coverUrl"
              fit="fill">
              <i class="icon-music-bofang-copy"></i>
            </el-image>
          </div>
          <!-- 判断是否是mv -->
          <p class="video-name" v-if="video.type==0"><span>MV</span>{{ video.title }}</p>
          <p class="video-name" v-else>{{ video.title }}</p>

            <!-- 给作者添加跳转链接 -->
            <span v-for="(user,index) in video.creator" :key="user.userId">
              <span v-if="index>=1">/</span>
              <!-- 判断用户名格式 -->
              <span class="blue-text" @click="toGeshou(user.userId)" v-if="user.userName==keywords">{{ user.userName }}</span>
              <span @click="toGeshou(user.userId)" v-else-if="index==0">{{ 'by '+user.userName }}</span>
              <span @click="toGeshou(user.userId)" v-else>{{user.userName }}</span>
            </span> 
          <div class="playcount"><i class="el-icon-video-play"></i>{{ numberFormat(video.playTime) }}</div>
        </div>
      </div>
      <!-- 分页模块 -->
      <el-pagination
        :page-size="SearchList.limit"
        :pager-count=7
        layout="prev, pager, next"
        :total="SearchList.videoCount"
        @current-change="handleCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
import Dayjs from 'dayjs'
import { numberFormat,toGeshou } from '@/api/api_main';
export default {
  props:{
    SearchList:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      keywords:this.$route.query.keywords,

    }
  },
  methods: {
    toGeshou,
    numberFormat,
    Dayjs,
    // 换页触发父父组件函数函数
    handleCurrentChange(val){
      this.$emit('CurrentChange', val);
    }
  },
  computed: {
    // 使用replace方法将文本中所有匹配的字符串替换为蓝色的span标签
    // highlightText(text) {
    //   console.log(text)
    //   return text.replace(/${this.keywords}/g, '<span class="blue-text">陈奕迅</span>')
    // }
  },
}
</script>

<style lang="less" scoped>
.searchVideo {
    .viedeo-div {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      margin: 0 auto;
    }

    .video-item {
      position: relative;
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
      .blue-text {
        color: blue;
      }
      .playcount{
        position: absolute;
        top: 10px;
        right: 10px;
        color: white;
      }
    }

    .video-item:hover {
      cursor: pointer;
    }

    .video-item img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .video-name {
      width: 100%;
      font-size: 14px;
      margin-top: 10px;
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 超出的部分隐藏 */
      text-overflow: ellipsis; /* 显示省略号 */
      text-align: left;
      span{
        display: inline-block;
        border: 1px solid red;
        color: red;
      }
    }
    .video-time{
      margin-top: 10px;
      font-size: 6px;
      color: #999;
    }
}
</style>