export interface UserItf {
  // necessary
  uid: string;
  name: string;
  lastname: string;
  email: string;
  country: string;
  gender: string;
  role: string;
  // ?
  active?: boolean;
  profile?: string;
  phone?: string;
  password?: string;
  birthday?: string;
  dni?: string;
}
