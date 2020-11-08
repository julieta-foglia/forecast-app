import React from 'react';
import { Card, CardTitle, Row } from 'reactstrap';

const ForecastCard = ({ forecastData }) => {
  return (
    <Row>
      {forecastData.list.map((day) => {
        return (
          <Card key={day.dt_txt}>
            <CardTitle>{day.dt_txt}</CardTitle>
            <h3>{parseFloat(day.main.temp).toFixed(1)} °C</h3>
            <span>{day.weather[0].description}</span>
          </Card>
        );
      })}
    </Row>
  );
};

export default ForecastCard;
