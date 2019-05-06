/* eslint-env jest */
const fetch = require('node-fetch')

describe('Test AWS Connection using Promises', () => {
    it('should return Hello World', () => {
    const BASE_URL = "https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta";
    var jsonify = res => res.json();
    var dataFetch = fetch(
        BASE_URL + "/health-check/connection/")
      .then(jsonify)
      .then(data => {
        expect(data).toBeDefined()
        expect(data.message).toEqual('Hello World')
      });
  });
});
