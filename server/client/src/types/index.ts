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
  period: string;
  items: IEvent[];
}

export interface IViewsDataSet {
  date: string;
  count: number;
  uniqueIPs: number;
  platforms: { [key: string]: number };
  origins: { [key: string]: number };
}
