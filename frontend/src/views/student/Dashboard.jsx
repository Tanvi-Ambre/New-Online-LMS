import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchData = () => {
    setFetching(true);
    useAxios()
      .get(`student/summary/${UserData()?.user_id}/`)
      .then((res) => {
        setStats(res.data[0]);
      });

    useAxios()
      .get(`student/course-list/${UserData()?.user_id}/`)
      .then((res) => {
        setCourses(res.data);
        setFetching(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    if (query === "") {
      fetchData();
    } else {
      const filtered = courses.filter((c) => {
        return c.course.title.toLowerCase().includes(query);
      });
      setCourses(filtered);
    }
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
                      <i className="fas fa-tv fa-fw" />
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
                      <i className="fas fa-clipboard-check fa-fw" />
                    </span>
                    <div className="ms-4">
                      <div className="d-flex">
                        <h5 className="purecounter mb-0 fw-bold">
                          {" "}
                          {stats.completed_lessons}
                        </h5>
                      </div>
                      <p className="mb-0 h6 fw-light">Complete lessons</p>
                    </div>
                  </div>
                </div>
                {/* Counter item */}
                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                  <div className="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
                    <span className="display-6 lh-1 text-success mb-0">
                      <i className="fas fa-medal fa-fw" />
                    </span>
                    <div className="ms-4">
                      <div className="d-flex">
                        <h5 className="purecounter mb-0 fw-bold">
                          {" "}
                          {stats.achieved_certificates}
                        </h5>
                      </div>
                      <p className="mb-0 h6 fw-light">Achieved Certificates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* {fetching === true && <p className="mt-3 p-3">Loading...</p>} */}

              
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Dashboard;
