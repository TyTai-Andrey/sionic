import { combineReducers, AnyAction } from 'redux';

import { tooltipsReducer } from './reduxCollection/tooltips';

import { ThunkDispatch } from 'redux-thunk';


export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

const rootReducer = combineReducers<AppState>({
  tooltipsReducer: tooltipsReducer,
});

export { rootReducer };
