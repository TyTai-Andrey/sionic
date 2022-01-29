type CommonReducerState = {
  selectedSity: string;
  alertText: string[];
  isAlertOpen: boolean;
};

type BasketReducerState = {
  products: IProductBasket[] | null;
};

type ShowProductsReducerState = {
  products: IProduct[] | null;
  productsImg: IProductImages[][] | null;
  productVars: IProductVariations[][] | null;
};

type EntitiesReducerState = {
  '@@_______REDUX_ORM_STATE_FLAG': boolean;
  Book: book;
  category_id: any;
  Product: any;
  Categoryes: any;
};

type AppState = {
  commonReducer: CommonReducerState;
  basketReducer: BasketReducerState;
  showProductsReducer: ShowProductsReducerState;
  entities: EntitiesReducerState;
};

type paramFech = string | null;
