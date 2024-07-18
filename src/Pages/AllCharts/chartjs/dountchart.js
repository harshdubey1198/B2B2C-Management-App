import React from "react";
import { Doughnut } from "react-chartjs-2";

import 'chart.js/auto';
import { Chart, CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const DountChart = () => {
  
  const data = {
    labels: ["Drixo", "Upclub", "Vakavia", "Devazo"],
    
    datasets: [
      {
        data: [21, 16, 48, 31],
        backgroundColor: ['#3d8ef8', '#7c8a96', '#11c46e', '#f1b44c'],
        borderColor: ['#3d8ef8', '#7c8a96', '#11c46e', '#f1b44c'],
      },
      
    ],
  }
  
  const option = {
    responsive: true,
    cutoutPercentage: 70,
    animation: {
        animateScale: true,
        animateRotate: true
    }
  };


  return (
    <React.Fragment>
      <Doughnut width={537} height={268} data={data} options={option} className="chartjs-chart" />
    </React.Fragment> 
  )
}

export default DountChart;



