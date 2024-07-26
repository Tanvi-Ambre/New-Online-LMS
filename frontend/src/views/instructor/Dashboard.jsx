import { useState, useEffect } from "react";
import moment from "moment";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import CoursesChart from "../charts/CoursesChart";
import Spinner from "./Partials/Spinner";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [averageRatings, setAverageRatings] = useState([]);
  const [showRatingCounts, setShowRatingCounts] = useState(false);
  const [loading, setLoading] = useState(true)

  const fetchCourseData = () => {
    setLoading(true);
    useAxios()
      .get(`teacher/summary/${UserData()?.teacher_id}/`)
      .then((res) => {
        console.log(res.data[0]);
        setStats(res.data[0]);
      });

    useAxios()
      .get(`teacher/course-lists/${UserData()?.teacher_id}/`)
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);

        // Calculate average ratings for each course
        const avgRatings = res.data
          .map((course) => {
            const totalRatings = course.reviews.reduce((acc, review) => acc + review.rating, 0);
            const avgRating = totalRatings / course.reviews.length;
            return { title: course.title, avgRating };
          })
          .filter((course) => !isNaN(course.avgRating)); // Filter out courses with no ratings
        setAverageRatings(avgRatings);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    console.log(query);
    if (query === "") {
      fetchCourseData();
    } else {
      const filtered = courses.filter((c) => {
        return c.title.toLowerCase().includes(query);
      });
      setCourses(filtered);
    }
  };

  const handleBarClick = (courseTitle) => {
    const selected = courses.find((course) => course.title === courseTitle);
    setSelectedCourse(selected);
    setShowRatingCounts(true);
  };

  const handleToggleView = () => {
    setShowRatingCounts(!showRatingCounts);
  };

  const ratingCounts = selectedCourse
    ? selectedCourse.reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {})
    : {};

  const ratingData = Object.keys(ratingCounts).map((rating) => ({
    rating: rating,
    count: ratingCounts[rating],
  }));

  const pieData = {
    labels: ratingData.map((data) => `Rating ${data.rating}`),
    datasets: [
      {
        data: ratingData.map((data) => data.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
        ],
      },
    ],
  };

  const barData = {
    labels: averageRatings.map((data) => data.title),
    datasets: [
      {
        label: "Average Rating",
        data: averageRatings.map((data) => data.avgRating),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <div className="row mb-4">
                <h4 className="mb-0 mb-4">
                  {" "}
                  <i className="bi bi-grid-fill"></i> Dashboard
                </h4>
                {/* Counter item */}

                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                  <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-10 rounded-3">
                    <span className="display-6 lh-1 text-orange mb-0">
                      <i className="fas fa-tv fa-fw text-warning" />
                    </span>
                    <div className="ms-4">
                      <div className="d-flex">
                        <h5 className="purecounter mb-0 fw-bold">
                          {stats.total_courses}
                        </h5>
                      </div>
                      <p className="mb-0 h6 fw-light">Total Courses</p>
                    </div>
                  </div>
                </div>
                {/* Counter item */}
                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                  <div className="d-flex justify-content-center align-items-center p-4 bg-danger bg-opacity-10 rounded-3">
                    <span className="display-6 lh-1 text-purple mb-0">
                      <i className="fas fa-graduation-cap text-danger fa-fw" />
                    </span>
                    <div className="ms-4">
                      <div className="d-flex">
                        <h5 className="purecounter mb-0 fw-bold">
                          {stats.total_students}
                        </h5>
                      </div>
                      <p className="mb-0 h6 fw-light">Total Students</p>
                    </div>
                  </div>
                </div>
                {/* Counter item */}
                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                  <div className="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
                    <span className="display-6 lh-1 text-success mb-0">
                      <i className="fas fa-dollar-sign fa-fw" />
                    </span>
                    <div className="ms-4">
                      <div className="d-flex">
                        <h5 className="purecounter mb-0 fw-bold">
                          ${stats.total_revenue?.toFixed(2)}
                        </h5>
                      </div>
                      <p className="mb-0 h6 fw-light">Total Revenue</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts component */}
              {loading ? (  // Display loading spinner while data is being fetched
                <Spinner />
              ) : (<CoursesChart
                pieData={pieData}
                barData={barData}
                onBarClick={handleBarClick}
                centerChart={true}
                showRatingCounts={showRatingCounts}
                selectedCourse={selectedCourse}
                onToggleView={handleToggleView}
              />)}
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Dashboard;
