export interface categItf {
  category: string;
  icon: string;
}

export interface ConfigItf {
  id: string;
  title: string;
  categories: categItf[];
  logo: string;
  serie: number;
  correlative: string;
}
