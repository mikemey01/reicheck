<template>
    <div>
        <md-button v-if="shouldShow" class="md-dense md-raised md-accent" @click="processProperty" id="fixedbutton">Re-run Calcs</md-button>
    </div>
</template>

<script>
    export default{
        computed:{
            shouldShow(){
                return this.$store.state.showRunButton;
            }
        },
        methods:{
            processProperty(){
                this.$store.commit("setProcessProperty", true);
                this.$store.commit("setProcessIncomeExpense", true);
            }
        }
    }
</script>

