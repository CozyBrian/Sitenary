import { setDay, subDays, subMonths, subWeeks, subYears } from "date-fns";
import { EVENT, PeriodType, SITE_TYPE } from "../../types";
import Site from "../site/site.mongo";

export const sendEvent = async (event: EVENT, siteId: string) => {
  const item = await Site.findById(siteId);
 
  // item?.events.create(event);
  item?.events.push(event);
  item?.save();

  return item;
};

export const getSiteEvents = async (site: SITE_TYPE, period: PeriodType) => {
  const item = await Site.findOne({ url: site.url }) || await Site.findById(site._id);

  switch (period) {
    case "short":
      return item?.events.filter((item) => {
        const now = Date.now();
        return item.createdAt > subWeeks(now, 1);
      });

    case "medium":
      return item?.events.filter((item) => {
        const now = Date.now();
        return item.createdAt > subMonths(now, 1);
      });

    case "long":
      return item?.events.filter((item) => {
        const now = Date.now();
        return item.createdAt > subMonths(now, 3);
      });

    case "2xlonger":
      return item?.events.filter((item) => {
        const now = Date.now();
        return item.createdAt > subMonths(now, 6);
      });
    
    case "longest":
      return item?.events.filter((item) => {
        const now = Date.now();
        return item.createdAt > subYears(now, 1);
      });
 
    default:
      return item?.events.filter((item) => {
        const now = Date.now();
        return item.createdAt > subWeeks(now, 1);
      });
  }

};