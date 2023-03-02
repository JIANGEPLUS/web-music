<template>
  <div class="geshoupage">
    <div class="page_title">
      <el-row :gutter="20">
      <el-col :span="6">
        <img :src="singerlist.artist.picUrl" alt="" class="img_title">
      </el-col>
      <el-col :span="18" class="right_title">
        <div>{{ singerlist.artist.name }}</div>
        <div>
          <span v-for="(item,index) in singerlist.artist.alias" :key="index">
            {{ index== singerlist.artist.alias.length - 1 ? item : item + ';'}}
          </span>
        </div>
        <div>
          <el-button class="play_button2"  size="mini" round icon="el-icon-folder-add">收藏</el-button>
        </div>
        <div class="size">
          <span>{{ '单曲数:'+singerlist.artist.musicSize}}</span>
          <span>{{ '专辑数:'+ singerlist.artist.albumSize}}</span>
          <span>{{ 'MV数:'+  singerlist.artist.mvSize}}</span>
        </div>
      </el-col>
    </el-row>
    </div>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleTabClick(parentPath,activeName,id)">
        <el-tab-pane label="专辑" name="zhuanji"></el-tab-pane>
        <el-tab-pane label="MV" name="GeshouMv"></el-tab-pane>
        <el-tab-pane label="歌手详情" name="GeshouDetails"></el-tab-pane>
        <el-tab-pane label="相似歌手" name="GeshouLike"></el-tab-pane>  
      </el-tabs>
      <router-view :singerlist="singerlist"></router-view>
    </div>

  </div>
</template>

<script>
import {handleTabClick} from '@/api/api_main.js'
export default {
  created () {
   this.getSingerList() 
   console.log(this.$route.path)
  },
  data () {
    return {
      // 当前父路由所有地址
      parentPath :this.$route.path.substring(0, this.$route.path.lastIndexOf('/')+1),
      id:this.$route.query.id,
      singerlist:{
        artist:{}
      },
      // 获取路由最后一个path，来确定现在点击激活的组件
      activeName: this.$route.path.split("/").pop(),
    }
  },
  methods: {
    handleTabClick,
    // 获取歌手全部信息
    async getSingerList(){
      const { data: res } = await this.$http.get('artists', { params: { id:this.id } })
        if (res.code == 200) {
          this.singerlist = res
        }
        // console.log(res)
    },
    // 标签跳转路由选项跳转界面
    handleClick() {
      if(this.$route.path!=='/main/geshoupage/' + this.activeName){
        this.$router.push({
          path:'/main/geshoupage/' + this.activeName,
          query:{
            id:this.id
        }
        })
      }
    }
  },
  watch: {
    // 监听query值，然后query值变化则刷新页面
    '$route.query.id'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$router.go(0);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .geshoupage{
    .page_title{
      .img_title{
        width: 225px;
        height:225px;
        border-radius: 10px;
      }
      .right_title{
        display: flex;
        flex-direction:column;
        align-items:flex-start;
        // justify-content:flex-start;
      }
      .right_title div{
        margin-bottom: 10px;
      }
      .size{
        span{
          margin-right: 10px;
        }
      }
    }

  }
</style>