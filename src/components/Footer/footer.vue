<template>
  <div class="footer">
    <audio ref="player" :src="musicUrl" @timeupdate="updateCurrentTime"></audio>
    <div v-if="musicInfo" class="left">
      <!-- <el-image style="width: 50px; height: 50px" 
        :src="musicInfo.songs[0].al.picUrl" fit="fit">
      </el-image> -->
      <img :src="musicInfo.al.picUrl" object-fit=contain>
      <div>
        <div class="font-16 font-weight">{{ musicInfo.name }}</div>
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
        <i class=" pointer" :class="{ 'icon-music-ci-red-copy': lyricIsHover, 'icon-music-ci': !lyricIsHover }"
          @mouseover="lyricIsHover = true" @mouseout="lyricIsHover = false"></i>
      </div>
      <!-- 进度条 -->
      <div class="bar">
        <div class="time-text">{{ currentTimeFormat(currenMusicInfo.currentTime) }}</div>
        <div class="progress-bar" @click="playMusic" ref="runfatbar">
          <div class="blue-bar" ref="runbar">
            <span class="yuan"></span>
          </div>
        </div>
        <div class="right-time time-text">{{ currentTimeFormat(currenMusicInfo.totalTime) }}</div>
      </div>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserplayedlist, getMusicUrl, getGedanData, getRecentPlayList, getSongArray } from '@/api/api_main';
import { mapState, mapMutations } from 'vuex'
export default {
  created() {
    this.getUserplayedlist()
    this.getRecentPlayList()
  },
  mounted() {
    this.setMusicDom()
  },
  data() {
    return {
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
      musicUrl: ''

    }
  },
  methods: {
    ...mapMutations(['updateIspalying']),
    dayjs,
    // 获取音乐DOM，给DOM添加事件
    setMusicDom(){
      this.$nextTick(() => {
        const music = this.$refs.player;
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
        });
      });
    },
    async getUserplayedlist() {
      const { data: res } = await getUserplayedlist(1)
      if (res.code === 200) {
        // 获取最近播放歌曲的id存入vuex
        this.$store.commit('setCurrenMusicId', res.data.list[0].data.id)

        console.log(res)
      }
    },
    // 获取当前播放歌曲的url
    async getMusicUrl() {
      const { data: res } = await getMusicUrl(this.currenMusicId)
      if (res.code == 200) {
        this.musicUrl = res.data[0].url
        // console.log(this.Music)
      }
    },
    // 获取最近播放的歌单
    async getRecentPlayList() {
      const { data: res } = await getRecentPlayList(10)
      if (res.code == 200) {
        // 初次默认播放列表为最近播放的歌单
        this.getSongArray(res.data.list[0].data.id)
        // this.$store.commit('setMusicList',res.data.list)
        // console.log(res)
      }
    },
    // 获取目标歌单列表
    async getSongArray(id) {
      const { data: res } = await getSongArray(id)
      if (res.code == 200) {
        this.$store.commit('setMusicList', res.songs)
        //在得到歌单后，获取播放下标
        this.getCurrenIndex()
      }
      // 存取当前歌单list入vuex
      // console.log(res)
    },
    // 获取当前歌曲在播放的歌单的列表下标
    getCurrenIndex() {
      let CurrenIndex = this.musicList.findIndex(item => item.id == this.currenMusicId)
      console.log(CurrenIndex)
      this.$store.commit('setCurrenIndex', CurrenIndex)
    },
    playing() {
      const music = this.$refs.player;
      this.updateIspalying(!this.isplaying)
      if (this.isplaying) {
        music.play()
      } else {
        music.pause()
      }
      console.log(this.$refs)
    },
    // 点击进度条事件     
    playMusic(e) {
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
      if(this.currenIndex==0){
      this.$store.commit('setCurrenIndex', this.musicList.length)
      }else{
        this.$store.commit('setCurrenIndex', this.currenIndex-1)
      }
    },
    // 切换到下一首歌曲
    nextMusic(){
      // 判断是否超出歌单列表范围
      if(this.currenIndex==this.musicList.length){
        this.$store.commit('setCurrenIndex', 0)
      }else{
        this.$store.commit('setCurrenIndex', this.currenIndex+1)
      }
      
    },
    updateCurrentTime() {
      let time = this.$refs.player.currentTime
      time = Math.floor(time)
      this.$store.commit('setCurrenTime', time)
      console.log(this.currenMusicInfo.currentTime)
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
    }

  },
  computed: {
    ...mapState(['musicList', 'isplaying', 'currenMusicInfo', 'currenMusicId', 'currenIndex']),
    musicInfo() {
      // if (this.$store.getters.getmusicinfo.songs.length != 0) {
      //   console.log(this.$store.getters.getmusicinfo)
      //   return this.$store.getters.getmusicinfo.songs
      // } else {
      //   console.log(this.playedlist)
      //   return this.playedlist
      // }
      console.log(this.musicList[this.currenIndex])
      
      // 每次更新获取歌曲的url
      this.getMusicUrl()
      this.setMusicDom()
      //使用短路运算符来处理数据可能未生成的情况
      return this.musicList[this.currenIndex] ? this.musicList[this.currenIndex] : null



    },

  },
}
</script>
<style lang="less" scoped>
  .footer {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  .left {
    height: 100%;
    width: 200px;
    display: flex;
    text-align: left;
    justify-items: center;
    align-items: center;

    // margin-right: auto;
    img {
      height: 50px;
      margin-right: 10px;
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
        height: 0.1rem;
        margin: 0 10px;
        border-radius: 0.2rem;
        background-color: #999999;

        .blue-bar {
          height: 0.1rem;
          position: absolute;
          top: 0.1rem;
          left: 0;
          border-radius: 0.2rem;
          background-color: #1296db;

          .circle {
            width: 0.2rem;
            height: 0.2rem;
            position: absolute;
            top: -0.05rem;
            right: -0.01rem;
            border-radius: 10px;
            background-color: #fff;
          }
        }
      }

      .progress-bar:hover {
        height: 0.3rem;

        .blue-bar {
          height: 0.2rem;
        }
      }

      .right-time {}
    }

  }

  .right {
    height: 100%;
    width: 200px;
    // margin-left: auto;
  }
}
</style>

