import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Main } from './page/Main';
import { Basket } from './page/Basket';
import { WrongPage } from './page/WrongPage';

import { Box } from '@mui/material';

import { AppHeader } from './components/AppHeader';
import { Sidebar } from './components/Sidebar';
import { AppFooter } from './components/AppFooter';
import { PureModalLocation } from './components/PureModal/components/PureModalLocation';

import { ROUTE_NAMES } from './constants/routeNames';
import { setSelectedSity } from './redux/reduxCollection/common';
import { setProducts as setShowProducts } from './redux/reduxCollection/showProducts';
import { setProducts as setBasketProducts } from './redux/reduxCollection/basket';

import './App.scss';
import { fetchCategories } from './services/fetchCategories';
import { fetchProducts } from './services/fetchProducts';
import { getLocalStorage } from './common';
import {
  createCategory,
  createProduct,
} from './redux/redux-orm/models/entitiesReducer';
import { Order } from './page/Order';
import { HistoryOrders } from './page/HistoryOrders';
import { Alert } from './components/Alert';
import { PureModalSettings } from './components/PureModal/components/PureModalSettings';

export const App = () => {
  const dispatch = useDispatch();

  const { main, wrongPage, basket, order, history } = ROUTE_NAMES;
  const [openModalLocation, setOpenModalLocation] = useState<boolean>(false);
  const [openModalSettings, setOpenModalSettings] = useState<boolean>(false);
  const [categorys, setCategorys] = useState<null | ICategory[]>(null);
  const [products, setProducts] = useState<null | IProduct[]>(null);

  const renderRoutes = () => {
    return (
      <Routes>
        <Route
          path={main}
          element={
            <Main
              categorys={categorys}
              allProducts={products}
              setOpenModalSettings={setOpenModalSettings}
            />
          }
        />
        <Route path={basket} element={<Basket />} />
        <Route path={wrongPage} element={<WrongPage />} />
        <Route path={order} element={<Order />} />
        <Route path={history} element={<HistoryOrders />} />
      </Routes>
    );
  };

  const closeModalLocationHandler = () => {
    setOpenModalLocation(false);
  };

  const closeModalSettingsHandler = () => {
    setOpenModalSettings(false);
  };

  const setSity = (sity: string) => {
    closeModalLocationHandler();
    dispatch(setSelectedSity(sity));
  };

  const getProducts = async () => {
    const products = await fetchProducts();
    if (products) {
      setProducts(
        products?.map((i: IProduct) => ({
          ...i,
          label: i.name,
        }))
      );
      dispatch(setShowProducts(products.slice(0, 16)));

      // products.forEach((element: IProduct, idx: number) =>
      //   dispatch(createProduct(element))
      // );
    }
  };

  const getCategories = async () => {
    const categories = await fetchCategories();

    if (categories) {
      setCategorys(
        categories?.map((i: ICategory) => ({
          ...i,
          label: i.name,
        }))
      );

      // categories.forEach((element: ICategory, idx: number) =>
      //   dispatch(createCategory(element))
      // );
    }
  };

  useEffect(() => {
    if (!categorys) getCategories();
    if (!products) getProducts();
    dispatch(setBasketProducts(getLocalStorage('productsBasket')));
  }, []);

  return (
    <>
      <Box className="mainWrapper">
        <Box className="pageWrapper">
          <AppHeader
            setOpenModalLocation={setOpenModalLocation}
            categorys={categorys}
            products={products}
            setProductsSearch={setProducts}
          />
          {renderRoutes()}
        </Box>
        <Sidebar />
      </Box>
      <AppFooter />
      <PureModalLocation
        open={openModalLocation}
        onClose={closeModalLocationHandler}
        setSity={setSity}
      />
      <PureModalSettings
        open={openModalSettings}
        onClose={closeModalSettingsHandler}
        categorys={categorys}
      />
      <Alert />
    </>
  );
};
