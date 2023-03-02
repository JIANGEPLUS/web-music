import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home/home.vue'
import Login from '@/views/UserLogin.vue'
import Gexing from '@/components/Main/FindMusic/gexing.vue'
import Gedanpage from '@/components/Main/Gedan_page/gedan_page.vue'
import songlist from  '@/components/Main/Gedan_page/songlist.vue'
import pinglun from  '@/components/Main/Gedan_page/pinglun.vue'
import FindMusic from '@/components/Main/FindMusic/FindMusic.vue'
import paihangbang from '@/components/Main/FindMusic/paihangbang.vue'
import geshou from '@/components/Main/FindMusic/geshou.vue'
import geshoupage from '@/components/Main/Geshou_page/geshou_page.vue'
import zhuanji from '@/components/Main/Geshou_page/zhuanji.vue'
import zhuanjilist from '@/components/Main/Zhuanji_page/zhuanjilist.vue'
import GeshouMv from '@/components/Main/Geshou_page/GeshouMv.vue'
import GeshouDetails from '@/components/Main/Geshou_page/GeshouDetails.vue'
import GeshouLike from '@/components/Main/Geshou_page/GeshouLike.vue'
import SearchList from '@/components/Main/Search/SearchList.vue'
import searchSingle from '@/components/Main/Search/searchSingle.vue'
import searchSinger from '@/components/Main/Search/searchSinger.vue'
import searchAlbum from '@/components/Main/Search/searchAlbum.vue'
import searchVideo from '@/components/Main/Search/searchVideo.vue'
import searchMusicList from '@/components/Main/Search/searchMusicList.vue'
import MyLike from '@/components/Asiede/MyLike/mylike.vue'
import Played from '@/components/Asiede/Played.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main/FindMusic/gexing',
  },
  // { path: '/home', component: Home,children:[
  // ]},
  { path: '/login', component: Login },
  { path: '/main', component: Home,children:[
    { path: 'FindMusic', component: FindMusic,children:[
      {
        path: '/',
        redirect: 'gexing',
      },
      { path: 'gexing', component: Gexing },
      { path: 'gedan', component: Gexing },
      { path: 'paihangbang', component: paihangbang },
      { path: 'geshou', component: geshou },
      { path: 'newmusic', component: Gexing },
    ] },
    { path: 'MyLike', component: MyLike },
    { path: 'gedanpage',component: Gedanpage,
      children:[
        {
          path: '/',
          redirect: 'songlist',
        },
        { path: 'songlist', component: songlist },
        { path: 'pinglun', component: pinglun },
      ]
    },
    { path: 'zhuanjilist',component: zhuanjilist,
      children:[
        {
          path: '/',
          redirect: 'songlist',
        },
        { path: 'songlist', component: songlist },
        { path: 'pinglun', component: pinglun },
      ]
    },
    { path: 'geshoupage',component: geshoupage,
      children:[
        {
          path: '/',
          redirect: 'zhuanji',
        },
        { path: 'zhuanji', component: zhuanji },
        { path: 'GeshouMv', component: GeshouMv },
        { path: 'GeshouDetails', component: GeshouDetails },
        { path: 'GeshouLike', component: GeshouLike },
      ]
    },
    { path: 'SearchList',component: SearchList,
    children:[
      {
        path: '/',
        redirect: 'searchSingle',
      },
      { path: 'searchSingle', component: searchSingle },
      { path: 'searchSinger', component: searchSinger },
      { path: 'searchAlbum', component: searchAlbum },
      { path: 'searchVideo', component: searchVideo },
      { path: 'searchMusicList', component: searchMusicList },

    ]
    } ,
    // 最近播放
    { path: 'Played', component: Played }
    ]  
}
  ]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === from.fullPath) {
    return
  } else {
    next()
  }
})

export default router
