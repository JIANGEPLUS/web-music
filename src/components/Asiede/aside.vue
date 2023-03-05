<template>
  <div class="vue_div">
    <!-- <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs> -->
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      router
      @select="select">
        <el-menu-item index="FindMusic" route="/main/FindMusic">发现音乐</el-menu-item>
        <el-menu-item-group title="我的音乐" class="item_group_title">
          <el-menu-item  :route="'/main/gedanpage/songlist?id='+Userplaylist[0].id" index="mylike"><i class="icon-music-xihuan" ></i>我喜欢的音乐</el-menu-item>
          <el-menu-item index="Download" ><i class="el-icon-download"></i>本地与下载</el-menu-item>
          <el-menu-item index="Played" route="/main/Played" ><i class="el-icon-tickets"></i>最近播放</el-menu-item>
          <el-menu-item index="MyCollection" ><i class="el-icon-star-off"></i>我的收藏</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="我的歌单" class="item_group_title">
          <!-- Userplaylist排除掉我喜欢的音乐和每日推荐的歌单 -->
          <el-menu-item  :index="String(playlist.id)" v-for="playlist in Userplaylist.slice(1)" :key="playlist.id" :route="'/main/gedanpage/songlist?id='+playlist.id">
            <i class="icon-music-faxian"></i>
            <div class="content">{{  playlist.name  }}</div>
          </el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
import { toGeDan } from '@/api/api_main';
export default {
  created () {
    // this.getUserplaylist()
  },
  data () {
    return {
      Userplaylist:[
        {
          id:0
        },
        {}
      ],
      active:'FindMusic'
    }
  },
  methods: {
    toGeDan,
    // 菜单选中的函数
    select(index){
      this.active=index
    },
    // 获取用户歌单
    async getUserplaylist(){
      const { data: res } = await this.$http.get('/user/playlist',{params:{uid:this.uid}})
      if(res.code==200){
        this.Userplaylist=res.playlist
      }
      
      // console.log(this.Userplaylist)
    }
  },
  computed: {
    uid(){
      if(this.$store.getters.doneuserinfo){
        return this.$store.getters.doneuserinfo.userId;
      }
      else{
        return ''
      }
    }
  },
  watch: {
    // 监听获取的uid发送请求,因为直接调用vuex的uid会因为vuex未初始化而undifine
    uid(){
      this.getUserplaylist()
    }
  },
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo{
  .el-menu-item{
    display: flex;
    align-items: center;
    height: 45px;
    padding: 10px;
    margin: 0 2px 4px 15px;
  }
  .el-menu-item:first-child{
    margin-top: 15px;
  }
}
.item_group_title{
  text-align: left;

}
// 歌单内容，超出显示省略号
.content{
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// .el-menu-item{
//     display: flex;
//     align-items: center;
//     height: 45px;
//     padding: 10px;
//     margin: 15px 2px 4px 15px;
//   }

.el-menu-item:hover{
  background-color: #f6f6f7;
}

</style>

