<template>
  <div>
    <div>{{ this.$store.getters.doneuserinfo.userId }}</div>
  </div>
</template>

<script>
import {getlikeArray} from '@/api/api_main.js'
export default {
  created () {
    this.getlikeArray()
  },
  data () {
    return {
      likeArray:[],
    }
  },

  methods: {
        // 获得喜欢歌曲列表
      async getlikeArray() {
      const { data: res } = await getlikeArray()
      this.likeArray = res.ids
      console.log(this.likeArray)
    },

    // 获取用户id

  }
}
</script>

<style lang="less" scoped>

</style>