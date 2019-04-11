<template>
    <div id="pagecontent">
        <p> Test </p>
        {{weather_data}}
        <fusioncharts
        type="spline"
        width="100%"
        height="100%"
        dataformat="json"       dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        dataEmptyMessageImageScale=39
        :datasource=datasource
     > 
     </fusioncharts>
     <p> ^ The graph should be here ^ </p>
    </div>
</template>

<script>
export default {
    props: ["weather_data"],
        data () {
            return {
                "type": "column2d",
                "renderAt": "chart-container",
                "width": "550",
                "height": "350",
                "dataFormat": "json",
                "datasource": {
                    "chart": {
                        "caption": "Number of visitors in the last 3 days",
                        "subCaption": "Bakersfield Central vs Los Angeles Topanga",
                        "theme": "fusion"
                    },
                    "data": [{
                        "label": "Mon",
                        "value": "15123"
                    }, {
                        "label": "Tue",
                        "value": "14233"
                    }, {
                        "label": "Wed",
                        "value": "25507"
                    }]
                }
            }
        },
    methods: {

    },
    computed: {

    },
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
