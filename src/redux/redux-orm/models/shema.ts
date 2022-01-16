import { ORM } from 'redux-orm';
import {
  Product,
  Categoryes,
  ProductImages,
  ProductVariations,
} from './models';

const schema = new ORM();
schema.register(
  Product,
  Categoryes,
  ProductImages,
  ProductVariations
);
export default schema;
