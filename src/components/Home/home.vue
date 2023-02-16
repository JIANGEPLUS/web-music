<template>
  <div class="homediv">
    <!-- 卡片区域 -->
    <el-card class="box-card">

        <!-- home页面布局结构 -->
        <el-container>
          <el-header>
            <!-- <router-view name="header"></router-view> -->
            <Header></Header>
          </el-header>
          <el-container>
            <el-container class="asidehight">
              <el-aside width="200px">
                <!-- <router-view name="aside"></router-view> -->
                <Aside></Aside>
              </el-aside>
              <el-main>
                <!-- <router-view name="main"></router-view> -->
                <Main></Main>
              </el-main>
            </el-container>
            <el-footer>
              <router-view name="footer"></router-view>
            </el-footer>
          </el-container>
      </el-container>
    </el-card>
  </div>

</template>

<script>
import Header from '@/components/Header/header.vue'
import Main from '@/components/Main/main.vue'
import Aside from '@/components/Asiede/aside.vue' 
export default {
  created () {
    this.getUserInfo()
  },
  components: {
    Header,
    Main,
    Aside
  },
  methods: {
   async getUserInfo(){
      const{data:res}=await this.$http.get('/user/account',{params:{}})
      if(res.code==200){
        this.$store.commit('getUserInfo',res.profile)
      }
      // console.log(res)

    }
  }
}
</script>

<style lang="less" scoped>
.homediv{
  display: flex;
  justify-content:center;
}
.box-card{
  width: 1280px;
  height: 840px;
}
.el-header{
 background-color: #fd5441;
}
.el-footer{
 background-color: gray;
}
.asidehight{
  height: 676px;
}
.el-aside{
 border: 1px solid red;
}
</style>

