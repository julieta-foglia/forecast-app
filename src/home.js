import React, { Component } from 'react';
import { Spinner, Card, CardTitle, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    
    componentDidMount(){
        this.getCurrentLocation();
        this.getWeather();
        this.getForecast();
    }

    getCurrentLocation = async () => {
        const response = await fetch('/location')
        const jsonRes = await response.json()
        this.setState({ currentLocation: jsonRes.city});
    }

    getWeather = async () => {
        const response = await fetch('/current')
        const {weatherData} = await response.json()
        this.setState({ weatherData });
    }

    getForecast = async () => {
        const response = await fetch(`/forecast`)
        const {forecastData} = await response.json();
        console.log(forecastData);
        this.setState({ forecastData });
    }

    render() {
        const { isLoading, currentLocation, weatherData, forecastData } = this.state;
        console.log(forecastData);

        return isLoading || this.isEmpty(weatherData) ? <Spinner color="primary" /> : (
            <div className="container">
                <Row>
                        <h1>{currentLocation}</h1>
                            <span>Temp: {weatherData.main.temp}</span>
                            <span>ST: {weatherData.main.feels_like}</span>
                            <span>Min: {weatherData.main.temp_min} - Max:  {weatherData.main.temp_max}</span>
                            <span>{weatherData.weather[0].description}</span>
                </Row>
                <Row>
                {forecastData.list.map(day => {
                    return(
                        <Card>
                        <CardTitle>{day.dt_txt}</CardTitle>
                            <span>Temp: {day.main.temp}</span>
                            <span>ST: {day.main.feels_like}</span>
                            <span>Min: {day.main.temp_min} - Max:  {day.main.temp_max}</span>
                            <span>{day.weather[0].description}</span>
                        </Card>
                    );
                })}
                </Row>
            </div>
        );
    }
}