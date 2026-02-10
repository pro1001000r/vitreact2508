export interface IChildrenVit {
  children: React.ReactNode;
}

export interface IObmen {
  id: number;
  tableName: string;
  tableId: number;
}

export interface ITableBase {
  id?: number;
  name: string;
  code1c?: string | null;
}

//интерфейсы таблиц
export interface ICompositions extends ITableBase {}

export interface IStorage extends ITableBase {}

export interface IProductsColor extends ITableBase {}

export interface IProductsSize extends ITableBase {}

export interface IPlace extends ITableBase {
  storage_id?: number;
}

export interface IProducts extends ITableBase {
  article?: number;
  unit?: string;
  nameNew?: string;
  price?: number;
  compositions_id?: number;
  foto?: string;
}

export interface IStocktaking {
  id?: number;
  code1c?: string | null;
  date?: string;
  products_id?: number;
  productsColor_id?: number | undefined;
  productsSize_id?: number | undefined;
  count?: number;
  users_id?: number;
  storage_id?: number;
  place_id?: number | undefined;
}

export interface IBarcode {
  id?: number;
  name: string;
  products_id: number;
  productsColor_id?: number;
  productsSize_id?: number;
}

export interface IFotos {
  id?: number;
  tableName: string;
  tableId: number;
  foto: string;
  foto64: string;
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

export interface IUserSession {
  id: number | undefined;
  name: string;
  status: string;
  telefon: string | undefined;
  active: boolean;
  storage_id: number | undefined;
  place_id: number | undefined;
}

// перечисление команд для обмена
export enum ICommand {
  GetTable = "GetTable",
  GetFotos = "GetFotos",
  GetTableById = "GetTableById",
  test = "test",
  GetProperty = "GetProperty",
  CreateTableItem = "CreateTableItem",
  UpdateTableById = "UpdateTableById",
  DeleteTableById = "DeleteTableById",
  DeleteFotosById = "DeleteFotosById",
  Auth = "Auth",
}

export interface IDataUrl {
  command: ICommand | string;
  data: {};
}

export interface IGetTable extends IDataUrl {
  command: ICommand.GetTable;
  data: { tableName: string };
}

export interface IAuth extends IDataUrl {
  command: ICommand.Auth;
  data: { login: string; pass: string };
}

export interface IGetTableById extends IDataUrl {
  command: ICommand.GetTableById;
  data: { tableName: string; tableId: number };
}

export interface IGetFotos extends IDataUrl {
  command: ICommand.GetFotos;
  data: { tableName: string; tableId: number };
}

export interface IGetProperty extends IDataUrl {
  command: ICommand.GetProperty;
  data: { tableName: string; tableId: number; property: string };
}

export interface ICreateTableItem extends IDataUrl {
  command: ICommand.CreateTableItem;
  data: { tableName: string; vp: IProducts | IUsers | IStocktaking };
}

export interface IUpdateTableById extends IDataUrl {
  command: ICommand.UpdateTableById;
  data: {
    tableName: string;
    tableId: number;
    vp: IProducts | IUsers | unknown;
  };
}
export interface IDeleteTableById extends IDataUrl {
  command: ICommand.DeleteTableById;
  data: { tableName: string; tableId: number };
}
export interface IDeleteFotosById extends IDataUrl {
  command: ICommand.DeleteFotosById;
  data: { tableId: number };
}
