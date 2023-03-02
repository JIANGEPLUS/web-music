<template>
  <div>
    <el-row :gutter="20" class="head" type="flex">
      <el-col :span="6">
        <!-- 专辑图片 -->
        <img :src=zhuanjilist.album.picUrl class="img_title">
      </el-col>
      <!-- 专辑图片右侧 -->
      <el-col :span="15">
        <!-- 专辑标题 -->
        <el-row class="title flex_y_center">
          <div class="gedan_div">专辑</div>
          <div class="name_div" style="font-size:20px">{{ zhuanjilist.album.name }}</div>
        </el-row>
        <el-row :gutter="0" class="button">
          <!--播放 -->
          <el-col :span="5">
            <el-button-group class="play_button">
              <el-button type="danger" size="mini" round><i class="el-icon-caret-right"></i>播放全部</el-button>
              <el-button class="play_button2" type="danger" size="mini" round icon="el-icon-plus"></el-button>
            </el-button-group>
          </el-col>
          <el-col :span="4">
            <el-button  size="mini" round><i class="el-icon-download"></i>下载全部</el-button>
          </el-col>
        </el-row>
        <div class="time">{{ '时间：'+ dayjs(zhuanjilist.publishTime).format('YYYY-MM-DD')}}</div>
      </el-col>
    </el-row>
    <!-- 歌曲列表tags -->
    <el-row class="songstag">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="songlist"></el-tab-pane>
        <el-tab-pane :label="`评论(${zhuanjilist.album.info.commentCount})`" name="pinglun"></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 专辑区域和评论区域 -->
    <router-view :props="{ zhuanjilist: zhuanjilist ,name:'zhuanji'}"></router-view>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  created() {
    this.id=this.$route.query.id
    this.getZhuanjiList()
    // console.log(this.$route.query)
  },
  data() {
    return {
      // 获取路由最后一个path，来确定现在点击激活的组件
      activeName: this.$route.path.split("/")[this.$route.path.split("/").length-1],
      id: '',
      zhuanjilist: {
        album:{
          info:{}
        },
        
      },
      // 歌曲数组
      songArray: [],
      // 喜欢歌曲数组
      likeArray: [],
    }
  },
  methods: {
    dayjs,
    // 标签跳转路由选着专辑界面还是评论界面
    handleClick() {
      if(this.$route.path!=='/main/zhuanjilist/' + this.activeName){
        this.$router.push({
          path:'/main/zhuanjilist/' + this.activeName,
          query:{
            id:this.id
        }
        })
      }
    },
    // 获取目标专辑页面数据
    async getZhuanjiList() {
      const { data: res } = await this.$http.get('/album', { params: { id: this.id } })
      if (res.code == 200) {
        this.zhuanjilist = res
      }
      console.log(res)

    },
  }
}
</script>

<style lang="less" scoped>
.head {
  // border: 1px solid;

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

  .img_title {
    display: flex;
    width: 230px;
    height: 230px;
    border-radius: 10px;
  }

  .gedan_div {
    color: red;
    width: 30px;
    border: 1px solid red;
  }

  .name_div {
    margin-left: 20px;
  }

  .creator {
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }

    div {
      margin-right: 10px;
    }
  }

  .button {
    margin-top: 10px;
    .play_button {
      display: flex;
      // width: 170px;
    }

    .play_button2 {
      padding-left: 5px;
      padding-right: 5px;
    }
  }

  .playcount {
    margin-top: 10px;
    div {
      margin-right: 20px;
    }
  }
  .time{
    display: flex;
    margin-top: 10px; 
  }
}

.songstag {
  /deep/.el-tabs__nav-wrap::after {
    display: none;
  }
}
</style>