import Content from './components/Content.vue'
import Home from './App.vue'
import Highlights from './components/Highlights.vue'

export const routes=[
    {
      path: '/' , component: Home
    },
    {
     path:'/highlights',component: Highlights
    },
    {
     path:'/content',component: Content
    }
]