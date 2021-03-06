const express = require('express');
const request = require('request');
const app = express();
const fetch = require('node-fetch');
var cors = require('cors');
const API_KEY = 'd6048ea8be8ac8169eadd7eca605dc0f';
const CITIES_DATA = require('./citiesData');

app.use(cors());
const port = process.env.PORT || 5000;

/* Ruta base
/v1
Endpoints
*/

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

/* /location
Devuelve los datos de ubicación city según ip-api. */
app.get('/location', (req, res) => {
  request(
    'http://ip-api.com/json/?fields=status,message,city,country,lat,lon',
    function (error, response, body) {
      const obj = JSON.parse(body);
      res.send({
        city: obj.city,
        country: obj.country,
        lat: obj.lat,
        lon: obj.lon,
      });
    }
  );
});

app.get('/cities', (_, res) => {
  res.send({ cities: CITIES_DATA });
});

/* /current[/city]
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
ip-api y el estado del tiempo actual. */
app.get('/current/:city?', async (req, res) => {
  const city = req.params.city;

  if (city) {
    const [filter] = CITIES_DATA.filter((item) => item.city === city);
    const weatherDataRes = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${filter.lat}&lon=${filter.lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}&units=metric&lang=es`
    );
    const weatherData = await weatherDataRes.json();
    res.send({ weatherData });
  } else {
    const response = await fetch('http://localhost:5000/location');
    const location = await response.json();
    const weatherDataRes = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}&units=metric&lang=es`
    );
    const weatherData = await weatherDataRes.json();
    res.send({ weatherData });
  }
});

/* /forecast[/city]
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
ip-api y el estado del tiempo a 5 días */
app.get('/forecast/:city?', async (req, res) => {
  const city = req.params.city;

  if (city) {
    const [filter] = CITIES_DATA.filter((item) => item.city === city);
    const forecastDataRes = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${filter.lat}&lon=${filter.lon}&exclude=minutely,hourly,current,alerts&appid=${API_KEY}&units=metric&lang=es`
    );
    const forecastData = await forecastDataRes.json();
    res.send({ forecastData });
  } else {
    const response = await fetch('http://localhost:5000/location');
    const location = await response.json();
    const forecastDataRes = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,current,alerts&appid=${API_KEY}&units=metric&lang=es`
    );
    const forecastData = await forecastDataRes.json();
    res.send({ forecastData });
  }
});
