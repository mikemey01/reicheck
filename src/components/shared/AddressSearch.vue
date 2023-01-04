<template>
    <div>
        <auto-complete-material :list="addressListTextOnly" @gettingNewData="resetSecondAttempt" @address-selected="newAddressSelected" @go-click="getAddressObj"></auto-complete-material>
    </div>
</template>

<script>
    import AutoCompleteMaterial from './AutoCompleteMaterial'
    import parseAddress from 'parse-address';
    import axios from 'axios';

    export default{
        name: "AddressSearch",
        data: function(){
            return{
                addressInput: "",
                selectedAddress: "",
                secondAttempt: false
            }
        },
        components:{ 
            AutoCompleteMaterial
        },
        computed:{
            addressList(){
                let addresses = this.$store.state.addressSearchList;
                return addresses;
            },
            addressListTextOnly(){
                let list = [];
                this.addressList.map(item =>{
                    list.push(item.text);
                });
                return list;
            }
        },
        methods:{
            resetSecondAttempt(){
                this.secondAttempt = false;
            },
            getAddressObj(addressStr){

                var parsedAddress = parseAddress.parseLocation(addressStr);
                if(parsedAddress.street === "No"){
                    console.log("Couldn't parse the address..");
                    // pop a notification, let them enter their own data..
                    return;
                }

                let addressObj = this.createParsedAddress(parsedAddress);
                
                this.skipSmartyStreets(addressObj);
                
                // smartystreets call (turned off - lost api access)
                // this.cleanAddressApi(addressObj);
            },
            skipSmartyStreets(address){
                this.$store.commit('setAddressObj', address);
                this.$store.commit('updateAddressString', address.text);
                this.$emit('addressSearchFailed', address.text);
            },
            cleanAddressApi(address){
                this.$store.commit('setAddressFallBackObj', address);
                let addressOne = encodeURI(address.address.trim());
                let city = encodeURI(address.city.trim());
                let state = encodeURI(address.state.trim()); 
                let zip = encodeURI(address.zip.trim());
                let urlString = 'https://us-street.api.smartystreets.com/street-address?key=REMOVED';
                urlString += '&street='+addressOne;
                urlString += '&city='+city;
                urlString += '&state='+state;
                urlString += '&zip='+zip;
                urlString += '&candidates=5';
                axios({
                    method: 'get',
                    url: urlString
                })
                .then((response) => {
                    if(response.data.length > 0){
                        // build the response from the clean api call
                        let obj = response.data[0];
                        let parsedAddress = parseAddress.parseLocation(`${obj.delivery_line_1} ${obj.last_line}`);
                        let addressObj = this.createParsedAddress(parsedAddress);
                        this.addressSearchComplete(addressObj, address);
                    }else{
                        if(this.addressList.length > 0 && !this.secondAttempt){
                            this.secondAttempt = true;
                            this.newAddressSelected(this.addressList[0].name);
                        }else{
                            this.$store.commit('setAddressObj', address);
                            this.$store.commit('updateAddressString', address.text);
                            this.$emit('addressSearchFailed', address.text);
                        }
                    }
                    
                })
            },

            addressSearchComplete(address, fallback){
                this.$store.commit('setAddressObj', address);
                this.$store.commit('updateAddressString', address.text);
                this.$store.commit('setAddressFallBackObj', fallback);
                this.$store.commit('updateAddressStringFallback', fallback.text);
                
                this.$emit('addressSearchComplete', address.text);
            },
            newAddressSelected(selected){
                this.selectedAddress = selected
                var parsedAddress = parseAddress.parseLocation(selected);
                let addressObj = this.createParsedAddress(parsedAddress);
                this.cleanAddressApi(addressObj);
            },
            createParsedAddress(address){
                let addressNumber = address.number ? address.number : ''; 
                let addressPrefix = address.prefix ? ' ' + address.prefix : '';
                let addressStreet = address.street ? ' ' + address.street : '';
                let addressType = address.type ? ' ' + address.type : '';
                let addressSecUnitType = address.sec_unit_type ? ' ' + address.sec_unit_type : '';
                let addressSecUnitNum = address.sec_unit_num ? ' ' + address.sec_unit_num : '';
                let addressCity = address.city ? ' ' + address.city : '';
                let addressState = address.state ? ' ' + address.state : '';
                let addressZip = address.zip ? ' ' + address.zip : '';

                let addressObj = {
                    address: addressNumber + addressPrefix + addressStreet + addressType + addressSecUnitType + addressSecUnitNum,
                    city: addressCity.trim(),
                    state: addressState.trim(),
                    zip: addressZip.trim(),
                    text: addressNumber +
                          addressPrefix +
                          addressStreet +
                          addressType +
                          addressSecUnitType +
                          addressSecUnitNum +
                          addressCity +
                          addressState +
                          addressZip
                }

                return addressObj;
            }
        }
    }
</script>

