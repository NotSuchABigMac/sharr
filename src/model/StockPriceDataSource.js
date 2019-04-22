var AWS = require("aws-sdk");
var fs = require('fs');

function parseData(filePath) {
    var obj = JSON.parse(fs.readFileSync(filePath, 'utf8')); 

    var allData = [];
    var stockPrices = [];
    var index = 1;

    for(var objectIndex in obj) {
        allData.push(obj[objectIndex]);
    }

    allData.forEach(function(stock) {
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

    return stockPrices;
}

function getData(symbol, dataSource) {
    var allData = [];

    AWS.config.update({
        region: "ap-southeast-2",
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName : "StockPrices",
        FilterExpression: 'symbol = :s',
        ExpressionAttributeValues: {
            ':s': symbol
        }
    };

    console.log("SCANNING FOR: " + symbol);
    
    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to scan. Error:", JSON.stringify(err, null, 2));
            return null;
        } else {
            data.Items.forEach(function(item) {
                allData.push(item);
            });
            console.log("Scan succeeded.");
            // allData.forEach(function(symbol) {
                // console.log(symbol.label);
            // });



            return allData;
        }
    });
}

parseData('data/snap_5y.json')
