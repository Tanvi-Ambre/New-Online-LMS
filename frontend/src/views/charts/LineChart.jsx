/* eslint-disable react/prop-types */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  // Ensure data is not undefined or null
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Prepare chart data
  const chartData = {
    labels: data.map(e => moment().month(e.month - 1).format('MMMM')), // X-axis labels (Months)
    datasets: [
      {
        label: 'Monthly Earnings',
        data: data.map(e => e.total_earning), // Y-axis data (Earnings)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.raw.toFixed(2)}`; // Format tooltip value
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Earnings ($)',
        },
        ticks: {
          callback: function(value) {
            return `$${value.toFixed(2)}`; // Format y-axis values
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
