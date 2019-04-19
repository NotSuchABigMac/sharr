var AWS = require("aws-sdk");
var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('snap_5y.json', 'utf8')); 

var StockPrices = [];

for(var objectIndex in obj) {
    StockPrices.push(obj[objectIndex]);
    console.log(objectIndex);
}

AWS.config.update({
    region: "ap-southeast-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "StockPrices";

for(var i in StockPrices) {
    var params = {
        TableName:table,
        Item:{
            "datetime": StockPrices[i].date + "00:00:00",
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

    var arrSize = StockPrices.length
    
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