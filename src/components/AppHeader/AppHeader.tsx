import React, { useState } from 'react';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';

import './AppHeader.scss';
import { mainBlackColor } from '../../constants/constants';

export const AppHeader: React.FC = () => {
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
            >
              React
            </Typography>
            <Box className="AppHeader-location-wrapper">
              <img
                src={require('../../assets/img/pin.svg').default}
                alt="pin"
                loading="lazy"
                className="AppHeader-location-icon"
              />
              <p className="AppHeader-location">Александровск</p>
            </Box>
            <Box
              className="AppHeader-search-wrapper border"
              sx={{
                ml: 2,
              }}
            >
              <input
                className="AppHeader-search"
                placeholder="Поиск бренда, товара, категории..."
              />
              <button className="AppHeader-search-button border">
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
            <Box className="AppHeader-basket-wrapper">
              <button className="AppHeader-basket-button border">
                <img
                  src={require('../../assets/img/basket.svg').default}
                  alt="basketIcon"
                  loading="lazy"
                  className="AppHeader-basket-icon"
                />
                <div className="AppHeader-basket-quantity-wrapper">
                  <p className="AppHeader-basket-quantity">3</p>
                </div>
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
