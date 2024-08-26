/* eslint-disable react/jsx-key */
import { useEffect, useState, useContext, useRef, useMemo } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link, useNavigate } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

import useAxios from "../../utils/useAxios";
import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import { SearchContext } from "../../utils/SearchContext";
import apiInstance from "../../utils/axios";
import imagePath from "../../assets/Landing.avif";
import { useAuthStore } from "../../store/auth";
import { useCourseStore } from "../../store/courseStore";

function Index() {
  //const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [cartCount, setCartCount] = useContext(CartContext);
  //const [wishlist, setWishlist] = useState([]); // Add this line
  const navigate = useNavigate();

  const { searchQuery } = useContext(SearchContext);
  const courses = useCourseStore((state) => state.courses); // Get courses from Zustand
  const setCourses = useCourseStore((state) =>  state.setCourses); // Set courses in Zustand
  const courseListRef = useRef(null);
  const mostPopularCoursesRef = useRef(null);

  const country = GetCurrentAddress().country;
  const cartId = CartId();
  const user = useAuthStore((state) => state.user); // Access user data from useAuthStore
  const userId = user?.user_id;
  const fullName = user?.full_name;
  console.log("courses", courses);

 
  useEffect(() => {
    if (courses.length > 0) {
      setIsLoading(false);
    }
  }, [courses]);

  // const fetchCourse = (retryCount = 3) => {
  //   setIsLoading(true);
  //   try {
  //     apiInstance.get(`/course/course-list/`).then((res)=>{

  //       console.log("course-list", res.data);
  //       setCourses(res.data);
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     if (retryCount > 0) {
  //       fetchCourse(retryCount - 1);
  //     } else {
  //       console.log("Failed to fetch courses:", error);
  //       setIsLoading(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (courses.length === 0) {
  //     fetchCourse(); // Fetch courses only if they are not already fetched
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [courses]);

  const memoizedFilteredCourses = useMemo(() => {
    if (searchQuery) {
      return courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return courses;
  }, [courses, searchQuery]);

  useEffect(() => {
    setFilteredCourses(memoizedFilteredCourses);
  }, [memoizedFilteredCourses]);

  const addToCart = async (courseId, userId, price, country, cartId) => {
    if (!userId) {
      Toast().fire({
        title: "Please log in to add items to your cart",
        icon: "warning",
      });
      return navigate("/login"); // Redirect to login if not logged in
    }

    const formdata = new FormData();

    formdata.append("course_id", courseId);
    formdata.append("user_id", userId);
    formdata.append("price", price);
    formdata.append("country_name", country);
    formdata.append("cart_id", cartId);

    try {
      await useAxios()
        .post(`course/cart/`, formdata)
        .then((res) => {
          Toast().fire({
            title: "Added To Cart",
            icon: "success",
          });

          // Set cart count after adding to cart
          apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
            setCartCount(res.data?.length);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  const coursesPerRow = 4;
  const itemsPerPage = coursesPerRow; // 4 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem); // Modified line
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage); // Modified line

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  //console.log("currentItems", currentItems)
  const addToWishlist = (courseId) => {
    const formdata = new FormData();
    formdata.append("user_id", userId);
    formdata.append("course_id", courseId);

    useAxios()
      .post(`student/wishlist/${userId}/`, formdata)
      .then((res) => {
        // console.log(res.data);
        Toast().fire({
          icon: "success",
          title: res.data.message,
        });
      });
  };

  return (
    <>
      <BaseHeader mostPopularCoursesRef={mostPopularCoursesRef} />

      <section className="py-lg-8 py-5" ref={courseListRef}>
        {/* container */}
        <div className="container my-lg-8">
          {/* row */}
          <div className="row align-items-center">
            {/* col */}
            <div className="col-lg-6 mb-6 mb-lg-0">
              <div>
                {/* Display the greeting message */}
                {fullName && (
                  <div className="bg-light mb-4">
                    <h2 className="m-0">Welcome back, {fullName}!</h2>
                  </div>
                )}
                {/* heading */}
                <h5 className="text-dark mb-4">
                  <i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2" />
                  Most trusted education platform
                </h5>
                {/* heading */}
                <h1 className="display-3 fw-bold mb-3">
                  Grow your skills and advance career
                </h1>
                {/* para */}
                <p className="pe-lg-10 mb-5">
                  Start, switch, or advance your career with more than 5,000
                  courses, Professional Certificates, and degrees from
                  world-class universities and companies.
                </p>
              </div>
            </div>
            {/* col */}
            <div className="col-lg-6 d-flex justify-content-center">
              {/* images */}
              <div className="position-relative">
                <img
                  src={imagePath}
                  alt="profile-img"
                  className="end-0 bottom-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mb-lg-8">
          {/* row */}
          <div className="row mb-5">
            <div className="col-md-6 col-lg-3 border-top-md border-top pb-4  border-end-md">
              {/* text */}
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fe fe-award fs-2 text-info" />
                </div>
                <div className="lh-1">
                  <h2 className="mb-1">316,000+</h2>
                  <span>Qualified Instructor</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-md border-top border-end-lg">
              {/* icon */}
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fe fe-users fs-2 text-warning" />
                </div>
                {/* text */}
                <div className="lh-1">
                  <h2 className="mb-1">1.8 Billion+</h2>
                  <span>Course enrolments</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-lg border-top border-end-md">
              {/* icon */}
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fe fe-tv fs-2 text-primary" />
                </div>
                {/* text */}
                <div className="lh-1">
                  <h2 className="mb-1">41,000+</h2>
                  <span>Courses in 42 languages</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-lg border-top">
              {/* icon */}
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fe fe-film fs-2 text-success" />
                </div>
                {/* text */}
                <div className="lh-1">
                  <h2 className="mb-1">179,000+</h2>
                  <span>Online Videos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5" ref={mostPopularCoursesRef}>
        <div className="container mb-lg-8 ">
          <div className="row mb-5 mt-3">
            {/* col */}
            <div className="col-12">
              <div className="mb-6">
                <h2 className="mb-1 h1">🔥Most Popular Courses</h2>
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
                {currentItems?.map((c, index) => (
                  <div className="col" key={index}>
                    <Link
                      to={`/course-detail/${c.course_id}/`}
                      style={{ textDecoration: "none" }}
                    >
                      {/* Card */}
                      <div className="card card-hover">
                        <Link to={`/course-detail/${c.course_id}/`}>
                          <img
                            src={c.image}
                            alt="course"
                            className="card-img-top"
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </Link>
                        {/* Card Body */}
                        <div className="card-body">
                          <span>{c.title}</span>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <span className="badge bg-info">{c.level}</span>
                              <span className="badge bg-success ms-2">
                                {c.language}
                              </span>
                            </div>
                            <a
                              onClick={() => addToWishlist(c.id)}
                              className="fs-5"
                            >
                              <i className="fas fa-heart text-danger align-middle" />
                            </a>
                          </div>
                          <h4 className="mb-2 text-truncate-line-2 ">
                            {/* <Link
                            to={`/course-detail/${c.title}/`}
                            className="text-inherit text-decoration-none text-dark fs-5"
                          >
                            {c.title}
                          </Link> */}
                          </h4>
                          <small>By: {c.teacher.full_name}</small> <br />
                          <small>
                            {c.students?.length} Student
                            {c.students?.length > 1 && "s"}
                          </small>{" "}
                          <br />
                          <div className="lh-1 mt-3 d-flex">
                            <span className="align-text-top">
                              <span className="fs-6">
                                <Rater
                                  total={5}
                                  rating={c.average_rating || 0}
                                />
                              </span>
                            </span>
                            <span className="text-warning">4.5</span>
                            <span className="fs-6 ms-2">
                              ({c.reviews?.length} Reviews)
                            </span>
                          </div>
                        </div>
                        {/* Card Footer */}
                        <div className="card-footer">
                          <div className="row align-items-center g-0">
                            <div className="col">
                              <h5 className="mb-0">${c.price}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <nav className="d-flex mt-5">
                <ul className="pagination">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link me-1"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <i className="ci-arrow-left me-2" />
                      Previous
                    </button>
                  </li>
                </ul>
                <ul className="pagination">
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={`page-item ${currentPage === number ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                </ul>

                <ul className="pagination">
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link ms-1"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                      <i className="ci-arrow-right ms-3" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 pt-8 pb-8 mt-5">
        <div className="container pb-8">
          {/* row */}
          <div className="row mb-lg-8 mb-5">
            <div className="offset-lg-1 col-lg-10 col-12">
              <div className="row align-items-center">
                {/* col */}
                <div className="col-lg-6 col-md-8">
                  {/* rating */}
                  <div>
                    <div className="mb-3">
                      <span className="lh-1">
                        <span className="align-text-top ms-2">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                        </span>
                        <span className="text-dark fw-semibold">4.5/5.0</span>
                      </span>
                      <span className="ms-2">(Based on 3265 ratings)</span>
                    </div>
                    {/* heading */}
                    <h2 className="h1">What our students say</h2>
                    <p className="mb-0">
                      Hear from
                      <span className="text-dark">teachers</span>,
                      <span className="text-dark">trainers</span>, and
                      <span className="text-dark">leaders</span>
                      in the learning space about how Geeks empowers them to
                      provide quality online learning experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row */}
          <div className="row">
            {/* col */}
            <div className="col-md-12">
              <div className="position-relative">
                {/* controls */}
                {/* slider */}
                <div className="sliderTestimonial">
                  {/* item */}
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="item">
                        <div className="card">
                          <div className="card-body text-center p-6">
                            {/* img */}
                            <img
                              src="../../assets/images/avatar/avatar-1.jpg"
                              alt="avatar"
                              className="avatar avatar-lg rounded-circle"
                            />
                            <p className="mb-0 mt-3">
                              “The generated lorem Ipsum is therefore always
                              free from repetition, injected humour, or words
                              etc generate lorem Ipsum which looks racteristic
                              reasonable.”
                            </p>
                            {/* rating */}
                            <div className="lh-1 mb-3 mt-4">
                              <span className="fs-6 align-top">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </span>
                              <span className="text-warning">5</span>
                              {/* text */}
                            </div>
                            <h3 className="mb-0 h4">Gladys Colbert</h3>
                            <span>Software Engineer at Palantir</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="item">
                        <div className="card">
                          <div className="card-body text-center p-6">
                            {/* img */}
                            <img
                              src="../../assets/images/avatar/avatar-1.jpg"
                              alt="avatar"
                              className="avatar avatar-lg rounded-circle"
                            />
                            <p className="mb-0 mt-3">
                              “The generated lorem Ipsum is therefore always
                              free from repetition, injected humour, or words
                              etc generate lorem Ipsum which looks racteristic
                              reasonable.”
                            </p>
                            {/* rating */}
                            <div className="lh-1 mb-3 mt-4">
                              <span className="fs-6 align-top">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </span>
                              <span className="text-warning">5</span>
                              {/* text */}
                            </div>
                            <h3 className="mb-0 h4">Gladys Colbert</h3>
                            <span>Software Engineer at Palantir</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="item">
                        <div className="card">
                          <div className="card-body text-center p-6">
                            {/* img */}
                            <img
                              src="../../assets/images/avatar/avatar-1.jpg"
                              alt="avatar"
                              className="avatar avatar-lg rounded-circle"
                            />
                            <p className="mb-0 mt-3">
                              “The generated lorem Ipsum is therefore always
                              free from repetition, injected humour, or words
                              etc generate lorem Ipsum which looks racteristic
                              reasonable.”
                            </p>
                            {/* rating */}
                            <div className="lh-1 mb-3 mt-4">
                              <span className="fs-6 align-top">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </span>
                              <span className="text-warning">5</span>
                              {/* text */}
                            </div>
                            <h3 className="mb-0 h4">Gladys Colbert</h3>
                            <span>Software Engineer at Palantir</span>
                          </div>
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

      <BaseFooter />
    </>
  );
}

export default Index;