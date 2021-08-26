export interface InventoryItf {
  id: string;
  total: number;
  supplier: string;
  createdAt: any;
  user: {
    id: string;
    name: string;
  };
  product?: string;
}
