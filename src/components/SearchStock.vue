<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <div id=searchnavbar>
        <div class=backicon>
          <img src="../assets/backbutton.png"/>
        </div>
        <div class=SearchBox>
            <form action="submit" class=submitform>
              <input type="text" name="searchStock" class=searchStock>
            </form>
        </div>
      </div>
      <div class=searchresults>
        <div class=results id=result1>
          <div class=firstline>
            <div class=stock-name>
                Apple
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
    
  },
  mounted:"",
  watch: {
  }
};
</script>

<style>
</style>
