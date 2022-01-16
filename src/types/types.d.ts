type CommonReducerState = {
  selectedSity: string;
  index: number;
};

type BasketReducerState = {
  products: IProductBasket[] | null;
};

type ShowProductsReducerState = {
  products: IProduct[] | null;
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
