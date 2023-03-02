<template>
  <div>
    <el-row :gutter="20" class="head" type="flex">
      <el-col :span="6">
        <!-- 歌单图片 -->
        <img :src=playlist.coverImgUrl class="img_title">
      </el-col>
      <!-- 歌单图片右侧 -->
      <el-col :span="15">
        <!-- 歌单标题 -->
        <el-row class="title flex_y_center">
          <div class="gedan_div">歌单</div>
          <div class="name_div" style="font-size:20px">{{ playlist.name }}</div>
        </el-row>
        <!-- 歌单作者 -->
        <el-row class="creator flex_y_center">
          <div><img :src="playlist.creator.avatarUrl"></div>
          <div><router-link to="path">{{ playlist.creator.nickname }}</router-link></div>
          <div>{{ dayjs(playlist.createTime).format('YYYY-MM-DD') }}</div>
        </el-row>
        <!-- 歌单播放、收藏 -->
        <el-row :gutter="0" class="button">
          <!--播放 -->
          <el-col :span="5">
            <el-button-group class="play_button">
              <el-button type="danger" size="mini" round><i class="el-icon-caret-right"></i>播放全部</el-button>
              <el-button class="play_button2" type="danger" size="mini" round icon="el-icon-plus"></el-button>
            </el-button-group>
          </el-col>
          <!-- 收藏 -->
          <el-col :span="5">
            <el-button type="danger" size="mini" round><i
                class="el-icon-folder-add"></i>收藏({{ this.$numberFormat(playlist.subscribedCount) }})</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" size="mini" round><i class="el-icon-download"></i>下载全部</el-button>
          </el-col>
        </el-row>
        <!-- 歌单标签 -->
        <el-row type="flex" v-if="playlist.tags&&playlist.tags.length!=0">
          <div >{{ '标签：' }}</div>
          <!-- 在插值运算符中判断'/'什么时候需要 -->
          <router-link to="path" v-for="(item, index) in playlist.tags"
            :key="index">{{ index== playlist.tags.length - 1 ? item : item + '/'}}</router-link>
        </el-row>
        <!-- 歌单歌曲量、播放量 -->
        <el-row type="flex" class="playcount">
          <div>{{ "歌曲："+playlist.trackCount }}</div>
          <div>{{ "播放："+this.$numberFormat(playlist.playCount) }}</div>
        </el-row>
      </el-col>
    </el-row>
    <!-- 歌曲列表tags -->
    <el-row class="songstag">
      <el-tabs v-model="activeName" @tab-click="handleTabClick(parentPath,activeName,id)">
        <el-tab-pane label="歌曲列表" name="songlist"></el-tab-pane>
        <el-tab-pane :label="`评论(${playlist.commentCount})`" name="pinglun"></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 歌单区域和评论区域 -->
    <router-view :nameid="'gedan'" :songArray="songArray"></router-view>
  </div>
</template>

<script>
import {handleTabClick,getGedanData,getSongArray} from '@/api/api_main.js'
import dayjs from 'dayjs'
export default {
  created() {
    // vuex传值
    // this.gedanid = this.$store.state.gedanid
    // 路由url传值
    this.id=this.$route.query.id
    // this.$store.commit('editGedanId',this.idid)
    // console.log(this.$route.query.gedanid)
    // 先获取喜欢列表
    // this.getlikeArray()
    // 生成歌单
    this.getGedanData()
    this.getSongArray()
  },
  data() {
    return {
      // 当前父路由所有地址
      parentPath :this.$route.path.substring(0, this.$route.path.lastIndexOf('/')+1),
      // name:'gedan',
      // 获取路由最后一个path，来确定现在点击激活的组件
      activeName: this.$route.path.split("/").pop(),
      id: '',
      playlist: {
        creator: {}
      },
      // 歌曲数组
      songArray: [],
      // 喜欢歌曲数组
      likeArray: [],
    }
  },
  methods: {
    handleTabClick,
    dayjs,
    // 标签跳转路由选着歌单界面还是评论界面
    handleClick() {
      if(this.$route.path!=='/main/gedanpage/' + this.activeName){
        this.$router.push({
          path:'/main/gedanpage/' + this.activeName,
          query:{
            id:this.id
        }
        })
      }
    },
    // 获取目标歌单页面数据,获取歌单详情
    async getGedanData() {
      const { data: res } = await getGedanData(this.id)
      if (res.code == 200) {
        this.playlist = res.playlist  
      }
      // 存取当前歌单list入vuex
      
      // console.log(res)

    },
    // 获取歌单歌曲列表
    async getSongArray() {
      const { data: res } = await getSongArray(this.id)
      if (res.code == 200) {
          this.songArray=res.songs
          // this.$store.commit('setMusicList',this.songArray)
          // console.log(this.$store.state)
      }
      
      // console.log(res)
    },
  },
  watch: {
    // 监听路由的变化
    '$route.query': function(newQuery, oldQuery) {
      // 判断需要重新渲染的条件
      if (newQuery.id !== oldQuery.id) {
        // 执行重新渲染组件的操作
        this.id=this.$route.query.id
        this.activeName= this.$route.path.split("/").pop(),
        this.getGedanData()
        this.getSongArray()
      }
    }
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
    margin-bottom: 10px;
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
}

.songstag {
  /deep/.el-tabs__nav-wrap::after {
    display: none;
  }
}
</style>