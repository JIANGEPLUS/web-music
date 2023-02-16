<template>
  <div>
    <lunbotu></lunbotu>
    <tuijiangedan></tuijiangedan>
  </div>
</template>

<script>
import lunbotu from '@/tool/lunbotu.vue';
import tuijiangedan from '@/components/Main/FindMusic/tuijiangedan.vue'
export default {
  data () {
    return {
      value:false
    }
  },
  methods: {
    // consoleRef(){
    // // const ref=this.$refs.refs
    // console.log(1111)
    // console.log(this.$refs.refsss)
    },
  components: {
    lunbotu,
    tuijiangedan
  }
}
  

</script>

<style lang="less" scoped>

</style>