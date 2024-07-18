import React from "react"; 
import ReactApexChart from "react-apexcharts";  

const DashedLineData = {
  series: [
    {
      name: "series1",
      data: [34, 40, 28, 52, 42, 109, 100],
    },
    {
      name: "series2",
      data: [32, 60, 34, 46, 34, 52, 41],
    },
  ],
  options: {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: ["rgb(239, 242, 247)","rgb(61, 142, 248)"],
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00",
        "2018-09-19T01:30:00",
        "2018-09-19T02:30:00",
        "2018-09-19T03:30:00",
        "2018-09-19T04:30:00",
        "2018-09-19T05:30:00",
        "2018-09-19T06:30:00",
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
}


const DashedLine = () => {
  return(
    <React.Fragment>
        <ReactApexChart
          options={DashedLineData.options}
          series={DashedLineData.series}
          type="area"
          height="350"
          className="apex-charts"
        />
      </React.Fragment>
  )
}

export default DashedLine;
