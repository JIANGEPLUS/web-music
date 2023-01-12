<template>
  <div>
    <lunbotu></lunbotu>
  </div>
</template>

<script>
import lunbotu from '@/tool/lunbotu.vue';
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
    lunbotu
  }
}
  

</script>

<style lang="less" scoped>

</style>