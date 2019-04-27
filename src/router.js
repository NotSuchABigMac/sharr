import SearchStock from './components/SearchStock.vue'
import Home from './components/Home.vue'
import ViewStock from './components/ViewStock.vue'

export const routes=[
    {
      path: '/' , component: Home
    },
    {
     path:'/SearchStock',component: SearchStock
    },
    {
     path:'/ViewStock',component: ViewStock
    }
]