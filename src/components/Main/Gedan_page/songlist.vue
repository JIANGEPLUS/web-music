<template>
  <div>
    <!-- 歌单表格 -->
    <el-row class="main">
      <el-table :data="songArray" stripe style="width: 100%">
        <el-table-column type="index">
          <!-- 索引小于10时前面补0 -->
          <template slot-scope="scope">
            <span v-if="scope.$index < 9">0{{ scope.$index + 1 }}</span>
            <span v-else>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template v-slot="{ row }">
            <div class="pointer" @click="likeMusic(row.id)">
              <i v-if="!isLiked(row.id)" class="icon-music-xihuan"></i>
              <i v-else class="icon-music-xihuan-red"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标题">
        </el-table-column>
        <el-table-column label="歌手">
          <template slot-scope="scope">
            <!-- 用map把歌手name取出然后使用'/'分隔 -->
            {{ scope.row.ar.map(singer => singer.name).join('/') }}
          </template>
        </el-table-column>
        <el-table-column prop="al.name" label="专辑">
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            {{ dayjs(scope.row.dt, 'second').format('mm:ss') }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    playlist: {
      type: Object,
    },
    uid:{
      type:String
    }
  },
  created () {
    // 先获取喜欢列表
    this.getlikeArray()
    // 生成歌单
    this.getSongArray()
    // this.getUserInfo()
    this.isLiked()
  },
  data() {
    return {
      // 歌单id，通过query传值
      gedanid:this.$route.query.gedanid,
      // 歌曲数组
      songArray: [],
      // 喜欢歌曲数组
      likeArray: [],
    }
  },
  methods: {
    dayjs,
    // async getUserInfo(){
    //   const{data:res}=await this.$http.get('/user/account')
    //   if(res.code==200){
    //     this.uid=res.account.id
    //   }
    // }
    // 获取目标歌单数据
    async getGedanData() {
      const { data: res } = await this.$http.get('/playlist/detail', { params: { id: this.gedanid } })
      if (res.code == 200) {
        this.playlist = res.playlist
      }
      console.log(res)

    },
    // 获取歌单歌曲列表
    async getSongArray() {
      const { data: res } = await this.$http.get('/playlist/track/all', { params: { id: this.gedanid, timestamp: Date.now() } })
      if (res.code == 200) {
        this.songArray = res.songs
      }
      console.log(res)
    },
    // 获得喜欢歌曲列表
    async getlikeArray() {
      const { data: res } = await this.$http.get('/likelist', { params: { timestamp: Date.now() } })
      this.likeArray = res.ids
      console.log(this.likeArray)
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

</style>