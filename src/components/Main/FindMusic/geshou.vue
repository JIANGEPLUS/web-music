<template>
  <div class="geshou">
    <!-- 选择模块 -->
    <div class="head">
      <div class="language">
        <div><span>语种：</span></div>
        <ul>
          <li  v-for="(item, index) in language.languageArray" :key="index" @click="selectItem($event, language, index)">
            <div :class="{'active':index==0 }">{{ item }}</div>
          </li>
        </ul>
      </div>
      <div class="language">
        <div>分类：</div>
        <ul>
          <li v-for="(item, index) in fenlei.fenleiArray" :key="index" @click="selectItem($event, fenlei, index)">
            <div :class="{'active':index==0 }">{{ item }}</div>
          </li>
        </ul>
      </div>
      <div class="language">
        <el-row>
          <span class="title">筛选：</span>
          <!-- <el-col :span="3">
            
          </el-col> -->
          <el-col :span="21">
            <ul>
              <li v-for="(item, index) in fliter.fliterArray" :key="index" @click="selectItem($event, fliter, index)">
                <div :class="{'active':index==0 }">{{ item }}</div>
              </li>
            </ul>
          </el-col>
        </el-row>

      </div>
    </div>
    <!-- 歌手图片展示 -->
    <div class="main" v-infinite-scroll="load" style="overflow:visible" infinite-scroll-disabled="disabled" infinite-scroll-delay="500">
      <div class="singers-container" >
        <div v-for="(singer, index) in singers" :key="index" class="singer-item" @click="toGeshoupage(singer.id)">
          <img :src="singer.img1v1Url" alt="singer avatar">
          <p class="singer-name">{{ singer.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  created () {
    this.getSongList()
  },
  data() {
    return {
      language: {
        area: '-1',
        activeId: 0,
        languageArray: ['全部', '华语', '欧美', '日本', '韩国', '其他'],
        areaArray: [-1, 7, 96, 8, 16, 0]
      },
      fenlei: {
        type: '-1',
        activeId: 0,
        fenleiArray: ['全部', '男歌手', '女歌手', '乐队组合'],
        typeArray: [-1, 1, 2, 3]
      },
      fliter: {
        initial: '-1',
        activeId: 0,
        fliterArray: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
        initialArray:['-1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0']
      },
      // 歌手数据列表
      singers:[],
      // 页数偏移，页数默认30每页
      loading:false,
      offset:0
    }
  },
  methods: {
    selectItem(e, item, id) {
      console.log(item.activeId, id)
      // 点击的li的父元素里面找到active，删除它
      if (item.activeId != null) {
        e.currentTarget.parentElement.getElementsByClassName('active')[0].classList.remove("active")
      }

      // 给li的子元素div添加类名active
      item.activeId = id
      e.currentTarget.firstElementChild.classList.add("active");

      // 给选项中赋值
      this.fenlei.type=this.fenlei.typeArray[this.fenlei.activeId]
      this.language.area=this.language.areaArray[this.language.activeId]
      this.fliter.initial=this.fliter.initialArray[this.fliter.activeId]
      // 清0歌手列表页数偏移
      this.offset=0
      this.singers=[]
      // 发送歌手请求
      this.getSongList()
    },
    async getSongList(){
      const { data: res } = await this.$http.get('/artist/list',{params:{type:this.fenlei.type,area:this.language.area,initial:this.fliter.initial,offset:this.offset*30}})
      console.log(res)
      // this.offset=this.offset+1
      this.singers=[...this.singers,...res.artists]
      console.log(this.singers)
    },
    // 页面滚动底部时触发
    load(){
      this.loading=true
      this.offset=this.offset+1
      console.log(this.offset)
      if(this.loading==true){
        this.getSongList()
        this.loading=false
      }
      
      },
      toGeshoupage(id){
        this.$router.push({
          path: '/main/geshoupage',
          query: {
            id: id
          }
        })
      }
   
  },
  computed: {
      disabled () {
        return this.loading
      }
    },
  
}
</script>

<style lang="less" scoped>
.geshou {

  // 语种样式
  .head {
    .language {
      display: flex;

      // align-items: center;
      .title {
        float: left;
      }
      // 每一组的选项设置
      li {
        float: left;
        padding: 0 10px;
        border-right: 1px solid;
        // 筛选的子选项的样式
        div {
          padding: 0 12px;
          border-radius: 10px 10px 10px 10px;
          font-size: 12px;
        }
        div:hover{
          cursor:pointer;
        }
        div.active {
          color: red;
          background-color: #fff6f6;
        }
      }

      li:last-child {
        border-right: none
      }
    }
  }

  .main {
    .singers-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
}

.singer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(16.666% - 12px);
  margin: 6px;
}
.singer-item:hover{
  cursor:pointer;
}

.singer-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.singer-name {
  font-size: 14px;
  margin-top: 10px;
}
  }
}
</style>