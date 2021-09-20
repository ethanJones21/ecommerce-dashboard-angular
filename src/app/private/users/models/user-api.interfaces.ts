import { UserItf } from './user.interface';

export interface getUserItf {
  ok: boolean;
  user: UserItf;
}
export interface getUsersItf {
  ok: boolean;
  users: onlyUsersInfoItf;
}
export interface createUpdateUsersItf {
  ok: boolean;
  msg: string;
  user: UserItf;
}

export interface desactivateUserItf {
  ok: boolean;
  msg: string;
}

export interface onlyUsersInfoItf {
  users: UserItf[];
  pages: number[];
  longitud: number;
  next: any; //number | {}
  previous: any; //number | {}
}
