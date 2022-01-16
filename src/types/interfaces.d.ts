interface IBlockData {
  title: string;
  img: string;
}

interface ICategory {
  id: number;
  name: string;
  label?: string;
}

interface IProduct {
  id: number;
  name: string;
  category_id: number;
  description: string;
  label?: string;
}

interface IProductBasket {
  id: number;
  name: string;
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
