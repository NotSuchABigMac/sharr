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
        <div class=resultslistheader>
          <br><br>
          You searched for a stock,
          here are your results:
        </div>
        <div class=results id=result1>
          <div class=firstline>
              <div class=live-price>
                  204.53
              </div>
              <div class=price-change>
                  USD 0.00 (0.00%)
              </div>
          </div>
          <div class=price-details>
              Closed: 23 Apr, 8:46 am GMT-4 - Disclaimer <br>
              Pre-market 204.10 -0.43 (0.21%)
          </div>
        </div>
        <div class=results id=result2>
          <div class=firstline>
              <div class=live-price>
                  204.53
              </div>
              <div class=price-change>
                  USD 0.00 (0.00%)
              </div>
          </div>
          <div class=price-details>
              Closed: 23 Apr, 8:46 am GMT-4 - Disclaimer <br>
              Pre-market 204.10 -0.43 (0.21%)
          </div>
        </div>
        <div class=results id=result3>
          <div class=firstline>
              <div class=live-price>
                  204.53
              </div>
              <div class=price-change>
                  USD 0.00 (0.00%)
              </div>
          </div>
          <div class=price-details>
              Closed: 23 Apr, 8:46 am GMT-4 - Disclaimer <br>
              Pre-market 204.10 -0.43 (0.21%)
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
