<template>
  <div class="main">
    <router-link to="/home">首页</router-link>
    <div class="login">
      <div class="logo_img">
        <img src="@/assets/logo.png">
      </div>
      <div>
        <loginCode v-if="iscodePage"></loginCode>
        <loginQr :isqrPage="!iscodePage" v-else></loginQr>
      </div>

      <div class="code_qr">
        <el-button type="primary" round size="mini" :disabled="iscodePage" @click="iscodePage=true">验证码登录</el-button>
        <el-button type="primary" round size="mini" :disabled="iscodePage?false:true" @click="iscodePage=false" >二维码登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import loginQr from '@/components/Login/loginQr.vue'
import loginCode from '@/components/Login/loginCode.vue'
export default {
  components: {
    loginQr,
    loginCode
  },
  data () {
    return {
      iscodePage:true,
      isqrPage:false
      }
    },
  methods: {
    }
  }
</script>

<style lang="less" scoped>
.main{
  width: 100%;
  height: 100%
}
.login{
  position: absolute;
  width: 400px;
  height: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: 1px solid;
  .logo_img{
    position: absolute;
    width: 130px;
    height: 130px;
    left: 50%; 
    img{
    width:100%;
    height: 100%;
    border-radius: 50%;
    transform: translate(-50%,-50%);
  }
  }
  .LoginForm{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .buttonFrom{
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-end;
  }
  .code_qr{
    position: absolute;
    left: 10px;
    top: 70px;
  }
}
</style>>
