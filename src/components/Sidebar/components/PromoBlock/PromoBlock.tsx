import React from 'react';

import './PromoBlock.scss';

export const PromoBlock: React.FC = () => {
  return (
    <div className="PromoBlock">
      <div className="PromoBlock-img">
        <img
          src={require('../../../../assets/img/packages.svg').default}
          alt="searchIcon"
          loading="lazy"
          className="PromoBlock-img--packages"
        />
      </div>
      <div className="PromoBlock-wrapper">
        <div className="PromoBlock-text">Получай товары БЕСПЛАТНО!</div>
        <button className="PromoBlock-button">Узнать подробнее</button>
      </div>
    </div>
  );
};
