<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="gexing"></el-tab-pane>
      <el-tab-pane label="专属定制" name="zhuanshu"></el-tab-pane>
      <el-tab-pane label="歌单" name="gedan">歌单</el-tab-pane>
      <el-tab-pane label="排行榜" name="paihangbang"></el-tab-pane>
      <el-tab-pane label="歌手" name="geshou"></el-tab-pane>
      <el-tab-pane label="最新音乐" name="newmusic">最新音乐</el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import gexing from '@/components/Main/FindMusic/gexing.vue'
export default {
  data () {
    return {
      activeName: this.$route.path.split('/').pop()
    }
  },
  methods: {
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