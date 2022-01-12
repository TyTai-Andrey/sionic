import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material';

import './AppHeader.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTE_NAMES } from '../../constants/routeNames';

type AppHeaderProps = {
  setOpenModalLocation: React.Dispatch<React.SetStateAction<boolean>>;
  categorys: null | ICategory[];
  products: null | IProduct[];
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  setOpenModalLocation,
  categorys,
  products,
}) => {
  const navigate = useNavigate();

  const { main, basket } = ROUTE_NAMES;

  const { products: basketProducts } = useSelector(
    (state: AppState) => state.basketReducer
  );

  const { selectedSity } = useSelector(
    (state: AppState) => state.commonReducer
  );

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [openMenu, setOpenMenu] = useState<
    (EventTarget & HTMLDivElement) | null
  >(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const openModalLocationHandler = () => {
    setOpenModalLocation(true);
  };

  return (
    <Box>
      <AppBar
        className="AppHeader-wrapper"
        position="static"
        sx={{ backgroundColor: '#fff', boxShadow: 'none' }}
      >
        <Toolbar className="AppHeader">
          <Box className="AppHeader-something">
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="AppHeader-logo"
              onClick={() => navigate(main)}
            >
              React
            </Typography>
            <Box
              className="AppHeader-location-wrapper"
              onClick={openModalLocationHandler}
            >
              <img
                src={require('../../assets/img/pin.svg').default}
                alt="pin"
                loading="lazy"
                className="AppHeader-location-icon"
              />
              <p className="AppHeader-location">{selectedSity}</p>
            </Box>
            <Box
              className="AppHeader-search-wrapper border"
              sx={{
                ml: 2,
              }}
            >
              <Autocomplete
                // disablePortal
                id="combo-box-demo"
                className="AppHeader-search"
                value={value}
                onChange={(event, newValue) => {
                  //@ts-ignore
                  newValue && setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                  setValue(null);
                }}
                options={
                  categorys && products ? [...categorys, ...products] : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Поиск бренда, товара, категории..."
                  />
                )}
              />
              <button
                className="AppHeader-search-button border"
                onClick={() => console.log(value)}
              >
                <img
                  src={require('../../assets/img/searchIcon.svg').default}
                  alt="searchIcon"
                  loading="lazy"
                  className="AppHeader-search-icon"
                />
              </button>
            </Box>
          </Box>
          <Box className="AppHeader-icons-wrapper">
            <Box
              className="AppHeader-basket-wrapper"
              onClick={() => navigate(basket)}
            >
              <button className="AppHeader-basket-button border">
                <img
                  src={require('../../assets/img/basket.svg').default}
                  alt="basketIcon"
                  loading="lazy"
                  className="AppHeader-basket-icon"
                />
                {!!basketProducts?.length && (
                  <div className="AppHeader-basket-quantity-wrapper">
                    <p className="AppHeader-basket-quantity">
                      {basketProducts.length}
                    </p>
                  </div>
                )}
              </button>
            </Box>
            <Box className="AppHeader-ava-wrapper">
              <Avatar
                className="AppHeader-ava"
                alt="Cindy Baker"
                src="https://sun1-56.userapi.com/s/v1/ig2/SkMBdyfv-qkF6m7PrhD9VUFoyoiIVAzOugaBAZa349M3Gsm41RlI3H9svviTyUlaOMqEqwvpNK6mNeFQ1lJ2Ms__.jpg?size=50x50&quality=95&crop=346,541,720,720&ava=1"
                onClick={(event) => handleOpenMenu(event)}
              />
              <Menu
                id="menu-appbar"
                anchorEl={openMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(openMenu)}
                onClose={handleCloseMenu}
                sx={{ top: 60 }}
              >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
