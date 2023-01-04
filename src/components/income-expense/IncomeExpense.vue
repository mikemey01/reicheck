<template>
    <div>
        <md-card class="mb-2">
            <md-card-header>
                
            </md-card-header>
            <md-card-content>

                <!-- new area -->
                <div class="row">
                    <div class="col-lg-6">
                        <!-- inputs -->
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- income/expense -->
                                <div class="md-title re-text">Income & Expense</div>
                                <form class="container">
                                    <md-field>
                                        <label>Monthly Rent</label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="incomeExpense.monthlyRent" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.monthlyRent.required">Monthly rent is required</span>
                                    </md-field>
                                    <md-field>
                                        <label>Monthly Other Income</label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="incomeExpense.monthlyOtherIncome" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.monthlyOtherIncome.required">Other income is required</span>
                                    </md-field>
                                    <md-field>
                                        <label>Vacancy Rate</label>
                                        <span class="md-prefix">%</span>
                                        <md-input type="number" step="0.01" v-model="incomeExpense.vacancyRate" @blur="recalcOnBlur" @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.vacancyRate.required">Vacancy rate is required</span>
                                    </md-field>
                                    <md-field>
                                        <label>Monthly Management Fee</label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="incomeExpense.monthlyManagementFee" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.monthlyManagementFee.required">Management fee is required</span>
                                    </md-field>
                                    <md-field>
                                        <label>Annual Property Tax</label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="incomeExpense.annualPropertyTax" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.annualPropertyTax.required">Property Tax is required</span>
                                    </md-field>
                                    <md-field>
                                        <label>Annual Insurance</label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="incomeExpense.annualInsurance" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.annualInsurance.required">Insurance is required</span>
                                    </md-field>
                                    <md-field>
                                        <label>Annual HOA Fee</label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="incomeExpense.annualHoaFee" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.annualHoaFee.required">Insurance is required</span>
                                    </md-field>
                                    <md-field>
                                        <label>Annual Maintenance</label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="incomeExpense.annualMaintenance" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.annualMaintenance.required">Insurance is required</span>
                                    </md-field>
                                    <md-field>
                                        <label>Annual Other Costs</label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="incomeExpense.annualOtherCosts" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                        <span class="md-helper-text" v-if="!$v.incomeExpense.annualOtherCosts.required">Insurance is required</span>
                                    </md-field>
                                </form>
                                
                            </div>
                            <div class="col-sm-6">
                                <!-- purchase/selling info -->
                                <div class="md-title re-text">Purchase & Selling</div>
                                <md-field>
                                    <label>Purchase Price</label>
                                    <span class="md-prefix">$</span>
                                    <md-input v-model="incomeExpense.purchasePrice" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.incomeExpense.purchasePrice.required">The purchase price is required</span>
                                </md-field>
                                <md-field>
                                    <label>Cost to Buy</label>
                                    <span class="md-prefix">$</span>
                                    <md-input v-model="incomeExpense.closingCosts" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.incomeExpense.closingCosts.required">Closing costs are required</span>
                                </md-field>
                                <md-field>
                                    <label>Needed Repairs</label>
                                    <span class="md-prefix">$</span>
                                    <md-input v-model="incomeExpense.neededRepairs" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.incomeExpense.neededRepairs.required">Needed repairs is required</span>
                                </md-field>
                                <md-field>
                                    <label>After Rehab Value</label>
                                    <span class="md-prefix">$</span>
                                    <md-input v-model="incomeExpense.afterRehabValue" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.incomeExpense.afterRehabValue.required">The after rehab value is required</span>
                                </md-field>
                                <md-field>
                                    <label>Annual Appreciation</label>
                                    <span class="md-prefix">%</span>
                                    <md-input type="number" step="0.01" @blur="recalcOnBlur" v-model="incomeExpense.annualAppreciation" @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.incomeExpense.annualAppreciation.required">Annual appreciation is required</span>
                                </md-field>
                                <md-field>
                                    <label>Years Held</label>
                                    <md-input v-model="incomeExpense.yearsHeld" @blur="recalcOnBlur" @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.incomeExpense.yearsHeld.required">Years held is required</span>
                                </md-field>
                                <md-field>
                                    <label>Cost To Sell</label>
                                    <span class="md-prefix">$</span>
                                    <md-input v-model="incomeExpense.costToSell" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                                    <span class="md-helper-text" v-if="!$v.incomeExpense.costToSell.required">Cost to sell is required</span>
                                </md-field>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        
                        <income-expense-results :incomeExpense="getIncomeExpenseData" :mortgageSchedules="getMortgageSchedules" :mortgageData="getMortgageData"></income-expense-results>

                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

    import { required } from 'vuelidate/lib/validators';
    //import utils from '@/scripts/utilities/utils';
    import { InitializeIncomeExpense } from '@/scripts/calculators/income-expense-calculator-init';
    import IncomeExpenseResults from '@/components/income-expense/IncomeExpenseResults'

    const LOCALE = 'en';
    const CURRENCY_TYPE = 'USD';

    export default{
        props:{

        },
        data(){
            return{
                incomeExpense: {},
                initIncomeExpense: {}
            }
        },
        components:{
            IncomeExpenseResults
        },
        computed:{
            getMortgageData(){
                return this.$store.state.mortgage;
            },
            getIncomeExpenseData(){
                let ie = this.$store.state.incomeExpense;
                return ie;
            },
            getMortgageSchedules(){
                return this.$store.state.mortgageSchedules;
            },
            processIncomeExpense(){
                return this.$store.state.processIncomeExpense;
            },
            rentalApiData(){
                return this.$store.state.rentalApiData;
            }

        },
        watch:{
            processIncomeExpense(newVal){
                if(newVal){
                    this.buildIncomeExpenseObj();
                    this.$store.commit('setProcessIncomeExpense', false);
                }
            },
            rentalApiData(newVal){
                if(!this.$utils.isEmpty(newVal)){
                    // if we have new rental data swap it in.
                    this.initIncomeExpense.setIncomeExpenseDataFromApi(newVal);
                    this.$store.commit('updateIncomeExpense', this.initIncomeExpense.getIncomeExpenseObj());
                    this.incomeExpense = this.getIncomeExpenseData;
                }
            }
        },
        validations:{
            incomeExpense:{
                purchasePrice:{
                    required
                },
                closingCosts:{
                    required
                },
                neededRepairs:{
                    required
                },
                afterRehabValue:{
                    required
                },
                annualAppreciation:{
                    required
                },
                yearsHeld:{
                    required
                },
                costToSell:{
                    required
                },
                monthlyRent:{
                    required
                },
                monthlyOtherIncome:{
                    required
                },
                vacancyRate:{
                    required
                },
                monthlyManagementFee:{
                    required
                },
                annualPropertyTax:{
                    required
                },
                annualInsurance:{
                    required
                },
                annualHoaFee:{
                    required
                },
                annualMaintenance:{
                    required
                },
                annualOtherCosts:{
                    required
                }
            }
        },
        methods:{
            recalcOnBlur(){
                this.$store.commit("setProcessProperty", true);
            },
            applyIncomeExpense(incomeExpenseObj){
                this.$store.commit('updateIncomeExpense', incomeExpenseObj);
            },
            buildIncomeExpenseObj(){
                if(this.$v.$invalid){
                    return;
                }

                let obj = {};
                obj.purchasePrice = this.$parseCurrency(this.incomeExpense.purchasePrice, LOCALE, CURRENCY_TYPE);
                obj.closingCosts = this.$parseCurrency(this.incomeExpense.closingCosts, LOCALE, CURRENCY_TYPE);
                obj.neededRepairs = this.$parseCurrency(this.incomeExpense.neededRepairs, LOCALE, CURRENCY_TYPE);
                obj.afterRehabValue = this.$parseCurrency(this.incomeExpense.afterRehabValue, LOCALE, CURRENCY_TYPE);
                obj.costToSell = this.$parseCurrency(this.incomeExpense.costToSell, LOCALE, CURRENCY_TYPE);
                obj.monthlyRent = this.$parseCurrency(this.incomeExpense.monthlyRent, LOCALE, CURRENCY_TYPE);
                obj.monthlyOtherIncome = this.$parseCurrency(this.incomeExpense.monthlyOtherIncome, LOCALE, CURRENCY_TYPE);
                obj.monthlyManagementFee = this.$parseCurrency(this.incomeExpense.monthlyManagementFee, LOCALE, CURRENCY_TYPE);
                obj.annualPropertyTax = this.$parseCurrency(this.incomeExpense.annualPropertyTax, LOCALE, CURRENCY_TYPE);
                obj.annualInsurance = this.$parseCurrency(this.incomeExpense.annualInsurance, LOCALE, CURRENCY_TYPE);
                obj.annualHoaFee = this.$parseCurrency(this.incomeExpense.annualHoaFee, LOCALE, CURRENCY_TYPE);
                obj.annualMaintenance = this.$parseCurrency(this.incomeExpense.annualMaintenance, LOCALE, CURRENCY_TYPE);
                obj.annualOtherCosts = this.$parseCurrency(this.incomeExpense.annualOtherCosts, LOCALE, CURRENCY_TYPE);
                obj.vacancyRate = Number(this.incomeExpense.vacancyRate);
                obj.annualAppreciation = Number(this.incomeExpense.annualAppreciation);
                obj.yearsHeld = Number(this.incomeExpense.yearsHeld);
                obj.valueAtSell = Number(this.incomeExpense.valueAtSell);
                this.applyIncomeExpense(obj);
            },
            initializeData(){
                let incomeExpense = this.getIncomeExpenseData;
                this.initIncomeExpense = new InitializeIncomeExpense(incomeExpense);
                let mortgage = this.getMortgageData;
                let homePrice = this.$parseCurrency(mortgage.homePrice, LOCALE, CURRENCY_TYPE);

                let annualPropertyTax = this.$parseCurrency(mortgage.annualPropertyTax, LOCALE, CURRENCY_TYPE);
                let annualInsurance = this.$parseCurrency(mortgage.annualInsurance, LOCALE, CURRENCY_TYPE);
                let annualHoaFee = this.$parseCurrency(mortgage.monthlyHoa, LOCALE, CURRENCY_TYPE)*12;
                
                let newMortgageObj = {
                    homePrice: homePrice,
                    annualPropertyTax: annualPropertyTax,
                    annualInsurance: annualInsurance,
                    annualHoaFee: annualHoaFee
                }

                this.initIncomeExpense.setMortgageData(newMortgageObj);

                // try to set the rental api data if it exists
                if(!this.$utils.isEmpty(this.rentalApiData)){
                    this.initIncomeExpense.setIncomeExpenseDataFromApi(this.rentalApiData);
                }
                this.$store.commit('updateIncomeExpense', this.initIncomeExpense.getIncomeExpenseObj());
                this.incomeExpense = this.getIncomeExpenseData;
            }
        },
        created(){
            this.initializeData();
            this.buildIncomeExpenseObj();
        }
    }
</script>

<style scoped>
    hr{
        margin: 1px;
    }
</style>