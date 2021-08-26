interface gal {
  id: string;
  name: string;
}
export interface ProductItf {
  id: string;
  name: string;
  slug: string;
  cover: string;
  price: number;
  description: string;
  content: string;
  stock: number;
  category: number;
  nsales?: number;
  galery?: gal[];
  state?: string;
  active?: boolean;
}
