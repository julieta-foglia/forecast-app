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
    cities: {},
  };

  isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  componentDidMount() {
    this.getCities();
    this.getCurrentWeather();
  }

  getCurrentLocation = async () => {
    const response = await Api.getFetch('/location');
    this.setState({
      currentLocation: {
        city: response.city,
        country: response.country,
        lat: response.lat,
        lon: response.lon,
      },
    });
  };

  getCurrentWeather() {
    this.getCurrentLocation();
    this.getWeather();
    this.getForecast();
  }

  getCities = async () => {
    const { cities } = await Api.getFetch('/cities');
    this.setState({ cities });
  };

  getWeather = async () => {
    const { weatherData } = await Api.getFetch('/current');
    const { current } = weatherData;
    this.setState({ weatherData: current });
  };

  getForecast = async () => {
    const { forecastData } = await Api.getFetch(`/forecast`);
    let { daily } = forecastData;
    daily = daily.filter(
      (dia) => daily.indexOf(dia) > 0 && daily.indexOf(dia) < 6
    );
    this.setState({ forecastData: daily });
  };

  changeLocation = async ({ city, country }) => {
    this.setState({ isLoading: true });

    const { weatherData } = await Api.getFetch(`/current/${city}`);
    const { current } = weatherData;

    const { forecastData } = await Api.getFetch(`/forecast/${city}`);
    let { daily } = forecastData;
    daily = daily.filter(
      (dia) => daily.indexOf(dia) > 0 && daily.indexOf(dia) < 6
    );

    this.setState({
      weatherData: current,
      forecastData: daily,
      currentLocation: {
        city: city,
        country: country,
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
      cities,
    } = this.state;

    return isLoading ||
      this.isEmpty(weatherData) ||
      this.isEmpty(forecastData) ? (
      <div className="centered">
        <Spinner color="primary" />
      </div>
    ) : (
      <div className="container">
        <SearchBar
          changeLocation={this.changeLocation}
          currentWeather={this.getCurrentWeather}
          cities={cities}
        />
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
