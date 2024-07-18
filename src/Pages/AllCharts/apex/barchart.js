import React from "react"
import ReactApexChart from "react-apexcharts"

const barchartData = {
  series: [
    {
      data: [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },

    colors: ["rgba(124, 138, 150, 0.85)"],
    grid: {
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany",
      ],
    },
  },
}

const barchart = () => {
  return(
    <React.Fragment>
        <ReactApexChart
          options={barchartData.options}
          series={barchartData.series}
          type="bar"
          height="350"
          className="apex-charts"
        />
      </React.Fragment>
  )
}

export default barchart;