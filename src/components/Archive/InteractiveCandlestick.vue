<template>
    <div class="custom-card header-card card">
        <div class="card-body pt-0">
            <div class=mobile-navbar>
                <div class=backicon>
                    <img src="../assets/backbutton.png"/>
                </div>
                <div class=textbox>
                    Apple
                </div>
            </div>
            <div class=stock-price-box>
                <div class=firstline>
                    <div class=live-price>
                        204.53
                    </div>
                    <div class=price-change>
                        USD 0.00 (0.00%)
                    </div>
                </div>
                <div class=price-details>
                    Closed: 23 Apr, 8:46 am GMT-4 - Disclaimer <br>
                    Pre-market 204.10 -0.43 (0.21%)
                </div>
            </div>

            <div class=buttons>
                <div class=buy-button>
                    Buy
                </div>
                <div class=sell-button>
                    Sell
                </div>
            </div>

            <div class=fusioncharts>
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
       /* function printObject(o) {
            var out = '';
            for (var p in o) {
                out += p + ': ' + o[p] + '\n';
            }
            alert("alert Out" + out.toString());
        }*/
        var jsonify = res => res.json();
        var dataFetch = fetch(
            "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json"
        ).then(jsonify);
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
            height: "600",
            type: "timeseries",
            dataFormat: "json",
            dataSource: {
                chart: {theme: "gammel",},
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
                    //alert("alert Out2.5:" + fusionTable.toString());
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
