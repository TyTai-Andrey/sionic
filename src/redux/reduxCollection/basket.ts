import { Reducer, ActionCreator } from 'redux';

enum BasketActionTypes {
  SET_PRODUCTS = 'basket/SET_PRODUCTS',
}

const initialState: BasketReducerState = {
  products: [
    {
      id: 15,
      name: 'Смартфон Xiaomi Redmi Note 8 Pro 6/128GB, белый',
      quantity: 25,
      price: '350 000',
    },
    {
      id: 16,
      name: 'Смартфон Xiaomi Redmi Note 8 Pro 6/128GB, белый',
      quantity: 27,
      price: '350 000',
    },
    {
      id: 18,
      name: 'Смартфон Xiaomi Redmi Note 8 Pro 6/128GB, белый',
      quantity: 15,
      price: '150 000',
    },
  ],
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
// | setOpenAction;

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
