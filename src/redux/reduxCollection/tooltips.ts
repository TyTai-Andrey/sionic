import { Reducer, ActionCreator } from 'redux';

enum TooltipsActionTypes {
  SET_CURRENT_INDEX = 'tooltips/SET_CURRENT_INDEX',
}

const initialState: TooltipsReducerState = {
  index: 0,
  isTooltipOpen: false,
};

type setCurrentIndexAction = {
  type: TooltipsActionTypes.SET_CURRENT_INDEX;
  index: number;
};

export const setCurrentIndex: ActionCreator<setCurrentIndexAction> = (
  index: number
) => ({
  type: TooltipsActionTypes.SET_CURRENT_INDEX,
  index,
});

type TooltopsActions = 
setCurrentIndexAction ;
// | setOpenAction;

export const tooltipsReducer: Reducer<TooltipsReducerState, TooltopsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // case TooltipsActionTypes.SET_CURRENT_INDEX:
    //   return {
    //     ...state,
    //     index: action.index,
    //   };
    default:
      return state;
  }
};
