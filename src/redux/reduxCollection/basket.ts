import { Reducer, ActionCreator } from 'redux';

enum BasketActionTypes {
  SET_PRODUCTS = 'basket/SET_PRODUCTS',
}

const initialState: BasketReducerState = {
  products: null,
};

type SetProductsAction = {
  type: BasketActionTypes.SET_PRODUCTS;
  products: IProductBasket[];
};

export const setProducts: ActionCreator<SetProductsAction> = (
  products: IProductBasket[]
) => ({
  type: BasketActionTypes.SET_PRODUCTS,
  products,
});

type BasketActions = SetProductsAction;

export const basketReducer: Reducer<BasketReducerState, BasketActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BasketActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
};
