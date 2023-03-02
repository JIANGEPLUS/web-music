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
    /* 当前播放的id */
    currenMusicId: 0,
    /* 当前播放的列表下标 */
    currenIndex: 0,
    /* 最近播放列表 */
    historyList: [],
  },
  getters: {
    doneuserinfo(state){
      return state.userinfo
    },
    getmusicinfo(state){
      return state.musicinfo
    },
    getIspalying(state){
      return state.ispalying
    },
    getcurrenTime(state){
      return state.currenMusicInfo.currentTime
    }
  },
  mutations: {
    getUserInfo(state,user){
      state.userinfo=user
      state.uid=user.userId
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
    setMusicList(state,musicList){
      state.musicList=musicList
    },
    setCurrenIndex(state,currenIndex){
      state.currenIndex=currenIndex
    }
    
  },
  actions: {
  },
  modules: {
  }
})
