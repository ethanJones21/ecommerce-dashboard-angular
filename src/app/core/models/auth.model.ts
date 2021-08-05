export interface UserForm {
  email: string;
  pass: string;
}
export interface UserApi {
  ok: boolean;
  role: string;
  profile: string;
  token: string;
}
