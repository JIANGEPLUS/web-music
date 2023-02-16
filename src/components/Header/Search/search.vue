<template>
  <div class="main">
    <el-input v-model="seartext" prefix-icon="el-icon-search" placeholder="请输入内容" @focus="getSearchHot"
      @blur="closeSearchHot" class="seachInput"></el-input>
    <div class="searchHot" v-show="searchhotshow">
      <div class="searchHistory"></div>
      <div class="Hot">
        <div class="Hottitle font-24">
          热搜榜
        </div>
        <div ref="hotItemRef" class="Hotitem" :class="{ 'top-item': index < 3 }" v-for="(item, index) in searchHotList"
          :key="index">
          <div class="Itemindex font-24">{{ index+ 1 }}</div>
          <div class="Itemtext font-16">{{ item.searchWord }}</div>
          <div class="Iteamscore font-12">{{ item.score }}</div>
          <div style="color:red">
            {{ 'HOT' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seartext: '',
      searchHotList: [],
      searchhotshow: false
    }
  },
  methods: {
    async getSearchHot() {
      console.log(this.searchHotList.length)
      if (this.searchHotList.length <= 0) {
        const { data: res } = await this.$http.get('/search/hot/detail')
        console.log(res)
        if (res.code !== 200) return this.$message.error('获取热搜列表失败')
        // this.$message.success('获取热搜列表成功')
        this.searchHotList = res.data
        console.log(this.hotVisible)
        console.log(this.searchHotList)
      }
      this.searchhotshow = true
      return 0
    },
    closeSearchHot() {
      this.searchhotshow = false
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
      }, 2000)
    }
  },

}
</script>

<style lang="less" scoped>
@hotwidth: 432px;

.main {
  position: relative;
}

/deep/ .el-input__icon {
  line-height: 30px;
}

.seachInput {
  width: 200px;

  /deep/ .el-input__inner {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 15px;
    border: none;
  }

}

//搜索热度框的样式
.searchHot {
  position: absolute;
  background-color: #fff;
  z-index: 999;
  left: -20px;
  top: 54px;
  width: @hotwidth;
  height: 300px;
  overflow: scroll;
  border: 1px solid;
  border-radius: 10px;
}

.Hottitle {
  display: flex;
  padding: 28px;
}

.Hotitem {
  display: flex;

  height: 68px;
  align-items: center;
}

.Hotitem:hover {
  background-color: #f2f2f2;

}

.Itemindex {
  width: 58px;
}

.Itemtext {
  padding: 0 10px;
}

.Iteamscore {
  opacity: 0.2;
  padding-right: 10px;
}

.top-item {
  .Itemindex {
    color: #e13e3e;
  }

  .Itemtext {
    font-weight: bold;
  }
}
</style>