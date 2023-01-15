<template>
  <div>
    <div class="container clearfix">
      <div class="slider" id="slider">
        <div class="slider_item" v-for="(item,index) in bannerlist" :key="index">
          <img :src="item.imageUrl" alt="" />
        </div>
      </div>

      <div class="menu">
        <span class="btn btn_pre" @click="pre">
          <i class="el-icon-arrow-left"></i>
        </span>

        <span class="btn btn_next" @click="next">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <div>
        <ul class="button">
          <li class="round" @mouseover="hover(index)" v-for="(item,index) in bannerlist" :key="index"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// let current = 0

export default {
  mounted() {
    this.getBanner()
    // setInterval(() => {
    //   this.next()
    // }, 5000)
  },
  updated () {
    this.change()
  },
  data() {
    return {
      bannerlist: [],
      current: 0,
    }
  },
  methods: {
    change() {
      // const itemleft = document.getElementsByClassName(`list-${this.left}`)
      // const itemright = document.getElementsByClassName(`list-${this.right}`)
      // const itemcurrent = document.getElementsByClassName(`list-${this.current}`)
      const itemparent=document.getElementsByClassName('slider_item')
      // itemleft[0].className='slider_item left'
      // itemright[0].className = 'slider_item right'
      // itemcurrent[0].className = 'slider_item center'
      for (let index = 0; index < this.bannerlist.length; index++) {
        itemparent[index].className='slider_item'
      }
      itemparent[this.left].className='slider_item left'
      itemparent[this.right].className='slider_item right'
      itemparent[this.current].className='slider_item center'
  
    },
    next() {
      this.current = (this.current + 1) % this.bannerlist.length
      this.change()
    },
    pre() {
      this.current =
        (this.current + this.bannerlist.length - 1) % this.bannerlist.length
      this.change()
    },
    async getBanner() {
      const { data: res } = await this.$http.get('/banner')
      if (res.code !== 200) return this.$message.error('获取banner失败')
      this.bannerlist = res.banners
    },
    hover(index){
      this.current=index
      this.change()
    }
  },
  computed: {
    left() {
      return (this.current - 1 + this.bannerlist.length) % this.bannerlist.length
    },
    right() {
      return (this.current + 1) % this.bannerlist.length
    },

  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 278px;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  position: relative;
  border: 1px solid;
}

.slider {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider_item {
  width: 540px;
  position: absolute;
  overflow: hidden;
  border-radius: 16px;
  z-index: 0;
  transition: all 0.45s ease-in-out;
}

.slider_item>img {
  width: 100%;
  display: block;
}

.slider_item.center {
  width: 640px;
  z-index: 2;
}

.slider_item.left {
  transform: translateX(-200px);
  z-index: 1;
}

.slider_item.right {
  transform: translateX(200px);
  z-index: 1;
}

.menu {
  width: 100%;
  height: 50px;
  position: absolute;
  z-index: 2;
}

.menu>.btn {
  cursor: pointer;
  width: 50px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  padding: 14px;
}

.btn.btn_pre {
  position: absolute;
  left: 0;
}

.btn.btn_next {
  position: absolute;
  right: 0;
}

.btn>img {
  width: 100%;
  height: 100%;
}
.button{
  width: 148px;
  height: 20px;
  display: flex;
  flex-direction:row;
  justify-content:space-between;
  align-content:flex-start;
  // background-color: red;
}
.round{
  background-color: gray;
  width: 6px;
  height: 6px;
  border-radius: 50%;

}
.round:hover{
  background-color: red;
}
</style>
