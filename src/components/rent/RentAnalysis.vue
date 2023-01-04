<template>
    <div>
        <loading :active.sync="$store.state.isRentalDataLoading" :is-full-page="false"></loading>
        <md-card class="mb-2">
            <md-card-content>
                <div class="row">
                    <div class="col-12 md-title re-text">
                        Rent Analysis
                    </div>
                </div>

                <br>

                <div class="row">
                    <div class="col-lg-5">
                        <div class="container">
                            <div v-for="(listing, index) in rentalListings" v-bind:key="index">
                                <rental-listing :rental="listing"></rental-listing>
                            </div>
                            <div v-if="$utils.isEmpty(rentalListings)">
                                Could not find rental listings for address {{ enteredAddress }}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7" v-if="!$utils.isEmpty(rentalListings)">
                        <rent-map :markers="rentalMarkers"></rent-map>
                    </div>
                </div>
            </md-card-content>
        </md-card>
        
    </div>
</template>

<script>

    import RentalPropertyApi from '@/scripts/api/rental';
    import RentalListing from '@/components/rent/RentalListing';
    import RentMap from '@/components/rent/RentMap';
    import utils from '@/scripts/utilities/utils';
    import Loading from 'vue-loading-overlay';

    export default{
        props:{
            address: {
                type: Object,
                default: function(){
                    return {}
                }
            }
        },
        data(){
            return{
                rentalApi: {},
                isDev: true
            }
        },
        components:{
            RentalListing,
            RentMap,
            Loading
        },
        computed:{
            enteredAddress(){
                return this.$store.state.addressObj.text;
            },
            getTestRentalData(){
                
                return this.rentalApi.response;
            },
            rentalListings(){
                if(this.rentalApi.response.listings){
                    return this.rentalApi.response.listings;
                }
                return [];
            },
            rentalMarkers(){
                if(utils.isEmpty(this.rentalApi.markers)) return;

                return this.rentalApi.markers;
            }
        },
        methods:{
            getRentalDataComps(){

                this.$store.commit('setIsRentalDataLoading', true);

                new Promise((resolve, reject)=>{
                    if(this.$store.state.isDev){
                        this.rentalApi.getTestRentalPropertyData(this.address, resolve);
                    }else{
                        this.rentalApi.getRentalPropertyData(this.address, resolve, reject);
                    }
                }).then(data =>{
                    this.$store.commit('setIsRentalDataLoading', false);
                    this.$store.commit('setRentalApiData', data);
                }).catch(err =>{
                    console.log(err);
                })
            }
        },
        created(){
            this.rentalApi = new RentalPropertyApi();
            this.getRentalDataComps();
        },
        mounted(){

        }
    }
</script>