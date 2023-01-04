import axios from 'axios';
import utils from '@/scripts/utilities/utils';

export default class PropertyDataApi{
    response = {};
    error = {};

    prodUrl = "https://us-central1-re-app-606bc.cloudfunctions.net/api";
    localUrl = "http://localhost:5001/re-app-606bc/us-central1/api";

    getPropertyData(addressObj, resolve, reject){
        if (utils.isEmpty(addressObj)) return {};

        axios({
            type: "get",
            url: `${this.prodUrl}/propertydata?address=${addressObj.address}&city=${addressObj.city}&state=${addressObj.state}&fulladdress=${addressObj.fulladdress}`,
        }).then(response =>{
            resolve(response);
            console.log(response);
        }).catch(error =>{
            console.log(error);
            reject(error);
        });
    }

    getTestEstatedPropertyData(addressObj, resolve, reject){
        setTimeout(() => {
            axios.get('./test-estated-property-data.json')
                .then((res) => {
                    this.response = res.data;
                }).catch((err) => {
                    this.error = err;
                    reject(err);
                }).finally(() => {
                    resolve(this.response);
                });
        }, 1000)
    }

    getTestPropertyData(addressObj, resolve){
        setTimeout(() => {
            axios.get('./test-property-data.json')
                .then((res) => {
                    this.response = res.data;
                }).catch((err) => {
                    this.error = err;
                }).finally(() => {
                    resolve(this.response);
                });
        }, 1000)
    }

    getEncodedAddressObj(addressObj){
        const encodedAddress = encodeURI(addressObj.address);
        const encodedCity = encodeURI(addressObj.city);
        const encodedState = encodeURI(addressObj.state);
        const encodedFullAddress = encodeURI(addressObj.text);

        const encodedAddressObj = {
            address: encodedAddress,
            city: encodedCity,
            state: encodedState,
            fulladdress: encodedFullAddress
        };

        return encodedAddressObj;
    }
}