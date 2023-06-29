import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueTest from '@/components/VueTest'
import menu1 from '@/components/menu1'
import menu2 from '@/components/menu2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu1',
      component: menu1
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/VueTest',
      name: 'VueTest',
      component: VueTest
    },
    {
      path: '/menu1',
      name: 'menu1',
      component: menu1
    },
    {
      path: '/menu2',
      name: 'menu2',
      component: menu2
    },
  ]
})
