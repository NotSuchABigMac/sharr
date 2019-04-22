<template>
    <div class="custom-card header-card card">
        <div class="card-body pt-0">
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
        function printObject(o) {
            var out = '';
            for (var p in o) {
                out += p + ': ' + o[p] + '\n';
            }
            alert("alert Out" + out.toString());
        }
        var jsonify = res => res.json();
        var dataFetch = fetch(
            "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json"
        ).then(jsonify);
        var schemaFetch = fetch(
            "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json"
        ).then(jsonify);
        printObject(schemaFetch);
        alert("alert Out2" + schemaFetch.toString());

    export default {
        props: ["StockGraph"],
        components: {},
        data: function() {
return {
            width: "100%",
            height: "400",
            type: "timeseries",
            dataFormat: "json",
            dataSource: {
                chart: {},
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
            setChartData: function() {
                Promise.all([dataFetch, schemaFetch]).then(res => {
                    const data = res[0];
                    const schema = res[1];
                    const fusionTable = new FusionCharts.DataStore().createDataTable(
                        data,
                        schema
                    );
                    this.dataSource.data = fusionTable;
                    alert("alert Out2.5:" + fusionTable.toString());
                });
            },
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
