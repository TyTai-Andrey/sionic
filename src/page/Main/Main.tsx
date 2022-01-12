import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from './components/Product';
import { setProducts } from '../../redux/reduxCollection/showProducts';

import { categorysColors } from '../../constants/constants';
import { classnames } from '../../common';

import './Main.scss';

type MainProps = {
  categorys: ICategory[] | null;
  allProducts: IProduct[] | null;
};

export const Main: React.FC<MainProps> = ({ categorys, allProducts }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(
    (state: AppState) => state.showProductsReducer
  );

  const showMoreProducts = () => {
    products &&
      dispatch(setProducts(allProducts?.slice(0, products.length + 16)));
  };

  return (
    <div className="Main">
      <div className="Main-header">
        <div className="Main-header-settings">
          <div className="Main-header-settings-title">Категории товаров</div>
          <button className="Main-header-settings-button">Настройки</button>
        </div>
        <div className="Main-header-categorys">
          {categorys?.map((category: ICategory, idx: number) => {
            if (
              products?.find(
                (product: IProduct) => product.category_id === category.id
              )
            )
              return (
                <div
                  className={classnames('Main-header-category', {
                    selected: true,
                  })}
                  style={{ background: categorysColors?.[idx] }}
                  key={category.id}
                >
                  {category.name}
                </div>
              );
          })}
        </div>
      </div>
      <div className="Main-body">
        <div className="Main-body-boxes-wrapper">
          {products?.map((product, idx) => (
            <Product product={product} categorys={categorys} key={product.id} />
          ))}
        </div>
        <button
          className="Main-body-showMoreProducts"
          onClick={showMoreProducts}
        >
          Показать больше товаров
        </button>
      </div>
    </div>
  );
};
