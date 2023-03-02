<template>
  <div class="comment-section">
    <div class="comment-input">
      <textarea v-model="commentInfo.content" placeholder="发表评论..."></textarea>
      <div class="word-count">{{ commentInfo.content.length }} / 140</div>
      <el-button size="small" round @click="addComment">评论</el-button>
    </div>


    <!-- 最新评论 -->
    <div class="plinglun">
      <h3>{{'最新评论('+pinglunlist.total+')'}}</h3>
      <div  class="newpinglun flex_y_center" v-for="(item,index) in pinglunlist.comments" :key="index">
        <div class="userimg"><el-avatar :size="50" :src="item.user.avatarUrl"></el-avatar></div>
        <div class="comment">
          <div><router-link to="path">{{ item.user.nickname }}</router-link>{{ ':'+item.content}}</div>
          <div v-if="item.timeStr&&item.timeStr.includes('月')">{{ item.timeStr+' '+ dayjs(item.time).format('hh:mm')}}</div>
          <div v-else>{{ item.timeStr}}</div>
        </div>
      </div>
      <el-pagination
        :page-size="20"
        :pager-count=7
        layout="prev, pager, next"
        :total="pinglunlist.total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

  </div>

</template>

<script>
import dayjs from 'dayjs';
export default {
  props: {
    nameid:{
      type:String
    }
  },
  mounted () {
    if(this.nameid=='gedan'){
      this.getpath='/comment/playlist'
      this.commentInfo.type=2
    }else{
      this.getpath='/comment/album'
      this.commentInfo.type=3
    }
    this.getPingLun()
    this.timer= setInterval(()=>{
      this.getPingLun()
    },10000)
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  data() {
    return {
      wordCount: 0,
      pinglunlist:{
        total:0,
        comments:[]
      },
      pinglunInfo:{
        id:this.$route.query.id,
        limit:20,
      },
      commentInfo:{
        t:1,
        content: '',
        type:2,
        id:this.$route.query.id,
      },
      timer:''
      // commentlist:{
      //   user:{},
      //   timeStr:'',
      // }
    };
  },
  methods: {
    dayjs,
    // 发送评论
    async addComment() {
      const{data:res}=await this.$http.get('/comment',{params:this.commentInfo})
      console.log(res)
      if(res.code==200)
      { 
        // res.comment.user.content=res.comment.content
        res.comment.timeStr='刚刚'
        
        // res.comment=Object.values(res.comment)
        this.pinglunlist.comments.unshift(res.comment);
        // this.pinglunlist.comments=[...res.comment.user,...this.pinglunlist.comments]
        this.commentInfo.content=''
        console.log(this.pinglunlist.comments)
      }
    },
    // 获取评论数据
    async getPingLun(page=0){
      const offset=page*20
      const{data:res}=await this.$http.get(this.getpath,{params:{id:this.pinglunInfo.id,offset}})
      this.pinglunlist=res
      console.log(this.pinglunlist)
    },
    // 页数变换时候调用函数
    handleCurrentChange(val){
      this.getPingLun(val)
    }
  }
};
</script>

<style lang="less" scoped>

.comment-input textarea {
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
}
.comment-input{
  .el-button{
    display: flex;
    margin-left: auto;
  }
}
.word-count {
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-top: 5px;
}
.comment-list {
  margin-top: 20px;
}
.plinglun{
  h3{
    display: flex;
    
  }
  .newpinglun{
    display: flex;
    // height: 100px;
    border-bottom:1px solid;
    padding: 20px 0;
    .userimg{
      margin-right: 10px;
    }
    .comment div:nth-child(2){
      display: flex;
    }
  }
}
a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
