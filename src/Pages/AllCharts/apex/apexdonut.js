import React from "react"
import ReactApexChart from "react-apexcharts"

const RadialChartData = {
  options: {
    plotOptions: {
      radialBar: {
        hollow: {
          size: "45%",
        },
        dataLabels: {
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["rgb(2, 164, 153)"],
    labels: [""],
  },
  series: [80],
}

const RadialChart = () => {
  return(
    <React.Fragment>
        <ReactApexChart
          options={RadialChartData.options}
          series={RadialChartData.series}
          type="radialBar"
          height="143"
        />
      </React.Fragment>
  )
}


export default RadialChart;