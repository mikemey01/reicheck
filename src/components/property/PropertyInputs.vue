<template>
    <md-card class="mb-2">
        <md-card-content>
            <div class="row">
                <div class="col-12 md-title re-text">
                    Property Info
                </div>
            </div>
            <br>
            <div class="container">
                <md-field>
                    <label>Purchase Price</label>
                    <span class="md-prefix">$</span>
                    <md-input v-model="purchasePrice" @blur="recalcOnBlur" v-currency @click.native="$event.target.select()"></md-input>
                </md-field>
            </div>
        </md-card-content>
    </md-card>
</template>

<script>

    const LOCALE = 'en';
    const CURRENCY_TYPE = 'USD';


    export default{

        

        data(){
            return{
                purchasePrice: 111
            }
        },
        computed:{
            getMortgage(){
                return this.$store.state.mortgage;
            }
        },
        created(){

        },
        methods:{
            recalcOnBlur(){
                let mortgage = this.getMortgage;
                mortgage.homePrice = this.$parseCurrency(this.purchasePrice, LOCALE, CURRENCY_TYPE);
                this.$store.commit('updateMortgage', mortgage);
                console.log(mortgage);
                // this.$store.commit("setProcessProperty", true);
            }
        }
    }
</script>