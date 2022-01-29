import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

import { ROUTE_NAMES } from '../../constants/routeNames';
import {
  setAlertText,
  setIsAlertOpen,
} from '../../redux/reduxCollection/common';
import { setProducts } from '../../redux/reduxCollection/showProducts';
import { fetchProducts } from '../../services/fetchProducts';
import { getTotalPrice } from '../../common';
import { myAva } from '../../constants/constants';
import './AppHeader.scss';

type AppHeaderProps = {
  setOpenModalLocation: React.Dispatch<React.SetStateAction<boolean>>;
  categorys: null | ICategory[];
  products: null | IProduct[];
  setProductsSearch: React.Dispatch<React.SetStateAction<IProduct[] | null>>;
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  setOpenModalLocation,
  categorys,
  products,
  setProductsSearch,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { main, basket, order, history } = ROUTE_NAMES;

  const { products: basketProducts } = useSelector(
    (state: AppState) => state.basketReducer
  );

  const { selectedSity } = useSelector(
    (state: AppState) => state.commonReducer
  );

  const totalPrice = useMemo(
    () => getTotalPrice(basketProducts, 'price'),
    [basketProducts]
  );

  const [value, setValue] = React.useState<null | ICategory | IProduct>(null);
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

  const goMainPage = () => {
    setOpenMenu(null);
    navigate(main);
  };

  const checkProductsInBasket = (navigatePath: string) => {
    if (totalPrice) {
      navigate(navigatePath);
    } else {
      dispatch(setAlertText(['Ваша корзина пуста']));
      dispatch(setIsAlertOpen(true));
    }
  };

  const goBasketPage = () => {
    setOpenMenu(null);
    checkProductsInBasket(basket);
  };

  const goOrderPage = () => {
    setOpenMenu(null);
    checkProductsInBasket(order);
  };
  const goHistoryPage = () => {
    setOpenMenu(null);
    navigate(history);
  };

  const openModalLocationHandler = () => {
    setOpenModalLocation(true);
  };

  const searchHandler = async () => {
    if ((value as IProduct).category_id) {
      dispatch(setProducts([value]));
      setValue(null);
      return;
    }
    if ((value as ICategory).id) {
      const products = await fetchProducts(
        null,
        null,
        `{"category_id": ${(value as ICategory).id}}`
      );
      if (products) {
        setProductsSearch(products);
        dispatch(setProducts(products.slice(0, 16)));
      }
      setValue(null);
    }
  };

  const getOptionsAutocomplete = (
    categorys: ICategory[] | null,
    products: IProduct[] | null
  ): ICategory[] | IProduct[] | (ICategory | IProduct)[] => {
    if (categorys && products) return [...categorys, ...products];
    if (categorys) return categorys;
    if (products) return products;
    return [];
  };

  const optionsAutocomplete = useMemo(
    () => getOptionsAutocomplete(categorys, products),
    [categorys, products]
  );

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
                id="combo-box-demo"
                className="AppHeader-search"
                value={value}
                onChange={(_, newValue) => {
                  newValue && setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                  setInputValue(newInputValue);
                  setValue(null);
                }}
                options={optionsAutocomplete}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Поиск бренда, товара, категории..."
                  />
                )}
              />
              <button
                className="AppHeader-search-button border"
                onClick={() => {
                  searchHandler();
                }}
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
              onClick={() => checkProductsInBasket(basket)}
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
                alt="ava"
                src={myAva}
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
                <MenuItem onClick={goMainPage}>Главная страница</MenuItem>
                <MenuItem onClick={goBasketPage}>Корзина</MenuItem>
                <MenuItem onClick={goOrderPage}>Подтвердить заказ</MenuItem>
                <MenuItem onClick={goHistoryPage}>История заказов</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
