/* Global Variables */
// const dotenv = require('dotenv');
// dotenv.config();



//geonames
const geoBaseUrl = 'http://api.geonames.org/searchJSON?q=';
const geoUser = '&username=boss1771';
//weatherbit
const weatherUrl = 'https://api.weatherbit.io/v2.0/current?city=';
const weatherKey = '&key=59b9d00dae004c9ea5f677b923f90f20'
//pixabay

const imgUrl = 'https://pixabay.com/api/?key=17204324-01a9e40fd2e28af9fa02bf1df&q='
const subUrl = '&image_type=photo'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate)

// Event listener to add function to existing HTML DOM element
// const cityName = document.getElementById('city').value;


document.getElementById('generate').addEventListener('click', performAction);

export function performAction(e) {
    const cityName = document.getElementById('city').value;

    // console.log(`url ${geoBaseUrl}${cityName}${geoUser}`)
    // console.log(`url ${weatherUrl}${cityName}${weatherKey}`)
    getLocalation(geoBaseUrl, cityName, geoUser)
        .then(function(data) {
            console.log(data)
            postData('http://localhost:8080/location', { destination: data.geonames[0].name, country: data.geonames[0].countryName })
        })
            .then(function(){
                getWeather(weatherUrl, cityName, weatherKey)
                .then(function(data) {
                    console.log(data)
                    postWeather('http://localhost:8080/weather', { temperature: data.data[0].temp, weatherInfo: data.data[0].weather.description, weatherPressure: data.data[0].pres})
                })
            })
                .then(function(){
                    getImages(imgUrl, cityName, subUrl)
                    .then(function(data) {
                        console.log(data)
                        postImage('http://localhost:8080/image', { largeImg: data.hits[0].largeImageURL})
                    })
                })
                    .then(function() {
                        updateUI()
                    })
   

}

const getLocalation = async(url, name, userkey) => {
    const res = await fetch(url + name + userkey)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('Error', error)
    }
}

const getWeather = async(url, name, userkey)=> {
    const res = await fetch(url+name+userkey)
    try {
        const data = await res.json();
        console.log(data)
        return data
    }catch (error) {
        console.log('Error', error)
    }
}

const getImages = async(url, name, subText) => {
    const res = await fetch(url + name + subText)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('Error', error)
    }
}

const postData = async(url = '', data = {}) => {
    const req = await fetch('http://localhost:8080/location', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await req.json()
        return newData
    } catch (error) {
        console.log('Error', error)
    }
}

const postWeather = async(url = '', data = {}) => {
    const req = await fetch('http://localhost:8080/weather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await req.json()
        return newData
    } catch (error) {
        console.log('Error', error)
    }
}


const postImage = async(url = '', data = {}) => {
    const req = await fetch('http://localhost:8080/image', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await req.json()
        return newData
    } catch (error) {
        console.log('Error', error)
    }
}

const updateUI = async() => {
    const req1 = await fetch('http://localhost:8080/geoData')
    const req2 = await fetch('http://localhost:8080/weatherData')
    const req3 = await fetch('http://localhost:8080/imageData')


    try {
        const geoData = await req1.json();
        const weatherData = await req2.json();
        const imageData = await req3.json();

        document.getElementById('destination').innerHTML = 'City: '+geoData.name
        document.getElementById('content').innerHTML = 'Country: '+geoData.countryName;
        document.getElementById('temperature').innerHTML = 'Temperature: '+weatherData.temp+'\u00B0'+'C';
        document.getElementById('weatherInfo').innerHTML = 'Info: '+weatherData.description;
        document.getElementById('weatherPres').innerHTML = 'Pressure: '+weatherData.pres;
        document.getElementById('image').innerHTML = `<img class="image__img" src=${imageData.largeImageURL} alt=${geoData.name}>`;

       

        console.log(weatherData)
        console.log(geoData)

    } catch (error) {
        console.log('Error', error)
    }
}