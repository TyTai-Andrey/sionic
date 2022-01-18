import { Reducer, ActionCreator } from 'redux';

enum CommonActionTypes {
  SET_SELECTED_SITY = 'common/SET_SELECTED_SITY',
  SET_IS_ALERT_OPEN = 'common/SET_IS_ALERT_OPEN',
  SET_ALERT_TEXT = 'common/SET_ALERT_TEXT',
}

const initialState: CommonReducerState = {
  selectedSity: 'Александровск',
  alertText: [],
  isAlertOpen: false,
};

type SetAlertTextAction = {
  type: CommonActionTypes.SET_ALERT_TEXT;
  texts: string[];
};

export const setAlertText: ActionCreator<SetAlertTextAction> = (
  texts: string[]
) => ({
  type: CommonActionTypes.SET_ALERT_TEXT,
  texts,
});

type SetIsAlertOpenAction = {
  type: CommonActionTypes.SET_IS_ALERT_OPEN;
  isOpen: boolean;
};

export const setIsAlertOpen: ActionCreator<SetIsAlertOpenAction> = (
  isOpen: boolean
) => ({
  type: CommonActionTypes.SET_IS_ALERT_OPEN,
  isOpen,
});

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
  | SetSelectedSityAction
  | SetIsAlertOpenAction
  | SetAlertTextAction;

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
    case CommonActionTypes.SET_IS_ALERT_OPEN:
      return {
        ...state,
        isAlertOpen: action.isOpen,
      };
    case CommonActionTypes.SET_ALERT_TEXT:
      return {
        ...state,
        alertText: action.texts,
      };
    default:
      return state;
  }
};
