<template>
  <div>
    <el-header class="flex-center">
            <el-row>
              <el-col :span="10" >
                <div class="flex_center col1">
                  <img src="@/assets/logo.png" alt="" class="logoImg">
                  <span>网易云音乐</span>
                </div>
              </el-col>
              <el-col :span="8">
                  <el-row class="flex_center" :gutter="20">
                    <el-col :span="6" class="flex_center">
                      <el-button  class="buttonCss" size="mini" circle icon="el-icon-arrow-left"></el-button>
                      <el-button   class="buttonCss" size="mini" circle><i class="el-icon-arrow-right"></i></el-button>
                    </el-col>
                    <el-col :span="15" class="el-col-search"> 
                      <search></search>
                    </el-col>
                  </el-row>
              </el-col>
              <el-col :span="6">
                <div class="flex_center usercol"  @click="userLoggin">
                  <el-avatar :size="30" icon="el-icon-user-solid"></el-avatar>
                  <span class="mleft-10">{{ userInfo.username }}</span>
                </div>
              </el-col>
            </el-row>
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
export default {
  created () {
    // this.getUserInfo()
  },
  data () {
    return {
      userInfo:{
        username:'未登录',
        uid:localStorage.getItem("uid"),
        cookie:localStorage.getItem("cookie")
      },
      seartext:''
    }
  },
  methods: {
    userLoggin(){
      this.$router.push('/login')
      // this.logginDialogVisible=true
    },
    // 加载时候获取localstorage用户信息
    async getUserInfo(){
      const {data:res}=await this.$http.get('/user/detail',{params:{uid:this.userInfo.uid}})
        console.log(res)
        if (res.code !== 200) return this.$message.error('获取用户信息失败')
        this.$message.success('获取用户信息成功')
        // this.userInfo=
    },
    handleClose(){

    }
  },
  components: {
    login,
    search
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-input__inner{
      height: 30px;
    }
/deep/ .el-button--mini.is-circle{
  padding:4px;
}
/deep/.col1{
  padding: 0 80px 0 4px;
}
.el-header{
  position: relative;
}
.buttonCss{
      background-color:rgba(0,0,0,0.05);
      border: none;
    }
.flex-center{
  height: 76px;
  display: flex;
  align-items: center;
}
.el-col-search{
  padding-right: 100px;
}
.usercol{
  width: 100px;
  position: absolute;
  left: 600px;
}
.el-col{
    // border: 1px solid;
  }
  .logoImg{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  // .flex-center{

  // }
</style>

