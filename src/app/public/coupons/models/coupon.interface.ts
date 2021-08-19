export interface CouponItf {
  id: string;
  code: string;
  type: string;
  value: number;
  limit: string;
  createdAt: Date;
}
