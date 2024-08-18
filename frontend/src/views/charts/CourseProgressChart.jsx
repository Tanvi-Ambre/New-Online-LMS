import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import useAxios from '../../utils/useAxios';
import UserData from '../plugin/UserData';

function CourseProgressChart() {
  const [chartData, setChartData] = useState(null);
    const userId = UserData()?.user_id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useAxios().get(`student/course-progress/${userId}/`);
        const data = response.data.course_progress;

        const formattedData = {
          labels: data.map(course => course.course_title),
          datasets: [
            {
              label: 'Course Completion (%)',
              data: data.map(course => course.progress),
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        };
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching the course progress data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    
      <div className="chart">
        <h5>Course Progress Overview</h5>
        {chartData && (
          <Bar
            className="chart"
            data={chartData}
            options={{ scales: { y: { beginAtZero: true } } }}
          />
        )}
      </div>
    
  );
}

export default CourseProgressChart;
