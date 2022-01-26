import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { classnames } from '../../../../common';
import {
  setIsAlertOpen,
  setAlertText,
} from '../../../../redux/reduxCollection/common';

import './Order.scss';

type OrderProps = {
  order: IOrderData;
};

type typeInfoBlockDate = {
  title: string;
  info: any;
  action?: string;
  img?: string;
};

export const Order: React.FC<OrderProps> = ({ order }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const infoBlockDate: typeInfoBlockDate[] = [
    { title: 'Статус заказа', info: 'Оплачен/Завершён' },
    {
      title: 'Номер заказа',
      info: (order.orderNumber as string).slice(14),
      action: 'copy',
      img: require('../../../../assets/img/copy.svg').default,
    },
    { title: 'Кол-во товаров', info: order.quantity + ' шт.' },
    { title: 'Стоимость заказа', info: order.price },
    { title: 'Адрес доставки', info: order.address },
  ];

  const handleCopy = (numberOrder: string) => {
    const el = document.createElement('textarea');
    el.value = numberOrder;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    dispatch(setAlertText(['Номер заказа скопирован']));
    dispatch(setIsAlertOpen(true));
  };

  const renderInfoBlock = (item: typeInfoBlockDate) => {
    return (
      <div className="Order-infoBlock">
        <div className="Order-infoBlock-title">{item.title}</div>
        <div
          className={classnames('Order-infoBlock-info', {
            action: item.action,
          })}
          onClick={() => {
            item.action && handleCopy(item.info);
          }}
        >
          {item.info}
          {item.img && (
            <img
              src={item.img}
              alt="copy"
              loading="lazy"
              className="Order-infoBlock-img"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={classnames('Order', {
        active: open,
      })}
    >
      <div className="Order-arrowUp">
        <img
          src={require('../../../../assets/img/arrowUp.svg').default}
          alt="arrowUp"
          loading="lazy"
          className={classnames('Order-arrowUp-img', {
            active: open,
          })}
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>

      <div className="Order-top">
        <div className="Order-top-logo">
          <img
            src={require('../../../../assets/img/mi.svg').default}
            alt="mi"
            loading="lazy"
            className="Order-logo-img"
          />
        </div>
        <div className="Order-top-info">
          <div className="Order-top-info-name">Xiaomi</div>
          <div className="Order-top-info-date">
            {(order.orderNumber as string).slice(0, 10).split('.')}
          </div>
        </div>
        <div className="Order-top-detailed">
          <p onClick={() => setOpen(true)}>Подробнее</p>
        </div>
      </div>
      <div className="Order-bottom">
        {infoBlockDate.map((item: typeInfoBlockDate) => renderInfoBlock(item))}
      </div>
    </div>
  );
};
