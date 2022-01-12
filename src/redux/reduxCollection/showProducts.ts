import { Reducer, ActionCreator } from 'redux';

enum ShowProductsActionTypes {
  SET_PRODUCTS = 'showProducts/SET_PRODUCTS',
}

const initialState: ShowProductsReducerState = {
  products: null,
};

type SetProductsAction = {
  type: ShowProductsActionTypes.SET_PRODUCTS;
  products: IProduct[];
};

export const setProducts: ActionCreator<SetProductsAction> = (
  products: IProduct[]
) => ({
  type: ShowProductsActionTypes.SET_PRODUCTS,
  products,
});

type ShowProductsActions = SetProductsAction;
// | setOpenAction;

export const showProductsReducer: Reducer<ShowProductsReducerState, ShowProductsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ShowProductsActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
};
