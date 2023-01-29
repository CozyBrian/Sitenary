import { IEventsResponse, IViewsDataSet } from "../types";

export function reduceData(data: IEventsResponse): IViewsDataSet[] {
  const dates: { [key: string]: { count: number; ips: string[] } } = {};
  data.items.forEach((item) => {
    const date = item.createdAt.slice(0, 10);
    if (dates[date]) {
      if (!dates[date].ips.includes(item.ip)) {
        dates[date].ips.push(item.ip);
      }
      dates[date].count++;
    } else {
      dates[date] = { count: 1, ips: [item.ip] };
    }
  });

  const entries = Object.entries(dates);

  // Get the highest date
  // const highestDate = new Date(
  //   Math.max(
  //     ...entries.map(([date]) => {
  //       const time = new Date(date);
  //       return Date.parse(time.toDateString());
  //     })
  //   )
  // );
  const highestDate = new Date(Date.now());

  // Add entries for 6 days before the highest date
  for (let i = 1; i <= 7; i++) {
    const currentDate = new Date(highestDate);
    currentDate.setDate(highestDate.getDate() - i + 1);
    const dateString = currentDate.toISOString().slice(0, 10);
    if (!dates[dateString]) {
      entries.push([dateString, { count: 0, ips: [] }]);
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
