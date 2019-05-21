import SearchStock from './components/SearchStock.vue'
import Home from './components/Home.vue'
import ViewStock from './components/ViewStock.vue'
import PurchaseStock from './components/PurchaseStock.vue'
import PurchaseStockSell from './components/PurchaseStockSell.vue'
import Portfolio from './components/Portfolio.vue'

export const routes=[
    {
      path: '/' , 
      component: Home
    },
    {
      path:'/SearchStock',
      component: SearchStock
    },
    {
      path:'/ViewStock',
      component: ViewStock
    },
    {
      path:'/PurchaseStock',
      component: PurchaseStock
    },
    {
      path:'/PurchaseStockSell',
      component: PurchaseStockSell
    },
    {
      path:'/Portfolio',
      component: Portfolio
    }
]