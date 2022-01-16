import { Reducer, ActionCreator } from 'redux';
import { IndexedModelClasses, OrmState } from 'redux-orm/ORM';
import schema from './shema';

const initialState: OrmState<
  IndexedModelClasses<any, string | number | symbol>
> = schema.getEmptyState();

// Product
// Categoryes
// ProductImages
// ProductVariations

enum EntitiesActionTypes {
  PRODUCT_CREATE = 'ENTITIES/PRODUCT_CREATE',
  CATEGORY_CREATE = 'ENTITIES/CATEGORY_CREATE',
  PRODUCT_IMAGES_CREATE = 'ENTITIES/PRODUCT_IMAGES_CREATE',
  PRODUCT_VARIATIONS_CREATE = 'ENTITIES/PRODUCT_VARIATIONS_CREATE',
}

type CreateProductVariations = {
  type: EntitiesActionTypes.PRODUCT_VARIATIONS_CREATE;
  payload: any;
};

export const createProductVariations: ActionCreator<CreateProductVariations> = (
  payload: any
) => ({
  type: EntitiesActionTypes.PRODUCT_VARIATIONS_CREATE,
  payload,
});

type CreateProductImagesAction = {
  type: EntitiesActionTypes.PRODUCT_IMAGES_CREATE;
  payload: any;
};

export const createProductImages: ActionCreator<CreateProductImagesAction> = (
  payload: any
) => ({
  type: EntitiesActionTypes.PRODUCT_IMAGES_CREATE,
  payload,
});

type CreateProductAction = {
  type: EntitiesActionTypes.PRODUCT_CREATE;
  payload: any;
};

export const createProduct: ActionCreator<CreateProductAction> = (
  payload: any
) => ({
  type: EntitiesActionTypes.PRODUCT_CREATE,
  payload,
});

type CreateCategoryAction = {
  type: EntitiesActionTypes.CATEGORY_CREATE;
  payload: any;
};

export const createCategory: ActionCreator<CreateCategoryAction> = (
  payload: any
) => ({
  type: EntitiesActionTypes.CATEGORY_CREATE,
  payload,
});

type EntitiesActions =
  | CreateProductAction
  | CreateCategoryAction
  | CreateProductImagesAction
  | CreateProductVariations;

export const entitiesReducer: Reducer<
  EntitiesReducerState | any,
  EntitiesActions
> = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  const session = schema.session(state);
  const { Product, Categoryes, ProductImages, ProductVariations } = session;
  switch (action.type) {
    case EntitiesActionTypes.PRODUCT_CREATE: {
      Product.create(action.payload);
      return session.state;
    }
    case EntitiesActionTypes.CATEGORY_CREATE: {
      Categoryes.create(action.payload);
      return session.state;
    }
    case EntitiesActionTypes.PRODUCT_IMAGES_CREATE: {
      ProductImages.create(action.payload);
      return session.state;
    }
    case EntitiesActionTypes.PRODUCT_VARIATIONS_CREATE: {
      ProductVariations.create(action.payload);
      return session.state;
    }
    default:
      return state;
  }
};
