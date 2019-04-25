<template>
    <div class="custom-card header-card card">
        <div class="card-body pt-0">
            <div id="search">
                <input
                    id="symbol-input"
                    type="text"
                    ref="input"
                    placeholder="Enter Symbol"
                    height="24"
                    @keyup.enter="searchSymbol"
                >
                <button 
                    id="search-btn" 
                >
                    <img 
                        src="../assets/search.svg" 
                        width="24" 
                        height="24"
                    >
                </button>
            </div>
            <fusioncharts
                    :type="type"
                    :width="width"
                    :height="height"
                    :dataFormat="dataFormat"
                    dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
                    dataEmptyMessageImageScale=39
                    :dataSource="dataSource"
            ></fusioncharts>
        </div>

    </div>
</template>

<script>
import FusionCharts from "fusioncharts";
import { async } from 'q';
import { config, DynamoDB } from 'aws-sdk';
/* function printObject(o) {
    var out = '';
    for (var p in o) {
        out += p + ': ' + o[p] + '\n';
    }
    alert("alert Out" + out.toString());
}*/
var jsonify = res => res.json();
var schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json"
).then(jsonify);
//printObject(schemaFetch);
///alert("alert Out2" + schemaFetch.toString());

export default {
  props: ["StockGraph"],
  components: {},
  data: function() {
  return {
      width: "100%",
      height: "800",
      type: "timeseries",
      dataFormat: "json",
      dataSource: {
        chart: {theme: "candy",},
        data: null,
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
            title: "Stock Value"
          }
        ]
      }
  };
},
  methods: {
    searchSymbol: async function() {
      // Show searching thingo
      await this.getStockData(this.$refs.input.value);
    },
    getStockData: async function(symbol) {
      AWS.config.update({
        region: "ap-southeast-2",
        accessKeyId: 'AKIAUCADQYEA3N65R3TK',
        secretAccessKey: '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'
      });
      var docClient = new AWS.DynamoDB.DocumentClient();

      var params = {
        TableName : "StockPrices",
        FilterExpression: 'symbol = :s',
        ExpressionAttributeValues: {
          ':s': symbol
        }
      };
    
      docClient.scan(params, function(err, data) {
        if (err) {
          console.error("Unable to scan. Error:", JSON.stringify(err, null, 2));
        } else {
          data.Items.forEach(function(item) {
            console.log(" -", item.symbol + ": " + item.datetime + " " + item.close);
          });
          console.log("Scan succeeded.");

          var stockPrices = [];
          var index = 1;

          data.Items.forEach(function(stock) {
            var filteredStock = {
              open: stock.open,
              high: stock.high,
              low: stock.low,
              close: stock.close,
              x: index,
              volume: stock.volume,
            };
            stockPrices.push(filteredStock);
            index += 1;
          });
        }
      });
    },
    setChartData: function(dataFetch) {
      Promise.all([dataFetch, schemaFetch]).then(res => {
        const data = res[0];
        const schema = res[1];
        const fusionTable = new FusionCharts.DataStore().createDataTable(
          data,
          schema
        );
        this.dataSource.data = fusionTable;
        //alert("alert Out2.5:" + fusionTable.toString());
      });
    }
  },
  mounted: function() {
    this.setChartData();
  },
  watch: {
    tempVar: {
      handler: function() {
        this.setChartData();
      },
      deep: true
    },
  },
};
</script>

<style>
</style>
