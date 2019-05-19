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
    </div>
</template>

<script>
import FusionCharts from "fusioncharts";
import { async } from 'q';
import { constants } from 'crypto';

var jsonify = res => res.json();
var dataFetch = fetch(
    "https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/prices/GOOG").then(jsonify);
var schemaFetch = fetch(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json"
).then(jsonify);

export default {
props: ["StockGraph"],
components: {},
data: function() {
return {
    width: "100%",
    height: "600",
    type: "timeseries",
    dataFormat: "json",
    dataSource: {
        chart: {theme: "gammel",},
        data: null,
        caption: {
            text: "Stock Price"
        },
        subcaption: {
            text: "Stock price data sourced from IEXCloud"
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
        var symbol = this.$refs.input.value;
        var jsonify = res => res.json();
        console.log("https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/prices/" + symbol);
        var dataFetch = fetch(
            "https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/prices/" + symbol).then(jsonify);
        var schemaFetch = fetch(
            "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json"
        ).then(jsonify);
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
    },
    setChartData: function(symbol) {
        var jsonify = res => res.json();
        console.log("https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/prices/" + symbol);
        var dataFetch = fetch(
            "https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/prices/" + symbol).then(jsonify);
        var schemaFetch = fetch(
            "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json"
        ).then(jsonify);
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
    },
},
mounted: function() {
    this.setChartData('SNAP');
},
watch: {
    tempVar: {
        handler: function() {
            this.setChartData('SNAP');
        },
        deep: true
    },
},
};
</script>