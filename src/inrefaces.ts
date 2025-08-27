export interface ITableBase {
  id?: number;
  name: string;
  code1c?: string | null;
}

export interface ICompositions extends ITableBase {}

export interface IStorage extends ITableBase {}

export interface IProductsColor extends ITableBase {}

export interface IProductsSize extends ITableBase {}

export interface IPlace extends ITableBase {
  storage_id?: number;
}

export interface IObmen {
  id: number;
  tableName: string;
  tableId: number;
}

export interface IProducts extends ITableBase {
  article?: number;
  unit?: string;
  nameNew?: string;
  price?: number;
  compositions_id?: number;
}

export interface IStocktaking {
  id?: number;
  code1c?: string | null;
  date: string;
  products_id: number;
  productsColor_id?: number;
  productsSize_id?: number;
  count: number;
  users_id: number;
  storage_id?: number;
  place_id?: number;
}

export interface IBarcode {
  id?: number;
  name: string;
  products_id: number;
  productsColor_id?: number;
  productsSize_id?: number;
}

export interface IUsers {
  id?: number;
  code1c?: string | null;
  name: string;
  login: string;
  password: string;
  status: string;
  active: boolean;

  telefon?: string;
  storage_id?: number;
  place_id?: number;
}

// перечисление комманд для обмена
export enum ICommand {
  GetTable = 'GetTable',
  test = 'test',
}

export interface IDataUrl {
  command: ICommand;
  data: {};
}
