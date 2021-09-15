import { ClientItf } from './client.interface';

export interface getClientItf {
  ok: boolean;
  client: ClientItf;
}
export interface getClientsItf {
  ok: boolean;
  clients: onlyClientsInfoItf;
}
export interface createUpdateClientsItf {
  ok: boolean;
  msg: string;
  client: ClientItf;
}

export interface desactivateClientItf {
  ok: boolean;
  msg: string;
}

export interface onlyClientsInfoItf {
  clients: ClientItf[];
  pages: number[];
  longitud: number;
  next: any; //number | {}
  previous: any; //number | {}
}
