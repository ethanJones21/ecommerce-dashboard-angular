export interface ClientItf {
  // necessary
  uid: string;
  name: string;
  lastname: string;
  email: string;
  country: string;
  gender: string;
  test: boolean;
  // ?
  active?: boolean;
  profile?: string;
  phone?: string;
  password?: string;
  birthday?: string;
  dni?: string;
}
