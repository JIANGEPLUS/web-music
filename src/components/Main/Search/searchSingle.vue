<template>
  <!-- 搜索界面单曲板块 -->
  <div class="single">
    <div class="button">
      <el-button-group class="play_button">
        <el-button type="danger" size="mini" round><i class="el-icon-caret-right"></i>播放全部</el-button>
        <el-button class="play_button2" type="danger" size="mini" round icon="el-icon-plus"></el-button>
      </el-button-group>
      <el-button  size="mini" round><i class="el-icon-download"></i>下载全部</el-button>
    </div>
    <div class="musiclist">
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
  <!-- 分页模块 -->
      <el-pagination
        :page-size="SearchList.limit"
        :pager-count=7
        layout="prev, pager, next"
        :total="SearchList.songCount"
        @current-change="handleCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    // 获取父组件传来的歌单列表
    SearchList:{
      type:Object
    }
  },
  created () {
    
    // 先获取喜欢列表
    this.getlikeArray()
    // console.log(this.$route.query)
    // this.getUserInfo()
    this.isLiked()
  },
  data() {
    return {
      // 歌曲列表
      songArray:[],
      // 喜欢歌曲数组
      likeArray: [],
      // get的请求地址
      getpath:''
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
    // 获得喜欢歌曲列表
    async getlikeArray() {
      const { data: res } = await this.$http.get('/likelist', { params: { timestamp: Date.now() } })
      this.likeArray = res.ids
      // console.log(this.likeArray)
      // console.log(this.songArray)
    },
    // 验证歌曲是否在喜欢列表
    isLiked(id) {
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
    },
    // 换页触发父父组件函数函数
    handleCurrentChange(val){
      this.$emit('CurrentChange', val);
    }
  },
  watch: {
    SearchList(val){
      this.songArray=val.songs
    }
  }
}
</script>

<style lang="less" scoped>
.single{
  .button{
    display: flex;
    
    .play_button{
    display: flex;
    margin-right: 20px;
    }
  .play_button2{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items:center;
  }
  }

}
</style>