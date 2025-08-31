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

// перечисление команд для обмена
export enum ICommand {
  GetTable = "GetTable",
  GetTableById = "GetTableById",
  test = "test",
  GetProperty = "GetProperty",
  CreateTableItem = "CreateTableItem",
  UpdateTableById = "UpdateTableById",
}

export interface IDataUrl {
  command: ICommand;
  data: {};
}


export interface IGetTable  extends IDataUrl{
  command: ICommand.GetTable;
  data: { tableName: string };
}

export interface IGetTableById extends IDataUrl{
  command: ICommand.GetTableById;
  data: { tableName: string; tableId: number };
}

export interface IGetProperty extends IDataUrl{
  command: ICommand.GetProperty;
  data: { tableName: string; tableId: number; property: string };
}

export interface ICreateTableItem extends IDataUrl{
  command: ICommand.CreateTableItem;
  data: { tableName: string; vp: IProducts|IUsers };
}

export interface IUpdateTableById extends IDataUrl{
  command: ICommand.UpdateTableById;
  data: { tableName: string; tableId:number; vp: IProducts|IUsers|unknown  };
}

