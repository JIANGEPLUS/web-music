<template>
  <!-- 最近播放组件 -->
  <div class="played">
    <div class="title">
      <span>最近播放</span>
      <span>共{{ playedlist.total }}首</span>
    </div>
    <el-button-group class="play_button">
      <el-button type="danger" size="mini" round><i class="el-icon-caret-right"></i>播放全部</el-button>
      <el-button class="play_button2" type="danger" size="mini" round icon="el-icon-plus"></el-button>
    </el-button-group>
        <!-- 歌单表格 -->
    <el-row class="main">
      <el-table :data="playedlist.list" stripe style="width: 100%" @row-dblclick="playMusic">
        <el-table-column type="index">
          <!-- 索引小于10时前面补0 -->
          <template slot-scope="scope">
            <span v-if="scope.$index < 9">0{{ scope.$index + 1 }}</span>
            <span v-else>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data.name" label="音乐标题" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="歌手" show-overflow-tooltip>
          <template slot-scope="scope" >
            <!-- 用map把歌手name取出然后使用'/'分隔 -->
            {{ scope.row.data.ar.map(singer => singer.name).join('/') }}
          </template>
        </el-table-column>
        <el-table-column label="时间" >
          <template slot-scope="scope" >
              {{ dayjs(scope.row.playTime, 'second').format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import {getUserplayedlist,playMusic} from '@/api/api_main.js'
import dayjs from 'dayjs'
import { mapMutations,mapState } from 'vuex'
export default {
  created () {
    this.getUserplayedlist()
  },
  data () {
    return {
      playedlist:{

      }
    }
  },
  computed: {
    // ...mapState(['musicList', 'isplaying', 'currenMusicInfo', 'currenMusicId', 'currenIndex']),
  },
  methods: {
    ...mapMutations(['setMusicList','getCurrenIndex','setCurrenMusicId','updateIspalying']),
    dayjs,
    playMusic(row){
      let musicList=[]
      musicList.push(row.data)
      // console.log(this)
      this.setMusicList(musicList)
      playMusic(this,row.data)
      // this.setCurrenIndex(0)
      // this.setCurrenMusicId(row.data.id)
      // this.updateIspalying(true)
      // playMusic(row.data)
    },
    async getUserplayedlist(){
      const {data:res}=await getUserplayedlist()
      if(res.code===200){
        this.playedlist=res.data
      }
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  display: flex;
  align-items: center;
  span{
    margin-right: 10px;
  }
  span:first-child{
    font-size: 18px;
    font-weight: bold;
  }
}
.play_button{
  display: flex;
  margin: 10px 0;
  .play_button2{
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>