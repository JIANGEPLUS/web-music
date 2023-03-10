<template>
  <div class="footer" ref="footerRef">
    <audio ref="player" :src="musicUrl" :volume="volume" @timeupdate="updateCurrentTime"></audio>
    <div v-if="musicInfo" class="left">
      <!-- <el-image style="width: 50px; height: 50px" 
        :src="musicInfo.songs[0].al.picUrl" fit="fit">
      </el-image> -->
      <!-- 弹出歌词界面 -->
      <img :src="musicInfo.al.picUrl" object-fit=contain @click="toggleWindow">
      <div>
        <el-tooltip class="item" effect="dark" :content="musicInfo.name" placement="top">
          <div class="font-16 font-weight">{{ musicInfo.name }}</div>
        </el-tooltip>
        
        <div>{{ musicInfo.ar.map(item => item.name).join('/') }}</div>
      </div>
    </div>
    <div class="center">
      <div class="center-button">
        <i class=" pointer "
          :class="{ 'icon-music-shunxubofang-red-copy': menuIsHover, 'icon-music-shunxubofang': !menuIsHover }"
          @mouseover="menuIsHover = true" @mouseout="menuIsHover = false"></i>
        <i class=" pointer" @click="PreviousMusic"
          :class="{ 'icon-music-shangyishou-red-copy': previousIsHover, 'icon-music-shangyishou': !previousIsHover }"
          @mouseover="previousIsHover = true" @mouseout="previousIsHover = false"></i>
        <div class="button-background pointer" @click="playing">
          <i v-if="isplaying" class="icon-music-zanting1 pointer"></i>
          <i v-else class="icon-music-bofang pointer"></i>
        </div>
        <i class=" pointer" @click="nextMusic"
          :class="{ 'icon-music-xiayishou-red-copy': nextIsHover, 'icon-music-xiayishou': !nextIsHover }"
          @mouseover="nextIsHover = true" @mouseout="nextIsHover = false"></i>
        <i @click="toggleWindow" class=" pointer" :class="{ 'icon-music-ci-red-copy': lyricIsHover, 'icon-music-ci': !lyricIsHover }"
          @mouseover="lyricIsHover = true" @mouseout="lyricIsHover = false"></i>
      </div>
      <!-- 进度条 -->
      <div class="bar">
        <div class="time-text">{{ currentTimeFormat(currenMusicInfo.currentTime) }}</div>
        <div class="progress-bar" @click="clickBar" ref="runfatbar">
          <div class="blue-bar" ref="runbar">
            <span class="circle"></span>
          </div>
          
        </div>
        <div class="right-time time-text">{{ currentTimeFormat(currenMusicInfo.totalTime) }}</div>
      </div>
    </div>
    <div class="right">
      <div>
        <!-- 音量气泡弹出框 -->
        <el-popover placement="top" trigger="hover" width="100px" popper-class="popperClass">
          <!-- 要使用slot="reference"才能显示图标 -->
          <!-- 静音 -->
          <i v-if="volume == 0" class="icon-music-music_mute volume" slot="reference" @click="volumesilence"></i>
          <i v-else class="icon-music-yinliang volume" slot="reference" @click="volumesilence"></i>
          <div class="volume-container">
            <el-slider v-model="volume" :vertical="true" height="120px" @change="setVolume" />
          </div>
        </el-popover>
      </div>
      <!-- 阻止点击事件冒泡 -->
      <div @click.stop>
        <i @click="isplayList = !isplayList" class="icon-music-bofangliebiaoguanli"></i>
          <!-- 播放列表显示 -->
      <playList class="playList-div" v-show="isplayList" @playMusic="playMusic" @clickoutside="hidePlaylist"></playList>
      </div>
    </div>

    <!-- 滚动歌词组件 -->
    <lyric   class="lyric"  ref="lyricRef" :style="{ width:clientWidth+'px',height: windowHeight,bottom:lyricBottom }"></lyric>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserplayedlist, getMusicUrl, getGedanData, getRecentPlayList, getSongArray } from '@/api/api_main';
import { mapState, mapMutations } from 'vuex'
import playList from './playList.vue'
import lyric from './lyric.vue'
export default {
  created() {
    this.getUserplayedlist()
    this.getRecentPlayList()
  },
  mounted() {
    // 给播放列表添加点击隐藏事件
    document.body.addEventListener('click',()=>{
            this.isplayList = false;
        },false);
    this.setMusicDom()
    // 设置初始音量
    this.setVolume()
  },
  components: {
    playList,
    lyric
  },
  data() {
    return {
      dialogVisible: false,
      volume: 50, // 设置默认值
      oldVolume: 0, // 之前的音量
      // 图标是否有鼠标悬停
      menuIsHover: false,
      previousIsHover: false,
      nextIsHover: false,
      lyricIsHover: false,
      // musicInfo:this.$store.getters.getmusicinfo,
      playedlist: {
        songs: [
          {
            al: '',
            ar: []
          }
        ]
      },
      // 播放列表是否可视
      isplayList: false,
      // 进度条
      bar_model:0,
      //歌词页面控制元素
      isWindowOpen: false,
      windowHeight: '0px', 
      lyricBottom:'0px'
    }
  },
  methods: {
    ...mapMutations(['updateIspalying', 'setCurrenMusicId', 'setCurrenIndex', 'getCurrenIndex', 'setCurrenTime','setMusicUrl','setMusicList','setTotalTime']),
    dayjs,
    // 获取音乐DOM，给DOM添加事件
    setMusicDom() {
      this.$nextTick(() => {
        const music = this.$refs.player;
        if(!this.musicUrl){
          this.setCurrenTime(0)
          this.setTotalTime(0)
          this.updateIspalying(false)
          return
        }
        music.addEventListener('canplay', () => {
          const music = this.$refs.player// 音频所在对象
          // console.log('music',this.$refs)
          // 修改vuex中的歌曲总时间
          this.$store.commit('setTotalTime', Math.round(music.duration))
          const musicBar = this.$refs.runbar// 颜色进度条所在对象
          const musicWidth = this.$refs.runfatbar.offsetWidth// 底部进度条总宽      
          // 监听颜色进度条是否触摸拖动结束

          musicBar.addEventListener('touchend', () => {
            const touwidth = (musicBar.offsetWidth / musicWidth)// 计算进度条所在比例
            music.currentTime = music.duration * touwidth// 通过所在比例赋值给音频应在的播放时间
          })
          // 在这里获取到音频数据已经加载完成的状态
          // ...
          // 音乐获取完后判断是否播放
          if (this.isplaying) {
            this.$refs.player.play()
          } else {
            this.$refs.player.pause()
          }
        });
      });
    },
    // 获取最近播放歌曲
    async getUserplayedlist() {
      const { data: res } = await getUserplayedlist(1)
      if (res.code === 200) {
        if(res.data.list[0].data){
        // 获取最近播放歌曲的id存入vuex
        let musiclist=[]
        musiclist.push(res.data.list[0].data)
          // 先把歌曲单独一个音乐列表
        this.setMusicList(musiclist)
        // console.log(musiclist)
        this.$store.commit('setCurrenMusicId', res.data.list[0].data.id)
        // console.log(res.data.list[0].data.id)
        }

      }
    },
    // 获取当前播放歌曲的url
    async getMusicUrl() {
      const { data: res } = await getMusicUrl(this.currenMusicId)
      if (res.code == 200) {
        this.setMusicUrl(res.data[0].url) 
        if(this.musicUrl==null){
          this.$message.error('平台暂时无版权,无法播放')
          // this.$refs.player.pause()
        }
        this.setMusicDom()
        // console.log(this.Music)
      }
    },
    // 获取最近播放的歌单
    async getRecentPlayList() {
      const { data: res } = await getRecentPlayList(10)
      if (res.code == 200) {
        // 初次默认播放列表为最近播放的歌单
        if(res.data.list.length>0){
          this.getSongArray(res.data.list[0].data.id)
        }else{
          return
        }
        // this.$store.commit('setMusicList',res.data.list)
      }
      // console.log(res)
    },
    // 获取目标歌单列表
    async getSongArray(id) {
      const { data: res } = await getSongArray(id)
      if (res.code == 200) {
        // console.log(this.musicList)
        // console.log(res.songs.findIndex(item=>item.id==this.currenMusicId))
        // 如果歌曲不在歌单中，则单独一个歌单
        if(res.songs.findIndex(item=>item.id==this.currenMusicId)!=-1){
          this.setMusicList(res.songs)
          // console.log(this.musicList)
        }
        //在得到歌单后，获取播放下标
        this.getCurrenIndex(this.currenMusicId)
        // console.log(res.songs)
      }
    },
    playing() {
      this.updateIspalying(!this.isplaying)
    },
    // 播放歌曲
    playMusic(song) {
      // 获取歌曲id
      console.log(song)
      this.setCurrenMusicId(song.id)
      this.getCurrenIndex(song.id)
      this.updateIspalying(true)
    },
    // 点击进度条事件     
    clickBar(e) {
      const music = this.$refs.player// 音频所在对象
      const barWidth = e.offsetX / this.$refs.runfatbar.offsetWidth// 计算点击位置相对父元素总宽的比例
      this.$refs.runbar.style.width = `${barWidth * 100}%`// 进度条应所在的比例总宽
      music.currentTime = music.duration * barWidth // 计算点击时应播放所在的时间
      // let time=Math.round(music.currentTime) 
      // this.$store.commit('setCurrenTime', time)
      // this.Music=music
      // this.CurrentTime=music.currentTime
    },
    // 切换到上一首歌曲
    PreviousMusic() {
      // 判断是否超出歌单列表范围
      if (this.currenIndex == 0) {
        this.setCurrenIndex(this.musicList.length-1)
      } else {
        this.setCurrenIndex(this.currenIndex - 1)
      }
    },
    // 切换到下一首歌曲
    nextMusic() {
      // 判断是否超出歌单列表范围
      if (this.currenIndex == this.musicList.length-1) {
        this.setCurrenIndex(0)

      } else {
        this.setCurrenIndex(this.currenIndex + 1)

      }

    },
    updateCurrentTime() {
      let time = this.$refs.player.currentTime
      time = Math.floor(time)
      // this.$store.commit('setCurrenTime', time)
      this.setCurrenTime(time)
      const musicWidth = this.$refs.runfatbar.offsetWidth// 底部进度条总宽      
      // 每秒更新进度条
      this.$refs.runbar.style.width=`${Math.floor(( time/ this.currenMusicInfo.totalTime)*musicWidth)}px` // 计算进度条所在比例
      // console.log(this.$refs.runbar.style.width)
    },
    currentTimeFormat(currentTime) {
      let ss = '00'
      let mm = '00'
      if (currentTime < 60) {
        if ((currentTime % 60) < 10) {
          ss = '0' + currentTime % 60
        } else {
          ss = currentTime % 60
        }
        return '00:' + ss
      } else {
        if ((currentTime / 60) < 10) {
          mm = '0' + Math.floor(currentTime / 60)
        } else {
          mm = Math.floor(currentTime / 60)
        }

        if ((currentTime % 60) < 10) {
          ss = '0' + currentTime % 60
        } else {
          ss = currentTime % 60
        }
        return mm + ':' + ss
      }
    },
    // 滑块触发改变音量事件
    setVolume() {
      this.$refs.player.volume = this.volume * 0.01;
      // console.log(this.$refs.player.volume)
    },
    //隐藏播放列表
    hidePlaylist(){
      this.isplayList=false
    },
    // 点击静音或恢复
    volumesilence(){
     [ this.volume,this.oldVolume]=[this.oldVolume,this.volume]
    },
    // 歌词页面展开
    toggleWindow() {
      console.log(this.isWindowOpen,this.windowHeight)
      const footerRef=this.$refs.footerRef
      let footerHeight=footerRef.offsetHeight
      this.isWindowOpen = !this.isWindowOpen
      console.log(this.clientWidth)
      this.windowHeight = this.isWindowOpen ? (this.clientHeight-footerHeight )+ 'px' : '0px'
      this.lyricBottom = this.isWindowOpen ? (footerHeight-5)+ 'px' : '0px'

    },
  },
  computed: {
    ...mapState(['clientWidth','musicList', 'isplaying', 'currenMusicInfo', 'currenMusicId', 'currenIndex','musicUrl','clientHeight']),
    musicInfo() {

      //更新歌曲id 
      if (this.musicList[this.currenIndex]) {
        this.$store.commit('setCurrenMusicId', this.musicList[this.currenIndex].id)
              // 每次更新获取歌曲的url
          this.getMusicUrl()
          
      }



      //使用短路运算符来处理数据可能未生成的情况
      return this.musicList[this.currenIndex] ? this.musicList[this.currenIndex] : null
    }
  },
  watch: {
    /* 通过Vuex管理的播放状态,audio会自动播放 */
    isplaying(val) {
      /* 由于misicUrl第一次是状态改变后获取，所以第一次改变不要进入监听 */
      if (!this.musicUrl) {
        this.$refs.player.pause()
        return
      }
      if (val) {
        this.$refs.player.play()
      } else {
        this.$refs.player.pause()
      }
    },
    currenMusicInfo:{
      // 侦听器的处理函数
      handler(newVal) {
        // 如果播放结束则下一首
        if((newVal.totalTime>=newVal.currentTime)&&newVal.totalTime!=0){
          console.log('下一首')
          // this.nextMusic()
        }
      },
      deep: true

    }
  }

}
</script>
<style lang="less" scoped>
.footer {
  display: flex;
  // position: relative;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  
  .playList-div {
    width: 400px;
    position: absolute;
    bottom: 90px;
    right: 0;
    // 优先级
    z-index: 3;
  }

  .left {
    height: 100%;
    width: 200px;
    display: flex;
    text-align: left;
    justify-items: center;
    align-items: center;

    // margin-right: auto;
    img {
      width: 50px;
      aspect-ratio: 1; /* 设置宽高比为1:1 */
      margin-right: 10px;
    }
    div{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .font-weight {
      font-weight: 600;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    width: 70%;
    align-items: center;

    .center-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 40%;

      .button-background {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: #F2F0FC;
        border-radius: 50%;
      }

      .button-background:hover {

        background-color: gainsboro;
      }
    }

    .bar {
      display: flex;
      justify-items: center;
      align-items: center;
      margin-top: 20px;

      width: 60%;

      .progress-bar {

        position: relative;
        width: 100%;
        height: 0.3rem;
        margin: 0 10px;
        border-radius: 0.2rem;
        background-color: #999999;

        .blue-bar {
          height: 0.2rem;
          position: absolute;
          top: 0.1rem;
          left: 0;
          border-radius: 0.2rem;
          background-color: #1296db;
        }
      }

      .progress-bar:hover {
        height: 0.6rem;

        .blue-bar {
          height: 0.4rem;
        }
        .circle {
            width: 0.8rem;
            height: 0.8rem;
            position: absolute;
            top: -0.2rem;
            right: -0.2rem;
            border-radius: 10px;
            background-color: #1296db;
          }
      }

    }

  }

  .right {
    display: flex;
    width: 200px;
    height: 100%;
    justify-content: end;
    align-items: center;
    
    

    // margin-left: auto;
    .volume {
      margin-right: 20px;
    }

  }

  .popperClass {
    min-width: auto !important;
  }
  // 歌词页面属性
  .lyric {
    position: absolute;
    overflow:hidden;
    left: 0;
    z-index: 99;
    background: linear-gradient(to bottom, rgba(219,219,219,1) 0%, rgba(219,219,219,1) 1%, rgba(209,209,209,1) 1%, rgba(255,255,255,1) 100%);
    transition: height 0.5s;
  }
}
</style>

