<template>
  <div class="highlights-item col-md-4 col-sm-6 col-xs-12 border-left border-right border-top">
    <div id="app">
      <fusioncharts
              :type="type"
              :width="width"
              :height="height"
              :dataFormat="dataFormat"
              :dataSource="dataSource"
      ></fusioncharts>
    </div>
  </div>
</template>

<script>
  import FusionCharts from "fusioncharts";

  var jsonify = res => res.json();
  var dataFetch = fetch(
          "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-with-y-axis-on-right-data.json"
  ).then(jsonify);
  var schemaFetch = fetch(
          "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-with-y-axis-on-right-schema.json"
  ).then(jsonify);

export default {
  props: ["highlights"],
  components: {},

  computed: {},
  data() {
    return {
      width: "100%",
      height: "400",
      type: "timeseries",
      dataFormat: "json",
      dataSource: {
        chart: {},
        caption: {
          text: "Apple Inc. Stock Price"
        },
        subcaption: {
          text: "Stock prices from January 1980 - November 2011"
        },
        yaxis: [
          {
            plot: {
              value: {
                open: "Open",
                high: "High",
                low: "Low",
                close: "Close"
              },
              type: "candlestick"
            },
            format: {
              prefix: "$"
            },
            title: "Stock Value",
            orientation: "right"
          }
        ]
      }
    };
  },
  mounted: function() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
              data,
              schema
      );
      this.dataSource.data = fusionTable;
    });
  }
};
</script>
