import Vue from 'vue';
import App from './App.vue';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import VueFusionCharts from 'vue-fusioncharts';

Charts(FusionCharts);
PowerCharts(FusionCharts);
Widgets(FusionCharts);
FusionTheme(FusionCharts);
GammelTheme(FusionCharts);
CandyTheme(FusionCharts);

Vue.use(VueFusionCharts, FusionCharts);

new Vue({
  el: '#app',
  render: h => h(App)
})
