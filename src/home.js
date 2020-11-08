import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { WeatherCard, ForecastCard, SearchBar } from './components';
import Api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component {
    state = {
        currentLocation: '',
        weatherData: {},
        forecastData: {},
        isLoading: false,
        message: '',
    }

    isEmpty = (obj) => {
        return Object.keys(obj).length === 0
    }
    
    componentDidMount(){
        this.getCurrentLocation();
        this.getWeather();
        this.getForecast();
    }

    getCurrentLocation = async () => {
        const response = await Api.getFetch('/location');
        this.setState({ currentLocation: response.city});
    }

    getWeather = async () => {
        const {weatherData} = await Api.getFetch('/current')
        this.setState({ weatherData });
    }

    getForecast = async () => {
        const {forecastData} = await Api.getFetch(`/forecast`)
        this.setState({ forecastData });
    }

    changeLocation = async (currentLocation) => {
        this.setState({ isLoading: true })
        const { weatherData } = await Api.getFetch(`/current/${currentLocation}`)
        const { forecastData } = await Api.getFetch(`/forecast/${currentLocation}`)
        this.setState({ weatherData, forecastData, currentLocation, isLoading: false, message: weatherData.message });
    }

    render() {
        const { isLoading, currentLocation, weatherData, forecastData, message } = this.state;

        return isLoading || this.isEmpty(weatherData) || this.isEmpty(forecastData) ? <Spinner color="primary" /> : (
            <div className="container">
                <SearchBar changeLocation={this.changeLocation} />
                {message && <h2>Ciudad no encontrada!</h2>}
                {!message && 
                <>
                <WeatherCard currentLocation={currentLocation} weatherData={weatherData}/>
                <ForecastCard forecastData={forecastData} />
                </>
                }
            </div>
        );
    }
}