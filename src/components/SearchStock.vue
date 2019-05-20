<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <div id=searchnavbar>
        <div class=backicon>
          <img src="../assets/backbutton.png"/>
        </div>
        <div class=SearchBox>
              <input type="text" ref="input" name="searchStock" class=searchStock @keyup.enter="searchSymbol">
        </div>
      </div>
      <div class=searchresults>
        <div class=results id=result1>
          <div class=firstline>
            <div class=stock-name id=stock-name-1>
                Name
            </div>
          </div>
            <div class=stock-code id=stock-symbol-1>
              -
            </div>
            <div class=third-line>
                <div class=stock-price id=stock-price-1>
                    -
                </div>
                <div class=stock-change id=stock-change-1 >
                    -
                </div>
            </div>
            <div class=stock-details>
                23 Apr, 8:46 am GMT-4 - Disclaimer
            </div>
        </div>
         <div class=results id=result2>
          <div class=firstline>
            <div class=stock-name>
                Aardvark
            </div>
          </div>
            <div class=stock-code>
              NASDAQ: AABA
            </div>
            <div class=third-line>
                <div class=stock-price>
                    75.37
                </div>
                <div class=stock-change>
                    USD +0.00 (0.00)
                </div>
            </div>
            <div class=stock-details>
                23 Apr, 8:46 am GMT-4 - Disclaimer
            </div>
        </div>
        <div class=results id=result3>
          <div class=firstline>
            <div class=stock-name>
                Aaron
            </div>
          </div>
            <div class=stock-code>
                NASDAQ: AABA
            </div>
            <div class=third-line>
                <div class=stock-price>
                    75.37
                </div>
                <div class=stock-change>
                    USD +0.00 (0.00)
                </div>
            </div>
            <div class=stock-details>
                23 Apr, 8:46 am GMT-4 - Disclaimer
            </div>
        </div>
        <div class=results id=result4>
          <div class=firstline>
            <div class=stock-name>
                Armadillo
            </div>
          </div>
            <div class=stock-code>
              NASDAQ: AABA
            </div>
            <div class=third-line>
                <div class=stock-price>
                    75.37
                </div>
                <div class=stock-change>
                    USD +0.00 (0.00)
                </div>
            </div>
            <div class=stock-details>
                23 Apr, 8:46 am GMT-4 - Disclaimer
            </div>
        </div>
        <div class=results id=result5>
          <div class=firstline>
            <div class=stock-name>
                Argonaut
            </div>
          </div>
            <div class=stock-code>
              NASDAQ: AABA
            </div>
            <div class=third-line>
                <div class=stock-price>
                    75.37
                </div>
                <div class=stock-change>
                    USD +0.00 (0.00)
                </div>
            </div>
            <div class=stock-details>
                23 Apr, 8:46 am GMT-4 - Disclaimer
            </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ["StockGraph"],
  components: {},
  methods: {
    searchSymbol: async function() {
      var symbol = this.$refs.input.value;
      var jsonify = res => res.json();
      console.log("https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/search/" + symbol);
      var searchFetch = fetch(
          "https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/search/" + symbol).then(jsonify);
      var priceFetch = fetch("https://cloud.iexapis.com/stable/stock/" + symbol + "/quote?token=pk_497251cf3fda45cc93195a67cd10d337").then(jsonify);
      console.log("test")
      console.log(searchFetch)
      console.log(priceFetch)

      searchFetch.then(searchResults => {
        console.log(searchResults.results[0].name)
        document.getElementById("stock-name-1").innerHTML = searchResults.results[0].name
        document.getElementById("stock-symbol-1").innerHTML = searchResults.results[0].symbol
        document.getElementById("result1").style.visibility = "visible";
      })

      priceFetch.then(priceResults => {
        console.log(priceResults)
        console.log(priceResults.latestPrice)
        document.getElementById("stock-price-1").innerHTML = priceResults.latestPrice
        document.getElementById("stock-change-1").innerHTML = priceResults.change
        var str = priceResults.change;
        if (String(priceResults.change).startsWith("-")) {
          document.getElementById("stock-change-1").style.color = "red";
        } else {
          document.getElementById("stock-change-1").style.color = "green";
        }

      })

      console.log("test")
  }
}
}
</script>

<style>
</style>
