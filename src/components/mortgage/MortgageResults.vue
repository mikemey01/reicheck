<template>
    <div>
        <div class="">
            <div class="row re-text" v-if="dataLoaded">
                <div class="col"></div>
                <div class="col-sm-3">
                    <h6>Monthly Payment</h6>
                    <hr>
                    <div>{{ getMonthlyAmount }}</div>
                    <br>
                </div>
                <div class="col-sm-3">
                    <h6>Annual Payment</h6>
                    <hr>
                    <div>{{ getAnnualPayment }}</div>
                    <br>
                </div>
                <div class="col-sm-3">
                    <h6>Total Payment</h6>
                    <hr>
                    <div>{{ getTotalRepayment }}</div>
                    <br>
                </div>
                <div class="col"></div>
            </div>
        </div>


        <div class="row">
            <div class="col-12">
                <div class="barchart">
                    <bar-chart class="barchart" v-if="dataLoaded" :chart-data="getYearlyChartData.data" :options="getYearlyChartData.options"></bar-chart>
                </div>
                
            </div>
        </div>

        <br>

        <div class="row" v-if="dataLoaded">
            <div class="col-12">
                <b-table sticky-header head-variant="light" small :fields="fields" :items="getMonthlySchedule" ></b-table>
            </div>
        </div>
    </div>
</template>

<script>
    import BarChart from '@/components/charts/BarChart';

    export default{
        props:{
            mortgageSchedules:{
                type: Object,
                default: function (){
                    return {};
                }
            }
        },
        watch:{
            // eslint-disable-next-line
            mortgageSchedules: function(newVal, oldVal){
                if(!this.$utils.isEmpty(newVal)){
                    this.dataLoaded = true;
                }
            }
        },
        data(){
            return{
                schedules: {},
                mSchedules: [],
                dataLoaded: false,
                monthlyPayment: 0,
                annualPayment: 0,
                totalRepayment: 0,
                chartOptions: {
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                // eslint-disable-next-line
                                callback: (value, index, values) => {
                                    return this.$utils.formatAsCurrency(value);
                                }
                            }
                        }],
                        xAxes:[{
                            stacked: true
                        }]
                    }
                },
                fields:[
                    {key: 'PaymentNumber', label: 'Month'},
                    {key: 'PaymentAmountFormatted', label: 'Payment'},
                    {key: 'InterestAmountFormatted', label: 'Interest'},
                    {key: 'PrincipalAmountFormatted', label: 'Principal'},
                    {key: 'PrincipalBalanceFormatted', label: 'Balance'}
                ]
            }
        },
        components:{
            BarChart
        },
        computed:{
            getAllSchedules(){
                let schedules = this.mortgageSchedules;
                return schedules;
            },
            getAnnualPayment(){
                let schedules = this.getAllSchedules;
                if(!this.$utils.isEmpty(schedules)){
                    return this.$utils.formatAsCurrency(schedules.annualSchedule[0].total);
                }

                return 0;
            },
            getMonthlyAmount(){
                let schedules = this.getAllSchedules;
                if(!this.$utils.isEmpty(schedules)){
                    return this.$utils.formatAsCurrency(schedules.monthlySchedule[0].PaymentAmount);
                }

                return 0;
            },
            getMonthlySchedule(){
                if(!this.$utils.isEmpty(this.getAllSchedules)){
                    this.mSchedules = this.getAllSchedules.monthlySchedule
                    this.mSchedules.map(item =>{
                        item.PaymentAmountFormatted = this.$utils.formatAsCurrency(item.PaymentAmount);
                        item.InterestAmountFormatted = this.$utils.formatAsCurrency(item.InterestAmount);
                        item.PrincipalAmountFormatted = this.$utils.formatAsCurrency(item.PrincipalAmount);
                        item.PrincipalBalanceFormatted = this.$utils.formatAsCurrency(item.PrincipalBalance);
                    });
                    return this.mSchedules;
                }

                return {};
            },
            getTotalRepayment(){
                let schedules = this.getAllSchedules;
                if(!this.$utils.isEmpty(schedules)){
                    return this.$utils.formatAsCurrency(schedules.totalSchedule);
                }

                return 0;
            },
            getYearlyChartData(){
                let allschedules = this.getAllSchedules;
                let both = {};

                let labels = []; // x labels
                let datasets = []; // array of one object for now
                let principalDataset = {}; // holds the data, label, borderwidth
                let interestDataset = {};
                let principalYVals = []; // the y values
                let interestYVals = [];

                let options = this.chartOptions; // config stuff
                let schedules = allschedules.annualSchedule; // mort data unformateed

                schedules.map(item => {
                    labels.push(item.year);
                    principalYVals.push(item.principal);
                    interestYVals.push(item.interest);
                });

                // interest
                interestDataset.label = "Interest";
                interestDataset.data = interestYVals
                interestDataset.borderWidth = 1;
                interestDataset.backgroundColor = '#0b62a4';
                datasets.push(interestDataset);

                // principal
                principalDataset.label = "Principal";
                principalDataset.data = principalYVals;
                principalDataset.borderWidth = 1;
                principalDataset.backgroundColor = '#7a92a3';
                datasets.push(principalDataset);

                let data = {}
                data.datasets = datasets
                data.labels = labels;
                both.data = data;
                both.options = options;

                return both;
            }
        },
        created(){
            
        }
        
    }
</script>
<style scoped>
    #app .barchart{
        height: 250px;
    }
    hr{
        margin-top: 3px;
        margin-bottom: 3px;
    }

</style>