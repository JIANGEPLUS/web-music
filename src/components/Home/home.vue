<template>
  <div class="homediv">
    <!-- 卡片区域 -->
    <div class="container-div" ref="container">
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
                <Footer></Footer>
              </el-footer>
            </el-container>
          </el-container>
      </el-card>
    </div>

  </div>
</template>

<script>
import Header from '@/components/Header/header.vue'
import Main from '@/components/Main/main.vue'
import Aside from '@/components/Asiede/aside.vue'
import Footer from '@/components/Footer/footer.vue'
import { mapMutations } from 'vuex'
export default {
  created() {
    this.setUserInfo()
  },
  mounted() {
    const container = this.$refs.container
    console.log(container.clientWidth)
    this.setClientHeight(container.clientHeight)
    this.setClientWidth(container.clientWidth)

  },
  components: {
    Header,
    Main,
    Aside,
    Footer
  },
  methods: {
    ...mapMutations(['setClientHeight', 'setClientWidth']),
    async setUserInfo() {
      const { data: res } = await this.$http.get('/user/account', { params: { timestamp: Date.now() } })
      if (res.code == 200) {
        this.$store.commit('setUserInfo', res.profile)
      }
      console.log(res)
      // console.log(this.$store.state.uid)

    }
  }
}
</script>

<style lang="less" scoped>
.homediv {
  display: flex;
  justify-content: center;
  // 禁用文本选择
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.container-div{
  display: flex;
}
.box-card {
  position: relative;
  width: 1280px;
  height: 840px;
}

.el-header {
  background-color: #fd5441;
}

.el-footer {
  // 因为.el-footer有行内样式
  height: 90px !important;
  background-color: white;
  border-top: 1px solid gray;
}

.asidehight {
  height: 676px;
}
</style>

