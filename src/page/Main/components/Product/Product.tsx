import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Skeleton } from '@mui/material';

import { categorysColors, URL } from '../../../../constants/constants';
import { feachProductImages } from '../../../../services/feachProductImages';
import { feachProductVariations } from '../../../../services/feachProductVariations';
import { setProducts } from '../../../../redux/reduxCollection/basket';
import { setLocalStorage } from '../../../../common';

type ProductProps = {
  product: IProduct;
  categorys: ICategory[] | null;
};

export const Product: React.FC<ProductProps> = ({ product, categorys }) => {
  const { products } = useSelector((state: AppState) => state.basketReducer);
  const basketProduct = products?.find(
    (item: IProductBasket) => item.id === product.id
  );

  const dispatch = useDispatch();

  const [productImages, setProductImages] = useState<IProductImages[] | null>(
    null
  );
  const [productVariations, setProductVariations] = useState<
    IProductVariations[] | null
  >(null);

  const getProductImages = async () => {
    const productImages = await feachProductImages(
      null,
      null,
      null,
      `{"product_id": ${product.id}}`
    );
    if (productImages) {
      setProductImages(productImages);
    }
  };

  const getProductVariations = async () => {
    const productVariations = await feachProductVariations(
      null,
      null,
      null,
      `{"product_id": ${product.id}}`
    );
    if (productVariations) {
      setProductVariations(productVariations);
    }
  };

  useEffect(() => {
    if (product) {
      getProductImages();
      getProductVariations();
    }
  }, [product]);

  const addInBasket = () => {
    const newBasketProduct = {
      id: product.id,
      name: product.name,
      quantity: 1,
      price: productVariations?.[0].price,
      stock: productVariations?.[0].stock,
    };

    const basketProducts = products
      ? [...products, newBasketProduct]
      : [newBasketProduct];

    if (basketProduct && products) {
      const newBasketProductsData = products?.map((product: IProductBasket) =>
        product.id === basketProduct.id
          ? { ...basketProduct, quantity: basketProduct.quantity + 1 }
          : product
      );
      dispatch(setProducts(newBasketProductsData));
      setLocalStorage('productsBasket', newBasketProductsData);
    } else {
      dispatch(setProducts(basketProducts));
      setLocalStorage('productsBasket', basketProducts);
    }
  };

  return (
    <div className="Main-body-box-wrapper">
      <div className="Box">
        <div className="Box-top">
          <div className="Box-top-img">
            {productImages && productImages?.[0].image_url ? (
              <img
                src={URL + productImages?.[0].image_url}
                alt="box"
                loading="lazy"
                className="Box-top-img--img"
              />
            ) : (
              <Skeleton
                sx={{
                  width: '100%',
                  height: '100%',
                  minWidth: '236px',
                  minHeight: '152px',
                  transform: 'none',
                }}
              />
            )}
          </div>
          <div className="Box-top-categorys">
            {categorys?.map((category: ICategory, idx: number) => {
              if (product.category_id === category.id)
                return (
                  <div
                    className="Box-top-category"
                    style={{ background: categorysColors?.[idx] }}
                    key={category.id}
                  >
                    {category.name}
                  </div>
                );
            })}
          </div>
        </div>
        <div className="Box-bottom">
          <div className="Box-bottom-title">{product.name}</div>
          <div className="Box-bottom-price">
            {productVariations && productVariations?.[0].price ? (
              `от ${productVariations?.[0].price} ₽`
            ) : (
              <Skeleton
                sx={{
                  width: '100%',
                  height: '100%',
                  transform: 'none',
                }}
              />
            )}
          </div>
          <div className="Box-bottom-priceCorrected">
            <div className="Box-bottom-price-old">450 500 ₽</div>
            <div className="Box-bottom-discount">-10%</div>
          </div>

          <button
            className="Box-bottom-button border"
            onClick={() => {
              addInBasket();
            }}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};
