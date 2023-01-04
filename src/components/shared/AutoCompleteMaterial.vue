<template>
    <div>
        <div class="outer">
            <div class="full">
                <md-autocomplete v-model="selectedAddress" md-input-placeholder="123 Main St, Denver CO" :md-options="list" @md-selected="addressSelected" :md-open-on-focus="false" md-dense>
                    <label>Address</label>
                </md-autocomplete>
            </div>
            <md-button class="md-icon-button md-raised md-accent" @click="goClick">
                <md-icon>forward</md-icon>
            </md-button>
        </div>
        
    </div>
</template>

<script>
    import utils from "../../scripts/utilities/utils";

    export default{
        
        props:{
            list:{
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data(){
            return{
                selectedAddress: null,
                apiCalled: false,
                timerOn: true,
                lastKeyTime: null,
                keyHit: false
            }
        },
        computed:{
            isDev(){
                return this.$store.state.isDev;
            }
        },
        methods:{
            addressSelected(selected){
                this.$emit('address-selected', selected);
            },
            goClick(){
                if(this.isDev){
                    this.$emit('go-click', '9905 Ramshead Ct, Littleton CO');
                }
                
                if(utils.isNullUndefinedEmpty(this.selectedAddress)){
                    return;
                }
                this.$emit('go-click', this.selectedAddress);
            },
            getFreshData() {
                if (utils.isNullUndefinedEmpty(this.selectedAddress)){
                    this.startTimer();
                    return;
                }
                
                let currentTimer = new Date().getTime();
                let hasMetTimeLimit = (currentTimer - this.lastKeyTime) > 300;
                if(this.timerOn){
                    if(hasMetTimeLimit && this.keyHit){
                        this.keyHit = false; 
                        this.$store.dispatch("getAutoAddresses", this.selectedAddress.toLowerCase());
                        this.$emit('gettingNewData');
                    }
                    
                    this.startTimer();
                }
            },
            startTimer(){
                setTimeout(this.getFreshData, 300);
            },
            stopTimer(){
                this.timerOn = false;
            },
        },
        mounted() {

            // eslint-disable-next-line
            window.addEventListener("keypress", e => {
                this.lastKeyTime = new Date().getTime();
                this.timerOn = true;
                this.keyHit = true;
            });

            this.lastKeyTime = new Date().getTime();

            this.startTimer();

        },
        destroyed() {
            // eslint-disable-next-line
            window.removeEventListener("keypress", e => {

            });

            this.stopTimer();
        }
    }
</script>

<style scoped>
.outer {
  display: flex;
  align-items: baseline;
}

.full {
  flex: 1;
}
</style>