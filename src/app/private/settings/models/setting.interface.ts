export interface categItf {
  collection: string;
  name: string;
  icon: string;
}

export interface SettingItf {
  id: string;
  title: string;
  categories: categItf[];
  logo: string;
  serie: number;
  correlative: string;
}
