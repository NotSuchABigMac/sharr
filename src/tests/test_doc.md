# Sharr Testing Guide

Assuming you've run <code>npm install</code>, simply run the following commands in the root dir:

### To Unit Test: <code>jest</code>

This will run any *.js files in the _src/tests_ directory

##### awsConnection.test.js
Makes an async call to the backend API's health check endpoint. Needed as the game's backend is hosted entirely in the Cloud, and it needs not only an internet connection, but also whether or not the AWS backend API is working.

Test will pass if the AWS API Gateway health check endpoint returns ``Hello World``.

##### example.test.js
Simple example unit test that shows how to create more.

### To Lint: <code>eslint .</code>
This will lint the source code of _Sharr_. Configs can be overwritten by creating a `.eslint.rc` file in the root directory.