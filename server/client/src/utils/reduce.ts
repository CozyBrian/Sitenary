import { IEventsResponse, IViewsDataSet } from "../types";

export function reduceData(data: IEventsResponse): IViewsDataSet[] {
  const dates: {
    [key: string]: {
      count: number;
      ips: string[];
      platforms: { [key: string]: number };
      origins: { [key: string]: number };
    };
  } = {};
  data.items.forEach((item) => {
    const date = item.createdAt.slice(0, 10);
    if (dates[date]) {
      if (!dates[date].ips.includes(item.ip)) {
        dates[date].ips.push(item.ip);
      }
      dates[date].count++;
      if (dates[date].platforms[item.platform]) {
        dates[date].platforms[item.platform]++;
      } else {
        dates[date].platforms[item.platform] = 1;
      }
      if (dates[date].origins[item.origin]) {
        dates[date].origins[item.origin]++;
      } else {
        dates[date].origins[item.origin] = 1;
      }
    } else {
      dates[date] = {
        count: 1,
        ips: [item.ip],
        platforms: { [item.platform]: 1 },
        origins: { [item.origin]: 1 },
      };
    }
  });

  const entries = Object.entries(dates);

  // Get the highest date
  const highestDate = new Date(Date.now());

  // Add entries for 6 days before the highest date
  for (let i = 0; i <= 6; i++) {
    const currentDate = new Date(highestDate);
    currentDate.setDate(highestDate.getDate() - i);
    const dateString = currentDate.toISOString().slice(0, 10);
    if (!dates[dateString]) {
      entries.push([
        dateString,
        { count: 0, ips: [], platforms: {}, origins: {} },
      ]);
    }
  }

  // Sort the entries by date
  entries.sort(
    (a, b) =>
      Date.parse(new Date(a[0]).toDateString()) -
      Date.parse(new Date(b[0]).toDateString())
  );

  return entries.map(([date, { count, ips, platforms, origins }]) => ({
    date,
    count,
    uniqueIPs: ips.length,
    platforms,
    origins,
  }));
}

export const countProperty = (
  data: IEventsResponse,
  property: "platform" | "origin"
) => {
  const platforms = new Set(data.items.map((item) => item[property]));
  const counts: { [key: string]: number } = {};

  platforms.forEach((platform) => {
    counts[platform] = data.items.filter(
      (item) => item[property] === platform
    ).length;
  });

  return counts;
};

export type ICount = ReturnType<typeof countProperty>;
