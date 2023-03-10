<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabClick(parentPath,activeName)">
      <el-tab-pane label="个性推荐" name="gexing"></el-tab-pane>
      <!-- <el-tab-pane label="歌单" name="gedan">歌单</el-tab-pane> -->
      <el-tab-pane label="排行榜" name="paihangbang"></el-tab-pane>
      <el-tab-pane label="歌手" name="geshou"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import gexing from '@/components/Main/FindMusic/gexing.vue'
import {handleTabClick} from '@/api/api_main.js'
export default {
  data () {
    return {
      // 父路由地址
      parentPath :this.$route.path.substring(0, this.$route.path.lastIndexOf('/')+1),

      activeName: this.$route.path.split('/').pop()
    }
  },
  methods: {
    handleTabClick,
    handleClick(){
      this.$router.push('/main/FindMusic/'+this.activeName)
    }
  },
  components: {
    gexing
  }
}
</script>

<style lang="less" scoped>
.main{
  display: flex;
  flex-direction:column;
}
</style>