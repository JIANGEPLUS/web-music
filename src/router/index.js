import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home/home.vue'
import Login from '@/views/UserLogin.vue'
import Gexing from '@/components/Main/FindMusic/gexing.vue'
import Gedanpage from '@/components/Main/Gedan_page/gedan_page.vue'
import songlist from  '@/components/Main/Gedan_page/songlist.vue'
import pinglun from  '@/components/Main/Gedan_page/pinglun.vue'
import zhuanshu from '@/components/Main/FindMusic/zhuanshu.vue'
import FindMusic from '@/components/Main/FindMusic/FindMusic.vue'
import paihangbang from '@/components/Main/FindMusic/paihangbang.vue'
import geshou from '@/components/Main/FindMusic/geshou.vue'
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
      { path: 'zhuanshu', component: zhuanshu },
      { path: 'gedan', component: Gexing },
      { path: 'paihangbang', component: paihangbang },
      { path: 'geshou', component: geshou },
      { path: 'newmusic', component: Gexing },
    ] },
    { path: 'gedanpage',component: Gedanpage,
      children:[
        {
          path: '/',
          redirect: 'songlist',
        },
        { path: 'songlist', component: songlist },
        { path: 'pinglun', component: pinglun },
      ]
    }
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
