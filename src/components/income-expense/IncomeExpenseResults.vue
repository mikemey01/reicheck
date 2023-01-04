<template>
    <div class="container re-text" v-if="dataLoaded">

        <!-- results -->
        <md-card>
            <md-card-header>
                <div class="md-title re-text">Results <small>over {{ie.ie.yearsHeld}} years</small></div>
            </md-card-header>
            <md-card-content>
                <div class="row">
                    <div class="col-4">
                        <h6>Cash Flow</h6>
                        <hr>
                        <div><b>{{ ie.cashFlow | currencyFilter }}</b>/mo</div>
                        <div><b>{{ ie.cashFlow*12 | currencyFilter }}</b>/yr</div>
                    </div>
                    <div class="col-4">
                        <h6>NOI</h6>
                        <hr>
                        <div><b>{{ ie.netOperatingIncome | currencyFilter }}</b>/mo</div>
                        <div><b>{{ ie.netOperatingIncome*12 | currencyFilter }}</b>/yr</div>
                    </div>
                    <div class="col-4">
                        <h6>IRR</h6>
                        <hr>
                        <div><b>{{ ie.irr }}%</b></div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-4">
                        <h6>Cap Rate</h6>
                        <hr>
                        <div><b>{{ ie.capRate }}%</b></div>
                    </div>
                    <div class="col-4">
                        <h6>Cash on Cash</h6>
                        <hr>
                        <div><b>{{ ie.cashOnCash }}%</b></div>
                    </div>
                    <div class="col-4">
                        <h6>Total Profit</h6>
                        <hr>
                        <div><b>{{ ie.totalProfit | currencyFilter }}</b></div>
                    </div>
                </div>
            </md-card-content>
        </md-card>
        
        
        <br>
        <br>
        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-6">
                        
                    </div>
                    <div class="col-3 pl-0">
                        Monthly
                    </div>
                    <div class="col-3">
                        Annual
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <b>Income</b>
                    </div>
                    <div class="col-3">

                    </div>
                    <div class="col-3">

                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-6">
                        Rent:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.incomeRent | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.incomeRent*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Other:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.incomeOther | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.incomeOther*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Total:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.incomeTotal | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.incomeTotal*12 | currencyFilter }}</b>
                    </div>
                </div>
            </div>
            <div class="col-md-4 chart-container pl-5">
                <!-- charts -->
                <donut-chart class="donut-chart" :chart-data="getIncomeChartData.data" :options="getIncomeChartData.options"></donut-chart>
            </div>
        </div>
        
        <br>

        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-6">
                        <b>Expense</b>
                    </div>
                    <div class="col-3">

                    </div>
                    <div class="col-3">

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <div class="row pt-1">
                    <div class="col-6">
                        Mortgage P/I:
                    </div>
                    <div class="col-3 pl-0">
                    <b>{{ ie.expenseMortgage | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseMortgage*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Insurance:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.expenseInsurance | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseInsurance*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Property Tax:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.expenseTax | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseTax*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Maintenance:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.expenseMaintenance | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseMaintenance*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Vacancy:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.expenseVacancy | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseVacancy*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        HOA:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.expenseHoa | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseHoa*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Other:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.expenseOtherCost | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseOtherCost*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Operating Expense:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.expenseOperatingTotal | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseOperatingTotal*12 | currencyFilter }}</b>
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-6">
                        Total Expense:
                    </div>
                    <div class="col-3 pl-0">
                        <b>{{ ie.expenseTotal | currencyFilter }}</b>
                    </div>
                    <div class="col-3">
                        <b>{{ ie.expenseTotal*12 | currencyFilter }}</b>
                    </div>
                </div>
            </div>
            <div class="col-md-4 chart-container pl-5">
                <!-- charts -->
                <donut-chart class="donut-chart" :chart-data="getExpenseChartData.data" :options="getExpenseChartData.options"></donut-chart>
            </div>
        </div>
        <br>

        
    </div>
</template>

<script>

    import IncomeExpenseCalculator from '@/scripts/calculators/income-expense-calculator';
    import utils from '@/scripts/utilities/utils';
    import DonutChart from '@/components/charts/DonutChart';

    export default{
        props:{
            incomeExpense:{
                type: Object,
                default: function (){
                    return {};
                }
            },
            mortgageSchedules:{
                type: Object,
                default: null
            },
            mortgageData:{
                type: Object,
                default: null
            }
        },
        components:{
            DonutChart
        },
        watch:{
            incomeExpense: function(newVal){
                this.ie.updateIEData(newVal);
                this.dataLoaded = true;
            },
            mortgageSchedules: function(newVal){
                this.ie.updateMortageSchedules(newVal);
                this.dataLoaded = true;
            },
            mortgageData: function(newVal){
                this.ie.updateMortgageData(newVal);
                this.dataLoaded = true;
            }
        },
        data(){
            return{
                ie: {},
                dataLoaded: false,
                homePrice: 0
            }
        },
        computed:{
            getIncomeExpenseInputs(){
                return this.$store.state.incomeExpense;
            },
            getMortgageSchedules(){
                return this.$store.state.mortgageSchedules;
            },
            getExpenseChartData(){
                let data = {
                    datasets: [{
                        data: [this.ie.expenseMortgage, 
                                this.ie.expenseInsurance, 
                                this.ie.expenseTax, 
                                this.ie.expenseMaintenance,
                                this.ie.expenseOtherCost],
                        backgroundColor: ["#0b62a4", "#7a92a3", "#5781a1", "#4a4f52", "#979a9c"]
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Mortgage',
                        'Insurance',
                        'Tax',
                        'Maintenance',
                        'Other'
                    ]
                };
                let options = {
                    legend: false,
                    responsive: true,
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {

                                let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || 0;
                                let label = data.labels[tooltipItem.index] || '';
                                let ret = label + ': ' + utils.formatAsCurrency(value);
                                
                                return ret;
                            }
                        }
                    }
                };
                let both = {};
                both.data = data;
                both.options = options;
                return both;
            },
            getIncomeChartData(){
                let data = {
                    datasets: [{
                        data: [this.ie.incomeRent, this.ie.incomeOther],
                        backgroundColor: ["#0b62a4", "#7a92a3"]
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Rent',
                        'Other'
                    ]
                };

                let options = {
                    legend: false,
                    responsive: true,
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {

                                let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || 0;
                                let label = data.labels[tooltipItem.index] || '';
                                let ret = label + ': ' + utils.formatAsCurrency(value);
                                
                                return ret;
                            }
                        }
                    }
                };
                let both = {};
                both.data = data;
                both.options = options;
                return both;
            }
        },
        methods:{
            
        },
        created(){
            this.ie = new IncomeExpenseCalculator();
        }
    }
</script>

<style scoped>
    .donut-chart {
        background: white;
        width: 100%;
        height: 50%;
        
    }

    .chart-container {
        padding: 5px;
    }

    hr{
        margin-top: 3px;
        margin-bottom: 3px;
    }

    .md-app-content .md-card{
        margin-left: 0px;
        margin-right: 0px;
    }
</style>