<template>
    <div id="overview">
        <!-- loading spinner -->
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="true"></loading>

        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <rent-analysis :address="address"></rent-analysis>
                    </div>
                </div>

                <div>
                    <mortgage></mortgage>
                    <income-expense></income-expense>
                </div>

            </div>
        </div>
    </div>
</template>

<script type="text/babel">

import mortgage from '@/components/mortgage/Mortgage.vue';
import RentAnalysis from '@/components/rent/RentAnalysis.vue';
import IncomeExpense from '@/components/income-expense/IncomeExpense.vue';
import Loading from 'vue-loading-overlay';
import utils from '@/scripts/utilities/utils';
import 'vue-loading-overlay/dist/vue-loading.css';

export default{
    props: {
        address: {
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    components:{
        mortgage,
        RentAnalysis,
        IncomeExpense,
        Loading
    },
    data(){
        return{
            mortgage: {}
        }
    },
    computed:{
        addressObj(){
            return this.$store.state.addressObj;
        },
        isLoading(){
            return this.$store.state.isLoading;
        },
        hasMortgageData(){
            let mortgage = this.$store.state.mortgage;
            if(!utils.isEmpty(mortgage)){
                return true;
            }
            return false;
        }
    },
    methods:{

    },
    created(){
        this.$store.commit('setShowRunButton', true);
    }
}
</script>

<style scoped>

</style>