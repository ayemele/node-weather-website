const request = require('request')

const geocode =(address, callback)=>{
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const access_token = '.json?access_token=pk.eyJ1IjoiYXllbWUwMDQiLCJhIjoiY2t2OGFmbHprMDJ0NzJucGoyMmI4Mm8yZiJ9.iS0EMcDKs27FjnlGKHLGtA'
    const url = baseUrl + encodeURIComponent(address) + access_token

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to location services. Try again later!!!', undefined)
        }else if(response.body.features.length ===0){
            callback('Unable to find Coordinatses. Try another search!!!', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[1].center[1],
                longitude: response.body.features[1].center[0],
                location: response.body.features[1].place_name
            })
        }
    })

}


//The following is a call to the function geocode

// geocode('Yaounde Cameroon', (error, data)=>{
//     console.log("Error", error)
//     console.log("Data", data)
// })



module.exports = geocode