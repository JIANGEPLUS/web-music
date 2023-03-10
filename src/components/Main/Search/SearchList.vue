<template>
  <!-- 搜索界面main界面 -->
  <div class="searchList">
    <h3>搜索 {{ this.$route.query.keywords }}</h3>
    <p>你可能感兴趣</p>
    <div class="title-img" v-if="searchTitle.img1v1Url">
      <img :src="searchTitle.img1v1Url">
      <div>
        <div>{{ '歌手：'+searchTitle.name + '(' + searchTitle.alias[0] + ')' }}</div>
        <div>{{ '粉丝：'+numberFormat(searchTitle.fansSize) + '，歌曲：' + searchTitle.musicSize }}</div>
      </div>
    </div>
    <div class="tas-div">
      <el-tabs v-model="activeName" @tab-click="searchTabClick(parentPath, activeName,searchInfo.keywords)">
        <el-tab-pane label="单曲" name="searchSingle"></el-tab-pane>
        <el-tab-pane label="歌手" name="searchsinger"></el-tab-pane>
        <el-tab-pane label="专辑" name="searchAlbum"></el-tab-pane>
        <el-tab-pane label="视频" name="searchVideo"></el-tab-pane>
        <el-tab-pane label="歌单" name="searchMusicList"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view  :SearchList="SearchList" @CurrentChange="CurrentChange"></router-view>
  </div>
</template>

<script>
import { searchTabClick, numberFormat } from '@/api/api_main.js'
export default {
  created() {
    this.getSearchTitle()
    
  },
  // 在data数据更新后在获取最新list
  // mounted () {
  //   this.getSearchList()
  // },
  data() {
    return {
      parentPath: this.$route.path.substring(0, this.$route.path.lastIndexOf('/') + 1),
      activeName: this.$route.path.split("/").pop(),
      SearchList: {
        limit:100
      },
      searchTitle: {
        alias:[]
      },
      // 搜索数据信息
      searchInfo: {
        keywords: this.$route.query.keywords,
        limit: 100,
        offset:0,
        type: '1'
      }
    }
  },
  methods: {
    searchTabClick,
    numberFormat,
    // 获取搜索数据
    async getSearchTitle() {
      const { data: res } = await this.$http.get('/search/multimatch', { params: this.searchInfo })
      if (res.code == 200) {
        try{
         // 专辑数组添加新的专辑
        // console.log(res)
        this.searchTitle = res.result.artist[0]
        } catch(error){
          return
        }

      }
      console.log(this.searchTitle)
    },
    // 获取搜索数据
    async getSearchList() {
      const { data: res } = await this.$http.get('/cloudsearch', { params: this.searchInfo })
      if (res.code == 200) {
        // 专辑数组添加新的专辑
        // console.log(res)
        try{
          this.SearchList = res.result
          this.SearchList.limit=this.searchList.limit
        } catch(error){
          return
        }


      }
      // console.log(this.SearchList)
    }
    ,
    handleClick() {

    },
    // 子组件换页函数触发
    CurrentChange(page){
      this.searchInfo.offset=(page-1)*this.searchInfo.limit
      this.getSearchList()
    }
  },
  computed: {
  },
  watch: {
    // 监听query值，然后query值变化则刷新页面
    '$route.query.keywords'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$router.go(0);
      }
    },
    // 定义对象格式的侦听器
    activeName: {
    // 侦听器的处理函数
    handler(newVal, oldVal) {
      switch(newVal){
        case 'searchSingle':
        this.searchInfo.type='1'
        this.getSearchList()
        break 
        case 'searchsinger':
        this.searchInfo.type='100'
        this.getSearchList()
        break 
        case 'searchAlbum':
        this.searchInfo.type='10'
        this.searchInfo.limit=30
        this.getSearchList()
        break 
        case 'searchVideo':
        this.searchInfo.type='1014'
        this.searchInfo.limit=24
        this.getSearchList()
        break 
        case 'searchMusicList':
        this.searchInfo.type='1000'
        this.searchInfo.limit=20
        this.getSearchList()
        break
      }
    },
    // immediate 选项的默认值是 false
    // immediate 的作用是：控制侦听器是否自动触发一次！
    immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.searchList {
  h3 {
    display: flex;
    font-weight: bold;
  }

  p {
    display: flex;
    font-size: 6px !important;
    font-weight: 100;
  }

  .title-img {
    display: flex;
    width: 30%;
    padding: 20px 0 20px 10px;
    background-color: #f5f5f5;

    // flex-direction:column;
    img {
      width: 40px;
      border-radius: 50%;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

  }
}
</style>