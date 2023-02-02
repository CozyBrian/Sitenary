import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

type DoughnutChartProps = {
  chartData: ChartData<"doughnut">;
};

const DoughnutChart = ({ chartData }: DoughnutChartProps) => {
  return (
    <Doughnut
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

export default DoughnutChart;
