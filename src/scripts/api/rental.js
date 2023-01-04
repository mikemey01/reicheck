import axios from 'axios';
import utils from '@/scripts/utilities/utils'

export default class RentalPropertyApi{
    response = {};
    error = {};
    markers = [];

    getTestRentalPropertyData(apiData, resolve){
        const subjectPropLatLong = this.getSubjectPropertyLatLong(apiData);
        setTimeout(() =>{
            axios.get('./test-rental-data.json')
            .then((res) => {
                this.response = res.data;
                this.setMarkers(res.data, subjectPropLatLong);
                resolve(res.data);
            }).catch((err) => {
                this.error = err;
            }).finally(() => {
                
            });
        }, 1000)
        
    }

    getRentalPropertyData(addressObj, resolve, reject){
        if (!addressObj) return;
        // const subjectPropLatLong = this.getSubjectPropertyLatLong(addressObj);
        let data = this.formatRentalApiRequestObj(addressObj);

        axios({
            method: 'get',
            url: `https://us-central1-re-app-606bc.cloudfunctions.net/api/rentaldata?address=${data.address}&compCount=5`
        })
        .then((res) => {
            console.log(res);
            let subjectPropLatLong = this.getSubjectPropLL(res.data);
            this.response = res.data.rental;
            this.setMarkers(res.data.rental, subjectPropLatLong);
            resolve(res.data.rental);
        }).catch(err => {
            console.log(err);
            this.error = err;
            reject(err);
        }).finally(() => {
            
        });
    }

    getSubjectPropLL(data){
        let lat = utils.getDeep(data, 'rental.latitude', 0);
        let long = utils.getDeep(data, 'rental.longitude', 0);

        return {
            latitude: lat,
            longitude: long
        }
    }

    getSubjectPropertyLatLong(addressObj){
        // let lat = utils.getDeep(apiData, 'geocoding.street.latitude', 0);
        // let long = utils.getDeep(apiData, 'geocoding.street.longitude', 0);

        // if(lat == null){
        //     lat = utils.getDeep(apiData, 'geocoding.rooftop.latitude', 0);
        // }

        // if(long == null){
        //     long = utils.getDeep(apiData, 'geocoding.rooftop.longitude', 0);
        // }

        return {
            latitude: null,
            longitude: null
        };
    }

    formatRentalApiRequestObj(addressObj){
        // let uAddress = utils.getDeep(apiData, 'addresses[0].formatted_street_address', null);
        // let uCity = utils.getDeep(apiData, 'addresses[0].city', null);
        // let uState = utils.getDeep(apiData, 'addresses[0].state', null);
        // if(uAddress === null || uCity === null || uState === null) return {};
        // let uFullAddress = `${uAddress}, ${uCity} ${uState}`;

        // let ubeds = utils.getDeep(apiData, 'structure_totals.beds', 3);
        // ubeds = ubeds == null ? utils.getDeep(apiData, 'structures[0].beds_count', 3) : ubeds;

        // let ubaths = utils.getDeep(apiData, 'structure_totals.baths', 2);
        // ubaths = ubaths == null ? utils.getDeep(apiData, 'structures[0].baths_count', 2) : ubaths;

        // let usqft = utils.getDeep(apiData, 'structure_totals.sqft', 2600);
        // usqft = usqft == null ? utils.getDeep(apiData, 'structures[0].total_size', 2600) : usqft;

        let address = encodeURI(addressObj.text);
        let beds = null;
        let baths = null;
        let sqft = null;
        let compCount = 5;
        let propertyType = null;

        let obj = {
            address: address,
            beds: beds,
            baths: baths,
            sqft: sqft,
            compCount: compCount,
            propertyType: propertyType
        }

        return obj;
    }

    testFunctionApi(){
        axios({
            method: 'get',
            url: 'https://us-central1-re-app-606bc.cloudfunctions.net/api/test'
        })
        .then((res) =>{
            console.log(res);
        }).catch(err =>{
            console.log(err);
        });
    }

    setMarkers(data, subjectProp){
        if(!data || !data.listings) return;

        let arr = [];
        data.listings.map(item => {

            let obj = {
                position: {
                    lat: item.latitude,
                    lng: item.longitude,
                    rent: item.price || 0,
                    isSubjectProp: false
                }
            };
            arr.push(obj);
        });

        //set the subject property pin
        if(+subjectProp.latitude != 0 && +subjectProp.longitude != 0){ // + casts to number (null == 0 here)
            let subPropObj = {
                position: {
                    lat: subjectProp.latitude,
                    lng: subjectProp.longitude,
                    isSubjectProp: true
                }
            }
            arr.push(subPropObj);
        }
        
        this.markers = arr;
    }
}