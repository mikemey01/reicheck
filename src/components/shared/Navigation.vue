<template>
    <div>
        <div id="nav">
          <router-link to="/" class="custom-nav-link re-text">Home</router-link> &nbsp;
          <router-link to="/about" class="custom-nav-link re-text">About</router-link> &nbsp;
          <!--<a href="#" @click="clickLogin" id="popover-button-sync" class="custom-nav-link re-text">Login</a>-->
        </div>
        <div>
          <b-popover :show.sync="show" target="popover-button-sync" placement="bottomleft" title="Login">
            <input type="text" v-model="email" placeholder="email" class="form-control">
            <input type="text" v-model="password" placeholder="password" class="form-control mt-1">
            <div class="float-right">
              <button type="button" class="btn btn-sm btn-secondary mt-1 mb-1">Login</button>
              <button type="button" class="btn btn-sm btn-secondary ml-1 mt-1 mb-1">Sign up</button>
            </div>

          </b-popover>
        </div>
    </div>
</template>

<script>
    

    export default{
        data(){
            return{
                show: false,
                email: "",
                password: ""
            }
        },
        computed:{
            getAddress(){
                return this.$store.state.addressString
            }
        },
        methods:{
            clickLogin(){
                console.log("login"); 
            }
        }
    }
</script>

<style lang="scss">
    
    #nav {
        text-align: right;
        a {
            text-decoration: none;
            color: white;
            &.router-link-exact-active {
                color: rgba(255, 255, 255, .5);
            }
        }
        #mainAddress{
            text-align: left;
        }
        
    }
    #app .custom-nav-link{
        font-family: 'Roboto', sans-serif;;
        font-style: normal;
        font-weight: 400;
        color: white;
    }
</style>