<template>
  <div>
    <el-dialog
      :visible.sync="this.newHotVisible"
      width="30%"
      :before-close="handleClose">
      <span>热搜榜</span>
      <ol>
        <li v-for="(item,index) in hotList" :key="index">
          <span>{{index}}</span>
          <span>{{ item.searchWord }}</span>
          <span>{{ item.score }}</span>
        </li>
      </ol>
      <span slot="footer" class="dialog-footer">
        <el-button @click="this.hotVisible = false">取 消</el-button>
        <el-button type="primary" @click="this.hotVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['hotVisible','hotList'],
  data () {
    return {
      hotDialogVisible:hotVisible
    }
  },
  methods: {
    handleClose(){

    }
  },
  computed: {
    newHotVisible(){
      return this.hotVisible
    }
  },
  watch: {
    
  }
}
</script>

<style lang="less" scoped>

</style>