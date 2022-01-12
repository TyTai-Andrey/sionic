import React from 'react';
import { categorysColors } from '../../constants/constants';
import { classnames } from '../../common';

import './Main.scss';

type MainProps = {
  categorys: ICategory[] | null;
};

export const Main: React.FC<MainProps> = ({ categorys }) => {
  const sad = () => (
    <div className="Main-body-box-wrapper">
      <div className="Box">
        <div className="Box-top">
          <div className="Box-top-img">
            <img
              src={require('../../assets/img/box.svg').default}
              alt="box"
              loading="lazy"
              className="Box-top-img--img"
            />
          </div>
          <div className="Box-top-categorys">
            <div className="Box-top-category">Игрушка</div>
          </div>
        </div>
        <div className="Box-bottom">
          <div className="Box-bottom-title">
            Длинное название товара в одну строчку п...
          </div>
          <div className="Box-bottom-price">от 350 000 ₽</div>
          <div className="Box-bottom-priceCorrected">
            <div className="Box-bottom-price-old">450 500 ₽</div>
            <div className="Box-bottom-discount">-10%</div>
          </div>

          <button className="Box-bottom-button border">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="Main">
      <div className="Main-header">
        <div className="Main-header-settings">
          <div className="Main-header-settings-title">Категории товаров</div>
          <button className="Main-header-settings-button">Настройки</button>
        </div>
        <div className="Main-header-categorys">
          {categorys?.map((category: ICategory, idx: number) => {
            if (idx < 6)
              return (
                <div
                  className={classnames('Main-header-category', {
                    selected: true,
                  })}
                  style={{ background: categorysColors[idx] }}
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
          {new Array(16).fill('').map((_, idx) => sad())}
        </div>
      </div>
    </div>
  );
};
