import { combineReducers, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { commonReducer } from './reduxCollection/common';
import { basketReducer } from './reduxCollection/basket';
import { showProductsReducer } from './reduxCollection/showProducts';


export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

const rootReducer = combineReducers<AppState>({
  commonReducer,
  basketReducer,
  showProductsReducer,
});

export { rootReducer };
