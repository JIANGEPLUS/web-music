<template>
  <!-- 搜索界面专辑模块 -->
  <div class="searchAlbum">
    <div class="album-div" v-for="album in SearchList.albums" :key="album.id">
      <el-image
      :src="album.picUrl"
      style="height: 100%"
      fit="fill"></el-image>
      <div>{{ album.name }}</div>
      <div class="album-name" v-if="album.artist.alias[0]">{{ album.artist.name+"("+album.artist.alias[0]+")" }}</div>
      <div class="album-name" v-else>album.artist.name</div>
    </div>
      <!-- 分页模块 -->
      <el-pagination
        :page-size="SearchList.limit"
        :pager-count=7
        layout="prev, pager, next"
        :total="SearchList.albumCount"
        @current-change="handleCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
export default {
  props:{
    SearchList:{
      type:Object,
      required:true
    }
  },
  data () {
    return {
      // SearchList:[]
    }
  },
  methods: {
    // 换页触发父父组件函数函数
    handleCurrentChange(val){
      this.$emit('CurrentChange', val);
    }
  },
  watch: {
    // SearchList:{
    //   handler(newVal){
    //     this.SearchList=newVal
    //     console.log(this.SearchList)
    //   },
    //   immediate:true
    // }
  }
}
</script>

<style lang="less" scoped>
.searchAlbum{
  .album-div{
    display: flex;
    align-items: center;
    height: 100px;
    padding: 10px 0;
    .el-image{
      margin-right: 10px;
      border-radius: 5px;
    }
    // 用magin：auto使div盒子变到最右边，然后用margin-right控制右边距离
    .album-name{
      margin: auto;
      margin-right: 200px;
      // text-align: right;
    }
  }
  .album-div:hover{
    background-color: #f5f5f5;
  }
  .album-div:nth-child(2n){
    background-color: #fafafa;
  }
}
</style>