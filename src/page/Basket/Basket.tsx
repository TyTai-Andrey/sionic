import React from 'react';
import { useSelector } from 'react-redux';

import { Product } from './components/Product';
import './Basket.scss';

export const Basket: React.FC = () => {
  const { products } = useSelector((state: AppState) => state.basketReducer);

  return (
    <div className="Basket">
      <div className="Basket-header">
        <div className="Basket-header-title">Корзина</div>
        <div className="Basket-header-clear">
          <div className="Basket-header-clear-button">Очистить корзину</div>
        </div>
      </div>
      <div className="Basket-body">
        <div className="Basket-body-top">
          <div className="Basket-body-top-logo">Xiaomi</div>
          <div className="Basket-body-top-total">
            <div className="Basket-body-top-total-title">
              Стоимость корзины:
            </div>
            <div className="Basket-body-top-total-price">
              {products
                ? products.reduce(
                    (sum: number, product: IProductBasket) =>
                      sum + product.quantity * product.price,
                    0
                  )
                : 0}
              ₽{' '}
            </div>
          </div>
          <div className="Basket-body-top-action">
            <button className="Basket-body-top-action-button">Оформить</button>
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
