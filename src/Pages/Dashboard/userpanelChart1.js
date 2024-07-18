import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart1 = () => {
    const series = [72];
    const radialoptions = {
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#0ab39c'],
        stroke: {
            lineCap: 'round'
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '70%'
                },
                track: {
                    margin: 0,
                },
    
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: 5,
                        show: true
                    }
                }
            }
        }
    };
  return(
    <React.Fragment>
        <ReactApexChart
          options={radialoptions}
          series={series}
          type="radialBar"
          height="72"
          width= "72"

        />
      </React.Fragment>
  )
}

export default RadialChart1;
