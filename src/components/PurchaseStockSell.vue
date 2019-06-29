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
            <div class=stock-price-purchase-box>
                <div class=firstline>
                    <div class=live-price>
                        204.53 USD
                    </div>
                    <div class=price-change>
                        0.00 (0.00%)
                    </div>
                </div>
            </div>

            <div class=order-type-box>
                <div class=label>
                    Order by:
                </div>
                <div class=button-container>
                    <div class=buy-button>
                        Buy
                    </div>
                    <div class=sell-button>
                        Sell
                    </div>
                </div>
            </div>

            <div class=purchase-by-box>
                <div class=label>
                    Purchase by:
                </div>
                <div class=button-container>
                    <div class=buy-button>
                        Quantity
                    </div>
                    <div class=sell-button>
                        Value
                    </div>
                </div>
                <div class=label2>
                    Quantity:
                </div>
                <div class=entry>
                    <input type="text">
                </div>
            </div>
            

            <div class=share-price-box>
                <div class=label>
                    Share Price:
                </div>
                <div class=button-container>                
                    <div class=buy-button>
                        Minimum
                    </div>
                    <div class=sell-button>
                        Market
                    </div>
                </div>
                <div class=label2>
                    Limit Price:
                </div>
                <div class=entry>
                    <input type="text">
                </div>
            </div>

            <div class=review-order>
                <div class=review-button>
                    <span class review-button-span>Review Order</span>
                    
                </div>
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
