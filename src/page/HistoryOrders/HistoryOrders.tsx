import React from 'react';
import { getLocalStorage } from '../../common';
import { Order } from './components/Order';

import './HistoryOrders.scss';

export const HistoryOrders: React.FC = () => {
  const orders: null | IOrderData[] = getLocalStorage('orders');

  return (
    <div className="HistoryOrders">
      <div className="HistoryOrders-title">История заказов</div>
      <div className="HistoryOrders-body">
        <div className="HistoryOrders-body-orders-wrapper">
          {orders?.map((order: IOrderData) => (
            <Order order={order} key={String(order.orderNumber)} />
          ))}
        </div>
      </div>
    </div>
  );
};
