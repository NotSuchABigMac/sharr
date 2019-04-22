<template>
    <div style="position: relative;">
        <temp-var-chart :StockGraph="StockGraph"></temp-var-chart>
        <today-highlights :highlights="highlights"></today-highlights>
    </div>
</template>

<script>
    import TempVarChart from './CandleChart.vue';
    import Highlights from './Highlights.vue';

    export default {
        props: ['highlights', 'StockGraph'],
        components: {
            'temp-var-chart': TempVarChart,
            'today-highlights': Highlights
        },
    }
</script>