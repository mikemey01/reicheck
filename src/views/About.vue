<template>
    <div class="about re-text">
        <h5 class="display-4">Contact: mmeyer@reicheck.com</h5>
    </div>
</template>

<script>
    export default{
        created(){
            this.$store.commit('setShowRunButton', false);
        }
    }
</script>
