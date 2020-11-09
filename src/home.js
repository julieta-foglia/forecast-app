import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { WeatherCard, ForecastCard, SearchBar } from './components';
import Api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component {
  state = {
    currentLocation: {},
    weatherData: {},
    forecastData: {},
    isLoading: false,
    message: '',
  };

  isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  componentDidMount() {
    this.getCurrentLocation();
    this.getWeather();
    this.getForecast();
  }

  getCurrentLocation = async () => {
    const response = await Api.getFetch('/location');
    this.setState({
      currentLocation: { city: response.city, country: response.country },
    });
  };

  getWeather = async () => {
    const { weatherData } = await Api.getFetch('/current');
    const { current } = weatherData;
    this.setState({ weatherData: current });
  };

  getForecast = async () => {
    const { forecastData } = await Api.getFetch(`/forecast`);
    this.setState({ forecastData });
  };

  changeLocation = async ({ city, country }) => {
    this.setState({ isLoading: true });
    const { weatherData } = await Api.getFetch(`/current/${city}`);
    const { forecastData } = await Api.getFetch(`/forecast/${city}`);
    this.setState({
      weatherData,
      forecastData,
      currentLocation: {
        city: city,
        country: country || weatherData.sys.country,
      },
      isLoading: false,
      message: weatherData.message,
    });
  };

  render() {
    const {
      isLoading,
      currentLocation,
      weatherData,
      forecastData,
      message,
    } = this.state;

    return isLoading ||
      this.isEmpty(weatherData) ||
      this.isEmpty(forecastData) ? (
      <Spinner color="primary" />
    ) : (
      <div className="container">
        <SearchBar changeLocation={this.changeLocation} />
        {message && <h2>Ciudad no encontrada!</h2>}
        {!message && (
          <>
            <WeatherCard
              currentLocation={currentLocation}
              weatherData={weatherData}
            />
            <ForecastCard forecastData={forecastData} />
          </>
        )}
      </div>
    );
  }
}
