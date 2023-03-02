<template>
  <div>
    <!-- 歌单表格 -->
    <el-row class="main">
      <el-table :data="songArray" stripe style="width: 100%" @cell-dblclick="playMusic">
        <el-table-column type="index">
          <!-- 索引小于10时前面补0 -->
          <template slot-scope="scope">
            <span v-if="scope.$index < 9">0{{ scope.$index + 1 }}</span>
            <span v-else>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column width="50" prop="date" label="操作">
          <template v-slot="{ row }">
            <div class="pointer " @click="likeMusic(row.id)">
              <i v-if="!isLiked(row.id)" class="icon-music-xihuan"></i>
              <i v-else class="icon-music-xihuan-red"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标题" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="歌手" show-overflow-tooltip>
          <template slot-scope="scope" >
            <!-- 用map把歌手name取出然后使用'/'分隔 -->
            {{ scope.row.ar.map(singer => singer.name).join('/') }}
          </template>
        </el-table-column>
        <el-table-column prop="al.name"  label="专辑" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="时间" >
          <template slot-scope="scope" >
              {{ dayjs(scope.row.dt, 'second').format('mm:ss') }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getMusicdetail,getMusicUrl } from '@/api/api_main'
export default {
  props: {
    nameid:{
      type:String
    },
    songArray:{
      type:Array
    }
  },
  created () {
    // 歌单
    if(this.nameid=='gedan'){
      this.getpath='/playlist/track/all'
    }else{
      // 专辑
      this.getpath='/album'
    }
    // 先获取喜欢列表
    this.getlikeArray()
    // console.log(this.$route.query)
    // 生成歌单
    // this.getSongArray()
    // this.getUserInfo()
    this.isLiked()
  },
  data() {
    return {
      // 歌单id，通过query传值
      id:this.$route.query.id,
      // 歌曲数组
      // songArray: [],
      // 喜欢歌曲数组
      likeArray: [],
      // get的请求地址
      getpath:''
    }
  },
  methods: {
    dayjs,
    async playMusic(row){
      // 获取歌曲详情
      const{data:Musicdetail}=await getMusicdetail(row.id)
      if(Musicdetail.code==200){
        // 获取歌曲url
          const{data:MusicUrl}=await getMusicUrl(row.id)
          if(MusicUrl.code==200)
          {
            for(let i=0;i<MusicUrl.data.length;i++)
            {
              // 把url链接赋值到歌曲详情中
              Musicdetail.songs[i].url=MusicUrl.data[i].url
            }
            // 存入数据到vuex
            this.$store.commit('updateMusicInfo',Musicdetail.songs)
          };
        }
        console.log(Musicdetail.songs)     
    },
    // async getUserInfo(){
    //   const{data:res}=await this.$http.get('/user/account')
    //   if(res.code==200){
    //     this.uid=res.account.id
    //   }
    // }

    // 获得喜欢歌曲列表
    async getlikeArray() {
      const { data: res } = await this.$http.get('/likelist', { params: { timestamp: Date.now() } })
      this.likeArray = res.ids
      // console.log(this.likeArray)
    },
    // 验证歌曲是否在喜欢列表
    isLiked(id) {
      //  const {data:res}=await this.$http.get('/likelist')
      // console.log(`验证歌曲是否在喜欢列表:${res.ids.includes(id)}`)
      const islike = this.likeArray.includes(id)
      // console.log(islike)
      return islike
    },
    // 喜欢歌曲
    async likeMusic(id) {
      const like = !this.isLiked(id)
      const { data: res } = await this.$http.get('/like', { params: { id: id, like: like } })
      // console.log(`喜欢歌曲${res}`)
      // 获取最新like列表
      this.getlikeArray()
      if (res.code == 200) {
        // 获取最新歌曲数组
        // this.getSongArray()
        this.songArray = this.songArray.slice(0)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-table-column{
  div{

  }

}
.overflow{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>