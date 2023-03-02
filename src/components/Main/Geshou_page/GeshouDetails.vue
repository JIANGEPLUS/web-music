<template>
  <div class="GeshouDetails">
    <div v-for="(item,index) in geshouContent" :key="index">
      <!-- <div class="title">{{ item.ti }}</div> -->
      <h3>{{item.ti}}</h3>
      <!-- <div class="text"></div> -->
      <p class="text">{{ item.txt }}</p>
    </div>

  </div>
</template>

<script>
export default {
  created () {
    this.getGeshouDetail()
  },
  data() {
    return {
      // 歌手id
      singerid: this.$route.query.id,
      geshouContent:[]
    }
  },
  methods: {
    async getGeshouDetail() {
      const { data: res } = await this.$http.get('/artist/desc', { params: { id: this.singerid } })
      if (res.code == 200) {
        // 专辑数组添加新的专辑
        this.geshouContent = res.introduction
      }
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.GeshouDetails{
  text-align: left;
  h3{
    display: flex;
    font-weight: bold;
  }
  .text{
    white-space: pre-line;
  }
}
</style>