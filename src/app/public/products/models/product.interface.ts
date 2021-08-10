export interface ProductItf {
  id: string;
  name: string;
  slug: string;
  // galery: any[];
  cover: string;
  price: number;
  description: string;
  content: string;
  stock: number;
  category: number;
  state?: string;
  active?: boolean;
}
