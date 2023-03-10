import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:{},
    gedanid:'',
    uid:'',
    musicinfo:{
      songs:[]
    },
    /* 播放列表 */
    musicList: [],
    //当前播放状态
    isplaying:false,
    /* 播放音乐的总时间和当前时间 */
    currenMusicInfo: {
      totalTime: 0,
      currentTime: 0
    },
    // 当前音乐url
    musicUrl:'',
    /* 当前播放的id */
    currenMusicId: 0,
    /* 当前播放的列表下标 */
    currenIndex: 0,
    /* 最近播放列表 */
    historyList: [],
    // 客户端窗口高度
    clientHeight:0,
    clientWidth:0
  },
  getters: {
    getMusicUrl(state){
      return state.musicUrl
    },
    doneuserinfo(state){
      return state.userinfo
    },
    getmusicinfo(state){
      return state.musicinfo
    },
    getIspalying(state){
      return state.isplaying
    },
    getcurrenTime(state){
      return state.currenMusicInfo.currentTime
    },
  },
  mutations: {
    setUserInfo(state,user){
      state.userinfo=user
      if(user){
        state.uid=user.userId
      }
    },
    editGedanId (state,id) {
      state.gedanid=id
    },
    updateMusicInfo (state,musicdetail) {
      state.musicinfo.songs=musicdetail
    },
    updateIspalying(state,ispalying){
      state.isplaying=ispalying
    },
    setCurrenTime(state,time){
      state.currenMusicInfo.currentTime=time
    },
    setTotalTime(state,totalTime){
      state.currenMusicInfo.totalTime=totalTime
    },
    setMusicList(state,musiclist){
      state.musicList=musiclist
    },
    setCurrenMusicId(state,currenMusicId){
      state.currenMusicId=currenMusicId
    },
    setHistoryList(state,historyList){
      state.historyList=historyList
    },
    setCurrenIndex(state,currenIndex){
      state.currenIndex=currenIndex
    },
    // 通过id找到歌曲下标
    getCurrenIndex(state,id){
      state.currenIndex=state.musicList.findIndex(item => item.id == id)
    },
    setMusicUrl(state,musicUrl){
      state.musicUrl=musicUrl
    },
    setClientHeight(state,clientHeight){
      state.clientHeight=clientHeight
    },
    setClientWidth(state,clientWidth){
      state.clientWidth=clientWidth
    },
    reset(state){
        state.userinfo={},
        state.gedanid='',
        state.uid='',
        state.musicinfo={ songs:[]},
        /* 播放列表 */
        state.musicList= [],
        //当前播放状态
        state.isplaying=false,
        /* 播放音乐的总时间和当前时间 */
        state.currenMusicInfo= {
          totalTime: 0,
          currentTime: 0
        },
        // 当前音乐url
        state.musicUrl='',
        /* 当前播放的id */
        state.currenMusicId= 0,
        /* 当前播放的列表下标 */
        state.currenIndex= 0,
        /* 最近播放列表 */
        state.historyList= []
    }
  },
  actions: {
  },
  modules: {
  }
})
