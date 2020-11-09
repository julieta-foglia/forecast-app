import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Api from '../api';

const SearchBar = ({ changeLocation, cities, currentWeather }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleClick = (item) => {
    changeLocation({
      city: item.target.name,
    });
  };

  const handleClickActual = async () => {
    currentWeather();
  };

  return (
    <Row className="w-100">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Seleccionar Ciudad</DropdownToggle>
        <DropdownMenu>
          {cities.map((item) => {
            return (
              <DropdownItem
                key={item.city}
                name={item.city}
                onClick={(item) => handleClick(item)}
              >
                {item.city}, {item.country}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <Button onClick={handleClickActual}> Ciudad Actual </Button>
    </Row>
  );
};

export default SearchBar;
