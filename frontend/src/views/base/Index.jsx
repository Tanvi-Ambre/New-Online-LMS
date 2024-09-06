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
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [cartCount, setCartCount] = useContext(CartContext);
  const navigate = useNavigate();

  const { searchQuery } = useContext(SearchContext);
  const courses = useCourseStore((state) => state.courses); // Get courses from Zustand
  const setCourses = useCourseStore((state) => state.setCourses); // Set courses in Zustand
  const courseListRef = useRef(null);
  const mostPopularCoursesRef = useRef(null);

  const country = GetCurrentAddress().country;
  const cartId = CartId();
  const user = useAuthStore((state) => state.user); // Access user data from useAuthStore
  const userId = user?.user_id;
  const fullName = user?.full_name;

  // Fetch courses only if they are not already set
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await apiInstance.get(`/course/course-list/`);
        setCourses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setIsLoading(false);
      }
    };

    if (courses.length === 0) {
      fetchCourses();
    } else {
      setIsLoading(false);
    }
  }, [courses.length, setCourses]);

  // Fetch cart count when component mounts
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await apiInstance.get(`course/cart-list/${CartId()}/`);
        setCartCount(response.data?.length);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };

    fetchCartCount();
  }, [setCartCount]);


  // Define featuredCourses based on the courses fetched from Zustand
  const featuredCourses = useMemo(() => {
    return courses.filter((course) => course.featured);
  }, [courses]);

  const memoizedFilteredCourses = useMemo(() => {
    if (searchQuery) {
      return courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return courses;
  }, [courses, searchQuery]);

  useEffect(() => {
    if (searchQuery && mostPopularCoursesRef.current) {
      mostPopularCoursesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log("Search Query:", searchQuery);
    console.log("Filtered Courses:", memoizedFilteredCourses);
    setFilteredCourses(memoizedFilteredCourses);
  }, [memoizedFilteredCourses, searchQuery]);

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
      await useAxios().post(`course/cart/`, formdata);
      Toast().fire({
        title: "Added To Cart",
        icon: "success",
      });

      // Set cart count after adding to cart
      const res = await apiInstance.get(`course/cart-list/${CartId()}/`);
      setCartCount(res.data?.length);
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination for Featured Courses
  const featuredItemsPerPage = 4; // 4 items per page for featured courses
  const [featuredCurrentPage, setFeaturedCurrentPage] = useState(1);
  const featuredIndexOfLastItem = featuredCurrentPage * featuredItemsPerPage;
  const featuredIndexOfFirstItem =
    featuredIndexOfLastItem - featuredItemsPerPage;
  const currentFeaturedItems = featuredCourses.slice(
    featuredIndexOfFirstItem,
    featuredIndexOfLastItem
  );
  const totalFeaturedPages = Math.ceil(
    featuredCourses.length / featuredItemsPerPage
  );

  const featuredPageNumbers = Array.from(
    { length: totalFeaturedPages },
    (_, index) => index + 1
  );

  // Pagination for All Courses
  const itemsPerPage = 4; // 4 items per page for all courses
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const addToWishlist = (courseId) => {
    const formdata = new FormData();
    formdata.append("user_id", userId);
    formdata.append("course_id", courseId);

    useAxios()
      .post(`student/wishlist/${userId}/`, formdata)
      .then((res) => {
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
                <p className="pe-lg-10 mb-3">
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

      {!searchQuery && (
        <section className="mb-5" ref={mostPopularCoursesRef}>
          <div className="container mb-lg-8">
            <div className="row mb-5">
              <div className="col-12">
                <div className="mb-6">
                  <h2 className="mb-1 h1">
                    {searchQuery ? "Search Results" : "🔥Most Popular Courses"}
                  </h2>
                  <p>
                    {searchQuery
                      ? "These courses match your search"
                      : "Check out these specially curated courses just for you!"}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                  {currentFeaturedItems.map((c, index) => (
                    <div className="col" key={index}>
                      <Link
                        to={`/course-detail/${c.course_id}/`}
                        style={{ textDecoration: "none" }}
                      >
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
                      className={`page-item ${
                        featuredCurrentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link me-1"
                        onClick={() =>
                          setFeaturedCurrentPage(featuredCurrentPage - 1)
                        }
                      >
                        <i className="ci-arrow-left me-2" />
                        Previous
                      </button>
                    </li>
                  </ul>
                  <ul className="pagination">
                    {featuredPageNumbers.map((number) => (
                      <li
                        key={number}
                        className={`page-item ${
                          featuredCurrentPage === number ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setFeaturedCurrentPage(number)}
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        featuredCurrentPage === totalFeaturedPages
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link ms-1"
                        onClick={() =>
                          setFeaturedCurrentPage(featuredCurrentPage + 1)
                        }
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
      )}

      <section className="mb-5">
        <div className="container mb-lg-8 ">
          <div className="row mb-5 mt-3">
            {/* col */}
            <div className="col-12">
              <div className="mb-6">
                <h2 className="mb-1 h1">
                  {searchQuery ? "Search Results" : "📚 All Courses"}
                </h2>
                <p>
                  {searchQuery
                    ? "These courses match your search"
                    : "Browse through all available courses to find the right one for you."}
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
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
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
                      className={`page-item ${
                        currentPage === number ? "active" : ""
                      }`}
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
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
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

      <BaseFooter />
    </>
  );
}

export default Index;
