import Vue from 'vue';
import App from './App.vue';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import VueFusionCharts from 'vue-fusioncharts';
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsmobile from './aws-exports'
import VueRouter from 'vue-router';
import {routes} from './router';
import './css/style.css';

Amplify.configure(awsmobile)

Charts(FusionCharts);
PowerCharts(FusionCharts);
TimeSeries(FusionCharts);
Widgets(FusionCharts);
FusionTheme(FusionCharts);
GammelTheme(FusionCharts);
CandyTheme(FusionCharts);

Vue.use(VueFusionCharts, FusionCharts);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(VueRouter)

let router = new VueRouter({mode: 'history', routes});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {
    'app-home' : App
  }
}).$mount('#app')