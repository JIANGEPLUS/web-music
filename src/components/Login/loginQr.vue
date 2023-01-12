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
  // mounted() {
  //   this.getQrKey()
  //   this.getBase64()
  // },
  data () {
    return {
      unikey:'',
      qrurl:'',
      imgbase64:'data:image/png;base64,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'
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
      const {data:res}=await this.$http.get('/login/qr/create',{key:this.unikey,qrimg:true,timestamp: Date.now()})
      if (res.code !== 200) return this.$message.error('获取Qrkey失败')
        this.$message.success('获取url成功')
        this.qrurl=res.data.qrurl
        this.imgbase64=res.data.qrimg
        console.log(res)
    }
  },
  // watch: {
  //   isqrPage(newVal){
  //     if (newVal === true){
  //       this.getQrKey()
  //     }
  //   },
  //   unikey(newVal){
  //     if(newVal==='') return
  //     else this.getBase64()
      
  //   }
  // }
  
  
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