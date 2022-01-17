import React, { useState } from 'react';

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
import { getCorrectName, getCorrectPhone } from '../../common';

export const Order: React.FC = () => {
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
              // disablePortal
              className="Order-left-setting-location-selector"
              value={value}
              onChange={(event, newValue) => {
                //@ts-ignore
                newValue && setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
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
                <div className="OrderWrapper-point-price">200 584₽</div>
              </div>
              <div className="OrderWrapper-point">
                <div className="OrderWrapper-point-text">
                  Стоимость доставки:
                </div>
                <div className="OrderWrapper-point-price">200 584₽</div>
              </div>
            </div>
            <div className="OrderWrapper-bottom OrderWrapper-point">
              <div className="OrderWrapper-point-text">Итого:</div>
              <div className="OrderWrapper-point-price-total">200 584₽</div>
            </div>
          </div>
          <button className="Order-right-button">Сделать заказ</button>
        </div>
      </div>
    </div>
  );
};
