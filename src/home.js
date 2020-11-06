import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const API_KEY  = 'd6048ea8be8ac8169eadd7eca605dc0f'

export default class Home extends Component {
    state = {
        currentLocation: '',
        weatherData: {},
        forecastData: {},
        isLoading: false,
    }

    isEmpty = (obj) => {
        return Object.keys(obj).length === 0
    }
    
    componentWillMount(){
        this.pruebaBack();
        this.getCurrentLocation();
    }

    pruebaBack = async () => {
        const response = await fetch('/current')
        const jsonRes = await response.json()
        console.log(jsonRes);
    }

    getCurrentLocation = async () => {
        const response = await fetch('/location')
        const jsonRes = await response.json()
        this.setState({ currentLocation: jsonRes.city}, () => this.getWeather(this.state.currentLocation));
    }

    getWeather = async (location) => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=es`)
        const weatherData = await response.json();
        this.setState({ weatherData });
    }

    getForecast = async (location) => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&lang=es&cnt=5&appid=${API_KEY}`)
        const forecastData = await response.json();
        this.setState({ forecastData });
    }

    render() {
        const { isLoading, currentLocation, weatherData } = this.state;
        return isLoading || this.isEmpty(weatherData) ? <Spinner color="primary" /> : (
            <>
            <span>{currentLocation}</span>
            <span>Temp: {weatherData.main.temp}</span>
            <span>ST: {weatherData.main.feels_like}</span>
            <span>Min: {weatherData.main.temp_min} - Max:  {weatherData.main.temp_max}</span>
            <span>{weatherData.weather[0].description}</span>
            </>
        );
    }
}