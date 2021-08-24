import { VarietyItf } from './variety.interface';

export interface getVarietyItf {
  ok: boolean;
  variety: VarietyItf;
}

export interface getVarietiesItf {
  ok: boolean;
  varieties: onlyVarietiesInfoItf;
}
export interface createUpdateVarietyItf {
  ok: boolean;
  msg: string;
  variety: VarietyItf;
}

export interface deleteVarietyItf {
  ok: boolean;
  msg: string;
}

export interface onlyVarietiesInfoItf {
  varieties: VarietyItf[];
  pages: number[];
  longitud: number;
  next: any; //number | {}
  previous: any; //number | {}
}
