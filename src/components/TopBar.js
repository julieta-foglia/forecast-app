import React, { useState } from 'react';
import { Row, Button } from 'reactstrap';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import ImgIcon from '../assets/sun.png';

const TopBar = ({ changeLocation, cities, currentWeather }) => {
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
    <Row className="search-bar">
      <div className="flex align-center">
        <img className="square-img" src={ImgIcon} />
        <h3>ForecastApp</h3>
      </div>
      <div className="flex">
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
      </div>
    </Row>
  );
};

export default TopBar;
