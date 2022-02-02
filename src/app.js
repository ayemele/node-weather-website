const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const hbs = require('hbs')
const { allowedNodeEnvironmentFlags } = require('process')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))



const app = express()

// Define paths for express config
const pathToPublic = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pathToPublic))



app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Chancelier Ayemele'
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Chancelier Ayemele'
    })
})


app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help Page!!!',
        name: 'Chancelier Ayemele',
        msg: 'Need Help???'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        //No address provided
        return res.send({
            error: 'An address must be provided!'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError){
                return res.send({
                    err: forecastError
                })
            }
            res.send({
                forecast:  forecastData,
                location,
                Location: address
            })
          })
    })

})


app.get('/products', (req, res)=>{
if(!req.query.search){
    return res.send({
        error: 'You must provide a search term'
    })
}

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Didi Ayemel',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Didi Ayemel',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})