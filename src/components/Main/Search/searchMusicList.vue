<template>
  <!-- 专辑模块 -->
  <div class="searchMusicList">
    <div class="musiclist-div" v-for="musiclist in SearchList.playlists
" :key="musiclist.id">
      <el-image
      :src="musiclist.coverImgUrl"
      style="height: 100%"
      fit="fill"></el-image>
      <div @click="toGeDan(musiclist.id)" class="name" v-html="musiclist.name.replace(regExp, `<a style='color: blue;'>${keywords}</a>`)"></div>
      <div class="trackCount">{{ musiclist.trackCount+'首' }}</div>
      <div class="creator">{{'by '+ musiclist.creator.nickname }}</div>
      <div class="playcount"><i class="el-icon-video-play"></i>{{numberFormat(musiclist.playCount)  }}</div>
    </div>
      <!-- 分页模块 -->
      <el-pagination
        :page-size="SearchList.limit"
        :pager-count=7
        layout="prev, pager, next"
        :total="SearchList.musiclistCount"
        @current-change="handleCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
import { numberFormat,toGeDan } from '@/api/api_main';
export default {
  props:{
    SearchList:{
      type:Object,
      required:true
    }
  },
  data () {
    return {
      keywords:this.$route.query.keywords,
      // SearchList:[]
    }
  },
  methods: {
    toGeDan,
    numberFormat,
    // 换页触发父父组件函数函数
    handleCurrentChange(val){
      this.$emit('CurrentChange', val);
    }
  },
  computed: {
    regExp() {
      // 使用变量创建正则表达式对象
      return new RegExp(this.keywords, 'g');
    },
  },
  watch: {
    // SearchList:{
    //   handler(newVal){
    //     this.SearchList=newVal
    //     console.log(this.SearchList)
    //   },
    //   immediate:true
    // }
  }
}
</script>

<style lang="less" scoped>
.searchMusicList{
  .musiclist-div{
    display: flex;
    align-items: center;
    height: 100px;
    padding: 10px 0;
    .el-image{
      margin-right: 10px;
      border-radius: 5px;
    }
    // 用magin：auto使div盒子变到最右边，然后用margin-right控制右边距离
    .playcount{
      width: 80px;
      margin-left: 100px;
      text-align: left;
      color: gray;
    }
    .creator{
      width: 80px;
      margin-left: 50px;
      text-align: left;
      color: gray;

    }
    .trackCount{
      width: 80px;
      margin-left: auto;
      text-align: left;
      color: gray;

    }
    .name{
      cursor:pointer;
    }

  }
  .musiclist-div:hover{
    background-color: #f5f5f5;
  }
  .musiclist-div:nth-child(2n){
    background-color: #fafafa;
  }

}
.blue-text{
      color: blue;
    }
</style>