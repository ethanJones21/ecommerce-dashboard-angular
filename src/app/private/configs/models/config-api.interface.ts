import { ConfigItf } from './config.interface';

export interface getConfigItf {
  ok: boolean;
  config: ConfigItf;
}

export interface getConfigsItf {
  ok: boolean;
  configs: onlyConfigsInfoItf;
}
export interface createUpdateConfigItf {
  ok: boolean;
  msg: string;
  config: ConfigItf;
}

export interface deleteConfigItf {
  ok: boolean;
  msg: string;
}

export interface onlyConfigsInfoItf {
  configs: ConfigItf[];
  pages: number[];
  longitud: number;
  next: any; //number | {}
  previous: any; //number | {}
}
