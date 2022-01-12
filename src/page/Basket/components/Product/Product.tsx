import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLocalStorage } from '../../../../common';
import { setProducts } from '../../../../redux/reduxCollection/basket';

import './Product.scss';

type ProductProps = {
  product: IProductBasket;
};

export const Product: React.FC<ProductProps> = ({ product }) => {
  const { products } = useSelector((state: AppState) => state.basketReducer);
  const dispatch = useDispatch();

  const chanchProductData = (field: string, data: any) => {
    const newProductsData = products?.map((item) =>
      item.id === product.id ? { ...item, [`${field}`]: data } : item
    );

    dispatch(setProducts(newProductsData));

    setLocalStorage('productsBasket', newProductsData);
  };

  const deleteProduct = () => {
    const newProductsData = products?.filter((item) => item.id !== product.id);
    dispatch(setProducts(newProductsData));
    setLocalStorage('productsBasket', newProductsData);
  };

  return (
    <div className="Basket-body-bottom-line">
      <div className="Product-img">
        <img
          src={require('../../../../assets/img/phone.svg').default}
          alt="phone"
          loading="lazy"
          className="Product-img--phone"
        />
      </div>
      <div className="Product-info">
        <div className="Product-info-top">{product.name}</div>
        <div className="Product-info-bottom">
          <div className="Product-info-bottom-promo">
            <div className="Product-info-bottom-promo-left">120 шт.</div>
            <div className="Product-info-bottom-promo-right">
              за {'12:48:35'}
            </div>
          </div>
          <div className="Product-info-bottom-info">
            Куплено: <span>{'150'} шт.</span>
          </div>
        </div>
      </div>
      <div className="Product-quantity">
        <div
          className="Product-quantity-sign"
          onClick={() =>
            product.quantity > 0
              ? chanchProductData('quantity', product.quantity - 1)
              : null
          }
        >
          -
        </div>

        <div className="Product-quantity-total">
          <input
            type="text"
            className="Product-quantity-total-value"
            value={product.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              chanchProductData('quantity', Number(e.target.value))
            }
          />
        </div>

        <div
          className="Product-quantity-sign"
          onClick={() => chanchProductData('quantity', product.quantity + 1)}
        >
          +
        </div>
      </div>
      <div className="Product-price">
        <div className="Product-price-now">от {product.price} ₽</div>
        <div className="Product-price-old">450 500 ₽</div>
      </div>
      <div className="Product-delete">
        <img
          src={require('../../../../assets/img/delete.svg').default}
          alt="delete"
          loading="lazy"
          className="Product-delete--icon"
          onClick={deleteProduct}
        />
      </div>
    </div>
  );
};
