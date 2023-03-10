<template>
  <!-- 搜索界面歌手板块 -->
  <div class="searchSinger">
    <div class="singer-div" v-for="singer in singerArray" :key="singer.id">
      <el-image
      :src="singer.img1v1Url"
      style="height: 100%"
      fit="fill"></el-image>
      <div>{{ singer.name+"("+singer.alia[0]+")" }}</div>
    </div>
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
      singerArray:[]
    }
  },
  methods: {
    
  },
  watch: {
    SearchList:{
      handler(newVal){
        this.singerArray=newVal.artists
      },
      immediate:true
    }
  }
}
</script>

<style lang="less" scoped>
.searchSinger{
  .singer-div{
    display: flex;
    align-items: center;
    height: 100px;
    padding: 10px 0;
    .el-image{
      margin-right: 10px;
      border-radius: 5px;
    }
  }
  .singer-div:hover{
    background-color: #f5f5f5;
  }
}
</style>