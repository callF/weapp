interface ICommonListParams {
  pageSize?: number;
  pageNum?: number;
}

interface ICommon {
  id?: string | number;
  name?: string | number;
  [key: string]: any;
}

interface IDetailItem {
  label?: any;
  value?: any;
  [key: string]: any;
}

interface ISection {
  tit: string;
  contentEle: React.ReactNode;
  onClick?: any;
}
