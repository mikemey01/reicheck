const axios = require("axios");
const xRapidHost = "realtymole-rental-estimate-v1.p.rapidapi.com";
const xRapidKey = "REMOVED";

function getRentalData(req, res){
    let address = req.query.address;
    //let beds = req.query.bedrooms;
    //let baths = req.query.bathrooms;
    //let propertyType = req.query.propertyType
    //let sqft = req.query.squareFootage;
    let comps = req.query.compCount;
    
    return axios({
        method: 'get',
        url: `https://realtymole-rental-estimate-v1.p.rapidapi.com/rentalPrice?address=${address}&compCount=${comps}`,
        headers: {
            "X-RapidAPI-Host": xRapidHost,
            "X-RapidAPI-Key": xRapidKey
        }
    })
    .then((response) => {
        console.log(response);
        return res.json({
            success: true,
            rental: response.data,
            error: null
        });
    }).catch(err => {
        console.log(err);
        return res.json({
            success: false,
            rental: null,
            error: err
        })
    });
}

function getTest(req, res) {
    return res.json({
        success: true,
        data: { hello: 'from reicheck' }
    });
}

module.exports = {
    getTest,
    getRentalData
}