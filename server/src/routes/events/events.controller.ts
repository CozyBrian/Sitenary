import { Request, Response } from "express";
import requestIp from 'request-ip';
import { getSiteEvents, sendEvent } from "../../models/event/event.model";
import { isSiteExists } from "../../models/site/site.model";
import { EVENT, IEventsResponse, PeriodType } from "../../types";
import { saveCache } from "../../utils/nodeCache";
import UAParser from "ua-parser-js";
import { countProperty, reduceData } from "../../utils/reduce";

export const getEvents = async (req: Request, res: Response) => {
  const siteId = req.params.id;
  const periodQ = req.query.period as PeriodType;

  let period = periodQ === "short" ||
  periodQ === "medium" || 
  periodQ === "long" ||
  periodQ === "longest" ||
  periodQ === "2xlonger" ? periodQ : "short";

  if (await isSiteExists(siteId) && siteId !== "undefinded") {
    const siteEvents = await getSiteEvents({ _id: siteId, url: "null", name: "null", owner: req.user!.id }, period);
    const responseItem = { period: period, items: siteEvents };
    const responseItemString = JSON.stringify(responseItem);
    const responseItemParsed: IEventsResponse = JSON.parse(responseItemString);

    const computedData = { 
      period: period, 
      dataSet: reduceData(responseItemParsed), 
      origins: countProperty(responseItemParsed, "origin"), 
      platforms: countProperty(responseItemParsed, "platform")
    };

    saveCache(30, req.originalUrl, computedData);
    res.status(200).send(computedData);
  } else {
    res.status(400).send({ error: "Site not found" });
  }

};

export const postEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = req.body.event as EVENT;

  if (await isSiteExists(id)) {
    let clientIp = requestIp.getClientIp(req);
    const UserAgent = req.headers["user-agent"];
    const ua = UAParser(UserAgent);
    await sendEvent({ip: clientIp!, platform: ua.os.name , ...event}, id)
    res.status(200).send("Success");
  } else {
    res.status(400).send({ error: "Site not found" });
  }

};

export const getIp = async (req: Request, res: Response) => {
  let clientIp = requestIp.getClientIp(req)
  res.status(200).send({ ip: clientIp });
}