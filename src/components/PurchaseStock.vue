<template>
    <div class="custom-card header-card card">
        <div class="card-body pt-0">
            <div class=mobile-navbar>
                <div class=backicon>
                    <img src="../assets/backbutton.png"/>
                </div>
                <div class=textbox>
                    {{stock}}
                </div>
            </div>
            <div class=results id=result>
            <div class=firstline>
                <div class=stock-name id=stock-name>
                    Name
                </div>
            </div>
            <div class=stock-code id=stock-symbol>
            -
            </div>
            <div class=third-line>
                <div class=stock-price id=stock-price>
                    -
                </div>
                <div class=stock-change id=stock-change>
                    -
                </div>
            </div>
            <div class=stock-details>
                23 Apr, 8:46 am GMT-4 - Disclaimer
            </div>
            </div>

            <div class=order-type-box>
                <div class=label>
                    Order by:
                </div>
                <div class=button-container>
                    <div class=buy-button-buypage>
                        Buy
                    </div>
                    <div class=sell-button-buypage>
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
                    <input type="text" id=quantityentry>
                </div>
            </div>

            <div class=share-price-box>
                <div class=label>
                    Share Price:
                </div>
                <div class=button-container>                
                    <div class=buy-button>
                        Market
                    </div>
                    <div class=sell-button>
                        Limit
                    </div>
                </div>
                <div class=label2 style=display:none>
                    Limit Price:
                </div>
                <div class=entry style=display:none>
                    <input type="text">
                </div>
            </div>

            <div class=review-order>
                <div class=review-button>
                    <span class review-button-span @click="buyOrder()">Place Order</span>
                </div>
            </div>
        </div>
    </div>
</template>

    <script>
        import Amplify, { Auth } from "aws-amplify";
        import FusionCharts from "fusioncharts";
        import { async } from 'q';
        var request = require('request');
        var buy
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
            stock: this.$route.params.stock,
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
            buyOrder: async function() {
            let info = await Auth.currentUserInfo();
            console.log("INFO: ", info);
            console.log("LOCAL: ", this.$store.state.user);
            const POST_BODY = {
                symbol: this.$route.params.stock,
                volume: document.getElementById("quantityentry").value
            }
            console.log(POST_BODY)
            request({
                url: "https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/buyOrder/",
                method: "POST",
                headers: {
                "content-type": "application/json",
                "Authorization": this.$store.state.user.signInUserSession.idToken.jwtToken
                },
                json: true,
                body: POST_BODY
            }, function(err, res, body) {
                console.log("err: ", err);
                console.log("res: ", res);
                console.log("bod: ", body);
            });
            },
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
            setStockPriceBoxData: function(searchSymbol) {
            var searchData ={
            "count": "505",
            "items":
              [
                {
                  "symbol": "FOX",
                  "name": "Twenty-First Century Fox Class B",
                  "sector": "Consumer Discretionary"
                },{
                "symbol": "AMP",
                "name": "Ameriprise Financial",
                "sector": "Financials"
              },{
                "symbol": "ETR",
                "name": "Entergy Corp.",
                "sector": "Utilities"
              },{
                "symbol": "ABBV",
                "name": "AbbVie Inc.",
                "sector": "Health Care"
              },{
                "symbol": "PFG",
                "name": "Principal Financial Group",
                "sector": "Financials"
              },{
                "symbol": "TRIP",
                "name": "TripAdvisor",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "TDG",
                "name": "TransDigm Group",
                "sector": "Industrials"
              },{
                "symbol": "NVDA",
                "name": "Nvidia Corporation",
                "sector": "Information Technology"
              },{
                "symbol": "FLR",
                "name": "Fluor Corp.",
                "sector": "Industrials"
              },{
                "symbol": "IT",
                "name": "Gartner Inc",
                "sector": "Information Technology"
              },{
                "symbol": "WLTW",
                "name": "Willis Towers Watson",
                "sector": "Financials"
              },{
                "symbol": "MRO",
                "name": "Marathon Oil Corp.",
                "sector": "Energy"
              },{
                "symbol": "ICE",
                "name": "Intercontinental Exchange",
                "sector": "Financials"
              },{
                "symbol": "CB",
                "name": "Chubb Limited",
                "sector": "Financials"
              },{
                "symbol": "HCA",
                "name": "HCA Holdings",
                "sector": "Health Care"
              },{
                "symbol": "AAP",
                "name": "Advance Auto Parts",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "INCY",
                "name": "Incyte",
                "sector": "Health Care"
              },{
                "symbol": "ZION",
                "name": "Zions Bancorp",
                "sector": "Financials"
              },{
                "symbol": "ORLY",
                "name": "O'Reilly Automotive",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "AJG",
                "name": "Arthur J. Gallagher & Co.",
                "sector": "Financials"
              },{
                "symbol": "IPG",
                "name": "Interpublic Group",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "BHF",
                "name": "Brighthouse Financial Inc",
                "sector": "Financials"
              },{
                "symbol": "A",
                "name": "Agilent Technologies Inc",
                "sector": "Health Care"
              },{
                "symbol": "ALB",
                "name": "Albemarle Corp",
                "sector": "Materials"
              },{
                "symbol": "VRTX",
                "name": "Vertex Pharmaceuticals Inc",
                "sector": "Health Care"
              },{
                "symbol": "SRE",
                "name": "Sempra Energy",
                "sector": "Utilities"
              },{
                "symbol": "CINF",
                "name": "Cincinnati Financial",
                "sector": "Financials"
              },{
                "symbol": "MDLZ",
                "name": "Mondelez International",
                "sector": "Consumer Staples"
              },{
                "symbol": "ALK",
                "name": "Alaska Air Group Inc",
                "sector": "Industrials"
              },{
                "symbol": "RSG",
                "name": "Republic Services Inc",
                "sector": "Industrials"
              },{
                "symbol": "MTB",
                "name": "M&T Bank Corp.",
                "sector": "Financials"
              },{
                "symbol": "HON",
                "name": "Honeywell Int'l Inc.",
                "sector": "Industrials"
              },{
                "symbol": "CMA",
                "name": "Comerica Inc.",
                "sector": "Financials"
              },{
                "symbol": "SCG",
                "name": "SCANA Corp",
                "sector": "Utilities"
              },{
                "symbol": "TEL",
                "name": "TE Connectivity Ltd.",
                "sector": "Information Technology"
              },{
                "symbol": "UNH",
                "name": "United Health Group Inc.",
                "sector": "Health Care"
              },{
                "symbol": "EXC",
                "name": "Exelon Corp.",
                "sector": "Utilities"
              },{
                "symbol": "PPL",
                "name": "PPL Corp.",
                "sector": "Utilities"
              },{
                "symbol": "HAS",
                "name": "Hasbro Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "BA",
                "name": "Boeing Company",
                "sector": "Industrials"
              },{
                "symbol": "COO",
                "name": "The Cooper Companies",
                "sector": "Health Care"
              },{
                "symbol": "STI",
                "name": "SunTrust Banks",
                "sector": "Financials"
              },{
                "symbol": "COG",
                "name": "Cabot Oil & Gas",
                "sector": "Energy"
              },{
                "symbol": "GRMN",
                "name": "Garmin Ltd.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "GD",
                "name": "General Dynamics",
                "sector": "Industrials"
              },{
                "symbol": "SYK",
                "name": "Stryker Corp.",
                "sector": "Health Care"
              },{
                "symbol": "LLL",
                "name": "L-3 Communications Holdings",
                "sector": "Industrials"
              },{
                "symbol": "APC",
                "name": "Anadarko Petroleum Corp",
                "sector": "Energy"
              },{
                "symbol": "SLG",
                "name": "SL Green Realty",
                "sector": "Real Estate"
              },{
                "symbol": "PM",
                "name": "Philip Morris International",
                "sector": "Consumer Staples"
              },{
                "symbol": "CRM",
                "name": "Salesforce.com",
                "sector": "Information Technology"
              },{
                "symbol": "ADBE",
                "name": "Adobe Systems Inc",
                "sector": "Information Technology"
              },{
                "symbol": "WBA",
                "name": "Walgreens Boots Alliance",
                "sector": "Consumer Staples"
              },{
                "symbol": "DGX",
                "name": "Quest Diagnostics",
                "sector": "Health Care"
              },{
                "symbol": "PCG",
                "name": "PG&E Corp.",
                "sector": "Utilities"
              },{
                "symbol": "PWR",
                "name": "Quanta Services Inc.",
                "sector": "Industrials"
              },{
                "symbol": "CMI",
                "name": "Cummins Inc.",
                "sector": "Industrials"
              },{
                "symbol": "VNO",
                "name": "Vornado Realty Trust",
                "sector": "Real Estate"
              },{
                "symbol": "CNC",
                "name": "Centene Corporation",
                "sector": "Health Care"
              },{
                "symbol": "FAST",
                "name": "Fastenal Co",
                "sector": "Industrials"
              },{
                "symbol": "CME",
                "name": "CME Group Inc.",
                "sector": "Financials"
              },{
                "symbol": "HUM",
                "name": "Humana Inc.",
                "sector": "Health Care"
              },{
                "symbol": "HST",
                "name": "Host Hotels & Resorts",
                "sector": "Real Estate"
              },{
                "symbol": "EBAY",
                "name": "eBay Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "WYN",
                "name": "Wyndham Worldwide",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "BHGE",
                "name": "Baker Hughes, a GE Company",
                "sector": "Energy"
              },{
                "symbol": "FLS",
                "name": "Flowserve Corporation",
                "sector": "Industrials"
              },{
                "symbol": "UAA",
                "name": "Under Armour Class A",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "FRT",
                "name": "Federal Realty Investment Trust",
                "sector": "Real Estate"
              },{
                "symbol": "TAP",
                "name": "Molson Coors Brewing Company",
                "sector": "Consumer Staples"
              },{
                "symbol": "VLO",
                "name": "Valero Energy",
                "sector": "Energy"
              },{
                "symbol": "MMC",
                "name": "Marsh & McLennan",
                "sector": "Financials"
              },{
                "symbol": "SLB",
                "name": "Schlumberger Ltd.",
                "sector": "Energy"
              },{
                "symbol": "EQT",
                "name": "EQT Corporation",
                "sector": "Energy"
              },{
                "symbol": "AIV",
                "name": "Apartment Investment & Management",
                "sector": "Real Estate"
              },{
                "symbol": "APTV",
                "name": "Aptiv Plc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "IDXX",
                "name": "IDEXX Laboratories",
                "sector": "Health Care"
              },{
                "symbol": "RMD",
                "name": "ResMed",
                "sector": "Health Care"
              },{
                "symbol": "DUK",
                "name": "Duke Energy",
                "sector": "Utilities"
              },{
                "symbol": "PNW",
                "name": "Pinnacle West Capital",
                "sector": "Utilities"
              },{
                "symbol": "GE",
                "name": "General Electric",
                "sector": "Industrials"
              },{
                "symbol": "CL",
                "name": "Colgate-Palmolive",
                "sector": "Consumer Staples"
              },{
                "symbol": "COST",
                "name": "Costco Wholesale Corp.",
                "sector": "Consumer Staples"
              },{
                "symbol": "VAR",
                "name": "Varian Medical Systems",
                "sector": "Health Care"
              },{
                "symbol": "PSA",
                "name": "Public Storage",
                "sector": "Real Estate"
              },{
                "symbol": "GT",
                "name": "Goodyear Tire & Rubber",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "T",
                "name": "AT&T Inc",
                "sector": "Telecommunication Services"
              },{
                "symbol": "GPS",
                "name": "Gap Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "LNC",
                "name": "Lincoln National",
                "sector": "Financials"
              },{
                "symbol": "NI",
                "name": "NiSource Inc.",
                "sector": "Utilities"
              },{
                "symbol": "OXY",
                "name": "Occidental Petroleum",
                "sector": "Energy"
              },{
                "symbol": "SCHW",
                "name": "Charles Schwab Corporation",
                "sector": "Financials"
              },{
                "symbol": "AKAM",
                "name": "Akamai Technologies Inc",
                "sector": "Information Technology"
              },{
                "symbol": "KIM",
                "name": "Kimco Realty",
                "sector": "Real Estate"
              },{
                "symbol": "HPQ",
                "name": "HP Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "MSI",
                "name": "Motorola Solutions Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "LEN",
                "name": "Lennar Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "LYB",
                "name": "LyondellBasell",
                "sector": "Materials"
              },{
                "symbol": "XOM",
                "name": "Exxon Mobil Corp.",
                "sector": "Energy"
              },{
                "symbol": "NOC",
                "name": "Northrop Grumman Corp.",
                "sector": "Industrials"
              },{
                "symbol": "RL",
                "name": "Polo Ralph Lauren Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "KORS",
                "name": "Michael Kors Holdings",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "CSX",
                "name": "CSX Corp.",
                "sector": "Industrials"
              },{
                "symbol": "HP",
                "name": "Helmerich & Payne",
                "sector": "Energy"
              },{
                "symbol": "DVA",
                "name": "DaVita Inc.",
                "sector": "Health Care"
              },{
                "symbol": "KLAC",
                "name": "KLA-Tencor Corp.",
                "sector": "Information Technology"
              },{
                "symbol": "CSCO",
                "name": "Cisco Systems",
                "sector": "Information Technology"
              },{
                "symbol": "MHK",
                "name": "Mohawk Industries",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "IRM",
                "name": "Iron Mountain Incorporated",
                "sector": "Real Estate"
              },{
                "symbol": "MAT",
                "name": "Mattel Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "ALL",
                "name": "Allstate Corp",
                "sector": "Financials"
              },{
                "symbol": "HSIC",
                "name": "Henry Schein",
                "sector": "Health Care"
              },{
                "symbol": "HSY",
                "name": "The Hershey Company",
                "sector": "Consumer Staples"
              },{
                "symbol": "MOS",
                "name": "The Mosaic Company",
                "sector": "Materials"
              },{
                "symbol": "VZ",
                "name": "Verizon Communications",
                "sector": "Telecommunication Services"
              },{
                "symbol": "PKG",
                "name": "Packaging Corporation of America",
                "sector": "Materials"
              },{
                "symbol": "DAL",
                "name": "Delta Air Lines Inc.",
                "sector": "Industrials"
              },{
                "symbol": "AES",
                "name": "AES Corp",
                "sector": "Utilities"
              },{
                "symbol": "DPS",
                "name": "Dr Pepper Snapple Group",
                "sector": "Consumer Staples"
              },{
                "symbol": "XLNX",
                "name": "Xilinx Inc",
                "sector": "Information Technology"
              },{
                "symbol": "DOV",
                "name": "Dover Corp.",
                "sector": "Industrials"
              },{
                "symbol": "VRSK",
                "name": "Verisk Analytics",
                "sector": "Industrials"
              },{
                "symbol": "DLR",
                "name": "Digital Realty Trust Inc",
                "sector": "Real Estate"
              },{
                "symbol": "ADP",
                "name": "Automatic Data Processing",
                "sector": "Information Technology"
              },{
                "symbol": "WMT",
                "name": "Wal-Mart Stores",
                "sector": "Consumer Staples"
              },{
                "symbol": "TSN",
                "name": "Tyson Foods",
                "sector": "Consumer Staples"
              },{
                "symbol": "UHS",
                "name": "Universal Health Services, Inc.",
                "sector": "Health Care"
              },{
                "symbol": "PBCT",
                "name": "People's United Financial",
                "sector": "Financials"
              },{
                "symbol": "REG",
                "name": "Regency Centers Corporation",
                "sector": "Real Estate"
              },{
                "symbol": "XL",
                "name": "XL Capital",
                "sector": "Financials"
              },{
                "symbol": "MMM",
                "name": "3M Company",
                "sector": "Industrials"
              },{
                "symbol": "ROST",
                "name": "Ross Stores",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "FCX",
                "name": "Freeport-McMoRan Inc.",
                "sector": "Materials"
              },{
                "symbol": "INTC",
                "name": "Intel Corp.",
                "sector": "Information Technology"
              },{
                "symbol": "REGN",
                "name": "Regeneron",
                "sector": "Health Care"
              },{
                "symbol": "INFO",
                "name": "IHS Markit Ltd.",
                "sector": "Industrials"
              },{
                "symbol": "CAG",
                "name": "Conagra Brands",
                "sector": "Consumer Staples"
              },{
                "symbol": "GGP",
                "name": "General Growth Properties Inc.",
                "sector": "Real Estate"
              },{
                "symbol": "GWW",
                "name": "Grainger (W.W.) Inc.",
                "sector": "Industrials"
              },{
                "symbol": "JNJ",
                "name": "Johnson & Johnson",
                "sector": "Health Care"
              },{
                "symbol": "TMO",
                "name": "Thermo Fisher Scientific",
                "sector": "Health Care"
              },{
                "symbol": "FTI",
                "name": "TechnipFMC",
                "sector": "Energy"
              },{
                "symbol": "HRL",
                "name": "Hormel Foods Corp.",
                "sector": "Consumer Staples"
              },{
                "symbol": "SWKS",
                "name": "Skyworks Solutions",
                "sector": "Information Technology"
              },{
                "symbol": "MO",
                "name": "Altria Group Inc",
                "sector": "Consumer Staples"
              },{
                "symbol": "EVHC",
                "name": "Envision Healthcare",
                "sector": "Health Care"
              },{
                "symbol": "BK",
                "name": "The Bank of New York Mellon Corp.",
                "sector": "Financials"
              },{
                "symbol": "NEE",
                "name": "NextEra Energy",
                "sector": "Utilities"
              },{
                "symbol": "ADM",
                "name": "Archer-Daniels-Midland Co",
                "sector": "Consumer Staples"
              },{
                "symbol": "CLX",
                "name": "The Clorox Company",
                "sector": "Consumer Staples"
              },{
                "symbol": "URI",
                "name": "United Rentals, Inc.",
                "sector": "Industrials"
              },{
                "symbol": "WU",
                "name": "Western Union Co",
                "sector": "Information Technology"
              },{
                "symbol": "UA",
                "name": "Under Armour Class C",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "PRU",
                "name": "Prudential Financial",
                "sector": "Financials"
              },{
                "symbol": "SHW",
                "name": "Sherwin-Williams",
                "sector": "Materials"
              },{
                "symbol": "FITB",
                "name": "Fifth Third Bancorp",
                "sector": "Financials"
              },{
                "symbol": "CHD",
                "name": "Church & Dwight",
                "sector": "Consumer Staples"
              },{
                "symbol": "PLD",
                "name": "Prologis",
                "sector": "Real Estate"
              },{
                "symbol": "ADI",
                "name": "Analog Devices, Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "KR",
                "name": "Kroger Co.",
                "sector": "Consumer Staples"
              },{
                "symbol": "MRK",
                "name": "Merck & Co.",
                "sector": "Health Care"
              },{
                "symbol": "F",
                "name": "Ford Motor",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "APD",
                "name": "Air Products & Chemicals Inc",
                "sector": "Materials"
              },{
                "symbol": "NWL",
                "name": "Newell Brands",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "RHT",
                "name": "Red Hat Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "EW",
                "name": "Edwards Lifesciences",
                "sector": "Health Care"
              },{
                "symbol": "RJF",
                "name": "Raymond James Financial Inc.",
                "sector": "Financials"
              },{
                "symbol": "RRC",
                "name": "Range Resources Corp.",
                "sector": "Energy"
              },{
                "symbol": "AMZN",
                "name": "Amazon.com Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "NLSN",
                "name": "Nielsen Holdings",
                "sector": "Industrials"
              },{
                "symbol": "PPG",
                "name": "PPG Industries",
                "sector": "Materials"
              },{
                "symbol": "CHTR",
                "name": "Charter Communications",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "COP",
                "name": "ConocoPhillips",
                "sector": "Energy"
              },{
                "symbol": "SO",
                "name": "Southern Co.",
                "sector": "Utilities"
              },{
                "symbol": "HRS",
                "name": "Harris Corporation",
                "sector": "Information Technology"
              },{
                "symbol": "ANDV",
                "name": "Andeavor",
                "sector": "Energy"
              },{
                "symbol": "CF",
                "name": "CF Industries Holdings Inc",
                "sector": "Materials"
              },{
                "symbol": "LRCX",
                "name": "Lam Research",
                "sector": "Information Technology"
              },{
                "symbol": "CSRA",
                "name": "CSRA Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "CBG",
                "name": "CBRE Group",
                "sector": "Real Estate"
              },{
                "symbol": "NRG",
                "name": "NRG Energy",
                "sector": "Utilities"
              },{
                "symbol": "CBS",
                "name": "CBS Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "CBOE",
                "name": "CBOE Holdings",
                "sector": "Financials"
              },{
                "symbol": "IQV",
                "name": "IQVIA Holdings Inc.",
                "sector": "Health Care"
              },{
                "symbol": "UPS",
                "name": "United Parcel Service",
                "sector": "Industrials"
              },{
                "symbol": "WDC",
                "name": "Western Digital",
                "sector": "Information Technology"
              },{
                "symbol": "KEY",
                "name": "KeyCorp",
                "sector": "Financials"
              },{
                "symbol": "SRCL",
                "name": "Stericycle Inc",
                "sector": "Industrials"
              },{
                "symbol": "ED",
                "name": "Consolidated Edison",
                "sector": "Utilities"
              },{
                "symbol": "FE",
                "name": "FirstEnergy Corp",
                "sector": "Utilities"
              },{
                "symbol": "DE",
                "name": "Deere & Co.",
                "sector": "Industrials"
              },{
                "symbol": "MNST",
                "name": "Monster Beverage",
                "sector": "Consumer Staples"
              },{
                "symbol": "NCLH",
                "name": "Norwegian Cruise Line",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "EMR",
                "name": "Emerson Electric Company",
                "sector": "Industrials"
              },{
                "symbol": "ETFC",
                "name": "E*Trade",
                "sector": "Financials"
              },{
                "symbol": "PXD",
                "name": "Pioneer Natural Resources",
                "sector": "Energy"
              },{
                "symbol": "APA",
                "name": "Apache Corporation",
                "sector": "Energy"
              },{
                "symbol": "IR",
                "name": "Ingersoll-Rand PLC",
                "sector": "Industrials"
              },{
                "symbol": "GLW",
                "name": "Corning Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "QCOM",
                "name": "QUALCOMM Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "MCD",
                "name": "McDonald's Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "ESS",
                "name": "Essex Property Trust, Inc.",
                "sector": "Real Estate"
              },{
                "symbol": "CCL",
                "name": "Carnival Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "KHC",
                "name": "Kraft Heinz Co",
                "sector": "Consumer Staples"
              },{
                "symbol": "LOW",
                "name": "Lowe's Cos.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "CTAS",
                "name": "Cintas Corporation",
                "sector": "Industrials"
              },{
                "symbol": "FB",
                "name": "Facebook, Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "GM",
                "name": "General Motors",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "CXO",
                "name": "Concho Resources",
                "sector": "Energy"
              },{
                "symbol": "PEP",
                "name": "PepsiCo Inc.",
                "sector": "Consumer Staples"
              },{
                "symbol": "VTR",
                "name": "Ventas Inc",
                "sector": "Real Estate"
              },{
                "symbol": "ETN",
                "name": "Eaton Corporation",
                "sector": "Industrials"
              },{
                "symbol": "SNI",
                "name": "Scripps Networks Interactive Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "IBM",
                "name": "International Business Machines",
                "sector": "Information Technology"
              },{
                "symbol": "UNM",
                "name": "Unum Group",
                "sector": "Financials"
              },{
                "symbol": "HOLX",
                "name": "Hologic",
                "sector": "Health Care"
              },{
                "symbol": "UTX",
                "name": "United Technologies",
                "sector": "Industrials"
              },{
                "symbol": "CTXS",
                "name": "Citrix Systems",
                "sector": "Information Technology"
              },{
                "symbol": "HII",
                "name": "Huntington Ingalls Industries",
                "sector": "Industrials"
              },{
                "symbol": "BAC",
                "name": "Bank of America Corp",
                "sector": "Financials"
              },{
                "symbol": "HD",
                "name": "Home Depot",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "ESRX",
                "name": "Express Scripts",
                "sector": "Health Care"
              },{
                "symbol": "PX",
                "name": "Praxair Inc.",
                "sector": "Materials"
              },{
                "symbol": "FFIV",
                "name": "F5 Networks",
                "sector": "Information Technology"
              },{
                "symbol": "AXP",
                "name": "American Express Co",
                "sector": "Financials"
              },{
                "symbol": "MKC",
                "name": "McCormick & Co.",
                "sector": "Consumer Staples"
              },{
                "symbol": "AMT",
                "name": "American Tower Corp A",
                "sector": "Real Estate"
              },{
                "symbol": "COTY",
                "name": "Coty, Inc",
                "sector": "Consumer Staples"
              },{
                "symbol": "SBAC",
                "name": "SBA Communications",
                "sector": "Real Estate"
              },{
                "symbol": "HBAN",
                "name": "Huntington Bancshares",
                "sector": "Financials"
              },{
                "symbol": "AZO",
                "name": "AutoZone Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "LUV",
                "name": "Southwest Airlines",
                "sector": "Industrials"
              },{
                "symbol": "COF",
                "name": "Capital One Financial",
                "sector": "Financials"
              },{
                "symbol": "BRK.B",
                "name": "Berkshire Hathaway",
                "sector": "Financials"
              },{
                "symbol": "TGT",
                "name": "Target Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "EMN",
                "name": "Eastman Chemical",
                "sector": "Materials"
              },{
                "symbol": "PSX",
                "name": "Phillips 66",
                "sector": "Energy"
              },{
                "symbol": "NBL",
                "name": "Noble Energy Inc",
                "sector": "Energy"
              },{
                "symbol": "EFX",
                "name": "Equifax Inc.",
                "sector": "Industrials"
              },{
                "symbol": "CHK",
                "name": "Chesapeake Energy",
                "sector": "Energy"
              },{
                "symbol": "HOG",
                "name": "Harley-Davidson",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "DWDP",
                "name": "DowDuPont",
                "sector": "Materials"
              },{
                "symbol": "DISCK",
                "name": "Discovery Communications-C",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "CVS",
                "name": "CVS Health",
                "sector": "Consumer Staples"
              },{
                "symbol": "SYF",
                "name": "Synchrony Financial",
                "sector": "Financials"
              },{
                "symbol": "BLK",
                "name": "BlackRock",
                "sector": "Financials"
              },{
                "symbol": "MAR",
                "name": "Marriott Int'l.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "SWK",
                "name": "Stanley Black & Decker",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "AMGN",
                "name": "Amgen Inc",
                "sector": "Health Care"
              },{
                "symbol": "HES",
                "name": "Hess Corporation",
                "sector": "Energy"
              },{
                "symbol": "DIS",
                "name": "The Walt Disney Company",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "FIS",
                "name": "Fidelity National Information Services",
                "sector": "Information Technology"
              },{
                "symbol": "NUE",
                "name": "Nucor Corp.",
                "sector": "Materials"
              },{
                "symbol": "ANSS",
                "name": "ANSYS",
                "sector": "Information Technology"
              },{
                "symbol": "AET",
                "name": "Aetna Inc",
                "sector": "Health Care"
              },{
                "symbol": "AEE",
                "name": "Ameren Corp",
                "sector": "Utilities"
              },{
                "symbol": "PKI",
                "name": "PerkinElmer",
                "sector": "Health Care"
              },{
                "symbol": "SNPS",
                "name": "Synopsys Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "MON",
                "name": "Monsanto Co.",
                "sector": "Materials"
              },{
                "symbol": "PG",
                "name": "Procter & Gamble",
                "sector": "Consumer Staples"
              },{
                "symbol": "ULTA",
                "name": "Ulta Salon Cosmetics & Fragrance Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "WFC",
                "name": "Wells Fargo",
                "sector": "Financials"
              },{
                "symbol": "BBT",
                "name": "BB&T Corporation",
                "sector": "Financials"
              },{
                "symbol": "APH",
                "name": "Amphenol Corp",
                "sector": "Information Technology"
              },{
                "symbol": "FMC",
                "name": "FMC Corporation",
                "sector": "Materials"
              },{
                "symbol": "GPC",
                "name": "Genuine Parts",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "C",
                "name": "Citigroup Inc.",
                "sector": "Financials"
              },{
                "symbol": "LEG",
                "name": "Leggett & Platt",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "VIAB",
                "name": "Viacom Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "HRB",
                "name": "Block H&R",
                "sector": "Financials"
              },{
                "symbol": "GPN",
                "name": "Global Payments Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "LKQ",
                "name": "LKQ Corporation",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "FL",
                "name": "Foot Locker Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "XEC",
                "name": "Cimarex Energy",
                "sector": "Energy"
              },{
                "symbol": "TMK",
                "name": "Torchmark Corp.",
                "sector": "Financials"
              },{
                "symbol": "IFF",
                "name": "Intl Flavors & Fragrances",
                "sector": "Materials"
              },{
                "symbol": "GILD",
                "name": "Gilead Sciences",
                "sector": "Health Care"
              },{
                "symbol": "NSC",
                "name": "Norfolk Southern Corp.",
                "sector": "Industrials"
              },{
                "symbol": "BIIB",
                "name": "Biogen Inc.",
                "sector": "Health Care"
              },{
                "symbol": "DRI",
                "name": "Darden Restaurants",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "AGN",
                "name": "Allergan, Plc",
                "sector": "Health Care"
              },{
                "symbol": "PGR",
                "name": "Progressive Corp.",
                "sector": "Financials"
              },{
                "symbol": "WMB",
                "name": "Williams Cos.",
                "sector": "Energy"
              },{
                "symbol": "ISRG",
                "name": "Intuitive Surgical Inc.",
                "sector": "Health Care"
              },{
                "symbol": "PFE",
                "name": "Pfizer Inc.",
                "sector": "Health Care"
              },{
                "symbol": "XYL",
                "name": "Xylem Inc.",
                "sector": "Industrials"
              },{
                "symbol": "ROK",
                "name": "Rockwell Automation Inc.",
                "sector": "Industrials"
              },{
                "symbol": "SNA",
                "name": "Snap-On Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "EA",
                "name": "Electronic Arts",
                "sector": "Information Technology"
              },{
                "symbol": "DHR",
                "name": "Danaher Corp.",
                "sector": "Health Care"
              },{
                "symbol": "PCLN",
                "name": "Priceline.com Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "M",
                "name": "Macy's Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "FDX",
                "name": "FedEx Corporation",
                "sector": "Industrials"
              },{
                "symbol": "CFG",
                "name": "Citizens Financial Group",
                "sector": "Financials"
              },{
                "symbol": "BBY",
                "name": "Best Buy Co. Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "LNT",
                "name": "Alliant Energy Corp",
                "sector": "Utilities"
              },{
                "symbol": "BXP",
                "name": "Boston Properties",
                "sector": "Real Estate"
              },{
                "symbol": "WRK",
                "name": "WestRock Company",
                "sector": "Materials"
              },{
                "symbol": "QRVO",
                "name": "Qorvo",
                "sector": "Information Technology"
              },{
                "symbol": "ARE",
                "name": "Alexandria Real Estate Equities Inc",
                "sector": "Real Estate"
              },{
                "symbol": "AVGO",
                "name": "Broadcom",
                "sector": "Information Technology"
              },{
                "symbol": "KMB",
                "name": "Kimberly-Clark",
                "sector": "Consumer Staples"
              },{
                "symbol": "HCP",
                "name": "HCP Inc.",
                "sector": "Real Estate"
              },{
                "symbol": "MYL",
                "name": "Mylan N.V.",
                "sector": "Health Care"
              },{
                "symbol": "TWX",
                "name": "Time Warner Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "MCK",
                "name": "McKesson Corp.",
                "sector": "Health Care"
              },{
                "symbol": "MAA",
                "name": "Mid-America Apartments",
                "sector": "Real Estate"
              },{
                "symbol": "STZ",
                "name": "Constellation Brands",
                "sector": "Consumer Staples"
              },{
                "symbol": "ALXN",
                "name": "Alexion Pharmaceuticals",
                "sector": "Health Care"
              },{
                "symbol": "WHR",
                "name": "Whirlpool Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "PH",
                "name": "Parker-Hannifin",
                "sector": "Industrials"
              },{
                "symbol": "TIF",
                "name": "Tiffany & Co.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "MET",
                "name": "MetLife Inc.",
                "sector": "Financials"
              },{
                "symbol": "PYPL",
                "name": "PayPal",
                "sector": "Information Technology"
              },{
                "symbol": "JWN",
                "name": "Nordstrom",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "HAL",
                "name": "Halliburton Co.",
                "sector": "Energy"
              },{
                "symbol": "ALGN",
                "name": "Align Technology",
                "sector": "Health Care"
              },{
                "symbol": "EXR",
                "name": "Extra Space Storage",
                "sector": "Real Estate"
              },{
                "symbol": "WAT",
                "name": "Waters Corporation",
                "sector": "Health Care"
              },{
                "symbol": "XEL",
                "name": "Xcel Energy Inc",
                "sector": "Utilities"
              },{
                "symbol": "RHI",
                "name": "Robert Half International",
                "sector": "Industrials"
              },{
                "symbol": "EL",
                "name": "Estee Lauder Cos.",
                "sector": "Consumer Staples"
              },{
                "symbol": "DG",
                "name": "Dollar General",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "EQR",
                "name": "Equity Residential",
                "sector": "Real Estate"
              },{
                "symbol": "NTAP",
                "name": "NetApp",
                "sector": "Information Technology"
              },{
                "symbol": "DHI",
                "name": "D. R. Horton",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "YUM",
                "name": "Yum! Brands Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "NDAQ",
                "name": "Nasdaq, Inc.",
                "sector": "Financials"
              },{
                "symbol": "VMC",
                "name": "Vulcan Materials",
                "sector": "Materials"
              },{
                "symbol": "DVN",
                "name": "Devon Energy Corp.",
                "sector": "Energy"
              },{
                "symbol": "RF",
                "name": "Regions Financial Corp.",
                "sector": "Financials"
              },{
                "symbol": "IP",
                "name": "International Paper",
                "sector": "Materials"
              },{
                "symbol": "STT",
                "name": "State Street Corp.",
                "sector": "Financials"
              },{
                "symbol": "L",
                "name": "Loews Corp.",
                "sector": "Financials"
              },{
                "symbol": "UAL",
                "name": "United Continental Holdings",
                "sector": "Industrials"
              },{
                "symbol": "TXT",
                "name": "Textron Inc.",
                "sector": "Industrials"
              },{
                "symbol": "SBUX",
                "name": "Starbucks Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "NTRS",
                "name": "Northern Trust Corp.",
                "sector": "Financials"
              },{
                "symbol": "O",
                "name": "Realty Income Corporation",
                "sector": "Real Estate"
              },{
                "symbol": "ANTM",
                "name": "Anthem Inc.",
                "sector": "Health Care"
              },{
                "symbol": "ORCL",
                "name": "Oracle Corp.",
                "sector": "Information Technology"
              },{
                "symbol": "GIS",
                "name": "General Mills",
                "sector": "Consumer Staples"
              },{
                "symbol": "BWA",
                "name": "BorgWarner",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "GOOGL",
                "name": "Alphabet Inc Class A",
                "sector": "Information Technology"
              },{
                "symbol": "KSS",
                "name": "Kohl's Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "ADS",
                "name": "Alliance Data Systems",
                "sector": "Information Technology"
              },{
                "symbol": "CMG",
                "name": "Chipotle Mexican Grill",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "AVB",
                "name": "AvalonBay Communities, Inc.",
                "sector": "Real Estate"
              },{
                "symbol": "JCI",
                "name": "Johnson Controls International",
                "sector": "Industrials"
              },{
                "symbol": "MCO",
                "name": "Moody's Corp",
                "sector": "Financials"
              },{
                "symbol": "ZTS",
                "name": "Zoetis",
                "sector": "Health Care"
              },{
                "symbol": "GOOG",
                "name": "Alphabet Inc Class C",
                "sector": "Information Technology"
              },{
                "symbol": "ITW",
                "name": "Illinois Tool Works",
                "sector": "Industrials"
              },{
                "symbol": "UNP",
                "name": "Union Pacific",
                "sector": "Industrials"
              },{
                "symbol": "CI",
                "name": "CIGNA Corp.",
                "sector": "Health Care"
              },{
                "symbol": "RCL",
                "name": "Royal Caribbean Cruises Ltd",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "FISV",
                "name": "Fiserv Inc",
                "sector": "Information Technology"
              },{
                "symbol": "TROW",
                "name": "T. Rowe Price Group",
                "sector": "Financials"
              },{
                "symbol": "NFLX",
                "name": "Netflix Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "KSU",
                "name": "Kansas City Southern",
                "sector": "Industrials"
              },{
                "symbol": "ADSK",
                "name": "Autodesk Inc",
                "sector": "Information Technology"
              },{
                "symbol": "VRSN",
                "name": "Verisign Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "MLM",
                "name": "Martin Marietta Materials",
                "sector": "Materials"
              },{
                "symbol": "AME",
                "name": "AMETEK Inc",
                "sector": "Industrials"
              },{
                "symbol": "MS",
                "name": "Morgan Stanley",
                "sector": "Financials"
              },{
                "symbol": "PVH",
                "name": "PVH Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "NWSA",
                "name": "News Corp. Class A",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "AMAT",
                "name": "Applied Materials Inc",
                "sector": "Information Technology"
              },{
                "symbol": "CTSH",
                "name": "Cognizant Technology Solutions",
                "sector": "Information Technology"
              },{
                "symbol": "CAT",
                "name": "Caterpillar Inc.",
                "sector": "Industrials"
              },{
                "symbol": "FTV",
                "name": "Fortive Corp",
                "sector": "Industrials"
              },{
                "symbol": "NFX",
                "name": "Newfield Exploration Co",
                "sector": "Energy"
              },{
                "symbol": "KO",
                "name": "Coca-Cola Company (The)",
                "sector": "Consumer Staples"
              },{
                "symbol": "AMD",
                "name": "Advanced Micro Devices Inc",
                "sector": "Information Technology"
              },{
                "symbol": "DRE",
                "name": "Duke Realty Corp",
                "sector": "Real Estate"
              },{
                "symbol": "ECL",
                "name": "Ecolab Inc.",
                "sector": "Materials"
              },{
                "symbol": "NKE",
                "name": "Nike",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "AOS",
                "name": "A.O. Smith Corp",
                "sector": "Industrials"
              },{
                "symbol": "DXC",
                "name": "DXC Technology",
                "sector": "Information Technology"
              },{
                "symbol": "ALLE",
                "name": "Allegion",
                "sector": "Industrials"
              },{
                "symbol": "SJM",
                "name": "JM Smucker",
                "sector": "Consumer Staples"
              },{
                "symbol": "PAYX",
                "name": "Paychex Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "ACN",
                "name": "Accenture plc",
                "sector": "Information Technology"
              },{
                "symbol": "FLIR",
                "name": "FLIR Systems",
                "sector": "Information Technology"
              },{
                "symbol": "K",
                "name": "Kellogg Co.",
                "sector": "Consumer Staples"
              },{
                "symbol": "RE",
                "name": "Everest Re Group Ltd.",
                "sector": "Financials"
              },{
                "symbol": "SYY",
                "name": "Sysco Corp.",
                "sector": "Consumer Staples"
              },{
                "symbol": "COL",
                "name": "Rockwell Collins",
                "sector": "Industrials"
              },{
                "symbol": "ROP",
                "name": "Roper Technologies",
                "sector": "Industrials"
              },{
                "symbol": "EOG",
                "name": "EOG Resources",
                "sector": "Energy"
              },{
                "symbol": "AAPL",
                "name": "Apple Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "PHM",
                "name": "Pulte Homes Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "TRV",
                "name": "The Travelers Companies Inc.",
                "sector": "Financials"
              },{
                "symbol": "AIG",
                "name": "American International Group, Inc.",
                "sector": "Financials"
              },{
                "symbol": "CMCSA",
                "name": "Comcast Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "KMX",
                "name": "Carmax Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "SYMC",
                "name": "Symantec Corp.",
                "sector": "Information Technology"
              },{
                "symbol": "PCAR",
                "name": "PACCAR Inc.",
                "sector": "Industrials"
              },{
                "symbol": "CERN",
                "name": "Cerner",
                "sector": "Health Care"
              },{
                "symbol": "HLT",
                "name": "Hilton Worldwide Holdings Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "EXPE",
                "name": "Expedia Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "TJX",
                "name": "TJX Companies Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "TXN",
                "name": "Texas Instruments",
                "sector": "Information Technology"
              },{
                "symbol": "TSS",
                "name": "Total System Services",
                "sector": "Information Technology"
              },{
                "symbol": "WYNN",
                "name": "Wynn Resorts Ltd",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "LUK",
                "name": "Leucadia National Corp.",
                "sector": "Financials"
              },{
                "symbol": "CDNS",
                "name": "Cadence Design Systems",
                "sector": "Information Technology"
              },{
                "symbol": "UDR",
                "name": "UDR Inc",
                "sector": "Real Estate"
              },{
                "symbol": "PRGO",
                "name": "Perrigo",
                "sector": "Health Care"
              },{
                "symbol": "FOXA",
                "name": "Twenty-First Century Fox Class A",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "MA",
                "name": "Mastercard Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "BLL",
                "name": "Ball Corp",
                "sector": "Materials"
              },{
                "symbol": "MDT",
                "name": "Medtronic plc",
                "sector": "Health Care"
              },{
                "symbol": "CVX",
                "name": "Chevron Corp.",
                "sector": "Energy"
              },{
                "symbol": "JEC",
                "name": "Jacobs Engineering Group",
                "sector": "Industrials"
              },{
                "symbol": "NWS",
                "name": "News Corp. Class B",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "JPM",
                "name": "JPMorgan Chase & Co.",
                "sector": "Financials"
              },{
                "symbol": "NAVI",
                "name": "Navient",
                "sector": "Financials"
              },{
                "symbol": "DFS",
                "name": "Discover Financial Services",
                "sector": "Financials"
              },{
                "symbol": "CMS",
                "name": "CMS Energy",
                "sector": "Utilities"
              },{
                "symbol": "BMY",
                "name": "Bristol-Myers Squibb",
                "sector": "Health Care"
              },{
                "symbol": "ABC",
                "name": "AmerisourceBergen Corp",
                "sector": "Health Care"
              },{
                "symbol": "DISH",
                "name": "Dish Network",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "WY",
                "name": "Weyerhaeuser Corp.",
                "sector": "Real Estate"
              },{
                "symbol": "VFC",
                "name": "V.F. Corp.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "MGM",
                "name": "MGM Resorts International",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "PEG",
                "name": "Public Serv. Enterprise Inc.",
                "sector": "Utilities"
              },{
                "symbol": "AFL",
                "name": "AFLAC Inc",
                "sector": "Financials"
              },{
                "symbol": "SEE",
                "name": "Sealed Air",
                "sector": "Materials"
              },{
                "symbol": "SIG",
                "name": "Signet Jewelers",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "IVZ",
                "name": "Invesco Ltd.",
                "sector": "Financials"
              },{
                "symbol": "MCHP",
                "name": "Microchip Technology",
                "sector": "Information Technology"
              },{
                "symbol": "OMC",
                "name": "Omnicom Group",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "CHRW",
                "name": "C. H. Robinson Worldwide",
                "sector": "Industrials"
              },{
                "symbol": "AWK",
                "name": "American Water Works Company Inc",
                "sector": "Utilities"
              },{
                "symbol": "AMG",
                "name": "Affiliated Managers Group Inc",
                "sector": "Financials"
              },{
                "symbol": "BDX",
                "name": "Becton Dickinson",
                "sector": "Health Care"
              },{
                "symbol": "MU",
                "name": "Micron Technology",
                "sector": "Information Technology"
              },{
                "symbol": "ES",
                "name": "Eversource Energy",
                "sector": "Utilities"
              },{
                "symbol": "WEC",
                "name": "Wec Energy Group Inc",
                "sector": "Utilities"
              },{
                "symbol": "NEM",
                "name": "Newmont Mining Corporation",
                "sector": "Materials"
              },{
                "symbol": "ABT",
                "name": "Abbott Laboratories",
                "sector": "Health Care"
              },{
                "symbol": "LLY",
                "name": "Lilly (Eli) & Co.",
                "sector": "Health Care"
              },{
                "symbol": "BEN",
                "name": "Franklin Resources",
                "sector": "Financials"
              },{
                "symbol": "CNP",
                "name": "CenterPoint Energy",
                "sector": "Utilities"
              },{
                "symbol": "AEP",
                "name": "American Electric Power",
                "sector": "Utilities"
              },{
                "symbol": "CCI",
                "name": "Crown Castle International Corp.",
                "sector": "Real Estate"
              },{
                "symbol": "HBI",
                "name": "Hanesbrands Inc",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "EXPD",
                "name": "Expeditors International",
                "sector": "Industrials"
              },{
                "symbol": "JBHT",
                "name": "J. B. Hunt Transport Services",
                "sector": "Industrials"
              },{
                "symbol": "D",
                "name": "Dominion Energy",
                "sector": "Utilities"
              },{
                "symbol": "DLTR",
                "name": "Dollar Tree",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "LB",
                "name": "L Brands Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "DTE",
                "name": "DTE Energy Co.",
                "sector": "Utilities"
              },{
                "symbol": "HPE",
                "name": "Hewlett Packard Enterprise",
                "sector": "Information Technology"
              },{
                "symbol": "ARNC",
                "name": "Arconic Inc",
                "sector": "Industrials"
              },{
                "symbol": "FBHS",
                "name": "Fortune Brands Home & Security",
                "sector": "Industrials"
              },{
                "symbol": "MTD",
                "name": "Mettler Toledo",
                "sector": "Health Care"
              },{
                "symbol": "XRX",
                "name": "Xerox Corp.",
                "sector": "Information Technology"
              },{
                "symbol": "DISCA",
                "name": "Discovery Communications-A",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "NOV",
                "name": "National Oilwell Varco Inc.",
                "sector": "Energy"
              },{
                "symbol": "GS",
                "name": "Goldman Sachs Group",
                "sector": "Financials"
              },{
                "symbol": "ATVI",
                "name": "Activision Blizzard",
                "sector": "Information Technology"
              },{
                "symbol": "AAL",
                "name": "American Airlines Group",
                "sector": "Industrials"
              },{
                "symbol": "JNPR",
                "name": "Juniper Networks",
                "sector": "Information Technology"
              },{
                "symbol": "OKE",
                "name": "ONEOK",
                "sector": "Energy"
              },{
                "symbol": "MSFT",
                "name": "Microsoft Corp.",
                "sector": "Information Technology"
              },{
                "symbol": "XRAY",
                "name": "Dentsply Sirona",
                "sector": "Health Care"
              },{
                "symbol": "CA",
                "name": "CA, Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "HIG",
                "name": "Hartford Financial Svc.Gp.",
                "sector": "Financials"
              },{
                "symbol": "HCN",
                "name": "Welltower Inc.",
                "sector": "Real Estate"
              },{
                "symbol": "LMT",
                "name": "Lockheed Martin Corp.",
                "sector": "Industrials"
              },{
                "symbol": "ZBH",
                "name": "Zimmer Biomet Holdings",
                "sector": "Health Care"
              },{
                "symbol": "AYI",
                "name": "Acuity Brands Inc",
                "sector": "Industrials"
              },{
                "symbol": "MAS",
                "name": "Masco Corp.",
                "sector": "Industrials"
              },{
                "symbol": "MAC",
                "name": "Macerich",
                "sector": "Real Estate"
              },{
                "symbol": "V",
                "name": "Visa Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "AVY",
                "name": "Avery Dennison Corp",
                "sector": "Materials"
              },{
                "symbol": "BSX",
                "name": "Boston Scientific",
                "sector": "Health Care"
              },{
                "symbol": "EIX",
                "name": "Edison Int'l",
                "sector": "Utilities"
              },{
                "symbol": "ILMN",
                "name": "Illumina Inc",
                "sector": "Health Care"
              },{
                "symbol": "PNC",
                "name": "PNC Financial Services",
                "sector": "Financials"
              },{
                "symbol": "CTL",
                "name": "CenturyLink Inc",
                "sector": "Telecommunication Services"
              },{
                "symbol": "PNR",
                "name": "Pentair Ltd.",
                "sector": "Industrials"
              },{
                "symbol": "BF.B",
                "name": "Brown-Forman Corp.",
                "sector": "Consumer Staples"
              },{
                "symbol": "SPG",
                "name": "Simon Property Group Inc",
                "sector": "Real Estate"
              },{
                "symbol": "STX",
                "name": "Seagate Technology",
                "sector": "Information Technology"
              },{
                "symbol": "CAH",
                "name": "Cardinal Health Inc.",
                "sector": "Health Care"
              },{
                "symbol": "WM",
                "name": "Waste Management Inc.",
                "sector": "Industrials"
              },{
                "symbol": "INTU",
                "name": "Intuit Inc.",
                "sector": "Information Technology"
              },{
                "symbol": "TSCO",
                "name": "Tractor Supply Company",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "LH",
                "name": "Laboratory Corp. of America Holding",
                "sector": "Health Care"
              },{
                "symbol": "AON",
                "name": "Aon plc",
                "sector": "Financials"
              },{
                "symbol": "TPR",
                "name": "Tapestry, Inc.",
                "sector": "Consumer Discretionary"
              },{
                "symbol": "EQIX",
                "name": "Equinix",
                "sector": "Real Estate"
              },{
                "symbol": "AIZ",
                "name": "Assurant Inc",
                "sector": "Financials"
              },{
                "symbol": "PDCO",
                "name": "Patterson Companies",
                "sector": "Health Care"
              },{
                "symbol": "CPB",
                "name": "Campbell Soup",
                "sector": "Consumer Staples"
              },{
                "symbol": "RTN",
                "name": "Raytheon Co.",
                "sector": "Industrials"
              },{
                "symbol": "BAX",
                "name": "Baxter International Inc.",
                "sector": "Health Care"
              },{
                "symbol": "SPGI",
                "name": "S&P Global, Inc.",
                "sector": "Financials"
              },{
                "symbol": "MPC",
                "name": "Marathon Petroleum",
                "sector": "Energy"
              },{
                "symbol": "KMI",
                "name": "Kinder Morgan",
                "sector": "Energy"
              },{
                "symbol": "CELG",
                "name": "Celgene Corp.",
                "sector": "Health Care"
              },{
                "symbol": "USB",
                "name": "U.S. Bancorp",
                "sector": "Financials"
              }]
            };   
            var closest = [];
            var i = 0;
            for (i in searchData.items) {
                console.log("comparing:" + searchSymbol + " & " + searchData.items[i].symbol)
                if (searchSymbol == searchData.items[i].symbol) {
                    closest.push({
                        symbol: searchData.items[i].symbol, 
                        name: searchData.items[i].name,
                        sector: searchData.items[i].sector})
                break
                }
                }
            console.log(closest[0].name)
            document.getElementById("stock-name").innerHTML = closest[0].name;
            document.getElementById("stock-symbol").innerHTML = closest[0].symbol;
            document.getElementById("result").style.display = "block";

            var priceFetch = fetch("https://cloud.iexapis.com/stable/stock/" + closest[0].symbol + "/quote?token=pk_497251cf3fda45cc93195a67cd10d337").then(jsonify);
            priceFetch.then(priceResults => {
                document.getElementById("stock-price").innerHTML = priceResults.latestPrice
                document.getElementById("stock-change").innerHTML = priceResults.change
                if (String(priceResults.change).startsWith("-")) {
                document.getElementById("stock-change").style.color = "red";
                } else {
                document.getElementById("stock-change").style.color = "green";
                }
        
        })

        },
        },
        mounted: function() {
        console.log(this.$route.params.stock)
        console.log('the stock is: ' + this.$route.params.stock);
        var testStock = this.$route.params.stock;
        if (testStock != undefined) {
            this.setStockPriceBoxData(testStock);
        } else {
            this.setStockPriceBoxData('ABT')
        }
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
