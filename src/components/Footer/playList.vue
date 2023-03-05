<template>
  <div class="playlist">
    <h3>当前播放</h3>
    <!-- 表头操作 -->
    <div class="title-div">
      <span>{{ '总'+musicList.length+'首' }}</span>
      <div class="collect" @click="collect">
        <i class="el-icon-folder-add"></i>
        <span>收藏全部</span>
        <span class="clear">清空列表</span>
      </div>
    </div>
    <div></div>
    <!-- 歌单表格 -->
      <el-table :data="musicList" :cell-style="{padding: '5px'}" :row-style="{ height:'0' }" :row-class-name="tableRowClassName" stripe height="500" style="width: 100%" @row-dblclick="playMusic">
        <!-- <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row}}</span>
      </template> -->
        <el-table-column
          prop="name"
          label="歌曲名"
          width="180"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="歌手名"
          width="110"
          show-overflow-tooltip>
          <template slot-scope="scope" >
            <!-- 用map把歌手name取出然后使用'/'分隔 -->
            {{ scope.row.ar.map(singer => singer.name).join('/') }}
          </template>
        </el-table-column>
        <el-table-column label="时间" >
          <template slot-scope="scope" >
              {{ dayjs(scope.row.dt, 'second').format('mm:ss') }}
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import dayjs from 'dayjs';
export default {
  created () {
    
  },
  mounted () {
    // console.log(this.musicList)
  },
  data () {
    return {
      
    }
  },
  methods: {
    dayjs,
    playMusic(row) {
      console.log(row)
      this.$emit('playMusic', row);
    },
    // 收藏全部歌曲
    collect(){
    },
    // 显示当前播放行为红色
    tableRowClassName({row, rowIndex}) {
        if (rowIndex == this.currenIndex) {
          return 'palying';
        } 
        return '';
      }
  },computed: {
    ...mapState(['musicList','currenIndex'])
  }
}
</script>

<style lang="less" scoped>
.playlist {
  padding-left: 20px;
  background-color: #fff;
  h3{
    margin: 20px 0;
    text-align: left;
    font-weight: bold;
    font-size: 20px;
  }
  .title-div{
    display: flex;
    .collect{
      margin-left: auto;
      .clear{
        margin-left: 20px;
      }
    }
  }
  // 当前播放行的样式
  /deep/.palying{
    td{
      color: red;
    }
  }
}
</style>
