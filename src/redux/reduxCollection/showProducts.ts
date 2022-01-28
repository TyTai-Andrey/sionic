import { Reducer, ActionCreator } from 'redux';

enum ShowProductsActionTypes {
  SET_PRODUCTS = 'showProducts/SET_PRODUCTS',
  SET_PRODUCTS_IMG = 'showProducts/SET_PRODUCTS_IMG',
  SET_PRODUCTS_VARIATIONS = 'showProducts/SET_PRODUCTS_VARIATIONS',
}

const initialState: ShowProductsReducerState = {
  products: null,
  productsImg: null,
  productVars: null,
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

type SetProductsImgAction = {
  type: ShowProductsActionTypes.SET_PRODUCTS_IMG;
  productsImg: IProductImages[];
};

export const setProductsImg: ActionCreator<SetProductsImgAction> = (
  productsImg: IProductImages[]
) => ({
  type: ShowProductsActionTypes.SET_PRODUCTS_IMG,
  productsImg,
});

type SetProductsVariationsAction = {
  type: ShowProductsActionTypes.SET_PRODUCTS_VARIATIONS;
  productsVariations: IProductVariations[];
};

export const setProductsVariations: ActionCreator<
  SetProductsVariationsAction
> = (productsVariations: IProductVariations[]) => ({
  type: ShowProductsActionTypes.SET_PRODUCTS_VARIATIONS,
  productsVariations,
});

type ShowProductsActions =
  | SetProductsAction
  | SetProductsImgAction
  | SetProductsVariationsAction;

export const showProductsReducer: Reducer<
  ShowProductsReducerState,
  ShowProductsActions
> = (state = initialState, action) => {
  switch (action.type) {
    case ShowProductsActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case ShowProductsActionTypes.SET_PRODUCTS_IMG:
      return {
        ...state,
        productsImg: state.productsImg
          ? [...state.productsImg, action.productsImg]
          : [action.productsImg],
      };
    case ShowProductsActionTypes.SET_PRODUCTS_VARIATIONS:
      return {
        ...state,
        productVars: state.productVars
          ? [...state.productVars, action.productsVariations]
          : [action.productsVariations],
      };
    default:
      return state;
  }
};
