<template>
  <div id="outer-container">
      <md-app md-waterfall md-mode="fixed">
        <md-app-toolbar class="md-primary">
          <div class="md-toolbar-section-start">

            <!--<span class="md-title pr-3">REI Check</span>-->
            <span class="ml-3"><run-button></run-button></span>
          </div>
          <div class="md-toolbar-seciton-end">
            <navigation></navigation>
          </div>
        </md-app-toolbar>
          <md-app-content class="content-container" :class="{ 'outer-container-image': isBackgroundSunrise}">
            <br>
            
              <div id="app" class="container">
                <router-view/>
              </div>
            
          </md-app-content>

      </md-app>
  </div>

</template>

<script>
  import Navigation from './components/shared/Navigation'
  import RunButton from './components/shared/RunButton'
  import logo from "@/assets/images/logo_transparent_white.svg";

  export default{
    data(){
      return{
        logo: logo
      }
    },
    components:{
      Navigation,
      RunButton
    },
    computed:{
      isBackgroundSunrise(){
        return this.$store.state.isBackgroundSunrise;
      }
    },
    created(){
      if(process.env.NODE_ENV === 'development'){
        this.$store.commit('setIsDev', true); //true: dev mode, false: prod moded
      }else{
        this.$store.commit('setIsDev', false);
      }
    }
  }
</script>



<style lang="scss">
html, body {
  height:100%;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
}

#outer-container .outer-container-image{
  background-image: radial-gradient(ellipse farthest-side at 0% 110%, #0b62a4 1%, #0b62a4 15%, #ffffff 100%);
}

#outer-container .md-app-content{
  
  background-color: #f5f8fd;
  padding: 0px;
}

#outer-container{
    height: 100%;
    display: flex;

}

.md-app {
  width: 100%;

}
.md-toolbar-section-start{
  max-height: 50px;
}
.md-app-scroller{
  background-color: #f5f8fd;
}
.svg-style-small{
      max-width: 80%;
  }


</style>
