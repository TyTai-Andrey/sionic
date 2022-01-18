import React from 'react';

type OrderProps = {
  order: IOrderData;
};

export const Order: React.FC<OrderProps> = ({ order }) => {
  return (
    <div className="Order">
      {order.address +
        '    ' +
        order.orderNumber +
        '    ' +
        order.price +
        '    ' +
        order.quantity}
    </div>
  );
};
