
type CommonReducerState = {
    selectedSity: string;
    index: number;
};

type BasketReducerState = {
    products: IProductBasket[] | null
};

type ShowProductsReducerState = {
    products: IProduct[] | null;
};

type AppState = {
    commonReducer: CommonReducerState;
    basketReducer: BasketReducerState;
    showProductsReducer: ShowProductsReducerState;
};

type paramFech = string | null
