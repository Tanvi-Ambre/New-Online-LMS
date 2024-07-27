import React, { useEffect, useRef } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const CoursesChart = ({ pieData, barData, onBarClick, centerChart, showRatingCounts, selectedCourse, onToggleView }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const handleBarClick = (elements) => {
    if (elements.length > 0) {
      const courseTitle = barData.labels[elements[0].index];
      onBarClick(courseTitle);
    }
  };

  return (
    <div style={{ textAlign: centerChart ? "center" : "left", height: "50vh" }}>
      <button onClick={onToggleView}>
        {showRatingCounts ? "Show Bar Chart" : "Show Pie Chart"}
      </button>
      {showRatingCounts && selectedCourse ? (
        <div style={{ height: "100%" }}>
          <h3>{selectedCourse.title} - Rating Counts</h3>
          <Pie
            data={pieData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  formatter: (value, context) => {
                    return `${value} (${context.chart.data.labels[context.dataIndex]})`;
                  },
                  color: '#fff',
                },
              },
            }}
            ref={chartRef}
          />
        </div>
      ) : (
        <div style={{ height: "100%" }}>
          <h3>Average Ratings</h3>
          <Bar
            data={barData}
            options={{
              onClick: (event, elements) => handleBarClick(elements),
              responsive: true,
            }}
            ref={chartRef}
          />
        </div>
      )}
    </div>
  );
};

export default CoursesChart;
