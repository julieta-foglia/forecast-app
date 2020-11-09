import React from 'react';
import { Card, CardTitle, Row } from 'reactstrap';
const options = {
  weekday: 'long',
};

const ForecastCard = ({ forecastData }) => {
  const getFormattedDate = (timestamp) => {
    const event = new Date(timestamp * 1000);
    return event.toLocaleDateString('es-ES', options);
  };

  return (
    <>
      <Row>
        <h4 className="margin-top">Pronóstico del Tiempo</h4>
      </Row>
      <Row className="justify-center">
        {forecastData.map((day) => {
          return (
            <Card key={day.dt}>
              <CardTitle>{getFormattedDate(day.dt)}</CardTitle>
              <h3>Min: {parseFloat(day.temp.min).toFixed(1)} °C</h3>
              <h3>Max: {parseFloat(day.temp.max).toFixed(1)} °C</h3>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              />
              <span>{day.weather[0].description}</span>
            </Card>
          );
        })}
      </Row>
    </>
  );
};

export default ForecastCard;
