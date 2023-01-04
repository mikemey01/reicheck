<template>
    <div>


    </div>
</template>

<script>
    export default{
        computed:{
            details(){
                return this.$utils.getDeep(this.$store.state.propertyApiData, '[0]', {});
            },
            rentals(){
                return this.$store.state.rentalApiData;
            },
            assessments(){
                return this.$utils.getDeep(this.details, 'assessments[0]', {});
            },
            sales(){
                return this.$utils.getDeep(this.details, 'sales[0]', {});
            }
        },
        watch:{
            rentals(newVal){
                if(newVal){
                    // console.log(newVal);
                }
            }
        },
        created(){
            
        }
    }
</script>