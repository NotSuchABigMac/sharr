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
          <div class=stock-title>
            First Result
          </div>
          <div class>
          </div>
        </div>
        <div class=results id=result2>
          <div class=stock-title>
            Second Result
          </div>
        </div>
        <div class=results id=result3>
          <div class=stock-title>
            Third Result
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
