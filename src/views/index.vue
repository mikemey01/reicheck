<template>

    <div class="bg-image">
        <!-- loading spinner -->
        <loading :active="isLoading" 
        :can-cancel="true" 
        :is-full-page="true"></loading>

        <!-- couldn't find address dialog -->
        <md-dialog :md-active.sync="addressNotFound" :md-fullscreen="false">
            <md-dialog-title class="re-text">Address Not Found</md-dialog-title>
            <div class="container">
                <span class="re-text">
                    <p>
                        We couldn't find the address you searched for. 
                        Search again or you can continue to enter the property, mortgage, and rent details yourself.
                    </p>
                </span>
            </div>
            
            <md-dialog-actions>
                <md-button class="md-primary" @click="searchAgain">Search Again</md-button>
                <md-button class="md-primary" @click="continueAnyway">Continue Anyway</md-button>
            </md-dialog-actions>
        </md-dialog>
        <br>
        <br>
        <div class="row">
            <div class="col-lg-6">
                <div class="re-text d-none d-lg-block">
                    <img class="svg-style-small" :src="hero" alt="hero image" />
                </div>
            </div>
            <div class="col-lg-6">  
                <div class="re-text">
                    <h1 class="display-3">Check your deal</h1>

                    <h6 class="display-8 lead">Instant rental comps and investment analysis</h6>
                </div>
                <br>
                <address-search v-focus @addressSearchComplete="goToOverview" @addressSearchFailed="addressSearchFailed"></address-search>
            </div>
            
        </div>
        
        <br>
        <br>

        

    </div>
    
</template>

<script>
    
    import AddressSearch from '@/components/shared/AddressSearch.vue'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import PropertyDataApi from '@/scripts/api/property';
    import hero from "@/assets/images/pm_hero.svg";

    export default {
        name: 'home',
        data: function(){
            return{
                address: "",
                addressNotFound: false,
                propertyDataApi: {},
                secondAttempted: false,
                hero: hero
            }
        },
        components: {
            AddressSearch,
            Loading
        },
        computed:{
            addressList(){
                let addresses = this.$store.state.addressSearchList;
                return addresses;
            },
            addressObj(){
                return this.$store.state.addressObj;
            },
            isLoading(){
                return this.$store.state.isLoading;
            }
        },
        methods:{
            addressSearchFailed(address){
                if(!this.secondAttempted){
                    this.secondAttempted = true;
                    let fallbackAddress = this.$store.state.addressFallbackObj;
                    console.log(`fallback address: ${fallbackAddress}`);

                    if(fallbackAddress){
                        console.log(`trying fallback address: ${fallbackAddress}`);
                        this.callApi(fallbackAddress);
                        return;
                    }
                    
                }
                this.setIsLoading(false);
                this.address = address;
                // this.addressNotFound = true;
                // always continue so they can see the rent results at least
                this.continueAnyway();
            },
            searchAgain(){
                this.addressNotFound = false;
                this.$store.dispatch('resetAddress');
            },
            goToOverview(){
                // build encoded address for api
                const addressObj = this.$store.state.addressObj;

                // this is the old method that uses
                // the estated api
                // this.callApi(addressObj);
                this.skipToOverview(addressObj);
            },
            skipToOverview(addressObj){
                // go to overview.
                this.$router.push({
                    name: "overview",
                    params: {
                        address: addressObj
                    }
                });
            },

            // deprecated, no longer using Estated api
            callApi(address){
                console.log(address);
                this.setIsLoading(true);
                const encodedAddressObj = this.propertyDataApi.getEncodedAddressObj(address);

                // get property data
                new Promise((resolve, reject) => {
                    if(this.$store.state.isDev){
                        this.propertyDataApi.getTestEstatedPropertyData(encodedAddressObj, resolve, reject);
                    }else{
                        this.propertyDataApi.getPropertyData(encodedAddressObj, resolve, reject);
                    }
                }).then(response => {
                    if(response.data.success){
                        
                        this.$store.commit('setPropertyApiData', response.data.data);

                        // go to overview.
                        this.$router.push({
                            name: "overview",
                            params: {
                                address: address
                            }
                        });
                    }else{
                        // call "search failed"
                        console.log("api called failed:");
                        console.log(response.data);
                        this.addressSearchFailed(address);
                    }
                })
                .catch(err => console.log(err));
            },
            setIsLoading(state){
                this.$store.commit('setIsLoading', state);
            },
            continueAnyway(){
                this.addressNotFound = false;

                this.$router.push({
                    name: "overview",
                    params: {
                        address: this.address
                    }
                });
            }
        },
        created(){
            this.$store.commit('setShowRunButton', false);
            this.$store.commit('setIsBackgroundSunrise', true);
            this.$store.dispatch('resetAddress');
            this.propertyDataApi = new PropertyDataApi();
        },
        destroyed(){
            this.$store.commit('setIsBackgroundSunrise', false);
        }
    }
</script>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }

  .svg-style-small{
      max-width: 80%;
  }
  .bg-image {
        
    }
</style>