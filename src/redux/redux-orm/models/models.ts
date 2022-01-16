import { Model, fk, oneToOne, many } from 'redux-orm';

export class Product extends Model {}
Product.modelName = 'Product';
Product.fields = {
    categoryId: fk({
        to: 'Categoryes',
        as: 'categoryes',
        relatedName: 'category_id',
    }),
    productImages_Id: fk({
        to: 'ProductImages',
        as: 'productImages',
        relatedName: 'ProductImages.product_id',
    }),
    productVariations_Id: fk({
        to: 'ProductVariations',
        as: 'productVariations',
        relatedName: 'ProductVariations.product_id',
    }),
};

export class Categoryes extends Model {}
Categoryes.modelName = 'Categoryes';
Categoryes.fields = {
productId: fk({
    to: 'Product',
    as: 'product',
    relatedName: 'id',
  }),
};

export class ProductImages extends Model {}
ProductImages.modelName = 'ProductImages';
ProductImages.fields = {
    id: fk({
    to: 'Product',
    as: 'productImages',
    relatedName: 'Product.id',
  }),
};

export class ProductVariations extends Model {}
ProductVariations.modelName = 'ProductVariations';
ProductImages.fields = {
    product: fk({
    to: 'Product',
    as: 'product',
    relatedName: 'Product.id',
  }),
};
