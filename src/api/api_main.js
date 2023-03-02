import axios from 'axios';

export const numberFormat = (value) => {
  var param = {};
  var k = 10000,
      sizes = ['', '万', '亿', '万亿'],
      i;
      if(value < k){
          param.value =value
          param.unit=''
      }else{
          i = Math.floor(Math.log(value) / Math.log(k)); 
    
          param.value = ((value / Math.pow(k, i)).toFixed(0));
          param.unit = sizes[i];
      }
return param.value+param.unit;
    }
    // 跳转歌单
export function toGeDan(id){
    console.log(id)
    this.$router.push({
      path:'/main/gedanpage',
      query:{
        id:id
      }
    })
}
// 跳转专辑
export function  toZhuanJi(id){
    console.log(id)
    this.$router.push({
      path:'/main/zhuanjilist',
      query:{
        id:id
      }
    })
}
//跳转歌手页面
export function  toGeshou(id){
  console.log(id)
  this.$router.push({
    path:'/main/geshoupage',
    query:{
      id:id
    }
  })
}

// 标签跳转路由函数
export function  handleTabClick(path,activeName,id) {
  if(this.$route.path!==path + activeName){
    this.$router.push({
      path:path + activeName,
      query:{
        id
    }
    })
  }
}
// 搜索标签跳转函数
export function  searchTabClick(path,activeName,keywords) {
  if(this.$route.path!==path + activeName){
    this.$router.push({
      path:path + activeName,
      query:{
        keywords:keywords
    }
    })
  }
}

// 获得喜欢歌曲列表
export const getlikeArray = () => axios.get('/likelist', { params: { timestamp: Date.now() } })

//获取用户歌单 
export const getUserplaylist= (uid) => axios.get('/user/playlist', { params: {uid} })

//获取用户最近播放-歌曲
export const getUserplayedlist= (limit ) => axios.get('/record/recent/song', { params: {limit } })

//获取歌曲详情
export const getMusicdetail= (ids) => axios.get('/song/detail', { params: {ids } })

//获取音乐url
export const getMusicUrl= (id,level) => axios.get('/song/url/v1', { params: {id,level:'exhigh' } })

// 获取最近播放列表 
export const getRecentPlayList= (limit=1) => axios.get('/record/recent/playlist', { params: {limit:limit } })

//获取歌单详情
export const getGedanData= (id) => axios.get('/playlist/detail', { params: {id } })

//获取歌单所有歌曲
export const getSongArray= (id,limit) => axios.get('/playlist/track/all', { params: {id,limit} })
