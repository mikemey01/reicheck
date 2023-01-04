const axios = require("axios");

const homeJunctionLicense = "REMOVED";
const estatedToken = "REMOVED";
const estatedSandboxUrl = "https://sandbox.estated.com/property/v3";
const estatedProdUrl = "https://api.estated.com/property/v3";

// To test:
// navigate to c:\vue\re-app\functions
// run firebase serve
// point property.js calls to localhost instead of prod
// console.log response from api (will log to console)

let _propertyToken = null;
let _propertyId = null;
let _error = null;

/*
* HomeJunction Api calls
*/
async function propertyDataEntry(req, res) {
    
    const encodedAddress = req.query.address;
    const encodedCity = req.query.city;
    const encodedState = req.query.state;
    const encodedFullAddress = req.query.fulladdress;
    const addressObj = {
        address: encodedAddress,
        city: encodedCity,
        state: encodedState,
        fulladdress: encodedFullAddress
    }

    let token = "";
    let propId = "";

    if (encodedFullAddress === "" || encodedFullAddress === null){
        return returnUnsuccessful(req, res, "No address was submitted");
    }

    try{
        // 1. authenticate, get token
        const tokenObj = await authenticatePropertyData();
        if (tokenObj.data.success) {
            token = tokenObj.data.result.token;
        } else {
            return returnUnsuccessful(req, res, "Could not authenticate request to get token");
        }

        // 2. get property Id
        const propIdObj = await getPropertyId(token, encodedFullAddress);
        if(propIdObj.data.success){
            propId = propIdObj.data.result.record.id;
        }else{
            return returnUnsuccessful(req, res, `error getting property Id`);
        }

        // 3. get property and avmdata
        axios.all([getPropertyData(token, propId), getPropertyAvm(token, addressObj)])
        .then(axios.spread((prop, avm) => {
            const propResult = prop.data.result;
            const avmResult = avm.data.result;

            const returnObj = {
                propertyData: propResult,
                avmData: avmResult,
                listing: {}
            };

            //4. get listing data
            // todo: can't await inside a .then, need to make a promise instead
            // can't access for now until HJI allows it.
            // if (prop.data.result.hasOwnProperty('listing')){
            //     const listing = await getPropertyListing(propResult.listing.id, propResult.listing.market, token);
            //     returnObj.listing = listing.data.result;
            // }
            
            return res.json({
                success: true,
                data: returnObj,
                error: ""
            });
        }))
        .catch(err =>{
            return returnUnsuccessful(req, res, `Failed getting prop and avm data: ${err}`);
        });

        // return returnUnsuccessful(req, res, 'Failed getting prop and avm data');

    }catch(error){
        return returnUnsuccessful(req, res, `error getting data: ${error}`);
    }
    
}

async function authenticatePropertyData() {
    const token = await axios({
        type: "get",
        url: `https://slipstream-test.homejunction.com/ws/api/authenticate?license=${homeJunctionLicense}`
    });

    return token;
}

async function getPropertyId(token, encodedAddress) {
    const propIdObj = await axios({
        type: "get",
        url: `https://slipstream-test.homejunction.com/ws/public-records/resolve?address=${encodedAddress}`,
        headers:{
            "HJI-Slipstream-Token": token
        }
    });

    return propIdObj;
}

function getPropertyData(token, propId) {

    const propData = axios({
        type: "get",
        url: `https://slipstream-test.homejunction.com/ws/public-records/get?id=${propId}&withMLS=1`,
        headers:{
            "HJI-Slipstream-Token": token
        }
    });

    return propData;
}

function getPropertyAvm(token, addressObj){
    const avmData = axios({
        type: "get",
        url: `https://slipstream-test.homejunction.com/ws/avm?deliveryLine=${addressObj.address}&city=${addressObj.city}&state=${addressObj.state}`,
        headers:{
            "HJI-Slipstream-Token": token
        }
    });

    return avmData;
}

async function getPropertyListing(id, market, token){
    const listingData = await axios({
        type: "get",
        url: `https://slipstream-test.homejunction.com/ws/listings/get?market=${market}&id=${id}`,
        headers:{
            "HJI-Slipstream-Token": token
        }
    });

    return listingData;
}

/*
* Estated Api calls
*/
async function propertyDataEstated(req, res){
    const encodedAddress = req.query.address;
    const encodedCity = req.query.city;
    const encodedState = req.query.state;
    const encodedFullAddress = req.query.fulladdress;
    const addressObj = {
        address: encodedAddress,
        city: encodedCity,
        state: encodedState,
        fulladdress: encodedFullAddress
    }

    const propData = await getEstatedPropertyData(addressObj);
    console.log(propData.data);
    if(propData.data.success){
        return res.json({
            success: true,
            data: propData.data.properties,
            error: ""
        });
    }else{
        const returnMessage = propData.data.message || propData.data.codes;
        return returnUnsuccessful(req, res, returnMessage);
    }
}

async function getEstatedPropertyData(addressObj){
    const data = await axios({
        type: "get",
        url: `${estatedProdUrl}?token=${estatedToken}&address=${addressObj.address}&city=${addressObj.city}&state=${addressObj.state}`
    });
    
    return data;
}

function returnUnsuccessful(req, res, msg){
    return res.json({
        success: false,
        data: {},
        error: msg
    });
}

module.exports = {
    propertyDataEntry,
    propertyDataEstated
}