import { EVENT, SITE_TYPE } from "../../types";
import Site from "../site/site.mongo";

export const sendEvent = async (event: EVENT, site: SITE_TYPE) => {
  const item = await Site.findOne({ url: site.url });
 
  item?.events.create(event);
  item?.events.push(event);
  item?.save();

  return item;
};