import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

import './App.scss';
import { fetchCategories } from './services/fetchCategories';
import { fetchProducts } from './services/fetchProducts';

export const App = () => {
  const dispatch = useDispatch();

  const { main, wrongPage, basket } = ROUTE_NAMES;
  const [openModalLocation, setOpenModalLocation] = useState<boolean>(false);
  const [categorys, setCategorys] = useState<null | ICategory[]>(null);
  const [products, setProducts] = useState<null | IProduct[]>(null);

  const renderRoutes = () => {
    return (
      <Routes>
        <Route path={main} element={<Main categorys={categorys} />} />
        <Route path={basket} element={<Basket />} />
        <Route path={wrongPage} element={<WrongPage />} />
      </Routes>
    );
  };

  const closeModalLocationHandler = () => {
    setOpenModalLocation(false);
  };

  const setSity = (sity: string) => {
    closeModalLocationHandler();
    dispatch(setSelectedSity(sity));
  };

  const getProducts = async () => {
    const products = await fetchProducts(null, null, null);
    if (products) {
      setProducts(
        products?.map((i: IProduct) => ({
          ...i,
          label: i.name,
        }))
      );
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
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  return (
    <>
      <Box className="mainWrapper">
        <Box className="pageWrapper">
          <AppHeader
            setOpenModalLocation={setOpenModalLocation}
            categorys={categorys}
            products={products}
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
    </>
  );
};
