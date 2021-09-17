import { SettingItf } from './setting.interface';

export interface getSettingItf {
  ok: boolean;
  setting: SettingItf;
}

export interface getSettingsItf {
  ok: boolean;
  settings: onlySettingsInfoItf;
}
export interface createUpdateSettingItf {
  ok: boolean;
  msg: string;
  setting: SettingItf;
}

export interface deleteSettingItf {
  ok: boolean;
  msg: string;
}

export interface onlySettingsInfoItf {
  settings: SettingItf[];
  pages: number[];
  longitud: number;
  next: any; //number | {}
  previous: any; //number | {}
}
