<template>
  <div>
    <el-header class="flex-center">
      <div class="title">
          <div class="flex_center col1">
            <img src="@/assets/logo.png" alt="" class="logoImg">
            <span>网易云音乐</span>
          </div>
              <el-button class="buttonCss" size="mini" circle icon="el-icon-arrow-left" @click="goup"></el-button>
              <el-button class="buttonCss" size="mini" circle><i class="el-icon-arrow-right" @click="godown"></i></el-button>
              <search></search>
          <div class="flex_center usercol" @click="userLoggin">
            <img v-if="userinfo" class="userimg" :src="userinfo.avatarUrl" alt="">
            <el-avatar v-else :size="30" icon="el-icon-user-solid"></el-avatar>
            <span v-if="userinfo" class="mleft-10">{{ userinfo.nickname }}</span>
            <span v-else class="mleft-10">{{ '点击登录' }}</span>
          </div>
          <div class="exit" @click="exitUser">用户退出</div>
      </div>

    </el-header>

    <!-- 登录对话框 -->
    <!-- <el-dialog
      title="网易云登录"
      :visible.sync="logginDialogVisible"
      width="30%"
      :before-close="handleClose"
      :modal='false'>
      <loggin></loggin>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logginDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import login from '@/components/Login/login.vue'
import search from '@/components/Header/Search/search.vue'
import { mapMutations, mapState } from 'vuex'
import {logout} from '@/api/api_main.js'
export default {
  created() {
    // this.status()
    // this.getUserInfo()
  },
  data() {
    return {
      // userInfo: {
      //   username: '未登录',
      //   uid: localStorage.getItem("uid"),
      //   cookie: localStorage.getItem("cookie")
      // },
      seartext: ''
    }
  },
  components: {
    login,
    search
  },
  methods: {
    ...mapMutations(['setUserInfo','reset']),
    userLoggin() {
      console.log(this.userinfo)
      if(this.userinfo) {
        return
      }
        
      this.$router.push('/login')
      // this.logginDialogVisible=true
    },
    // 加载时候获取localstorage用户信息
    // async getUserInfo() {
    //   const { data: res } = await this.$http.get('/user/detail', { params: { uid: this.userInfo.uid } })
    //   console.log(res)
    //   if (res.code !== 200) return this.$message.error('获取用户信息失败')
    //   this.$message.success('获取用户信息成功')
    //   // this.userInfo=
    // },
    // async status() {
    //   const { data: res } = await this.$http.get('/login/status', { params: {} })
    //   this.userInfo.username = res.data.profile.nickname
    //   window.localStorage.setItem('userid', res.data.account.id)
    //   // console.log(res)
    // },
    //返回上一页按钮
    goup() {
      this.$router.go(-1)
    },
    godown(){
      this.$router.go(1)
    },
    async exitUser(){
      const{data:res }=await logout()
      if(res.code==200){
        // 用户退出，清理用户信息
        // this.setUserInfo()
        // 清除浏览器历史记录，回到最初状态
        this.$message.success('用户退出')
      }
      // 重置vuex中数据
      this.reset()
      location.reload(true);
    }
  },
  computed: {
    ...mapState(['userinfo'])
  },

}
</script>

<style lang="less" scoped>
/deep/ .el-input__inner {
  height: 30px;
}

/deep/ .el-button--mini.is-circle {
  padding: 4px;
}

/deep/.col1 {
  padding: 0 80px 0 4px;
  span{
    margin-left: 10px;
  }
}
.title{
  display: flex;
  align-items: center;
  width: 100%;
}
.el-header {
  position: relative;
}

.buttonCss {
  background-color: rgba(0, 0, 0, 0.05);
  border: none;
}

.flex-center {
  height: 76px;
  display: flex;
  align-items: center;
}

.el-col-search {
  padding-right: 100px;
}

.usercol {
  margin-left: auto;
  width: 200px;
}

.el-col {
  // border: 1px solid;
}
.userimg{
  width: 30px;
  border-radius: 50%;
}
.logoImg {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.exit{
  cursor: pointer;
}

// .flex-center{

// }
</style>

