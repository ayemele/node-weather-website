const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const options ={
        json: true,
        method: 'GET',
        url: 'https://api.ambeedata.com/weather/latest/by-lat-lng',
        qs: {lat: latitude, lng: longitude},
        headers: {'x-api-key': 'f4468e746d0f9a0a1cd0634ff0f5b755735190357f3b7e6f4716862f516fe32a', 'Content-type': 'application/json'}
    }


    request(options, (error, response, body)=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else{
            const currentTemp = body.data.temperature
            const feelslike = body.data.apparentTemperature
            const weather_desc = body.data.summary

        callback(undefined,`${weather_desc}: It is currently ${currentTemp} degrees out. It feels like ${feelslike} degrees out.`)
        }
    })

}




module.exports = forecast