<template>
    <div class="re-text">

        <div class="row">
            <div class="col-12">
                {{ rental.formattedAddress }}
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                Beds: {{ rental.bedrooms }}, Baths: {{ rental.bathrooms }}, Sq. Ft: {{ rental.squareFootage }}
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                Rent: <b>{{ rental.price | currencyFilter }}</b>
            </div>
        </div>
        <hr>

    </div>
</template>

<script>
    export default{
        props:{
            rental:{
                type: Object,
                default: function(){
                    return {};
                }
            }
        },
        created(){

        }
    }
</script>