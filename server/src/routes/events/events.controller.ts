import { Request, Response } from "express";
import { sendEvent } from "../../models/event/event.model";
import { isSiteExists } from "../../models/site/site.model";
import { EVENT, SITE_TYPE } from "../../types";

export const getEvents = (req: Request, res: Response) => {};

export const postEvent = async (req: Request, res: Response) => {
  const event = req.body.event as EVENT;
  const site = req.body.site as SITE_TYPE;

  if (await isSiteExists(site.url)) {
    const sentEvent = await sendEvent(event, site)
    res.status(200).json(sentEvent);
  } else {
    res.status(400).json({ error: "Site not found" });
  }

};
