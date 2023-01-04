import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addressSearchList: [],
    addressString: "",
    addressStringFallback: "",
    addressObj: {},
    addressFallbackObj: {},
    mortgage: {},
    mortgageSchedules: {},
    incomeExpense: {},
    rental: {},
    processProperty: false,
    processIncomeExpense: false,
    showRunButton: false,
    isLoading: false,
    isRentalDataLoading: false,
    rentalApiData: {},
    isPropertyDataLoading: false,
    propertyApiData: {},
    isDev: false,
    isBackgroundSunrise: false,
  },
  mutations: {
    updateAddressSearch(state, payload){
      state.addressSearchList = payload;
    },
    updateIncomeExpense(state, payload){
        state.incomeExpense = payload;
    },
    updateAddressString(state, payload){
        state.addressString = payload;
    },
    updateAddressStringFallback(state, payload){
      state.addressStringFallback = payload;
    },
    setAddressObj(state, payload){
        state.addressObj = payload;
    },
    setAddressFallBackObj(state, payload){
      state.addressFallbackObj = payload;
    },
    updateMortgage(state, payload){
        state.mortgage = payload
    },
    updateMortgageSchedules(state, payload){
        state.mortgageSchedules = payload;
    },
    setProcessProperty(state, payload){
        state.processProperty = payload;
    },
    setProcessIncomeExpense(state, payload){
      state.processIncomeExpense = payload;
    },
    setShowRunButton(state, payload){
        state.showRunButton = payload;
    },
    setIsLoading(state, payload){
      state.isLoading = payload;
    },
    setIsPropertyDataLoading(state, payload){
      state.isPropertyDataLoading = payload;
    },
    setPropertyApiData(state, payload){
      state.propertyApiData = payload;
    },
    setRentalApiData(state, payload){
      state.rentalApiData = payload;
    },
    setIsRentalDataLoading(state, payload){
      state.isRentalDataLoading = payload;
    },
    setRental(state, payload){
      state.rental = payload;
    },
    setIsDev(state, payload){
      state.isDev = payload;
    },
    setIsBackgroundSunrise(state, payload){
      state.isBackgroundSunrise = payload;
    }
  },
  actions: {

    getAutoAddresses({ commit }, addressPrefix){
      addressPrefix = addressPrefix == null ? "123 main" : addressPrefix;
      axios({
        method: 'get',
        url: 'REMOVED'+addressPrefix
      })
      .then((response) =>{
          let suggestions = response.data.suggestions;
          if(!suggestions){
            return;
          }
          // START: map the id and text to id and name.
          suggestions.map((item, index) => {
            Vue.set(item, 'id', index);
            Vue.set(item, 'name', item.text);
          });

          commit('updateAddressSearch', suggestions);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    resetAddress({commit}){
        commit('updateAddressSearch', []);
        commit('updateAddressString', "");
        commit('setAddressObj', {});
        commit('setIsPropertyDataLoading', false);
        commit('setIsRentalDataLoading', false);
        commit('updateAddressSearch', []);
        commit('updateMortgage', {});
        commit('updateMortgageSchedules', {});
        commit('updateIncomeExpense', {});
    }
  }
  
})
