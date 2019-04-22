<template>
  <div class="highlights-item col-md-4 col-sm-6 col-xs-12 border-top">
    <div>
      <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :containerbackgroundopacity="containerbackgroundopacity"
        :dataformat="dataformat"
        :datasource="datasource"
      ></fusioncharts>
    </div>
  </div>
</template>

<script>
export default {
  props: ["highlights"],
  components: {},
  data() {
    return {
      type: "inversemsline",
      width: "100%",
      height: "400",
      containerbackgroundopacity: 0,
      dataformat: "json",
      datasource: {
        chart: {
          caption: "FIFA Ranking",
          subcaption: "Argentina vs Germany<br>2000-2018",
          theme: "fusion",
          yaxisname: "Rank",
          xaxisname: "Years",
          plottooltext: "$seriesName: <b>$dataValue</b>",
          rotatelabels: "1",
          slantlabels: "0"
        },
        categories: [
          {
            category: [
              {
                label: "2000"
              },
              {
                label: "2001"
              },
              {
                label: "2002"
              },
              {
                label: "2003"
              },
              {
                label: "2004"
              },
              {
                label: "2005"
              },
              {
                label: "2006"
              },
              {
                label: "2007"
              },
              {
                label: "2008"
              },
              {
                label: "2009"
              },
              {
                label: "2010"
              },
              {
                label: "2011"
              },
              {
                label: "2012"
              },
              {
                label: "2013"
              },
              {
                label: "2014"
              },
              {
                label: "2015"
              },
              {
                label: "2016"
              },
              {
                label: "2017"
              },
              {
                label: "2018"
              }
            ]
          }
        ],
        dataset: [
          {
            seriesname: "Germany",
            data: [
              {
                value: "11"
              },
              {
                value: "12"
              },
              {
                value: "4"
              },
              {
                value: "12"
              },
              {
                value: "19"
              },
              {
                value: "16"
              },
              {
                value: "6"
              },
              {
                value: "5"
              },
              {
                value: "2"
              },
              {
                value: "6"
              },
              {
                value: "3"
              },
              {
                value: "3"
              },
              {
                value: "2"
              },
              {
                value: "2"
              },
              {
                value: "1"
              },
              {
                value: "4"
              },
              {
                value: "3"
              },
              {
                value: "1"
              },
              {
                value: "1"
              }
            ]
          },
          {
            seriesname: "Argentina",
            data: [
              {
                value: "3"
              },
              {
                value: "2"
              },
              {
                value: "5"
              },
              {
                value: "5"
              },
              {
                value: "3"
              },
              {
                value: "4"
              },
              {
                value: "3"
              },
              {
                value: "1"
              },
              {
                value: "6"
              },
              {
                value: "8"
              },
              {
                value: "5"
              },
              {
                value: "10"
              },
              {
                value: "3"
              },
              {
                value: "3"
              },
              {
                value: "2"
              },
              {
                value: "2"
              },
              {
                value: "1"
              },
              {
                value: "4"
              },
              {
                value: "5"
              }
            ]
          }
        ]
      },
    };
  },
};
</script>
