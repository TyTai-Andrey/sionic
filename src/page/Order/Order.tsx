import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ruLocale from 'date-fns/locale/ru';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import {
  TimePicker,
  DatePicker,
  LocalizationProvider,
  Autocomplete,
} from '@mui/lab';

import './Order.scss';
import { citys } from '../../constants/constants';
import {
  getCorrectName,
  getCorrectPhone,
  setLocalStorage,
  getLocalStorage,
  getTotalPrice,
  noFalseValues,
} from '../../common';
import { ROUTE_NAMES } from '../../constants/routeNames';
import {
  setAlertText,
  setIsAlertOpen,
} from '../../redux/reduxCollection/common';
import { setProducts } from '../../redux/reduxCollection/basket';

export const Order: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state: AppState) => state.basketReducer);

  const totalPrice = useMemo(
    () => getTotalPrice(products, 'quantity', 'price'),
    [products]
  );

  const { history } = ROUTE_NAMES;

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const [personalData, setPersonalData] = useState({
    name: '',
    phone: '',
  });

  const personalDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    const correctData =
      inputName === 'phone'
        ? getCorrectPhone(inputValue)
        : getCorrectName(inputValue);

    setPersonalData((prev) => ({
      ...prev,
      [inputName]: correctData,
    }));
  };

  const makeOrder = () => {
    if (!totalPrice) {
      dispatch(setAlertText(['Ваша корзина пуста']));
      dispatch(setIsAlertOpen(true));
      return;
    }
    const { name, phone } = personalData;
    const alertsErrorTexts: string[] = [];
    if (!date) {
      alertsErrorTexts.push('Вы не указали дату заказа');
    }
    if (!time) {
      alertsErrorTexts.push('Вы не указали время заказа');
    }
    if (!inputValue) {
      alertsErrorTexts.push('Вы не указали адрес');
    }
    if (!name) {
      alertsErrorTexts.push('Вы не указали имя');
    }
    if (!phone) {
      alertsErrorTexts.push('Вы не указали телефон');
    }
    if (noFalseValues([date, inputValue, time, totalPrice, name, phone])) {
      const quantity = getTotalPrice(products, 'quantity');

      const newOrder: IOrderData = {
        quantity,
        price: totalPrice + 200,
        address: inputValue,
        orderNumber: new Date(),
      };

      const savedOrders: IOrderData[] = getLocalStorage('orders');

      const newOrdersForSave = savedOrders
        ? [...savedOrders, newOrder]
        : [newOrder];

      setLocalStorage('orders', newOrdersForSave);
      dispatch(setProducts(null));

      navigate(history);
    } else {
      dispatch(setAlertText(alertsErrorTexts));
      dispatch(setIsAlertOpen(true));
    }
  };

  return (
    <div className="Order">
      <div className="Order-left">
        <div className="Order-title">Доставка</div>
        <div className="Order-left-settings">
          <div className="Order-left-setting-title">Когда доставить?</div>
          <div className="Order-left-setting Order-left-setting-date_time">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={ruLocale}
              className="Order-left-setting-date"
            >
              <DatePicker
                mask={'__.__.____'}
                label="Выберите дату"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Выберите время"
                className="Order-left-setting-time"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="Order-left-setting-location Order-left-setting">
          <div className="Order-left-setting-title">Когда доставить?</div>
          <div className="Order-left-setting Order-left-setting-location-selector-wrapper border">
            <img
              src={require('../../assets/img/pin.svg').default}
              alt="searchIcon"
              loading="lazy"
              className="Order-left-setting-location-selector--icon"
            />
            <Autocomplete
              className="Order-left-setting-location-selector"
              value={value}
              onChange={(_, newValue) => {
                newValue && setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
                setValue(null);
              }}
              options={citys}
              renderInput={(params) => (
                <TextField {...params} label="Выберите адрес доставки" />
              )}
            />
          </div>
          <div className="Order-left-setting-personalData Order-left-setting">
            <div className="Order-left-setting-title">Имя</div>
            <input
              className="Order-left-setting-input border"
              name="name"
              value={personalData.name}
              onChange={(event) => personalDataHandler(event)}
            />
          </div>
          <div className="Order-left-setting-personalData Order-left-setting">
            <div className="Order-left-setting-title">Телефон</div>
            <input
              className="Order-left-setting-input border"
              name="phone"
              value={personalData.phone}
              onChange={(event) => personalDataHandler(event)}
            />
          </div>
        </div>
      </div>
      <div className="Order-right">
        <div className="Order-right-makeOrder">
          <div className="Order-right-OrderWrapper">
            <div className="OrderWrapper-top">
              <div className="OrderWrapper-point">
                <div className="OrderWrapper-point-text">
                  Стоимость товаров:
                </div>
                <div className="OrderWrapper-point-price">
                  {totalPrice + ' '}₽
                </div>
              </div>
              <div className="OrderWrapper-point">
                <div className="OrderWrapper-point-text">
                  Стоимость доставки:
                </div>
                <div className="OrderWrapper-point-price">200 ₽</div>
              </div>
            </div>
            <div className="OrderWrapper-bottom OrderWrapper-point">
              <div className="OrderWrapper-point-text">Итого:</div>
              <div className="OrderWrapper-point-price-total">
                {totalPrice ? totalPrice + 200 + ' ' : totalPrice}₽
              </div>
            </div>
          </div>
          <button className="Order-right-button" onClick={makeOrder}>
            Сделать заказ
          </button>
        </div>
      </div>
    </div>
  );
};
