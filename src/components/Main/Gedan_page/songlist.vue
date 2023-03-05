<template>
  <div>
    <!-- 歌单表格 -->
    <el-row class="main">
      <el-table :data="songArray" stripe style="width: 100%" @row-dblclick="selectMusic">
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
              <i v-else class="icon-music-xihuan-red-copy"></i>
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
import { getMusicdetail,getMusicUrl,playMusic } from '@/api/api_main'
import { mapActions, mapMutations } from 'vuex'
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
    ...mapMutations(['setMusicList','setCurrenMusicId','getCurrenIndex','setMusicUrl','updateIspalying']),
    dayjs,
    async selectMusic(row){
      // 获取歌曲详情
      this.setMusicList(this.songArray)
      playMusic(this,row)
      // this.getMusicUrl()
      console.log(row)     
    },
    // async getUserInfo(){
    //   const{data:res}=await this.$http.get('/user/account')
    //   if(res.code==200){
    //     this.uid=res.account.id
    //   }
    // }
    // 获取当前播放歌曲的url
    async getMusicUrl() {
      const { data: res } = await getMusicUrl(this.currenMusicId)
      if (res.code == 200) {
        
        this.setMusicUrl(res.data[0].url) 
        // console.log(this.Music)
      }
    },    
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
  },
  computed: {
    ...mapActions(['musicUrl'])
  }
}
</script>

<style lang="less" scoped>

.overflow{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>