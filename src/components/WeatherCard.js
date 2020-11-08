import React from 'react';
import { Col, Row } from 'reactstrap';

const WeatherCard = ({ currentLocation, weatherData}) => {
    return(
        <Row>
                        <h1>{currentLocation}</h1>
                        <Col>
                            <Row>Temp: {weatherData.main.temp}</Row>
                            <Row>ST: {weatherData.main.feels_like}</Row>
                            <Row>Min: {weatherData.main.temp_min} - Max:  {weatherData.main.temp_max}</Row>
                            <Row>{weatherData.weather[0].description}</Row>
                        </Col>
        </Row>
    );
}

export default WeatherCard;