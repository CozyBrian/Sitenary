export interface ISite {
  _id: string;
  name: string;
  url: string;
}

export interface IEvent {
  _id: string;
  type: string;
  ip: string;
  platform: string;
  createdAt: string;
}

export type PeriodType =
  | "short"
  | "medium"
  | "long"
  | "2xlonger"
  | "longest"
  | undefined;

export interface IEventsResponse {
  period: string;
  items: IEvent[];
}

export interface IViewsDataSet {
  date: string;
  count: number;
  uniqueIPs: number;
}
