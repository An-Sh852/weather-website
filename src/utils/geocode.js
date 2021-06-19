const request = require('request')

//defining a function with callback as argument 
const geoCodefuncWithCallback = (address, callback) =>{
  const access_token = 'pk.eyJ1IjoiYW5hbnlhLXNoYXBpIiwiYSI6ImNrcGs5YXZmODNkMWYyd2xsYXc5eGx1bzEifQ.h06LPxdvxKU3-THVg6-NmQ'
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_token}`
  request ({url: geocodeURL, json: true}, (error, response) => {
    if (error){
      callback('this is error msg: unable to connect', undefined)
    }else if (response.body.features.length === 0){
      callback('this is error msg: invalid location ', undefined)
    }else{
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      })
    }
  })
}

module.exports = geoCodefuncWithCallback