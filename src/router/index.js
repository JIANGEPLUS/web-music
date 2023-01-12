import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home/home.vue'
import Login from '@/views/UserLogin.vue'
import Gexing from '@/components/Main/FindMusic/gexing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  { path: '/home', component: Home,children:[
  ]},
  { path: '/login', component: Login },
  { path: '/main', component: Home,children:[
    { path: 'gexing', component: Gexing },
    { path: 'second', component: Gexing },
    { path: 'gedan', component: Gexing },
    { path: 'paihangbang', component: Gexing },
    { path: 'geshou', component: Gexing },
    { path: 'newmusic', component: Gexing }
    ]  
}
  ]

const router = new VueRouter({
  routes
})

export default router
