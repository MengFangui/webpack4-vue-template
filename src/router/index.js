import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home'
console.log(551)

Vue.use(Router)

const routes = [
  {
    path: '*',
    component: Home
  }
]

export default new Router({
  routes
})
