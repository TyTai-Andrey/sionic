import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Product } from './components/Product';
import './Basket.scss';
import { ROUTE_NAMES } from '../../constants/routeNames';
import {
  setAlertText,
  setIsAlertOpen,
} from '../../redux/reduxCollection/common';
import { setProducts } from '../../redux/reduxCollection/basket';
import { getTotalPrice, setLocalStorage } from '../../common';

export const Basket: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state: AppState) => state.basketReducer);
  const { order } = ROUTE_NAMES;

  const totalPrice = useMemo(
    () => getTotalPrice(products, 'quantity', 'price'),
    [products]
  );

  const makeOrder = () => {
    if (totalPrice) {
      navigate(order);
    } else {
      dispatch(setAlertText(['Ваша корзина пуста']));
      dispatch(setIsAlertOpen(true));
    }
  };

  const clearBasket = () => {
    dispatch(setProducts(null));
    setLocalStorage('productsBasket', null);
  };

  return (
    <div className="Basket">
      <div className="Basket-header">
        <div className="Basket-header-title">Корзина</div>
        <div className="Basket-header-clear">
          <div className="Basket-header-clear-button" onClick={clearBasket}>
            Очистить корзину
          </div>
        </div>
      </div>
      <div className="Basket-body">
        <div className="Basket-body-top">
          <div className="Basket-body-top-logo">Xiaomi</div>
          <div className="Basket-body-top-total">
            <div className="Basket-body-top-total-title">
              Стоимость корзины:
            </div>
            <div className="Basket-body-top-total-price">{totalPrice}₽ </div>
          </div>
          <div className="Basket-body-top-action">
            <button
              className="Basket-body-top-action-button"
              onClick={makeOrder}
            >
              Оформить
            </button>
          </div>
          <div className="Basket-body-top-imgs">
            <img
              src={require('../../assets/img/package.svg').default}
              alt="package"
              loading="lazy"
              className="Basket-body-top-imgs--package"
            />
            <img
              src={require('../../assets/img/basketImg.svg').default}
              alt="basketImg"
              loading="lazy"
              className="Basket-body-top-imgs--basketImg"
            />
            <img
              src={require('../../assets/img/discont.svg').default}
              alt="discont"
              loading="lazy"
              className="Basket-body-top-imgs--discont"
            />
          </div>
        </div>
        <div className="Basket-body-bottom">
          {products?.map((product: IProductBasket) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
