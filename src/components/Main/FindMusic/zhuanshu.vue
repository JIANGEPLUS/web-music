<template>
  <div class="zhuanshu">
    <h3>{{ this.$store.state.userinfo.nickname+'的雷达歌单' }}</h3>
    <!-- <div class='right'>     
      <el-button class="buttonCss" size="mini" circle icon="el-icon-arrow-left" @click="goup"></el-button>
      <el-button class="buttonCss" size="mini" circle><i class="el-icon-arrow-right" @click="godown"></i></el-button>
    </div> -->

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.zhuanshu{
  h3{
    text-align: left;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>