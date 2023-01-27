import { Request, Response } from "express";
import { getSiteEvents, sendEvent } from "../../models/event/event.model";
import { isSiteExists } from "../../models/site/site.model";
import { EVENT, SITE_TYPE } from "../../types";

export const getEvents = async (req: Request, res: Response) => {
  const siteId = req.params.id;

  if (await isSiteExists(siteId)) {
    const siteEvents = await getSiteEvents({ _id: siteId, url: "null", name: "null" })
    res.status(200).send(siteEvents);
  } else {
    res.status(400).send({ error: "Site not found" });
  }
};

export const postEvent = async (req: Request, res: Response) => {
  const event = req.body.event as EVENT;
  const site = req.body.site as SITE_TYPE;

  if (await isSiteExists(site.url)) {
    const sentEvent = await sendEvent(event, site)
    res.status(200).send(sentEvent);
  } else {
    res.status(400).send({ error: "Site not found" });
  }

};
