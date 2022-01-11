import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Main } from './page/Main';
import { WrongPage } from './page/WrongPage';

import { Box } from '@mui/material';

import { AppHeader } from './components/AppHeader';
import { Sidebar } from './components/Sidebar';
import { AppFooter } from './components/AppFooter';

import { ROUTE_NAMES } from './constants/routeNames';
import './App.scss';

export const App = () => {
  const { main, wrongPage } = ROUTE_NAMES;

  const renderRoutes = () => {
    return (
      <Routes>
        <Route path={main} element={<Main />} />
        <Route path={wrongPage} element={<WrongPage />} />
      </Routes>
    );
  };

  return (
    <>
      <Box className="mainWrapper">
        <Box className="pageWrapper">
          <AppHeader />
          {renderRoutes()}
        </Box>
        <Sidebar />
      </Box>
      <AppFooter />
    </>
  );
};
