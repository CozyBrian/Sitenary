import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

type BarChartProps = {
  chartData: ChartData<"bar">;
};

const BarChart = ({ chartData }: BarChartProps) => {
  return (
    <Bar
      data={chartData}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default BarChart;
