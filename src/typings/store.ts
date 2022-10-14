interface IStore {
  enum: EnumStore;
}

interface EnumStore {
  vsTypes: IEnum[];
}

interface IEnum {
  code: string | number;
  codeName: string;
}
