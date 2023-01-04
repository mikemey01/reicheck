<template>
    <div>
        <md-card class="mb-2">
            <md-card-header>
                <i class="fas fa-file-invoice-dollar"></i> <div class="md-title re-text">Mortgage</div>
            </md-card-header>
            <md-card-content>
            <div class="row">
                <!-- inputs -->
                <div class="col-md-3">
                    <form class="container">
                        <md-field>
                            <label>Purchase Price</label>
                            <span class="md-prefix">$</span>
                            <md-input v-model="mortgage.homePrice" @change="downpaymentChange(mortgage.homePrice)" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                            <span class="md-helper-text" v-if="!$v.mortgage.homePrice.required">The home price is required</span>
                        </md-field>
                        <div class="row">
                            <div class="col-8 pr-0">
                                <md-field v-if="isMoneyDownpayment">
                                    <label>Down Payment</label>
                                    <span class="md-prefix">$</span>
                                    <md-input v-model="mortgage.downpaymentMoney" v-currency @blur="recalcOnBlur" @change="downpaymentChange(mortgage.downpaymentMoney)" @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.mortgage.downpayment.required">The down payment is required</span>
                                </md-field>
                                <md-field v-if="isPercentDownpayment">
                                    <label>Down Payment</label>
                                    <span class="md-prefix">%</span>
                                    <md-input v-model="mortgage.downpaymentPercent" @blur="recalcOnBlur" @change="downpaymentChange(mortgage.downpaymentPercent)" @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.mortgage.downpayment.required">Required</span>
                                </md-field>
                            </div>
                            <div class="col-2 p-0">

                                <md-button tabindex="-1" class="md-icon-button md-raised md-dense md-primary mt-3" @click="percentDownpayment">
                                    <i class="fa fa-percent"></i>
                                </md-button>
                            </div>
                            <div class="col-2 p-0">
                                <md-button tabindex="-1" class="md-icon-button md-raised md-dense md-primary mt-3" @click="moneyDownpayment">
                                    <i class="fa fa-dollar"></i>
                                </md-button>
                            </div>
                            
                        </div>
                        <md-field>
                            <label>Loan Amount</label>
                            <span class="md-prefix">$</span>
                            <md-input v-model="mortgage.loanAmount" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                            <span class="md-helper-text" v-if="!$v.mortgage.loanAmount.required">The loan amount is required</span>
                        </md-field>
                        <md-field>
                            <label>Interest Rate</label>
                            <span class="md-prefix">%</span>
                            <md-input type="number" step="0.01" v-model="mortgage.interestRate" @blur="recalcOnBlur" @click.native="$event.target.select()"></md-input>
                            <span class="md-helper-text" v-if="!$v.mortgage.interestRate.required">The interest rate is required</span>
                        </md-field>
                        <md-field>
                            <label>Loan Years</label>
                            <md-input type="number" v-model="mortgage.loanYears" @blur="recalcOnBlur" @click.native="$event.target.select()"></md-input>
                            <span class="md-helper-text" v-if="!$v.mortgage.loanYears.required">The loan years is required</span>
                        </md-field>
                        <md-field>
                            <label>Annual Property Tax</label>
                            <span class="md-prefix">$</span>
                            <md-input v-model="mortgage.annualPropertyTax" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                            <span class="md-helper-text" v-if="!$v.mortgage.annualPropertyTax.required">The annual property tax is required</span>
                        </md-field>
                        <md-field>
                            <label>Annual Insurance</label>
                            <span class="md-prefix">$</span>
                            <md-input v-model="mortgage.annualInsurance" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                            <span class="md-helper-text" v-if="!$v.mortgage.annualInsurance.required">The annual insurance is required</span>
                        </md-field>
                        <md-field>
                            <label>Monthly PMI</label>
                            <span class="md-prefix">$</span>
                            <md-input v-model="mortgage.monthlyPmi" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                            <span class="md-helper-text" v-if="!$v.mortgage.monthlyPmi.required">The PMI amount is required</span>
                        </md-field>
                        <md-field>
                            <label>Monthly HOA</label>
                            <span class="md-prefix">$</span>
                            <md-input v-model="mortgage.monthlyHoa" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                            <span class="md-helper-text" v-if="!$v.mortgage.monthlyHoa.required">The HOA amount is required</span>
                        </md-field>
                        
                    </form>

                </div>
                <!-- mort results -->
                <div class="col-md-9">
                    <MortgageResults :mortgageSchedules="getMortgageSchedules"></MortgageResults>
                </div>
            </div>  
            </md-card-content>
        </md-card>

    </div>
</template>

<script>

    import Mortgage from '@/scripts/calculators/mortgage-calculator.js';
    import { InitializeMortgageData } from '@/scripts/calculators/mortgage-calculator-init';
    import { required } from 'vuelidate/lib/validators';
    import utils from '@/scripts/utilities/utils';
    import MortgageResults from '@/components/mortgage/MortgageResults.vue';

    const LOCALE = 'en';
    const CURRENCY_TYPE = 'USD';

    export default{
        props:{

        },
        components:{
            MortgageResults
        },
        data(){
            return{
                mortgage: {},
                isMoneyDownpayment: false,
                isPercentDownpayment: true,
                position: 'prefix',
                currencySymbol: '# ',
                initMortData: {}
            }
        },
        validations:{
            mortgage:{
                homePrice:{
                    required
                },
                downpayment:{
                    required
                },
                loanAmount:{
                    required
                },
                interestRate:{
                    required
                },
                loanYears:{
                    required
                },
                annualPropertyTax:{
                    required
                },
                annualInsurance:{
                    required
                },
                monthlyPmi:{
                    required
                },
                monthlyHoa:{
                    required
                }
            }
        },
        computed:{
            cSymbol(){
                return {[this.position]: this.currencySymbol};
            },
            downpaymentFloat(){
                let dp = parseFloat(this.mortgage.downpayment);
                return dp;
            },
            getMortgage(){
                return this.$store.state.mortgage;
            },
            getMortgageSchedules(){
                return this.$store.state.mortgageSchedules;
            },
            getPropertyApiData(){
                return this.$store.state.propertyApiData;
            },
            isDev(){
                return this.$store.state.isDev;
            },
            processProperty(){
                return this.$store.state.processProperty;
            }
        },
        watch:{
            processProperty(newVal){
                if(newVal){
                    this.buildMortgageObj();
                    this.$store.commit('setProcessProperty', false);
                    this.$store.commit('setProcessIncomeExpense', true);
                }
            },
            getMortgage(newVal, oldVal){
                console.log(oldVal);
                
            }
        },
        methods:{
            recalcOnBlur(){
                this.$store.commit("setProcessProperty", true);
            },
            applyMortgage(mortObj){
                new Promise((resolve) => {
                    this.$store.commit('updateMortgage', mortObj);
                    this.calculateMortgage(mortObj);
                    resolve(this);
                }).then(() =>{
                    this.setIsLoading(false);
                });
               
            },
            downpaymentChange(val){
                if(isNaN(this.$parseCurrency(val, LOCALE, CURRENCY_TYPE)))return;
                this.mortgage.loanAmount = this.getLoanAmount();
            },
            getLoanAmount(){
                if(!utils.isNullUndefinedEmpty(this.mortgage.homePrice) && !utils.isNullUndefinedEmpty(this.mortgage.downpayment)){
                    let hp = this.$parseCurrency(this.mortgage.homePrice, LOCALE, CURRENCY_TYPE);
                    let dp = this.isMoneyDownpayment ? this.$parseCurrency(this.mortgage.downpaymentMoney, LOCALE, CURRENCY_TYPE) :
                                                        this.mortgage.downpaymentPercent;
                    let dpMoney = this.isPercentDownpayment ? hp - ((dp/100)*hp) : hp - dp;
                    return dpMoney;
                }else{
                    return this.$parseCurrency(this.mortgage.loanAmount, LOCALE, CURRENCY_TYPE);
                }
            },
            moneyDownpayment(){
                this.isMoneyDownpayment = true;
                this.isPercentDownpayment = false;
                this.mortgage.isMoneyDownpayment = true;
                this.mortgage.isPercentDownpayment = false;
                this.mortgage.downpaymentMoney = this.$parseCurrency(this.mortgage.downpaymentPercent, LOCALE, CURRENCY_TYPE);
                this.downpaymentChange(this.mortgage.downpaymentMoney);
            },
            percentDownpayment(){
                this.isMoneyDownpayment = false;
                this.isPercentDownpayment = true;
                this.mortgage.isMoneyDownpayment = false;
                this.mortgage.isPercentDownpayment = true;
                this.mortgage.downpaymentPercent = this.$parseCurrency(this.mortgage.downpaymentMoney, LOCALE, CURRENCY_TYPE);
                this.downpaymentChange(this.mortgage.downpaymentPercent);
            },
            calculateMortgage(mortObj){
                let mortCalc = new Mortgage(mortObj);
                let mortgageSchedules = mortCalc.calculateMortgage();
                this.$store.commit('updateMortgageSchedules', mortgageSchedules);
            },
            buildMortgageObj(){

                if(this.$v.$invalid){
                    return;
                }
                this.setIsLoading(true);
                let mortObj = {};

                let downpayment = this.isMoneyDownpayment ? this.$parseCurrency(this.mortgage.downpaymentMoney, LOCALE, CURRENCY_TYPE) :
                                                            this.$parseCurrency(this.mortgage.downpaymentPercent, LOCALE, CURRENCY_TYPE);

                mortObj.homePrice = this.$parseCurrency(this.mortgage.homePrice, LOCALE, CURRENCY_TYPE);
                mortObj.downpayment = downpayment;
                mortObj.loanAmount = this.$parseCurrency(this.mortgage.loanAmount, LOCALE, CURRENCY_TYPE);
                mortObj.interestRate = this.$parseCurrency(this.mortgage.interestRate, LOCALE, CURRENCY_TYPE);
                mortObj.loanYears = this.$parseCurrency(this.mortgage.loanYears, LOCALE, CURRENCY_TYPE);
                mortObj.annualPropertyTax = this.$parseCurrency(this.mortgage.annualPropertyTax, LOCALE, CURRENCY_TYPE);
                mortObj.annualInsurance = this.$parseCurrency(this.mortgage.annualInsurance, LOCALE, CURRENCY_TYPE);
                mortObj.monthlyPmi = this.$parseCurrency(this.mortgage.monthlyPmi, LOCALE, CURRENCY_TYPE);
                mortObj.monthlyHoa = this.$parseCurrency(this.mortgage.monthlyHoa, LOCALE, CURRENCY_TYPE);
                this.applyMortgage(mortObj);

                // only used when updated from another component (IE the watch on getMortgage calls this)
                return mortObj;
            },
            setIsLoading(state){
                this.$store.commit('setIsLoading', state);
            }
        },
        
        created(){
            let localMortgage = this.getMortgage;

            // only initialize the mort obj if it hasn't already been set.
            if(utils.isEmpty(localMortgage)){
                this.initMortData = new InitializeMortgageData();

                // api data should be available at the time this component loads.
                // Index.vue is waiting for it to comback before nav.
                this.initMortData.setMortgageDataFromApi(this.getPropertyApiData);
                this.$store.commit('updateMortgage', this.initMortData.getMortgageObj());
            }
            
            this.mortgage = this.getMortgage;
            this.mortgage.downpaymentMoney = this.getMortgage.downpayment;
            this.mortgage.downpaymentPercent = this.getMortgage.downpayment;
            this.isMoneyDownpayment = this.mortgage.isMoneyDownpayment != null ? this.mortgage.isMoneyDownpayment : false;
            this.isPercentDownpayment = this.mortgage.isPercentDownpayment != null ? this.mortgage.isPercentDownpayment : false;
            if(!this.isMoneyDownpayment && !this.isPercentDownpayment) this.isPercentDownpayment = true;
            this.mortgage.loanAmount = this.getLoanAmount();

            this.$store.commit("setProcessProperty", true);
        }
    }
</script>
<style scoped>
    #button1, #button2{
        display: inline-block;
    }
</style>