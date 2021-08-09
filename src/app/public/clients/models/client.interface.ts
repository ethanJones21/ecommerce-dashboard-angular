export interface ClientItf {
  // necessary
  name: string;
  lastname: string;
  email: string;
  country: string;
  gender: string;
  active: boolean;
  test: boolean;
  // ?
  profile?: string;
  phone?: string;
  password?: string;
  birthday?: string;
  dni?: string;
}
