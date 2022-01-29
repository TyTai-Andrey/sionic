interface IBlockData {
  title: string;
  img: string;
}

interface I_Id_And_Name {
  id: number;
  name: string;
}

interface ICategory extends I_Id_And_Name {
}

interface IProduct extends I_Id_And_Name {
  category_id: number;
  description: string;
}

interface IProductBasket extends I_Id_And_Name {
  quantity: number;
  price: number;
  stock: number;
}

interface IProductImages {
  id: number;
  image_name: string;
  image_url: string;
  product_id: number;
}

interface IProductVariations {
  id: number;
  price: number;
  product_id: number;
  stock: number;
}

interface book {
  items: string[];
  itemsById: string[];
  indexes: string[];
  meta: string[];
}

interface IOrderData {
  quantity: string | number;
  price: string | number;
  address: string;
  orderNumber: string | Date;
}
