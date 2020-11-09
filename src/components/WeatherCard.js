import React from 'react';
import { Col, Row, Card } from 'reactstrap';

const WeatherCard = ({ currentLocation, weatherData }) => {
  return (
    <Card>
      <Col className="justify-center align-self-center no-margin-bottom">
        <h1>{currentLocation.city}</h1>
        <h5>{currentLocation.country}</h5>
      </Col>
      <Row>
        <Col className="no-margin-top">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
          <h5 className="margin-bottom">
            {weatherData.weather[0].description}
          </h5>
          <h1>{parseFloat(weatherData.temp).toFixed(1)} °C</h1>
          <h5>ST: {parseFloat(weatherData.feels_like).toFixed(1)} °C</h5>
        </Col>
      </Row>
    </Card>
  );
};

export default WeatherCard;
