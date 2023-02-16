<template>
  <div class="geshou">
    <div class="language">
      <div ><span>语种：</span></div>
        <ul>
          <li v-for="(item,index) in language.languageArray" :key="index" @click="selectItem($event,language,index)">
            <div>{{item}}</div>
          </li>
        </ul>
    </div>
    <div class="language">
      <div >分类：</div>
        <ul>
          <li v-for="(item,index) in fenlei.fenleiArray" :key="index" @click="selectItem($event,fenlei,index)">
            <div>{{item}}</div>
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
          <li v-for="(item,index) in fliter.fliterArray" :key="index" @click="selectItem($event,fliter,index)">
            <div>{{item}}</div>
          </li>
        </ul>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      language:{
        area:'',
        activeId:null,
        languageArray:['全部','华语','欧美','日本','韩国','其他'],
        areaArray:[-1,7,96,8,16,0]
      },
      fenlei:{
        type:'',
        activeId:null,
        fenleiArray:['全部','男歌手','女歌手','乐队组合'],
        typeArray:[-1,1,2,3]
      },
      fliter:{
        initial:'',
        activeId:null,
        fliterArray:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']
      }
      
    }
  },
  methods: {
    selectItem(e,item,id) {
      console.log(item.activeId,id)
        // 点击的li的父元素里面找到active，删除它
      if(item.activeId!=null)
      {
      e.currentTarget.parentElement.getElementsByClassName('active')[0].classList.remove("active")
      }
      
      // 给li的子元素div添加类名active
      item.activeId=id
      e.currentTarget.firstElementChild.classList.add("active");
    },
  }
}
</script>

<style lang="less" scoped>
.geshou{
  // 语种样式
  .language{
    display: flex;
    // align-items: center;
    .title{
      float: left;
    }
    li{
      float: left;
      padding: 0 10px;
      border-right: 1px solid;
      div{
        padding:0 12px;
        border-radius: 10px 10px 10px 10px;
        font-size: 12px;
      }
      div.active{
        color: red;
        background-color: #fff6f6;
      }
    }
    li:last-child{
      border-right:none
    }
  }
}
</style>