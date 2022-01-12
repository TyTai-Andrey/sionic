
type CommonReducerState = {
    selectedSity: string;
    index: number;
};

type BasketReducerState = {
    products: IProductBasket[]
};

type AppState = {
    commonReducer: CommonReducerState;
    basketReducer: BasketReducerState;
};
