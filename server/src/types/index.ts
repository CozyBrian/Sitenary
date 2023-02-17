export type EVENT = {
  _id?: string;
  type: "VIEW" | "URI_PATH";
  createdAt: Date;
  ip?: string;
  origin?: string;
  platform?: string;
}

export type SITE_TYPE = {
  _id?: string;
  events?: EVENT[];
  owner: string;
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

export interface IEventsResponse {
  period: string;
  items: IEvent[];
}

export interface IViewsDataSet {
  date: string;
  count: number;
  uniqueIPs: number;
}

export type PeriodType = "short" | "medium" | "long" | "2xlonger" | "longest" | undefined;

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  createdAt: Date;
  username: string;
  phone: string;
}

export interface IUserPayload {
  id: string;
  email: string;
}

export type IOUser = Partial<IUser>;