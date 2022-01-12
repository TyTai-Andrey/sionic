import { combineReducers, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { commonReducer } from './reduxCollection/common';
import { basketReducer } from './reduxCollection/basket';


export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

const rootReducer = combineReducers<AppState>({
  commonReducer,
  basketReducer,
});

export { rootReducer };
