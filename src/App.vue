<template>
    <div id="ancestor">
        <div class="container-fluid" id="app">
            <div class="row">
                <div class="navbar">
                    <img src="./assets/Sharr.png" alt="Sharr Icon" style="width:7.5%;height:7.5%"/>
                    <br>
                    <div>
                        <ul>
                            <li><router-link to="/"> Home </router-link></li>
                            <li><router-link to="/SearchStock"> Search Stock </router-link></li>
                            <li><router-link to="/Portfolio"> Portfolio </router-link></li>
                            <li><router-link to="/TransactionHistory"> History </router-link></li>
                        </ul>
                        <br>
                    </div>
                    <div class=logininfobar>
                        <ul class=logininfo>
                            <li id=email></li>
                            <li id=balance></li>
                        </ul>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import { components } from 'aws-amplify-vue';
    import { AmplifyEventBus } from 'aws-amplify-vue';

    export default {
        name: 'app',
        props: [],
        components: {
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
        methods: {
            setLoggedInUser: function(email,balance) {
                balance = balance.toLocaleString();
                document.getElementById("email").innerHTML = "User: " + email
                document.getElementById("balance").innerHTML = "Balance: $"+ balance
                console.log("email = " + email + "balance = " + balance)
            }
        }
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