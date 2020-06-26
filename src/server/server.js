// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder

app.use(express.static('dist'))

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

const port = 8080;
app.listen(port, listening);
// Setup Server
function listening() {
    console.log(`running on localhost: ${port}`);
}

app.get('/geoData', function(req, res) {
    res.send(projectData)
})

app.get('/weatherData', function(req, res) {
    res.send(projectData)
})

app.get('/imageData', function(req, res) {
    res.send(projectData)
})


app.post('/location', addLocation)
app.post('/weather', addWeather)
app.post('/image', addImage)


function addLocation(req, res) {
    projectData.name = req.body.destination;
    projectData.countryName = req.body.country;
    res.end();
    console.log(projectData)
}

function addWeather(req, res) {
    projectData.temp = req.body.temperature;
    projectData.description = req.body.weatherInfo;
    projectData.pres = req.body.weatherPressure;
    res.end();
    console.log(projectData)
}

function addImage(req, res) {
    projectData.largeImageURL = req.body.largeImg;
    res.end();
    console.log(projectData)
}