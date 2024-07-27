import React, { useEffect, useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import ReactPlayer from "react-player";
import useAxios from "../../utils/useAxios";
import { useParams } from "react-router-dom";
import moment from "moment";

function InstructorCourseDetail() {
  const param = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    useAxios()
      .get(`teacher/course-detail/${param.course_id}/`)
      .then((res) => {
        setCourse(res.data);
      });

  }, [param.course_id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const renderFile = (file) => {
    const fileType = file.split(".").pop().toLowerCase();
    switch (fileType) {
      case "mp4":
      case "webm":
        return <ReactPlayer url={file} width="100%" controls />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <img src={file} alt="Content" width="100%" />;
      case "pdf":
        return (
          <embed
            src={file}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        );
      default:
        return (
          <a href={file} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        );
    }
  };

  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          <Header />
          <div className="row mt-0 mt-md-4">
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <section className="bg-blue py-7">
                <div className="container">
                  <h3>{course.title}</h3>
                  <p>{course.category.title}</p>
                  {course.file && (
                    <ReactPlayer
                      url={course.file}
                      width="100%"
                      height={600}
                      controls
                    />
                  )}
                </div>
              </section>
              <section className="mt-4">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="card shadow rounded-2 p-0 mt-n5">
                        <div className="card-header border-bottom px-4 pt-3 pb-0">
                          <h3>Course Description</h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: course.description,
                            }}
                          ></p>
                        </div>
                        <div className="card-body p-sm-4">
                          <h4>Curriculum</h4>
                          <div
                            className="accordion accordion-icon accordion-border"
                            id="accordionExample2"
                          >
                            {course?.curriculum?.map(
                              (section, sectionIndex) => {
                                return (
                                  <div
                                    className="accordion-item mb-3"
                                    key={section.id}
                                  >
                                    <h6
                                      className="accordion-header font-base"
                                      id={`heading-${sectionIndex}`}
                                    >
                                      <button
                                        className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${sectionIndex}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse-${sectionIndex}`}
                                      >
                                        {section.title}
                                        <span className="small ms-0 ms-sm-2">
                                          ({section.items.length} Lectures)
                                        </span>
                                      </button>
                                    </h6>
                                    <div
                                      id={`collapse-${sectionIndex}`}
                                      className="accordion-collapse collapse"
                                      aria-labelledby={`heading-${sectionIndex}`}
                                      data-bs-parent="#accordionExample2"
                                    >
                                      <div className="accordion-body mt-3">
                                        {section.items.map((item) => (
                                          <>
                                            <div
                                              className="d-flex justify-content-between align-items-center"
                                              key={item.id}
                                            >
                                              <div className="position-relative d-flex align-items-center">
                                                <a
                                                  href="#"
                                                  className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"
                                                >
                                                  <i className="fas fa-play me-0" />
                                                </a>
                                                <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
                                                  {item.title}
                                                </span>
                                              </div>
                                              {item.file && <ReactPlayer url={item.file} width="100%" controls />}
                                              <p className="mb-0">
                                                {item?.duration}
                                              </p>
                                            </div>
                                            <hr />
                                          </>
                                          // <div
                                          //   className="mb-2 mt-2 shadow p-2 rounded-3"
                                          //   style={{
                                          //     border: "1px #bdbdbd solid",
                                          //   }}
                                          //   key={item.id}
                                          // >
                                          //   <h6>{item.title}</h6>
                                          //   <p>{item.description}</p>
                                          //   {item.file && renderFile(item.file)}
                                          // </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default InstructorCourseDetail;
