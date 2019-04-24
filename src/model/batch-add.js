var AWS = require("aws-sdk");
var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('output.txt', 'utf8')); 

var StockPrices = [];

for(var i in obj) {
    StockPrices.push(obj[i]);
}

AWS.config.update({
    region: "ap-southeast-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "sharr-mobilehub-185163309-StockPrices";
var arrSize = StockPrices.length

for(var i in StockPrices) {
    var params = {
        TableName:table,
        Item:{
            "date": StockPrices[i].date,
            "open": StockPrices[i].open,
            "close": StockPrices[i].close,
            "high": StockPrices[i].high,
            "low": StockPrices[i].low,
            "volume": StockPrices[i].volume,
            "uOpen": StockPrices[i].uOpen,
            "uClose": StockPrices[i].uClose,
            "uHigh": StockPrices[i].uHigh,
            "uLow": StockPrices[i].uLow,
            "uVolume": StockPrices[i].uVolume,
            "change": StockPrices[i].change,
            "changePercent": StockPrices[i].changePercent,
            "symbol": StockPrices[i].symbol,
            "label": StockPrices[i].label,
            "changeOverTime": StockPrices[i].changeOverTime
        }
    };
    
    //console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // console.log("Added item:", JSON.stringify(data, null, 2));
            console.log("Now at: ", (i/arrSize));
        }
    });
}