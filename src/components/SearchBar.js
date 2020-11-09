import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import CITIES_DATA from '../constants/citiesData';
import Api from '../api';

const SearchBar = ({ changeLocation }) => {
  const [location, setLocation] = useState();

  const handleClick = () => {
    changeLocation({ city: location, country: '' });
  };

  const handleClickActual = async () => {
    const response = await Api.getFetch('/location');
    changeLocation({ city: response.city, country: response.country });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <Row>
      {CITIES_DATA.map((item) => {
        return <Button key={item.city}>{item.city}</Button>;
      })}
      <Button onClick={handleClickActual}> Ciudad Actual </Button>
    </Row>
  );
};

export default SearchBar;
