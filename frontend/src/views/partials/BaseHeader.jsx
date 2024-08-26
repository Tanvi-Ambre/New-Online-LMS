/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../utils/SearchContext";
import { CartContext } from "../plugin/Context";
import './partials.css'

function BaseHeader({ mostPopularCoursesRef }) {
  const [cartCount, setCartCount] = useContext(CartContext);
  const { user, loading, isLoggedIn } = useAuthStore((state) => ({
    user: state.user,
    loading: state.loading,
    isLoggedIn: state.isLoggedIn(),
  }));
  const [searchInput, setSearchInput] = useState("");
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  //console.log("useAuthStore", isLoggedIn, user);
  useEffect(() => {
    if (loading) {
      // You could show a loading spinner or similar
      console.log("Loading user data...");
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>; // Replace this with a better loading UI
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      setSearchQuery(searchInput.toLowerCase());
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  const handleFocus = () => {
    if (mostPopularCoursesRef.current) {
      mostPopularCoursesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky-header">
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Your Knowledge Buddy LMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/pages/contact-us/">
                  <i className="fas fa-phone"></i> Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pages/about-us/">
                  <i className="fas fa-address-card"></i> About Us
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  {user?.teacher_id > 0 ? (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-chalkboard-user"></i> Instructor
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/dashboard/`}
                          >
                            <i className="bi bi-grid-fill"></i> Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/courses/`}
                          >
                            <i className="fas fa-shopping-cart"></i> My Courses
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/create-course/`}
                          >
                            <i className="fas fa-plus"></i> Create Course
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/quizzes/`}
                          >
                            <i className="fas fa-question-circle me-2"></i> Quizzes
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/create-quiz/`}
                          >
                            <i className="fas fa-plus"></i> Create Quiz
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/reviews/`}
                          >
                            <i className="fas fa-star"></i> Reviews{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/question-answer/`}
                          >
                            <i className="fas fa-envelope"></i> Q/A{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/students/`}
                          >
                            <i className="fas fa-users"></i> Students{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/earning/`}
                          >
                            <i className="fas fa-dollar-sign"></i> Earning{" "}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/instructor/profile/`}
                          >
                            <i className="fas fa-gear"></i> Settings & Profile{" "}
                          </Link>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-graduation-cap"></i> Student
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/student/dashboard/`}
                          >
                            <i className="bi bi-grid-fill"></i> Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/student/courses/`}
                          >
                            <i className="fas fa-shopping-cart"></i> My Courses
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/student/wishlist/`}
                          >
                            <i className="fas fa-heart"></i> Wishlist{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/student/question-answer/`}
                          >
                            <i className="fas fa-envelope"></i> Q/A{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/student/profile/`}
                          >
                            <i className="fas fa-gear"></i> Profile & Settings
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </>
              )}
            </ul>
            <div className="position-relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  placeholder="Search courses..."
                  className="form-control"
                />
                {searchInput && (
                  <span
                    onClick={handleClearSearch}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    &times;
                  </span>
                )}
              </form>
            </div>

            {isLoggedIn === true ? (
              <>
                <Link
                  to="/logout/"
                  className="btn btn-primary ms-2"
                  type="submit"
                >
                  Logout <i className="fas fa-sign-out-alt"></i>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login/"
                  className="btn btn-primary ms-2"
                  type="submit"
                >
                  Login <i className="fas fa-sign-in-alt"></i>
                </Link>
                <Link
                  to="/register/"
                  className="btn btn-primary ms-2"
                  type="submit"
                >
                  Register <i className="fas fa-user-plus"> </i>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <Link className="btn btn-success ms-2" to="/cart/">
                Cart ({cartCount}) <i className="fas fa-shopping-cart"> </i>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default BaseHeader;