import { subDays, subMonths } from "date-fns";
import { IEventsResponse, IViewsDataSet } from "../types";


interface datesValue {count: number;ips: string[];}
export function reduceData(data: IEventsResponse): IViewsDataSet[] {
  const dates = new Map<string, datesValue>()
  data.items.forEach((item) => {
    const date = () => {
      switch (data.period) {
        case "short":
          return item.createdAt.slice(0, 10);
          
        case "medium":
          return item.createdAt.slice(0, 10);
          
        case "long":
          return item.createdAt.slice(5, 7);

        default:
          return item.createdAt.slice(0, 10);
      }
    };
    
    if (dates.has(date())) {
      let dateitem = dates.get(date())!;
      if (!dateitem.ips.includes(item.ip)) {
        dateitem.ips.push(item.ip);
      }
      dateitem.count++;
      dates.set(date(), dateitem);
    } else {
      dates.set(date(),
      {
        count: 1,
        ips: [item.ip],
      }
      );
    }
  });

  console.log("dates: ", dates);

  const inter_dates = Object.fromEntries(dates);
  const entries = Object.entries(inter_dates);
  console.log("Entries: ",entries);
  

  // Get the highest date
  const highestDate = () => {
    switch (data.period) {
      case "short":
        return new Date(Date.now());

      case "medium":
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
      default:
        return new Date(Date.now());
    }
  };

  const daysbefore = () => {
    switch (data.period) {
      case "short":
        return 6;
        
      case "medium":
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - 1;

      case "long":
        return 5;
        
      default:
        return 6;
    }
  }

  // Add entries for 6 days before the highest date
  for (let i = 0; i <= daysbefore(); i++) {
    let currentDate = new Date(highestDate());
    
    const currentDateModified = () => {
      switch (data.period) {
        case "short":
          return subDays(currentDate, i);
          
        case "medium":
          return subDays(currentDate, i);
          
        case "long":
          return subMonths(currentDate, i)
          
        default:
          return subDays(currentDate, i);
      }
    };


    const dateString = () => {
      switch (data.period) {
        case "short":
          return currentDateModified().toISOString().slice(0, 10);
        
        case "medium":
          return currentDateModified().toISOString().slice(0, 10);

        case "long":
          return currentDateModified().toISOString().slice(5, 7);
        
        default:
          return currentDateModified().toISOString().slice(0, 10);
      }
    };
    if (!dates.has(dateString())) {
      entries.push([dateString(), { count: 0, ips: [] }]);
    }
  }

  // Sort the entries by date
  entries.sort(
    (a, b) =>
      Date.parse(new Date(a[0]).toDateString()) -
      Date.parse(new Date(b[0]).toDateString())
  );

  return entries.map(([date, { count, ips }]) => ({
    date,
    count,
    uniqueIPs: ips.length,
  }));
}

export const countProperty = (
  data: IEventsResponse,
  property: "platform" | "origin"
) => {
  const platforms = new Set(data.items.map((item) => item[property]));
  const counts: { [key: string]: number } = {};

  platforms.forEach((platform) => {
    counts[platform!] = data.items.filter(
      (item) => item[property] === platform
    ).length;
  });

  return counts;
};

export type ICount = ReturnType<typeof countProperty>;
