/* eslint-disable */

var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-southeast-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();

function scanDB() {
    var params = {
        TableName : "StockPrices",
        FilterExpression: 'symbol = :s',
        ExpressionAttributeValues: {
            ':s': 'GOOG'
        }
    };
    
    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to scan. Error:", JSON.stringify(err, null, 2));
        } else {
            data.Items.forEach(function(item) {
                // console.log(" -", item.symbol + ": " + item.date + " " + item.close);
                console.log(item);
            });
            console.log("Scan succeeded.");
        }
    });
}

function queryDB() {
    var params = {
        TableName : "StockPrices-sharrenv",
        KeyConditionExpression: '#searchDateTime BETWEEN :fromDate AND :toDate AND #symbol = :s',
        ExpressionAttributeNames: {
            '#symbol': 'APPL',
            '#searchDateTime': 'createdDateTime',
        },
        ExpressionAttributeValues: {
            ':fromDate': '2018-01-01',
            ':toDate': '2018-01-01'
        }
        // KeyConditionExpression: 'symbol = :s'
        // Key: {
        //     "symbol": "SNAP"
        // }
        //KeyConditionExpression: "#yr = :yyyy",
        // KeyConditionExpression: "symbol = :s"
        // ExpressionAttributeNames:{
        //     "#yr": "year"
        // },
        // ExpressionAttributeValues: {
        //     ":yyyy": 1985
        // }
    };
    
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            data.Items.forEach(function(item) {    
                console.log("here");
                console.log(item);
            });
            console.log("Scan succeeded.");
        }
    });
}

scanDB();
