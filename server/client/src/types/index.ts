export interface ISite {
  _id: string;
  name: string;
  url: string;
}

export interface IEvent {
  _id: string;
  type: string;
  ip: string;
  origin: string;
  createdAt: string;
  platform: string;
}

export type PeriodType =
  | "short"
  | "medium"
  | "long"
  | "2xlonger"
  | "longest"
  | undefined;

export interface IEventsResponse {
  period: "short" | "medium" | "long" | "2xlonger" | "longest";
  dataSet: IViewsDataSet[];
  origins: {
    [key: string]: number;
  };
  platforms: {
    [key: string]: number;
  };
}

export type ICount = {
  [key: string]: number;
};

export interface IViewsDataSet {
  date: string;
  count: number;
  uniqueIPs: number;
}
