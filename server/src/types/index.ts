export type EVENT = {
  _id?: string;
  type: "VIEW" | "URI_PATH";
  createdAt: Date;
  ip?: string;
  uriPath?: string;
  userAgent?: string;
  platform?: string;
}

export type SITE_TYPE = {
  _id?: string;
  events?: EVENT[];
  name: string;
  url: string;
}

export type PeriodType = "short" | "medium" | "long" | "2xlonger" | "longest" | undefined;