const request = require('request')

//defining
const foreCastfuncWithCallback = (long, lati, callback) => {
  const access_key = '22a69dc6407ce58e1c665f382f4638c6'
  const forecastURL = `http://api.weatherstack.com/current?access_key=${access_key}&query=${lati},${long}`
  request({url: forecastURL, json: true}, (error, response) => {
    if (error){
      callback('Unable to connect', undefined)
    }else if (response.body.error){
      callback(`Unable to find location`, undefined)
    }else{
      callback(undefined, {
        feelslike: response.body.current.feelslike,
        temprature: response.body.current.temperature,
        weather_descriptions: response.body.current.weather_descriptions,
        humidity: response.body.current.humidity,
        precip: response.body.current.precip
      })
    }
  })
}

module.exports = foreCastfuncWithCallback