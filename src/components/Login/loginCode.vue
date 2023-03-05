<template>
  <div>
    <el-form  :model="phoneForm"  ref="LoginForm" :rules="rules" label-width="70px" class="LoginForm">
        <el-form-item  label="手机号:" prop="phone" >
          
          <el-input v-model="phoneForm.phone" prefix-icon="el-icon-s-custom" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item  label="验证码:" prop="captcha" >
              <el-input v-model="phoneForm.captcha"  prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
            </el-form-item></el-col>
          <el-col :span="4">
            <el-button @click="getCode">
              <span v-show="time == 0">获取验证码</span>
              <span v-show="time != 0">{{ time }}s</span>
            </el-button>
          </el-col>
        </el-row>
        <el-row class="buttonFrom">
          <span class="nologin">因风控,验证码暂时无法登录,请选二维码登录</span>
          <el-button type="primary" @click="loginCode">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-row>
      </el-form> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneForm:{
        phone:'',
        captcha:'',
        password:'',
      },
      rules: {
        phone:[
            {required: true, message: '请输入手机号', trigger: 'blur' }
          ],
        captcha: [
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      },
      time:0,
      iscodePage:true,
      isqrPage:false
    }
  },
  methods: {
    
    submitForm(){
        this.$refs.LoginForm.validate(async(vaild)=>{
          if(vaild) {
        const {data:res} =await this.$http.post('login',this.form)
        console.log(res)
        if(res.meta.status!=200){
          this.$message({
          message: '登录出现问题',
          type: 'warning'
          })
          return  
        }
        this.$message({
        message: '恭喜你，登录成功',
        type: 'success'
        })
        sessionStorage.setItem('token',res.data.token)
        this.$router.push('/home')
        }
          else{
          this.$message({
          message: '登录失败',
          type: 'warning'
          })
        }
      }
      )
      },
    // 获取验证码
    async getCode(){
    const res=await this.$http.get('/captcha/sent',{params:{phone:this.phoneForm.phone,timestamp: Date.now()}})
    console.log(res)
    if (res.data.code !== 200) return this.$message.error('发送失败，请检查手机号')
    this.$message.success('发送成功！请查看手机信息')
    this.time=60
    this.timer=window.setInterval(()=>{
        this.time--
        if(this.time===0){
          window.clearInterval(this.timer)
        }
      },1000)
    },
          // 验证码登录
          async loginCode(){
        const {data:res}=await this.$http.get('/login/cellphone',{params:{phone:this.phoneForm.phone,captcha:this.phoneForm.captcha,timestamp: Date.now()}})
        console.log(res)
        if (res.code !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        this.$message.success('登录成功')
        localStorage.setItem("musicCookie", res.cookie);
        localStorage.setItem("uid", res.userId)
        localStorage.setItem("createTime", res.createTime)
        this.$router.push('/home')
      },
      // 游客登录
      async login(){
        const {data:res}=await this.$http.get('/register/anonimous')
        console.log(res)
        if (res.code !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        localStorage.setItem("musicCookie", res.cookie);
        localStorage.setItem("uid", res.userId)
        localStorage.setItem("createTime", res.createTime)
        this.$router.push('/home')
      },
      // 清空表单
      reset(){
        this.$refs.LoginForm.resetFields()
      }
  }
  
}
</script>

<style lang="less" scoped>
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
  .nologin{
    display: inline-block;
    width: 150px;
    margin-right: auto;
    text-align: left;
    color: red;
  }
</style>