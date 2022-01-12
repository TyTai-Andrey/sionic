import { Reducer, ActionCreator } from 'redux';

enum CommonActionTypes {
  SET_CURRENT_INDEX = 'common/SET_CURRENT_INDEX',
  SET_SELECTED_SITY = 'common/SET_SELECTED_SITY',
}

const initialState: CommonReducerState = {
  selectedSity: 'Александровск',
  index: 0,
};

type SetSelectedSityAction = {
  type: CommonActionTypes.SET_SELECTED_SITY;
  sity: string;
};

export const setSelectedSity: ActionCreator<SetSelectedSityAction> = (
  sity: string
) => ({
  type: CommonActionTypes.SET_SELECTED_SITY,
  sity,
});

type CommonActions = 
SetSelectedSityAction ;
// | setOpenAction;

export const commonReducer: Reducer<CommonReducerState, CommonActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CommonActionTypes.SET_SELECTED_SITY:
      return {
        ...state,
        selectedSity: action.sity,
      };
    default:
      return state;
  }
};
