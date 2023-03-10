<template>
  <div>
    <div class="title flex_y_center">推荐歌单  <i class="el-icon-arrow-right"></i></div>
    <!-- <ul>
      <li class="gedan" v-for="item in daysonglist.slice(9)" :key="item.id">
        
      </li>
    </ul> -->
    <div class="tuijiangedan" ref='tuijiangedan'>
      <el-row class="gedan_row">
        <!-- 遍历获取到的推荐歌单列表 -->
        <el-col class="gedan" v-for="item in daysonglist" :key="item.id">
            <div>
              <el-image  :src="item.picUrl" @click="toGeDan(item.id)" class="img"></el-image>
              <i class="icon-music-kaishi"></i>
            </div>
          <!-- 播放量显示 -->
          <div class="playcount"> 
            <i class="el-icon-video-play"></i>
            <!-- 使用单位转换函数对数据进行转换 -->
            <span>{{ numberFormat(item.playcount) }}</span>        
          </div>
          <!-- <div class="play">
            <img src="./play.png">
          </div> -->
          <div class="name">{{ item.name }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 导入单位转换函数
import {numberFormat,toGeDan} from '@/api/api_main.js'
export default {
  created () {
    this.getDaySongList()
  },
  data () {
    return {
      daysonglist:'',

    }
  },
  methods: {
    numberFormat,
    toGeDan,
    async getDaySongList(){
      const {data:res}=await this.$http.get('/recommend/resource',{params:{ timestamp: Date.now()}})
      if(res.code==200){
        this.daysonglist=res.recommend
        console.log(this.daysonglist)
      }else{
        // 通过 $refs 访问到 myDiv
        const myDiv = this.$refs.tuijiangedan;
        // 修改内容
        myDiv.innerHTML = '需要登录，请先登录';
        // console.log(res.code)
      }
      // console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  display: flex;
}

.gedan{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(20% - 20px);
  margin: 10px;
  // width: 174px;
  .img{
    border-radius: 10px;
  }
  .icon-music-kaishi{
  // @size=calc(20%)
  position: absolute;
  font-size: 40px;
  right:25%;
  bottom: 25%;
  //按钮隐藏显示
  opacity: 0;
  transition: opacity 0.5s;
}
}
// .tuijiangedan{
//   // width: 100px;
//   // height: 100px;
//   // border: 1px solid ;
// }
.gedan_row{
  display: flex;
  flex-wrap:wrap;
}
// .gedan:nth-child(5n){
//   margin-right: 0;
// }
// .gedan:nth-child(5n+1){
//   margin-left: 0;
// }
.gedan:hover{
  cursor: pointer; 
  .icon-music-kaishi{
    opacity: 1;
  }
}
// 播放量显示
.playcount{
  position: absolute;
  top:5px;
  left: 110px;
  color: #fff;
  .el-icon-video-play{
    margin-right: 10px;
  }
}
// 歌单名字
.name{
  text-align:left;
}
// 鼠标激活时的播放图标


</style>