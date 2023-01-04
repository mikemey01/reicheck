
import Vue from 'vue'
import App from './App.vue'
import router from './scripts/app/router'
import store from './scripts/app/store'

// material design for the web
import { MdField, MdCard, MdButton, MdAutocomplete, MdMenu, MdList, MdDialog, MdApp, MdToolbar, MdContent } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

//vue-currency-input
import VueCurrencyInput from 'vue-currency-input'

//vuelidate
import Vuelidate from 'vuelidate'

//styles
import bootstrapVue from 'bootstrap-vue'
import './scripts/app/firebase'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/custom.scss'
import './assets/styles/vue-material.scss'
import 'font-awesome/css/font-awesome.css'

// css doodle
import 'css-doodle';

//utils
import utils from '@/scripts/utilities/utils';

const utilsPlugin = {
  install(){
    Vue.utils = utils;
    Vue.prototype.$utils = utils;
  }
}

// currency filter
Vue.filter('currencyFilter', function(value){
  if (!value) return utils.formatAsCurrency(0);
  return utils.formatAsCurrency(value);
});

// focus directive
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
});

Vue.use(bootstrapVue);
Vue.use(MdField);
Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdAutocomplete);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdDialog);
Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdContent);
Vue.use(Vuelidate);
Vue.use(utilsPlugin);
Vue.use(VueCurrencyInput, {
  globalOptions: {
    currency: {prefix: ''},
    locale: 'en',
    distractionFree: false,

  },
  
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
