export type EVENT = {
  type: "VIEW" | "URI_PATH";
  createdAt: Date;
  ip?: string | undefined;
  uriPath?: string | undefined;
  userAgent?: string | undefined;
  platform?: string | undefined;
}

export type SITE_TYPE = {
  name: string;
  url: string;
}