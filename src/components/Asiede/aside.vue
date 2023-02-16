<template>
  <div class="vue_div">
    <!-- <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs> -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @close="handleClose"
      router>
        <el-menu-item index="/main/FindMusic">发现音乐</el-menu-item>
        <el-menu-item index="1-2">视频</el-menu-item>
        <el-menu-item index="1-2">关注</el-menu-item>
        <el-menu-item-group title="我的音乐" class="item_group_title">
          <el-menu-item index="1-3"><i class="icon-xihuan"></i>我喜欢的音乐</el-menu-item>
          <el-menu-item index="1-3" ><i class="el-icon-download"></i>本地与下载</el-menu-item>
          <el-menu-item index="1-3" ><i class="el-icon-tickets"></i>最近播放</el-menu-item>
          <el-menu-item index="1-3" ><i class="el-icon-star-off"></i>我的收藏</el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleClose(){

    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo{
  .el-menu-item{
    display: flex;
    align-items: center;
    height: 45px;
    padding: 10px 0 10px 10px !important;
    margin: 0 2px 4px 15px;
  }
  .el-menu-item:first-child{
    margin-top: 15px;
  }
}
/deep/.el-menu-item-group__title{
  display: flex;
}
.el-menu-item-group{
  .el-menu-item{
    display: flex;
    align-items: center;
    height: 45px;
    padding: 10px 0 10px 10px !important;
    margin: 15px 2px 4px 15px;
  }
}
.el-menu-item:hover{
  background-color: #f6f6f7;
}

</style>

