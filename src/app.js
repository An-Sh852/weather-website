const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geoCodefuncWithCallback = require('./utils/geocode')
const foreCastfuncWithCallback = require('./utils/forecast')

// Express is a function
const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirPath))


app.get('', (req,res) => {
  res.render('index', {
    name: 'Ananya Sharma'
  })
})
app.get('/about', (req,res) => {
  res.render('about', {
    name: 'Ananya Sharma'
  })
})
app.get('/help', (req,res) => {
  res.render('help', {
    name: 'Ananya Sharma'
  })
})


app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({error: 'recheck address'})
  }

  geoCodefuncWithCallback(req.query.address, (errorOfcallbackfunc, { latitude, longitude, location} = {})=>{
    if(errorOfcallbackfunc){
      return res.send({geocodeError:  errorOfcallbackfunc})
    }
  
    foreCastfuncWithCallback( longitude, latitude, (errorOfcallbackfunc, { temprature, feelslike, weather_descriptions } = {})=>{
     if(errorOfcallbackfunc){
      return res.send({forecastError: errorOfcallbackfunc})
    }

      res.send({
        temp: temprature,
        feelslike: feelslike,
        weatherDescription: weather_descriptions,
        location: location,
      })
    })
  })
  }
)






app.get('/help/*', (req,res)=>{
   res.render('error',{
    text: 'This is help -> error page',
    name: 'Ananya Sharma',
    error_msg: "This article can not be found"
   })
})
app.get('*', (req,res)=>{
 res.render('error',{
  text: 'This is error page',
  name: 'Ananya Sharma',
  error_msg: "My 404 page",
 })
})


app.listen(3000, ()=>{
  console.log("Server is up on port 3000")
})


