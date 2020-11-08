import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import Api from '../api';

const SearchBar = ({ changeLocation }) => {
  const [location, setLocation] = useState();

  const handleClick = () => {
    changeLocation(location);
  };

  const handleClickActual = async () => {
    const response = await Api.getFetch('/location');
    changeLocation(response.city);
  };

  return (
    <Row>
      <Col>
        <Input
          placeholder="Ingresar ciudad"
          onChange={(e) => setLocation(e.target.value)}
        />
      </Col>
      <Button onClick={handleClick}> Cambiar Ciudad </Button>
      <Button onClick={handleClickActual}> Ciudad Actual </Button>
    </Row>
  );
};

export default SearchBar;
