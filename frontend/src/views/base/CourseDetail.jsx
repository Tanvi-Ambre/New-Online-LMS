/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePurchasedCoursesStore } from "../../store/courseStore"; // Import the Zustand store

import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import apiInstance from "../../utils/axios";
import { useAuthStore } from "../../store/auth";

function CourseDetail() {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCartBtn, setAddToCartBtn] = useState("Add To Cart");
  const [cartCount, setCartCount] = useContext(CartContext);
  const [selectedVideo, setSelectedVideo] = useState(null);
  //const country = GetCurrentAddress()
  // const [profile, setProfile] = useContext(ProfileContext);
  const { course_id } = useParams();

  const country = GetCurrentAddress().country;
  const { user } = useAuthStore((state) => ({ user: state.user })); // Access user data from useAuthStore
  const userId = user?.user_id;

  const purchasedCourses = usePurchasedCoursesStore(
    (state) => state.purchasedCourses
  );
  console.log("purchasedCourses", purchasedCourses);
  const setPurchasedCourses = usePurchasedCoursesStore(
    (state) => state.setPurchasedCourses
  );

  console.log("user", user);
  useEffect(() => {
    fetchCourse();
    if (userId) {
      fetchPurchasedCourses();
    }
  }, [course_id, userId]);

  const fetchPurchasedCourses = async () => {
    try {
      const response = await useAxios().get(`student/course-list/${userId}/`);
      setPurchasedCourses(response.data);
    } catch (error) {
      console.log("Failed to fetch purchased courses:", error);
    }
  };

  const isCoursePurchased = () => {
    return purchasedCourses.some(
      (purchasedCourse) => purchasedCourse.course_id === course.id
    );
  };

  const enrollNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("course_id", course.id);
    formData.append("user_id", userId);
    formData.append("price", course.price);
    formData.append("country_name", country);
    formData.append("cart_id", CartId());

    try {
      const response = await useAxios().post(`course/cart/`, formData);
      // Set cart count after adding to cart
      apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
        setCartCount(res.data?.length);
        //setAddToCartBtn("Added To Cart");
      });
      navigate("/cart/");
    } catch (error) {
      console.log(error);
      setAddToCartBtn("Add To Cart");
    }
  };

  const fetchCourse = async () => {
    try {
      const response = user
        ? await useAxios().get(`/course/course-detail/${course_id}/`)
        : await apiInstance.get(`/course/course-detail/${course_id}/`);
      setCourse(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const addToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("course_id", course.id);
    formData.append("user_id", userId);
    formData.append("price", course.price);
    formData.append("country_name", country);
    formData.append("cart_id", CartId());

    try {
      const response = await useAxios().post(`course/cart/`, formData);
      Toast().fire({
        title: "Added To Cart",
        icon: "success",
      });

      // Set cart count after adding to cart
      apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
        setCartCount(res.data?.length);
        setAddToCartBtn("Added To Cart");
      });
    } catch (error) {
      console.log(error);
      setAddToCartBtn("Add To Cart");
    }
  };

  const handlePlayClick = (videoUrl) => {
    //console.log("videoUrl", videoUrl)
    setSelectedVideo(videoUrl);
  };

  return (
    <>
      <BaseHeader />

      <>
        {isLoading === true ? (
          <p>
            Loading <i className="fas fa-spinner fa-spin"></i>
          </p>
        ) : (
          <>
            {/*Course Basic Info Header*/}
            <section className="bg-light py-0">
              <div className="container">
                <div className="row py-5">
                  <div className="col-lg-8">
                    {/* Title */}
                    <h1 className="mb-3">{course.title}</h1>
                    <p
                      className="mb-3"
                      dangerouslySetInnerHTML={{
                        __html: `${course?.description?.slice(0, 200)}`,
                      }}
                    ></p>
                    {/* Content */}
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                        <i className="fas fa-star text-warning me-2" />
                        {course.average_rating}/5
                      </li>
                      <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                        <i className="fas fa-user-graduate text-orange me-2" />
                        {course.students?.length} Enrolled
                      </li>
                      <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                        <i className="fas fa-signal text-success me-2" />
                        {course.level}
                      </li>
                      <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                        <i className="bi bi-patch-exclamation-fill text-danger me-2" />
                        {moment(course.date).format("DD MMM, YYYY")}
                      </li>
                      <li className="list-inline-item h6 mb-0">
                        <i className="fas fa-globe text-info me-2" />
                        {course.language}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className="pb-0 py-lg-5">
              <div className="container">
                <div className="row">
                  {/* Main content START */}
                  <div className="col-lg-8">
                    <div className="card shadow rounded-2 p-0">
                      {/* Tabs START */}
                      <div className="card-header border-bottom px-4 py-3">
                        <ul
                          className="nav nav-pills nav-tabs-line py-0"
                          id="course-pills-tab"
                          role="tablist"
                        >
                          {/* Tab item */}
                          <li
                            className="nav-item me-2 me-sm-4"
                            role="presentation"
                          >
                            <button
                              className="nav-link mb-2 mb-md-0 active"
                              id="course-pills-tab-1"
                              data-bs-toggle="pill"
                              data-bs-target="#course-pills-1"
                              type="button"
                              role="tab"
                              aria-controls="course-pills-1"
                              aria-selected="true"
                            >
                              Overview
                            </button>
                          </li>
                          {/* Tab item */}
                          <li
                            className="nav-item me-2 me-sm-4"
                            role="presentation"
                          >
                            <button
                              className="nav-link mb-2 mb-md-0"
                              id="course-pills-tab-2"
                              data-bs-toggle="pill"
                              data-bs-target="#course-pills-2"
                              type="button"
                              role="tab"
                              aria-controls="course-pills-2"
                              aria-selected="false"
                            >
                              Curriculum
                            </button>
                          </li>
                          {/* Tab item */}
                          <li
                            className="nav-item me-2 me-sm-4"
                            role="presentation"
                          >
                            <button
                              className="nav-link mb-2 mb-md-0"
                              id="course-pills-tab-3"
                              data-bs-toggle="pill"
                              data-bs-target="#course-pills-3"
                              type="button"
                              role="tab"
                              aria-controls="course-pills-3"
                              aria-selected="false"
                            >
                              Instructor
                            </button>
                          </li>
                          {/* Tab item */}
                          <li
                            className="nav-item me-2 me-sm-4"
                            role="presentation"
                          >
                            <button
                              className="nav-link mb-2 mb-md-0"
                              id="course-pills-tab-4"
                              data-bs-toggle="pill"
                              data-bs-target="#course-pills-4"
                              type="button"
                              role="tab"
                              aria-controls="course-pills-4"
                              aria-selected="false"
                            >
                              Reviews
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* Tabs END */}
                      {/* Tab contents START */}
                      <div className="card-body p-4">
                        <div
                          className="tab-content pt-2"
                          id="course-pills-tabContent"
                        >
                          {/* Content START */}
                          <div
                            className="tab-pane fade show active"
                            id="course-pills-1"
                            role="tabpanel"
                            aria-labelledby="course-pills-tab-1"
                          >
                            <h5 className="mb-3">Course Description</h5>
                            <p
                              className="mb-3"
                              dangerouslySetInnerHTML={{
                                __html: `${course?.description}`,
                              }}
                            ></p>

                            {/* Course detail END */}
                          </div>
                          {/* Content END */}
                          {/* Content START - course curriculum */}
                          <div
                            className="tab-pane fade"
                            id="course-pills-2"
                            role="tabpanel"
                            aria-labelledby="course-pills-tab-2"
                          >
                            {/* Course accordion START */}
                            <div
                              className="accordion accordion-icon accordion-bg-light"
                              id="accordionExample2"
                            >
                              {/* Item */}
                              {course?.curriculum?.map((c) => (
                                <div className="accordion-item mb-3" key={c.id}>
                                  <h6
                                    className="accordion-header font-base"
                                    id="heading-1"
                                  >
                                    <button
                                      className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#collapse-${c.variant_id}`}
                                      aria-expanded="true"
                                      aria-controls={`collapse-${c.variant_id}`}
                                    >
                                      {c.title}
                                    </button>
                                  </h6>
                                  <div
                                    id={`collapse-${c.variant_id}`}
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="heading-1"
                                    data-bs-parent="#accordionExample2"
                                  >
                                    <div className="accordion-body mt-3">
                                      {/* Course lecture */}
                                      {c.variant_items?.map((l) => (
                                        <>
                                          <div
                                            className="d-flex justify-content-between align-items-center"
                                            key={l.id}
                                          >
                                            <div className="position-relative d-flex align-items-center">
                                              <button
                                                className={`btn btn-${
                                                  l.preview
                                                    ? "danger"
                                                    : "secondary"
                                                }-soft btn-round btn-sm mb-0 stretched-link position-static`}
                                                onClick={() => {
                                                  if (l.preview) {
                                                    handlePlayClick(l.file);
                                                  }
                                                }}
                                                disabled={!l.preview} // Disable button if no preview
                                              >
                                                <i
                                                  className={`fas fa-${
                                                    l.preview ? "play" : "lock"
                                                  } me-0`}
                                                />
                                              </button>
                                              <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
                                                {l.title}
                                              </span>
                                            </div>
                                            <p className="mb-0">
                                              {c.content_duration}
                                            </p>
                                          </div>
                                          <hr />
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Course accordion END */}
                          </div>
                          {/* Content END */}
                          {/* Content START--instructor */}
                          <div
                            className="tab-pane fade"
                            id="course-pills-3"
                            role="tabpanel"
                            aria-labelledby="course-pills-tab-3"
                          >
                            {/* Card START */}
                            <div className="card mb-0 mb-md-4">
                              <div className="row g-0 align-items-center">
                                <div className="col-md-5">
                                  {/* Image */}
                                  <img
                                    src={course.teacher?.image}
                                    className="img-fluid rounded-3"
                                    alt="instructor-image"
                                    // onError={(e) => { e.target.onerror = null; e.target.src="http://127.0.0.1:8000/media/user_folder/66972e567f990_download_5gVFg07.jpg"; }}
                                  />
                                </div>
                                <div className="col-md-7">
                                  {/* Card body */}
                                  <div className="card-body">
                                    {/* Title */}
                                    <h3 className="card-title mb-0">
                                      {course.teacher?.full_name}
                                    </h3>
                                    <p className="mb-2">
                                      {course.teacher?.bio}
                                    </p>
                                    {/* Social button */}
                                    <ul className="list-inline mb-3">
                                      <li className="list-inline-item me-3">
                                        <a
                                          href={course.teacher?.twitter}
                                          className="fs-5 text-twitter"
                                        >
                                          <i className="fab fa-twitter-square" />
                                        </a>
                                      </li>
                                      <li className="list-inline-item me-3">
                                        <a
                                          href={course.teacher?.facebook}
                                          className="fs-5 text-facebook"
                                        >
                                          <i className="fab fa-facebook-square" />
                                        </a>
                                      </li>
                                      <li className="list-inline-item me-3">
                                        <a
                                          href={course.teacher?.linkedin}
                                          className="fs-5 text-linkedin"
                                        >
                                          <i className="fab fa-linkedin" />
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Card END */}
                            {/* Instructor info */}
                            <h5 className="mb-3">About Instructor</h5>
                            <p className="mb-3">{course.teacher?.about}</p>
                          </div>
                          {/* Content START--Reviews */}
                          <div
                            className="tab-pane fade"
                            id="course-pills-4"
                            role="tabpanel"
                            aria-labelledby="course-pills-tab-4"
                          >
                            {/* Review START */}
                            <div className="row mb-1">
                              <h5 className="mb-4">Our Student Reviews</h5>
                            </div>

                            <div className="row">
                              <div className="d-md-flex my-4">
                                <div className="avatar avatar-xl me-4 flex-shrink-0">
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-1.jpg"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                    alt="avatar"
                                  />
                                </div>

                                <div>
                                  <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                                    <h5 className="me-3 mb-0">Sam Jay</h5>

                                    <ul className="list-inline mb-0">
                                      <i className="fas fa-star text-warning" />
                                      <i className="fas fa-star text-warning" />
                                      <i className="fas fa-star text-warning" />
                                      <i className="fas fa-star text-warning" />
                                      <i className="far fa-star text-warning" />
                                    </ul>
                                  </div>

                                  <p className="small mb-2">5 days ago</p>
                                  <p className="mb-2">
                                    Perceived end knowledge certainly day
                                    sweetness why cordially. Ask a quick six
                                    seven offer see among. Handsome met debating
                                    sir dwelling age material. As style lived he
                                    worse dried. Offered related so visitors we
                                    private removed. Moderate do subjects to
                                    distance.
                                  </p>
                                </div>
                              </div>

                              <hr />

                              <div className="d-md-flex my-4">
                                <div className="avatar avatar-xl me-4 flex-shrink-0">
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-1.jpg"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                    alt="avatar"
                                  />
                                </div>

                                <div>
                                  <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                                    <h5 className="me-3 mb-0">Benny Doggo</h5>

                                    <ul className="list-inline mb-0">
                                      <li className="list-inline-item me-0">
                                        <i className="fas fa-star text-warning" />
                                      </li>
                                      <li className="list-inline-item me-0">
                                        <i className="fas fa-star text-warning" />
                                      </li>
                                      <li className="list-inline-item me-0">
                                        <i className="fas fa-star text-warning" />
                                      </li>
                                      <li className="list-inline-item me-0">
                                        <i className="fas fa-star text-warning" />
                                      </li>
                                      <li className="list-inline-item me-0">
                                        <i className="far fa-star text-warning" />
                                      </li>
                                    </ul>
                                  </div>

                                  <p className="small mb-2">2 days ago</p>
                                  <p className="mb-2">
                                    Handsome met debating sir dwelling age
                                    material. As style lived he worse dried.
                                    Offered related so visitors we private
                                    removed. Moderate do subjects to distance.
                                  </p>
                                </div>
                              </div>

                              <hr />
                            </div>

                            {/* <div className="mt-2">
                              <h5 className="mb-4">Leave a Review</h5>
                              <form className="row g-3">
                              
                                <div className="col-12 bg-light-input">
                                  <select
                                    id="inputState2"
                                    className="form-select js-choice"
                                  >
                                    <option selected="">★★★★★ (5/5)</option>
                                    <option>★★★★☆ (4/5)</option>
                                    <option>★★★☆☆ (3/5)</option>
                                    <option>★★☆☆☆ (2/5)</option>
                                    <option>★☆☆☆☆ (1/5)</option>
                                  </select>
                                </div>
                              
                                <div className="col-12 bg-light-input">
                                  <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    placeholder="Your review"
                                    rows={3}
                                    defaultValue={""}
                                  />
                                </div>
                               
                                <div className="col-12">
                                  <button
                                    type="submit"
                                    className="btn btn-primary mb-0"
                                  >
                                    Post Review
                                  </button>
                                </div>
                              </form>
                            </div> */}
                            {/* Leave Review END */}
                          </div>
                          {/* Content END */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Modal for video playback */}
                  {selectedVideo && (
                    <div
                      className="modal fade show"
                      tabIndex="-1"
                      style={{
                        display: "block",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Curriculum Video</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setSelectedVideo(null)}
                            />
                          </div>
                          <div className="modal-body">
                            <video width="100%" controls>
                              <source src={selectedVideo} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setSelectedVideo(null)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Main content END */}
                  {/* Right sidebar START */}
                  <div className="col-lg-4 pt-5 pt-lg-0">
                    <div className="row mb-5 mb-lg-0">
                      <div className="col-md-6 col-lg-12">
                        {/* Video START */}
                        <div className="card shadow p-2 mb-4 z-index-9">
                          <div className="overflow-hidden rounded-3">
                            <img
                              src={course.image}
                              className="card-img"
                              alt="course image"
                            />
                            <div
                              className="m-auto rounded-2 mt-2 d-flex justify-content-center align-items-center"
                              style={{ backgroundColor: "#ededed" }}
                            >
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                //href="#"
                                className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                                data-glightbox=""
                                data-gallery="course-video"
                              >
                                <i className="fas fa-play" />
                              </a>
                              <span
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                className="fw-bold"
                              >
                                Course Introduction Video
                              </span>

                              <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex={-1}
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h1
                                        className="modal-title fs-5"
                                        id="exampleModalLabel"
                                      >
                                        Introduction Videos
                                      </h1>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      />
                                    </div>
                                    <div className="modal-body">
                                      <video width="100%" controls>
                                        <source
                                          src={course.file}
                                          type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Card body */}
                          <div className="card-body px-3">
                            {/* Info */}
                            <div className="d-flex justify-content-between align-items-center">
                              {/* Price and time */}
                              <div>
                                <div className="d-flex align-items-center">
                                  <h3 className="fw-bold mb-0 me-2">
                                    ${course.price}
                                  </h3>
                                </div>
                              </div>
                              {/* Share button with dropdown */}
                              <div className="dropdown">
                                {/* Share button */}
                                <a
                                  href="#"
                                  className="btn btn-sm btn-light rounded small"
                                  role="button"
                                  id="dropdownShare"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-fw fa-share-alt" />
                                </a>
                                {/* dropdown button */}
                                <ul
                                  className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded"
                                  aria-labelledby="dropdownShare"
                                >
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fab fa-twitter-square me-2" />
                                      Twitter
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fab fa-facebook-square me-2" />
                                      Facebook
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fab fa-linkedin me-2" />
                                      LinkedIn
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fas fa-copy me-2" />
                                      Copy link
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* Buttons */}
                            <div className="mt-3 d-sm-flex justify-content-sm-between ">
                              {isCoursePurchased() ? (
                                <button
                                  type="button"
                                  className="btn btn-secondary mb-0 w-100 me-2"
                                  disabled
                                >
                                  <i className="fas fa-check-circle"></i>{" "}
                                  Already Purchased
                                </button>
                              ) : (
                                <>
                                  {addToCartBtn === "Add To Cart" && (
                                    <button
                                      type="button"
                                      className="btn btn-primary mb-0 w-100 me-2"
                                      onClick={() =>
                                        addToCart(
                                          course?.id,
                                          userId,
                                          course.price,
                                          country,
                                          CartId()
                                        )
                                      }
                                    >
                                      <i className="fas fa-shopping-cart"></i>{" "}
                                      Add To Cart
                                    </button>
                                  )}
                                  {addToCartBtn === "Added To Cart" && (
                                    <button
                                      disabled
                                      type="button"
                                      className="btn btn-primary mb-0 w-100 me-2"
                                    >
                                      <i className="fas fa-shopping-cart"></i>{" "}
                                      Added To Cart
                                    </button>
                                  )}
                                  <button
                                    onClick={enrollNow}
                                    className="btn btn-success mb-0 w-100"
                                  >
                                    Enroll Now{" "}
                                    <i className="fas fa-arrow-right"></i>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Video END */}
                        {/* Course info START */}
                        <div className="card card-body shadow p-4 mb-4">
                          {/* Title */}
                          <h4 className="mb-3">This course includes</h4>
                          <ul className="list-group list-group-borderless">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-book-open text-primary me-2" />
                                Lectures
                              </span>
                              <span>30</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center d-none">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-clock text-primary me-2" />
                                Duration
                              </span>
                              <span>4h 50m</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-signal text-primary me-2" />
                                Skills
                              </span>
                              <span>Beginner</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-globe text-primary me-2" />
                                Language
                              </span>
                              <span>English</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-user-clock text-primary me-2" />
                                Published
                              </span>
                              <span>7th August, 2025</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-medal text-primary me-2" />
                                Certificate
                              </span>
                              <span>Yes</span>
                            </li>
                          </ul>
                        </div>
                        {/* Course info END */}
                      </div>
                    </div>
                    {/* Row End */}
                  </div>
                  {/* Right sidebar END */}
                </div>
                {/* Row END */}
              </div>
            </section>
            <section className="mb-5">
              <div className="container mb-lg-8 ">
                <div className="row mb-5 mt-3">
                  {/* col */}
                  <div className="col-12">
                    <div className="mb-6">
                      <h2 className="mb-1 h1">Related Courses</h2>
                      <p>
                        These are the most popular courses among Geeks Courses
                        learners worldwide in year 2022
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                      <div className="col">
                        {/* Card */}
                        <div className="card card-hover">
                          <Link to={`/course-detail/course_id/`}>
                            <img
                              src="https://geeksui.codescandy.com/geeks/assets/images/course/course-css.jpg"
                              alt="course"
                              className="card-img-top"
                            />
                          </Link>
                          {/* Card Body */}
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="badge bg-info">
                                Intermediate
                              </span>
                              <a href="#" className="fs-5">
                                <i className="fas fa-heart text-danger align-middle" />
                              </a>
                            </div>
                            <h4 className="mb-2 text-truncate-line-2 ">
                              <Link
                                to={`/course-detail/slug/`}
                                className="text-inherit text-decoration-none text-dark fs-5"
                              >
                                How to easily create a website with JavaScript
                              </Link>
                            </h4>
                            <small>By: Claire Evans</small> <br />
                            <small>16k Students</small> <br />
                            <div className="lh-1 mt-3 d-flex">
                              <span className="align-text-top">
                                <span className="fs-6">
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star-half text-warning"></i>
                                </span>
                              </span>
                              <span className="text-warning">4.5</span>
                              <span className="fs-6 ms-2">(9,300)</span>
                            </div>
                          </div>
                          {/* Card Footer */}
                          <div className="card-footer">
                            <div className="row align-items-center g-0">
                              <div className="col">
                                <h5 className="mb-0">$39.00</h5>
                              </div>
                              <div className="col-auto">
                                <a
                                  href="#"
                                  className="text-inherit text-decoration-none btn btn-primary"
                                >
                                  <i className="fas fa-shopping-cart text-primary align-middle me-2 text-white" />
                                  Enroll Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col">
                        {/* Card */}
                        <div className="card card-hover">
                          <Link to={`/course-detail/slug/`}>
                            <img
                              src="https://geeksui.codescandy.com/geeks/assets/images/course/course-angular.jpg"
                              alt="course"
                              className="card-img-top"
                            />
                          </Link>
                          {/* Card Body */}
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="badge bg-info">
                                Intermediate
                              </span>
                              <a href="#" className="fs-5">
                                <i className="fas fa-heart text-danger align-middle" />
                              </a>
                            </div>
                            <h4 className="mb-2 text-truncate-line-2 ">
                              <Link
                                to={`/course-detail/slug/`}
                                className="text-inherit text-decoration-none text-dark fs-5"
                              >
                                How to easily create a website with JavaScript
                              </Link>
                            </h4>
                            <small>By: Claire Evans</small> <br />
                            <small>16k Students</small> <br />
                            <div className="lh-1 mt-3 d-flex">
                              <span className="align-text-top">
                                <span className="fs-6">
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star-half text-warning"></i>
                                </span>
                              </span>
                              <span className="text-warning">4.5</span>
                              <span className="fs-6 ms-2">(9,300)</span>
                            </div>
                          </div>
                          {/* Card Footer */}
                          <div className="card-footer">
                            <div className="row align-items-center g-0">
                              <div className="col">
                                <h5 className="mb-0">$39.00</h5>
                              </div>
                              <div className="col-auto">
                                <a
                                  href="#"
                                  className="text-inherit text-decoration-none btn btn-primary"
                                >
                                  <i className="fas fa-shopping-cart text-primary align-middle me-2 text-white" />
                                  Enroll Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col">
                        {/* Card */}
                        <div className="card card-hover">
                          <Link to={`/course-detail/slug/`}>
                            <img
                              src="https://geeksui.codescandy.com/geeks/assets/images/course/course-react.jpg"
                              alt="course"
                              className="card-img-top"
                            />
                          </Link>
                          {/* Card Body */}
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="badge bg-info">
                                Intermediate
                              </span>
                              <a href="#" className="fs-5">
                                <i className="fas fa-heart text-danger align-middle" />
                              </a>
                            </div>
                            <h4 className="mb-2 text-truncate-line-2 ">
                              <Link
                                to={`/course-detail/slug/`}
                                className="text-inherit text-decoration-none text-dark fs-5"
                              >
                                Learn React.Js for Beginners from Start to
                                Finish
                              </Link>
                            </h4>
                            <small>By: Claire Evans</small> <br />
                            <small>16k Students</small> <br />
                            <div className="lh-1 mt-3 d-flex">
                              <span className="align-text-top">
                                <span className="fs-6">
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star-half text-warning"></i>
                                </span>
                              </span>
                              <span className="text-warning">4.5</span>
                              <span className="fs-6 ms-2">(9,300)</span>
                            </div>
                          </div>
                          {/* Card Footer */}
                          <div className="card-footer">
                            <div className="row align-items-center g-0">
                              <div className="col">
                                <h5 className="mb-0">$39.00</h5>
                              </div>
                              <div className="col-auto">
                                <a
                                  href="#"
                                  className="text-inherit text-decoration-none btn btn-primary"
                                >
                                  <i className="fas fa-shopping-cart text-primary align-middle me-2 text-white" />
                                  Enroll Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col">
                        {/* Card */}
                        <div className="card card-hover">
                          <Link to={`/course-detail/slug/`}>
                            <img
                              src="https://geeksui.codescandy.com/geeks/assets/images/course/course-python.jpg"
                              alt="course"
                              className="card-img-top"
                            />
                          </Link>
                          {/* Card Body */}
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="badge bg-info">
                                Intermediate
                              </span>
                              <a href="#" className="fs-5">
                                <i className="fas fa-heart text-danger align-middle" />
                              </a>
                            </div>
                            <h4 className="mb-2 text-truncate-line-2 ">
                              <Link
                                to={`/course-detail/slug/`}
                                className="text-inherit text-decoration-none text-dark fs-5"
                              >
                                How to easily create a website with JavaScript
                              </Link>
                            </h4>
                            <small>By: Claire Evans</small> <br />
                            <small>16k Students</small> <br />
                            <div className="lh-1 mt-3 d-flex">
                              <span className="align-text-top">
                                <span className="fs-6">
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star-half text-warning"></i>
                                </span>
                              </span>
                              <span className="text-warning">4.5</span>
                              <span className="fs-6 ms-2">(9,300)</span>
                            </div>
                          </div>
                          {/* Card Footer */}
                          <div className="card-footer">
                            <div className="row align-items-center g-0">
                              <div className="col">
                                <h5 className="mb-0">$39.00</h5>
                              </div>
                              <div className="col-auto">
                                <a
                                  href="#"
                                  className="text-inherit text-decoration-none btn btn-primary"
                                >
                                  <i className="fas fa-shopping-cart text-primary align-middle me-2 text-white" />
                                  Enroll Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </>

      <BaseFooter />
    </>
  );
}

export default CourseDetail;