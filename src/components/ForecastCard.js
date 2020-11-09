import React from 'react';
import { Card, CardTitle, Row } from 'reactstrap';

const ForecastCard = ({ forecastData }) => {
  console.log(forecastData);
  return (
    <>
      <Row>
        <h4 className="margin-top">Pronóstico del Tiempo</h4>
      </Row>
      <Row>
        {forecastData.list.map((day) => {
          return (
            <Card key={day.dt_txt}>
              <CardTitle>{day.dt_txt}</CardTitle>
              <h3>{parseFloat(day.main.temp).toFixed(1)} °C</h3>
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
