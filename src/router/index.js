import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomeView'
import QuestionView from '@/views/QuestionView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: QuestionView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
