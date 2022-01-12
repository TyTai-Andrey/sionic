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
  price: string;
}
