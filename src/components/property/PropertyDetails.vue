<template>
    <div>

        <md-card class="mb-2">
            <md-card-content>
                
                <div class="row">
                        <div class="col-12 md-title re-text">
                            Property Details
                        </div>
                    </div>
                <br>
                <div class="container">
                    <div v-if="$utils.isEmpty(details)">
                        Could not find property details for address {{ enteredAddress }}
                    </div>
                    <div v-if="!$utils.isEmpty(details)">
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="re-text"><h5>House</h5></div>
                                <hr>
                                <div class="row">
                                    <div class="col-12  re-text">
                                        {{ fullAddressText }}
                                    </div>
                                </div>
                               
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Beds: {{ beds }}, Baths:  {{ baths }}, Sq. Ft: {{ totalSqFt }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                         {{ $utils.getDeep(structures, 'building_type', '') }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Year Built: {{ $utils.getDeep(structures, 'year_built', '') }}
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-lg-3">
                                <div class="re-text"><h5>Property</h5></div>
                                <hr>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Lot: {{ $utils.getDeep(details, 'parcel.size', '') }} Sq. Ft, {{ $utils.getDeep(details, 'parcel.acres', '') }} Acres
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Category: {{ $utils.getDeep(details, 'land_use.category', '') }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Classification: {{ $utils.getDeep(details, 'land_use.classification_code', '') }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Parking: {{ $utils.getDeep(structures, 'parking_type', '') }}
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-lg-3">
                                <div class="re-text"><h5>Value</h5></div>
                                <hr>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Estimated Value: <b>{{ $utils.getDeep(details, 'valuation.value', {}) | currencyFilter }}</b>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Forecasted Value: <b>{{ $utils.getDeep(details, 'valuation.forecast_1_year', {}) | currencyFilter }}</b>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Tax: {{ assessments.tax_amount | currencyFilter }} in {{ assessments.tax_year }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Last sold for {{ sales.price | currencyFilter }} on {{ sales.date }}
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-lg-3">
                                <div class="re-text"><h5>Rent</h5></div>
                                <hr>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Estimate: <b>{{ $utils.getDeep(rentals, 'rent', '0') | currencyFilter }}</b>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 re-text">
                                        Range: <b>{{ $utils.getDeep(rentals, 'rentRangeLow', '0') | currencyFilter }} - {{ $utils.getDeep(rentals, 'rentRangeHigh', '0') | currencyFilter }}</b>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>

                        

                    </div>
                </div>
            </md-card-content>
        </md-card>

        
        
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        computed:{
            enteredAddress(){
                return this.$store.state.addressObj.text || "";
            },
            details(){
                return this.$utils.getDeep(this.$store.state.propertyApiData, '[0]', {});
            },
            sales(){
                return this.$utils.getDeep(this.details, 'sales[0]', {});
            },
            assessments(){
                return this.$utils.getDeep(this.details, 'assessments[0]', {});
            },
            rentals(){
                return this.$store.state.rentalApiData;
            },
            beds(){
                let ubeds = this.$utils.getDeep(this.details, 'structure_totals.beds', 3);
                ubeds = ubeds == null ? this.$utils.getDeep(this.details, 'structures[0].beds_count', 3) : ubeds;
                return ubeds;
            },
            baths(){
                let ubaths = this.$utils.getDeep(this.details, 'structure_totals.baths', 3);
                ubaths = ubaths == null ? this.$utils.getDeep(this.details, 'structures[0].baths_count', 3) : ubaths;
                return ubaths;
            },
            structures(){
                return this.$utils.getDeep(this.details, 'structures[0]', {});
            },
            fullAddressText(){
                let address = this.$utils.getDeep(this.details, 'addresses[0]', {});
                return `${address.formatted_street_address}, ${address.city} ${address.state}`;
            },
            totalSqFt(){
                let struct = this.structures;
                if(!this.$utils.isEmpty(struct)){
                    let bsat = struct.basement_size == null ? 0 : struct.basement_size;
                    let up = struct.total_size == null ? 0 : struct.total_size;
                    return bsat + up;
                }

                return 0;
            }
        },
        created(){
            //console.log(this.details);
        }
    }
</script>

<style scoped>
    hr{
        margin-top: 5px;
        margin-bottom: 5px;
    }
</style>