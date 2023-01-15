<template>
  <div>
    <div class="QRimg">
      <img :src="imgbase64">
    </div>
  </div>
</template>

<script>
export default {
  props:['isqrPage'],
  created() {
    this.getQrKey()
  },
  data () {
    return {
      unikey:'',
      qrurl:'',
      imgbase64:''
    }
  },
  methods: {
    //二维码 key 生成接口
     async getQrKey(){
      const {data:res}=await this.$http.get('/login/qr/key',{timestamp: Date.now()})
      if (res.code !== 200) return this.$message.error('获取Qrkey失败')
        this.$message.success('获取Qrkey成功')
        this.unikey=res.data.unikey
        console.log(res)
    },
    //此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息
    async getBase64(){
      console.log(this.unikey)
      const {data:res}=await this.$http.get('/login/qr/create',{params:{key:this.unikey,qrimg:true,timestamp:Date.now()}})
      if (res.code !== 200) return this.$message.error('获取Qrkey失败')
        this.$message.success('获取url成功')
        this.qrurl=res.data.qrurl
        this.imgbase64=res.data.qrimg
        console.log(res)
    },
    async checkQr(){
      const {data:res}=await this.$http.get('/login/qr/check',{params:{key:this.unikey,timestamp:Date.now()}})
      
    }
  },
  watch: {
    unikey(newVal){
      if(newVal==='') return
      else  this.getBase64()
      
    }
  }
  
  
}
</script>

<style lang="less" scoped>
  .QRimg{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
    width: 150px;
    height: 150px;
    border: 1px solid;
  }
</style>