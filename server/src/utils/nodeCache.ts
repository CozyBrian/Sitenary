import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache();

export default (duration: number) => (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "GET") {
    console.error("Cannot cache non-GET requests");
    return next();
  }
  
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log("Serving from cache");
    return res.send(cachedResponse);
  } else {
    console.log("Serving from API");
    return next();
  }
};

export const saveCache = (duration: number = 30, key: string, body: any) => {
  cache.set(key, JSON.stringify(body), duration);
}