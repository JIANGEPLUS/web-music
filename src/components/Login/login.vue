<template>
  <div>
    
      <el-form :model="logginForm" status-icon :rules="loginrRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone">
          <el-input type="number" v-model="logginForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="ctcode">
          <el-input type="number" v-model="logginForm.ctcode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>         
          <el-button type="primary" @click="submitForm('logginForm')">提交</el-button>
          <el-button @click="resetForm('logginForm')">重置</el-button>
        </el-form-item>
        
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
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      },
      time:0,
      iscodePage:true,
      isqrPage:false
      }
    },
  methods: {
  }
}
</script>

<style les>

</style>