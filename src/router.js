import CandleChart from './components/CandleChart.vue'
import Home from './components/Home.vue'
import Highlights from './components/Highlights.vue'
import Interactive from './components/InteractiveCandlestick.vue'

export const routes=[
    {
      path: '/' , component: Home
    },
    {
     path:'/highlights',component: Highlights
    },
    {
     path:'/CandleChart',component: CandleChart
    },
    {
     path:'/Interactive',component: Interactive
    }
]