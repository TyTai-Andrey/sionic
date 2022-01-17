import React, { useState } from 'react';

import ruLocale from 'date-fns/locale/ru';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { TimePicker, DatePicker, LocalizationProvider } from '@mui/lab';

import './Order.scss';

export const Order: React.FC = () => {
  const [value, setValue] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

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
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
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
        <div className="Order"></div>
        <div className="Order"></div>
        <div className="Order"></div>
      </div>
      {/* ///// */}
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
