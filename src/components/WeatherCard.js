import React from 'react';
import { Col, Row } from 'reactstrap';

const WeatherCard = ({ currentLocation, weatherData }) => {
  return (
    <div>
      <Row className="justify-center">
        <h1>{currentLocation}</h1>
      </Row>
      <Row>
        <Col>
          <h2>{parseFloat(weatherData.main.temp).toFixed(1)} °C</h2>
          <h5>ST: {parseFloat(weatherData.main.feels_like).toFixed(1)} °C</h5>
          <h5>
            Min: {parseFloat(weatherData.main.temp_min).toFixed(1)} °C - Max:{' '}
            {parseFloat(weatherData.main.temp_max).toFixed(1)} °C
          </h5>
          <h5>{weatherData.weather[0].description}</h5>
        </Col>
      </Row>
    </div>
  );
};

export default WeatherCard;
