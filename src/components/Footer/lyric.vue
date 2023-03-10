<template>
  <!-- 滚动歌词组件 -->
  <div class="lyric" v-if="Musicdetail">
    <div class="image">
      <img class="image-div" :src="Musicdetail.al.picUrl" alt="">
    </div>
    <div class="lyric-div">
      <div class="name">{{ Musicdetail.al.name }}</div>
      <!-- 用map把歌手name取出然后使用'/'分隔 -->
      <div class="create">{{ Musicdetail.ar.map(singer => singer.name).join('/') }}</div>
      <!-- lyricIndex为当前歌曲播放的进度在歌词中的位置,进而改变正在播放的歌词的样式 -->
      <div class="lyric-main-div">
        <ul class="lyric-main" v-show="lyric" ref="lyric">
          <li :class="{ each: true, choose: (index == lyricIndex) }" v-for="(item, key, index) in lyric" :key="key">
            {{ item }}</li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
import { getMusicdetail, getLyric } from '@/api/api_main'
import { mapState } from 'vuex'
export default {
  props: {
  },
  created() {
  },
  data() {
    return {
      Musicdetail: {
        al: {
          picUrl: ''
        },
        ar: []
      },
      // 歌词
      lyric: '',
      // 处理后歌词
      // 歌词下标
      lyricIndex: 0,
    }
  },
  methods: {
    // 获取当前音乐详情
    async getMusicdetail() {
      const { data: res } = await getMusicdetail(this.currenMusicId)
      if (res.code == 200) {
        this.Musicdetail = res.songs[0]
        console.log(this.Musicdetail)
      }
    },

    // 获取歌曲歌词
    async getLyric() {
      const { data: res } = await getLyric(this.currenMusicId)
      if (res.code == 200) {

        // 处理歌词，转化成key为时间，value为歌词的对象
        let lrcObj = {};
        let lyricArr = res.lrc.lyric.split('[').slice(1); // 先以[进行分割

        lyricArr.forEach(item => {
          let arr = item.split(']');	// 再分割右括号
          // 时间换算成秒

          let m = parseInt(arr[0].split(':')[0])
          let s = parseInt(arr[0].split(':')[1])
          arr[0] = m * 60 + s;
          // console.log(arr[0])
          if (arr[1] != '\n') { // 去除歌词中的换行符
            // console.log(arr[1])
            arr[1] = arr[1].replace(/\\n/g, "")
            lrcObj[arr[0]] = arr[1];
          }
        })
        // 存储数据
        this.lyric = lrcObj
        // console.log(lrcObj)
      }
    }
  },
  computed: {
    ...mapState(['currenMusicId', 'currenMusicInfo']),
  },
  watch: {
    currenMusicId() {
      if (this.currenMusicId) {
        this.getMusicdetail()
        this.getLyric()
      }
    },
    currenMusicInfo: {
      // 侦听器的处理函数
      handler(newVal) {
        if (newVal.totalTime != 0) {
          let i = 0
          // 循环歌词对象
          for (let key in this.lyric) {
            // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
            if (+key == newVal.currentTime) {
              this.lyricIndex = i;
              // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
              if (i > 4) {
                this.$refs.lyric.scrollTop = 50 * (i - 4);
              }
            }
            i++;
          }
        }
      },
      deep: true

    }
  }
}
</script>

<style lang="less" scoped>
.lyric {
  display: flex;

  .image {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .image-div {
      width: 50%;
      aspect-ratio: 1;
      /* 设置宽高比为1:1 */
      border-radius: 50%;
    }
  }

  .lyric-div {
    width: 50%;
    margin-top: 10%;
    text-align: left;

    .name {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .lyric-main-div {
      position: relative;
      width: 100%;
      height: 100%;
      .lyric-main {
        width: 80%;
        height: 70%;
        // margin-top: 20px;
        position: absolute;
        top: 20px;
        left: 0px;
        // 过渡效果
        transition: top 1s ease-in-out;
        // background-color: #333;
        // 滚动条
        overflow: auto;
        color: #333131;
        font-size: 10px;
        font-weight: normal;
        padding: 5px 10px;
        // border: 1px solid #000;
        border-left: none;

        .each {
          height: 50px;
          width: 100%;
          // border: 1px solid #000;
          font-size: 15px;
          line-height: 50px;
          text-align: left;
        }

        .choose {
          height: 50px;
          line-height: 50px;
          font-size: 25px;
          font-weight: bold;
        }

        // 修改滚动条样式
        &::-webkit-scrollbar {
          width: 5px;
          height: 1px;
        }

        // 滑块部分
        &::-webkit-scrollbar-thumb {
          background-color: rgb(175, 171, 171);
        }

        // 轨道部分
        &::-webkit-scrollbar-track {
          // background-color: #333;
        }

      }
    }

  }
}
</style>