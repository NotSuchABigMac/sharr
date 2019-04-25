<template>
    <div id="ancestor">
        <div class="container-fluid" id="app">
            <div class="row">
                <img src="./assets/Sharr.png" alt="Sharr Icon" style="width:10%;height:10%"/>
                <router-link to="/"> Home         -</router-link>
                <router-link to="/CandleChart"> Candle Chart        -</router-link>
                <router-link to="/Highlights"> Highlights Chart         -</router-link>
                <router-link to="/Interactive"> Interactive Chart </router-link>
                <div> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ </div>
                <router-view></router-view>

            </div>
        </div>
    </div>
</template>

<script>
    import Content from './components/Content.vue';
    import { components } from 'aws-amplify-vue';
    import { AmplifyEventBus } from 'aws-amplify-vue';


    export default {
        name: 'app',
        props: [],
        components: {
            'dashboard-content': Content
        },
        data() {
            return {
                weatherDetails: false,
                location: '', // raw location from input
                lat: '', // raw latitude from google maps api response
                long: '', // raw longitude from google maps api response
                completeWeatherApi: '', // weather api string with lat and long
                rawWeatherData: '', // raw response from weather api
                currentWeather: {
                    full_location: '', // for full address
                    formatted_lat: '', // for N/S
                    formatted_long: '', // for E/W
                    time: '',
                    temp: '',
                    todayHighLow: {
                        todayTempHigh: '',
                        todayTempHighTime: '',
                        todayTempLow: '',
                        todayTempLowTime: ''
                    },
                    summary: '',
                    possibility: ''
                },
                highlights: {
                    uvIndex: '',
                    visibility: '',
                    windStatus: {
                        windSpeed: '',
                        windDirection: '',
                        derivedWindDirection: ''
                    },
                }
            };
        },
    };
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>