/* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable react/jsx-key */
// import { useEffect, useState, useContext } from "react";
// import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";
// import { Link } from "react-router-dom";
// import Rater from "react-rater";
// import "react-rater/lib/react-rater.css";

// import useAxios from "../../utils/useAxios";
// import CartId from "../plugin/CartId";
// import GetCurrentAddress from "../plugin/UserCountry";
// import UserData from "../plugin/UserData";
// import Toast from "../plugin/Toast";
// import { CartContext } from "../plugin/Context";
// import apiInstance from "../../utils/axios";

// function Index() {
//   const [courses, setCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [cartCount, setCartCount] = useContext(CartContext);

//   const country = GetCurrentAddress().country;
//   const userId = UserData()?.user_id;
//   const cartId = CartId();

// // const coursesPerRow = 4;
// // const itemsPerPage = coursesPerRow; // 4 items per page
// // const [currentPage, setCurrentPage] = useState(1);
// // const indexOfLastItem = currentPage * itemsPerPage;
// // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
// // const totalPages = Math.ceil(courses.length / itemsPerPage);
// // const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

//   const fetchCourse = async () => {
//     setIsLoading(true);
//     try {
//       await useAxios()
//         .get(`/course/course-list/`)
//         .then((res) => {
//           setCourses(res.data);
//           setIsLoading(false);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCourse();
//   }, []);

//   const addToCart = async (courseId, userId, price, country, cartId) => {
//     const formdata = new FormData();

//     formdata.append("course_id", courseId);
//     formdata.append("user_id", userId);
//     formdata.append("price", price);
//     formdata.append("country_name", country);
//     formdata.append("cart_id", cartId);

//     try {
//       await useAxios()
//         .post(`course/cart/`, formdata)
//         .then((res) => {
//           console.log(res.data);
//           Toast().fire({
//             title: "Added To Cart",
//             icon: "success",
//           });

//           // Set cart count after adding to cart
//           apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
//             setCartCount(res.data?.length);
//           });
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Pagination
//   const itemsPerPage = 1;
//   const [currentPage, setCurrentPage] = useState(1);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(courses.length / itemsPerPage);
//   const pageNumbers = Array.from(
//     { length: totalPages },
//     (_, index) => index + 1
//   );

//   const addToWishlist = (courseId) => {
//     const formdata = new FormData();
//     formdata.append("user_id", UserData()?.user_id);
//     formdata.append("course_id", courseId);

//     useAxios()
//       .post(`student/wishlist/${UserData()?.user_id}/`, formdata)
//       .then((res) => {
//         console.log(res.data);
//         Toast().fire({
//           icon: "success",
//           title: res.data.message,
//         });
//       });
//   };

//   return (
//     <>
//       <BaseHeader />

//       <section className="py-lg-8 py-5">
//         {/* container */}
//         <div className="container my-lg-8">
//           {/* row */}
//           <div className="row align-items-center">
//             {/* col */}
//             <div className="col-lg-6 mb-6 mb-lg-0">
//               <div>
//                 {/* heading */}
//                 <h5 className="text-dark mb-4">
//                   <i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2" />
//                   Most trusted education platform
//                 </h5>
//                 {/* heading */}
//                 <h1 className="display-3 fw-bold mb-3">
//                   Grow your skills and advance career
//                 </h1>
//                 {/* para */}
//                 <p className="pe-lg-10 mb-5">
//                   Start, switch, or advance your career with more than 5,000
//                   courses, Professional Certificates, and degrees from
//                   world-class universities and companies.
//                 </p>
//                 {/* btn */}
//                 <a href="#" className="btn btn-primary fs-4 text-inherit ms-3">
//                   Join Free Now <i className="fas fa-plus"></i>
//                 </a>
//                 <a
//                   href="https://www.youtube.com/watch?v=Nfzi7034Kbg"
//                   className="btn btn-outline-success fs-4 text-inherit ms-3"
//                 >
//                   Watch Demo <i className="fas fa-video"></i>
//                 </a>
//               </div>
//             </div>
//             {/* col */}
//             <div className="col-lg-6 d-flex justify-content-center">
//               {/* images */}
//               <div className="position-relative">
//                 <img
//                   src="https://geeksui.codescandy.com/geeks/assets/images/background/acedamy-img/girl-image.png"
//                   alt="girl"
//                   className="end-0 bottom-0"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="pb-8">
//         <div className="container mb-lg-8">
//           {/* row */}
//           <div className="row mb-5">
//             <div className="col-md-6 col-lg-3 border-top-md border-top pb-4  border-end-md">
//               {/* text */}
//               <div className="py-7 text-center">
//                 <div className="mb-3">
//                   <i className="fe fe-award fs-2 text-info" />
//                 </div>
//                 <div className="lh-1">
//                   <h2 className="mb-1">316,000+</h2>
//                   <span>Qualified Instructor</span>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3 border-top-md border-top border-end-lg">
//               {/* icon */}
//               <div className="py-7 text-center">
//                 <div className="mb-3">
//                   <i className="fe fe-users fs-2 text-warning" />
//                 </div>
//                 {/* text */}
//                 <div className="lh-1">
//                   <h2 className="mb-1">1.8 Billion+</h2>
//                   <span>Course enrolments</span>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3 border-top-lg border-top border-end-md">
//               {/* icon */}
//               <div className="py-7 text-center">
//                 <div className="mb-3">
//                   <i className="fe fe-tv fs-2 text-primary" />
//                 </div>
//                 {/* text */}
//                 <div className="lh-1">
//                   <h2 className="mb-1">41,000+</h2>
//                   <span>Courses in 42 languages</span>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3 border-top-lg border-top">
//               {/* icon */}
//               <div className="py-7 text-center">
//                 <div className="mb-3">
//                   <i className="fe fe-film fs-2 text-success" />
//                 </div>
//                 {/* text */}
//                 <div className="lh-1">
//                   <h2 className="mb-1">179,000+</h2>
//                   <span>Online Videos</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mb-5">
//         <div className="container mb-lg-8 ">
//           <div className="row mb-5 mt-3">
//             {/* col */}
//             <div className="col-12">
//               <div className="mb-6">
//                 <h2 className="mb-1 h1">🔥Most Popular Courses</h2>
//                 <p>
//                   These are the most popular courses among Geeks Courses
//                   learners worldwide in year 2022
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//                 {currentItems?.map((c, index) => (
//                   <div className="col" key={index}>
//                     {/* Card */}
//                     <div className="card card-hover">
//                       <Link to={`/course-detail/${c.slug}/`}>
//                         <img
//                           src={c.image}
//                           alt="course"
//                           className="card-img-top"
//                           style={{
//                             width: "100%",
//                             height: "200px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </Link>
//                       {/* Card Body */}
//                       <div className="card-body">
//                         <div className="d-flex justify-content-between align-items-center mb-3">
//                           <div>
//                             <span className="badge bg-info">{c.level}</span>
//                             <span className="badge bg-success ms-2">
//                               {c.language}
//                             </span>
//                           </div>
//                           <a onClick={() => addToWishlist(c.id)} className="fs-5">
//                             <i className="fas fa-heart text-danger align-middle" />
//                           </a>
//                         </div>
//                         <h4 className="mb-2 text-truncate-line-2 ">
//                           <Link
//                             to={`/course-detail/${c.slug}/`}
//                             className="text-inherit text-decoration-none text-dark fs-5"
//                           >
//                             {c.title}
//                           </Link>
//                         </h4>
//                         <small>By: {c.teacher.full_name}</small> <br />
//                         <small>
//                           {c.students?.length} Student
//                           {c.students?.length > 1 && "s"}
//                         </small>{" "}
//                         <br />
//                         <div className="lh-1 mt-3 d-flex">
//                           <span className="align-text-top">
//                             <span className="fs-6">
//                               <Rater total={5} rating={c.average_rating || 0} />
//                             </span>
//                           </span>
//                           <span className="text-warning">4.5</span>
//                           <span className="fs-6 ms-2">
//                             ({c.reviews?.length} Reviews)
//                           </span>
//                         </div>
//                       </div>
//                       {/* Card Footer */}
//                       <div className="card-footer">
//                         <div className="row align-items-center g-0">
//                           <div className="col">
//                             <h5 className="mb-0">${c.price}</h5>
//                           </div>
//                           <div className="col-auto">
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 addToCart(
//                                   c.id,
//                                   userId,
//                                   c.price,
//                                   country,
//                                   cartId
//                                 )
//                               }
//                               className="text-inherit text-decoration-none btn btn-primary me-2"
//                             >
//                               <i className="fas fa-shopping-cart text-primary text-white" />
//                             </button>
//                             <Link
//                               to={"/cart"}
//                               className="text-inherit text-decoration-none btn btn-primary"
//                             >
//                               Enroll Now{" "}
//                               <i className="fas fa-arrow-right text-primary align-middle me-2 text-white" />
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <nav className="d-flex mt-5">
//                 <ul className="pagination">
//                   <li
//                     className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
//                   >
//                     <button
//                       className="page-link me-1"
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                     >
//                       <i className="ci-arrow-left me-2" />
//                       Previous
//                     </button>
//                   </li>
//                 </ul>
//                 <ul className="pagination">
//                   {pageNumbers.map((number) => (
//                     <li
//                       key={number}
//                       className={`page-item ${currentPage === number ? "active" : ""}`}
//                     >
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(number)}
//                       >
//                         {number}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>

//                 <ul className="pagination">
//                   <li
//                     className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
//                   >
//                     <button
//                       className="page-link ms-1"
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                     >
//                       Next
//                       <i className="ci-arrow-right ms-3" />
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="my-8 py-lg-8">
//         {/* container */}
//         <div className="container">
//           {/* row */}
//           <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
//             {/* col */}
//             <div className="col-lg-6 col-12 d-none d-lg-block">
//               <div className="d-flex justify-content-center pt-4">
//                 {/* img */}
//                 <div className="position-relative">
//                   <img
//                     src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
//                     alt="image"
//                     className="img-fluid mt-n8"
//                   />
//                   <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
//                     <img
//                       src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg"
//                       alt="dollor"
//                     />
//                   </div>
//                   {/* img */}
//                   <div className="me-n4 position-absolute top-0 end-0">
//                     <img
//                       src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg"
//                       alt="graph"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-5 col-12">
//               <div className="text-white p-5 p-lg-0">
//                 {/* text */}
//                 <h2 className="h1 text-white">Become an instructor today</h2>
//                 <p className="mb-0">
//                   Instructors from around the world teach millions of students
//                   on Geeks. We provide the tools and skills to teach what you
//                   love.
//                 </p>
//                 <a href="#" className="btn bg-white text-dark fw-bold mt-4">
//                   Start Teaching Today <i className="fas fa-arrow-right"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="bg-gray-200 pt-8 pb-8 mt-5">
//         <div className="container pb-8">
//           {/* row */}
//           <div className="row mb-lg-8 mb-5">
//             <div className="offset-lg-1 col-lg-10 col-12">
//               <div className="row align-items-center">
//                 {/* col */}
//                 <div className="col-lg-6 col-md-8">
//                   {/* rating */}
//                   <div>
//                     <div className="mb-3">
//                       <span className="lh-1">
//                         <span className="align-text-top ms-2">
//                           <i className="fas fa-star text-warning"></i>
//                           <i className="fas fa-star text-warning"></i>
//                           <i className="fas fa-star text-warning"></i>
//                           <i className="fas fa-star text-warning"></i>
//                           <i className="fas fa-star text-warning"></i>
//                         </span>
//                         <span className="text-dark fw-semibold">4.5/5.0</span>
//                       </span>
//                       <span className="ms-2">(Based on 3265 ratings)</span>
//                     </div>
//                     {/* heading */}
//                     <h2 className="h1">What our students say</h2>
//                     <p className="mb-0">
//                       Hear from
//                       <span className="text-dark">teachers</span>,
//                       <span className="text-dark">trainers</span>, and
//                       <span className="text-dark">leaders</span>
//                       in the learning space about how Geeks empowers them to
//                       provide quality online learning experiences.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-4 text-md-end mt-4 mt-md-0">
//                   {/* btn */}
//                   <a href="#" className="btn btn-primary">
//                     View Reviews
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* row */}
//           <div className="row">
//             {/* col */}
//             <div className="col-md-12">
//               <div className="position-relative">
//                 {/* controls */}
//                 {/* slider */}
//                 <div className="sliderTestimonial">
//                   {/* item */}
//                   <div className="row">
//                     <div className="col-lg-4">
//                       <div className="item">
//                         <div className="card">
//                           <div className="card-body text-center p-6">
//                             {/* img */}
//                             <img
//                               src="../../assets/images/avatar/avatar-1.jpg"
//                               alt="avatar"
//                               className="avatar avatar-lg rounded-circle"
//                             />
//                             <p className="mb-0 mt-3">
//                               “The generated lorem Ipsum is therefore always
//                               free from repetition, injected humour, or words
//                               etc generate lorem Ipsum which looks racteristic
//                               reasonable.”
//                             </p>
//                             {/* rating */}
//                             <div className="lh-1 mb-3 mt-4">
//                               <span className="fs-6 align-top">
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                               </span>
//                               <span className="text-warning">5</span>
//                               {/* text */}
//                             </div>
//                             <h3 className="mb-0 h4">Gladys Colbert</h3>
//                             <span>Software Engineer at Palantir</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4">
//                       <div className="item">
//                         <div className="card">
//                           <div className="card-body text-center p-6">
//                             {/* img */}
//                             <img
//                               src="../../assets/images/avatar/avatar-1.jpg"
//                               alt="avatar"
//                               className="avatar avatar-lg rounded-circle"
//                             />
//                             <p className="mb-0 mt-3">
//                               “The generated lorem Ipsum is therefore always
//                               free from repetition, injected humour, or words
//                               etc generate lorem Ipsum which looks racteristic
//                               reasonable.”
//                             </p>
//                             {/* rating */}
//                             <div className="lh-1 mb-3 mt-4">
//                               <span className="fs-6 align-top">
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                               </span>
//                               <span className="text-warning">5</span>
//                               {/* text */}
//                             </div>
//                             <h3 className="mb-0 h4">Gladys Colbert</h3>
//                             <span>Software Engineer at Palantir</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4">
//                       <div className="item">
//                         <div className="card">
//                           <div className="card-body text-center p-6">
//                             {/* img */}
//                             <img
//                               src="../../assets/images/avatar/avatar-1.jpg"
//                               alt="avatar"
//                               className="avatar avatar-lg rounded-circle"
//                             />
//                             <p className="mb-0 mt-3">
//                               “The generated lorem Ipsum is therefore always
//                               free from repetition, injected humour, or words
//                               etc generate lorem Ipsum which looks racteristic
//                               reasonable.”
//                             </p>
//                             {/* rating */}
//                             <div className="lh-1 mb-3 mt-4">
//                               <span className="fs-6 align-top">
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                               </span>
//                               <span className="text-warning">5</span>
//                               {/* text */}
//                             </div>
//                             <h3 className="mb-0 h4">Gladys Colbert</h3>
//                             <span>Software Engineer at Palantir</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <BaseFooter />
//     </>
//   );
// }

// export default Index;

//THis is working code
/* eslint-disable react/jsx-key */
import { useEffect, useState, useContext, useRef } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

import useAxios from "../../utils/useAxios";
import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import { SearchContext } from "../../utils/SearchContext";
import apiInstance from "../../utils/axios";

function Index() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [cartCount, setCartCount] = useContext(CartContext);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const courseListRef = useRef(null);

  const country = GetCurrentAddress().country;
  const userId = UserData()?.user_id;
  const cartId = CartId();

  const fetchCourse = async (retryCount = 3) => {
    setIsLoading(true);
    try {
      const res = await useAxios().get(`/course/course-list/`);
      setCourses(res.data);
      setIsLoading(false);
    } catch (error) {
      if (retryCount > 0) {
        fetchCourse(retryCount - 1);
      } else {
        console.log("Failed to fetch courses:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);


  useEffect(() => {
    if (searchQuery) {
      const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filteredCourses);
    } else {
      setFilteredCourses(courses);
    }
  }, [searchQuery, courses]);
    
  const addToCart = async (courseId, userId, price, country, cartId) => {
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
    formdata.append("user_id", UserData()?.user_id);
    formdata.append("course_id", courseId);

    useAxios()
      .post(`student/wishlist/${UserData()?.user_id}/`, formdata)
      .then((res) => {
        console.log(res.data);
        Toast().fire({
          icon: "success",
          title: res.data.message,
        });
      });
  };

  return (
    <>
      <BaseHeader />

      <section className="py-lg-8 py-5" ref={courseListRef}>
        {/* container */}
        <div className="container my-lg-8">
          {/* row */}
          <div className="row align-items-center">
            {/* col */}
            <div className="col-lg-6 mb-6 mb-lg-0">
              <div>
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
                {/* btn */}
                {/* <a href="#" className="btn btn-primary fs-4 text-inherit ms-3">
                  Join Free Now <i className="fas fa-plus"></i>
                </a> */}
                {/* <a
                  href="https://www.youtube.com/watch?v=Nfzi7034Kbg"
                  className="btn btn-outline-success fs-4 text-inherit ms-3"
                >
                  Watch Demo <i className="fas fa-video"></i>
                </a> */}
              </div>
            </div>
            {/* col */}
            <div className="col-lg-6 d-flex justify-content-center">
              {/* images */}
              <div className="position-relative">
                <img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMVFRUXFRYWGBUXGBcXGBYXFhYXFxUXFRgYHSggGB0lHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0dHSUrLS0tLS0rLS0tLS0tLS0tLS0tLS0tLSstLS0tLSstLSstLS0tLS0tKy0tLS0tLS0tLf/AABEIAKoBKQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEAB//EAEQQAAEDAQUEBgYIBgEDBQAAAAEAAhEDBAUSITFBUWFxBhMigZGxMlKhwdHwFBUjM0Jyc5IHU2KCouFDwtLxJESDk7L/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAmEQEAAwACAgEBCQAAAAAAAAAAAQIRAyESMUFRBBMiMmFxgbHw/9oADAMBAAIRAxEAPwD5g61uJJO2Z12q51odgbvmZzzgQhqNLEQ0akgeKItpJdoQ0dlvIfM96OcquvPu1PxXHukAKICkAjKIam1K1sa1ha2ajWwMsgfWO8pYAndhspwNLZxOlxzyDQYVhHrttzG03NfTc5zspbkYOZz2Sl1QgPkAgTodRzTuu2qxjXiqWl2YaSMm7zKovfOnRLiDUIeXHKSMXZmOCAItB0IgiDOz5lQrxkBoFENVhpkNnfkOKixGziirasMACTpHxRt33NWqkF4a1pzGIkeC9QswosNVwl2zdzS1tetVfILjylZmXorSIO79JsobTDRJGuoI2QQckBZ75axv3Ye4ySXZgTsA95n3JhXsVeu1rXtJI0KEtfRas0ThKnlX6uk0t8Q1VxWNtrbiw0wY9Fjj4YXadyT3zczqDswYOh9xSKxW+0WR4c2WkbDoeC+m3VeFO87O5pGGq0Zjyc3enpzvXyj9WAFNTFNF2iyupvLHCCDBUWsXR5htx0/vf0KnuQ9ICC05a+1MLlb97+i/3ILAiuhgGZieChTZCuZTVzKaChrDEKXV8B7UWykrBSQA4D8ypOokZEbOOnimFCz4nNbvIHiVfelMda6NAY8BCKTOpZAKPUJj1SkKBOgJQKjZ1F1nTuyWLG8N8eAGqKvSyFxAYAGAdnZzlQxlxSgypVaQOhEEQUxqWQjXJC1qQ2KhdamDIDQKgzlwR76apdTQBO5efxVcndsjajHMVTmIBXOMRz37e9cxf0t8Fe5ih1aAS63AVG5SSQBwkwTxR9/PYCKbMy3FiJjWd6TU3EEEahXtbilzidczBOZ3oiuF0BEto0j+NwPFuXsKKpXW2A6pWZTB0kOcTBg5BRC0BNLvqODS7G5oaRERzjPyUX2OgNLRPKm5E2CrTaWsJDm45JIjVpGh3Kif0svcC7GZzGQGJLn5k89N3BaS97XQI+zaJaGhpk5RpAUbzpsLQ4FjXVWtcSTsjOANM0CCjTkgbzCbOs4LwwaNGZ5bO9UXdZx1kSHQJkaIW+7wwzSpnM+k4bBuCxLtxRkaletoFZwpt9Bmp9Z3w+di0fRyyNDcgFmrjoZgLa3PQwrz8s/D3cUfJvZrOmQshKjZKUCU2s5WK11u1pY3pR0bbVYcodvWH6J2l9ltrWnSYI4HIr7JbWyvmHTi7+pr067dMXa+K3Scnxc7xsa0fTG78X2zBs7Ubt6yQavoFkrB9IbQWg9yx16WI03kbDmDwXelt6eLlpnay5x97+i/3ITCjLp/5f0ne5DALo4pU2ohjVVTCNs1EuMabSdw3qK41qlhRbXsbkG4uLtvcrTgIBczDOhafcUUPd7ftG858ASqX5knijrLQwvBGYzg9x1QcIOBqkwkaEhdAXoQNbKYaA49p2fGNgUbbaQAWwQQ0QctYS91YzO1RtFdztSjWgqpJ1MoWo1GPCHqBGAb2ql4RTwqHBUDOarPoUem4N4anwCKa3A3H+J3o8BtKHeJYTtDvMIIfQmHSq3vBCn9WN/mM/cEG5QQK7tptL2h0mXAYd42ko/pA1tNwo05wAY59YvzB4wIHclVCo4ThmSIy1jgragqOw4g44Whoy0aNAoHtjsdFtmL3SakkwIngM9Bkj6zPsjWLQcOWEAGS9jTGmQ2yk1ge4EOIcI1y1kQdV21XsYe1pyfsB03eQVQuazbwJ8Nnl4oihY3O3ATBJIgHihWvMQjrue4v/FkJOESfDmiG9To7gbifVaI9JoEmSJAGeZzCHvGj2KUGRhcJOWQd/tWfSngHtVhLsWbNu/2KF72ghzWTOFup24u0iqrOC2m9wyOTZyy396zZfB6xwOHFG87fbkU9vWrhY2nsnEeZQVloNe9peMhDjwAM+4rnsa9VaT4wtbW2ulg2Auwn/EFHWW+7RRgg46eyTPH0t6IrdHOsIc3ONQi610MpUMIEGZxanfhOeYnPgcwsfhl2y0emrue9+tYC3bGW47Qja3SZlHItc4xMNE+J2L5l0cbbvt61mqANpBxLC1pLy1svwy08eZWlbdGOzUqrnGpUqsa973DEZc0GGNPZaBJ0A96x4ZPtvz8o9NXZ+kPX/d0m8QXtDu4b0k6b0RUs5O4wQdR8lJqN02htMuGBwBnC5rYOZ2xyygoG9qtoFRzSXdR1Ye+mXE4XEuDMDj2vSaDGkNdyWvGPLqWPKfHuDHobfUsFFx7TRkd7T6PemPSFodhMbddmaxl02Gr1gOYdqdkbIy4LQWy1OyY7VvmFa/n6c+Xqna27G5Vf0ne5DBqIu55ir+m73IcVDK7vGvYwpg04aY3uMnkMgl9J2zem1Wy+jLwBgGfwUWErLZsTJ2l+H2SrqtKTuAECeCKu4MaxxxF2caRmRs7lax1NzYOLM7deCNYCsjg1wEyDru02IdzADpO74IizlpeAGkHPOZ9yGL+4g7fBB4wROWShhUnOEQM95VeLKFEeLVFzPOFJz1WXqit7FQ5h9yvc9SpUcbH/wBMHxOaIWVAqHBG1qLiZwnwQz6Dh+E+Cojbz2o3AD2KmiJxN3jLmM1bbGnFntAPsVFGcQwgk7ggpp057lLCPUPz3op9AMcS5wAOzUjuC71lL1j4IMxYLM+oYaYjaTAzXLU8BxDHOIGUkntEangFbQwsa04y0uaZynKYVfVU/wCYf2H4oCrDYHVGF+MgAwczAAEklSp2egWlwL3FmbmmBiHrN3clTSrNa1zBUcGujEMOsd6qZWazFBJJbhBiAAdSiLq7cLQWtGFw25kZ71CzWnCx8EhzoGW7U5oapaZABHoiAq8SA5luqD8bvEq+2WrHUxbw32AJWHKxj0B9/CXKu7zo7gWnmMx88UTXhzMW4JNZnEVGwdXDvlcce+tm4uO9cEDq3u2EtgzGhMkZ79Z12wiOkVre+nlSdSnIOfhkz6jWk+2I4pHc9pLXwEXeznV3tLCZbp3rj8vRkY0v8PLMGU3RHH52ppd9opUP/SVXCmG/cPdk19IzgYHHLE30YmSGg7cs90XuSszJzy0PBhwzcPEELUWuwFtES41XN1Lw3tjaCAI9ib7Sa7iy8q9EUjL24tAAQXOOwADNx5JZRuk1GnG0Y3Fri06ANyawkcMRPFxhWWOrRAmnTZTJ1wtDfJSs9ve59SkxvaDRLj6ILmy2M9RO4rEzs9NZ4x2tuF9B76zQGyyqc43ABw8ZWd6W2IU67iNHdoe9MbPcP0YdY1zsbiJG8nMnzS/pNaS7BOvz8F24pyceT7RGx5Abs0q/pnzCFairq9Gt+mfMIQFel4RNMplZ3h7QwmHD0Sds6tSqmURTKLBpTe5vZIMYpRFfFLSAYMHw2JfTtDtJKuFsfEYjG5RoS2oGuyzJcJ4CdAhLR6TuZ812i+Xt/MPNRtbu278x80HJXCVDEvSiOkqBK8SolyCLiiKNQtovcNrmtHdJKEcVfazFGmPWLne4IF9Ss7efEqk1XesfErryqnFVBJtIeA2pqNHcNxVNW0PaIENB9Xb3quoyGg759ijSolxy0GpOg5ooZ5VaMqUGzHWDwKr+jD12eKDP2r8A/oHtkqdja3MuOYiGkSHczsC7XouMYobDQNd2XcoMsxiVAwv6hhLQGiA0HGIhxO6NANEM40+oAntySR5Id1B2k7JHJDvafL2oRCBcuYlEqKN4tD1Yx6HlW2cSQEMPLsAcxzTkNZ93tS2008DwdxB8Ci/peFuFrQ0A+OuZO3/anaaIdTxrEx8uvHb4MbprNZVa4gFs58iCPeF6vd46wlrnhhMw0zHilNjcRLZ0OXLVazo/amnsvAnKJ28lxtEw9lJiRt02WAGttVQcCHZLSULHVLSHV3FvIEngS4HJX3fQpSJDZiZRdqrsboucz06zbeiqyWMNganedfnJQ6OuDqtaoNHVSBypgM/6UL0mttSlZ3PYIJhoO0YjEoLohWc2kGjUZclKddsX76a69q7GtLnGAAe7/exfNrxtnWPLtBsG4LY3tZiaZDzM6HjGh8vBYOoIK9XHEe3z+eZ9fBldh7Fb9P3hBAoi73dir+T3qqiBGIifnVdXnTpuRNNyrY4EkGOC9S+CAtrlZiQ4Hz7FMcwoomyu7bfzN81G2v8AtH/mPmoWQHGz8zfNF1LM0Oc+odXGGjbnvRQIcr2UXETEAakq36zLRFNrWDLQAnPiUM62POriUHKrxsVLnK42mcnZj2hDVxhMe3giPamFffD+2GDRjQ3vGq9dTZfjOjBiPP8ACPncqK9XMmM5kk8ZzVAbiqnFX2mMiNqoczz90ygteJYwDXER4qVu7H2Q2RiO8/BW2SkYadxcfZIQtRrnv1knbwQC2sQ6OAQ8pje7ZcD/AEie7VL8PEeKBH1pmcuOWvNM7HYzUGLrA0NjNw96UBFMqQ0AnLUNG/eoq68gWuOhbkBGkBAvJIAEwNqLrVgWD52ZqFG2YWluFpnac0WABUVfVcXbMhwVCNQ4rKLoIKrXQop5TsoPadUZTaRnLgXRwa0yV287wYWhtMEMbpOrjvKTNWitV0YbJjOsYj3pjVffRFYrS4v4AEfPgm7Q8AOGhPtSqx0CI4lbu5bvFWyTta72grjyWx6+OOuxtxWas8NLqh0jZotLZLMAc8435oe7WhreQRNgqgtxb15td5CdKY+j1HEAhoDyN4aZcPCQs9d9R1mqNmXUnAQ6NWnMHmJzHeF3p3fI6s0WnN+R5bU8u+kH2dgPqDyXWlNhyvbJPKmCrSiQQQC124jMFfLrbSLHuYdQSFqbLV6p1SmxznNB9AwcMiQWkxl4pNfzcbw4elGc5f69q7cexOS8nNWJjYC2F3Yq/k96qo1RBafFX2KzvDaktObMts58EAQQYII4Ls8vcD21gM5k8FGlVhBgqxjkQc2qpiryQYepB6KYWKqesZ+ZvmFde9omq4bAY8P9oG73/as/M3zVt6/eFw0cZ79o8UX4QNXIDcuY0OHr2JEXl6k4F2GMyckMXI/rOpp/1uzA2tbvPEoO2usKbRSaZg4nne7dyCEfUB2xIgoZzlWXILbRVnTQKpriSAM1BxUMcIHNmYWsdiIGu7KclRZ67GAn0jETohaVaG5iQdR3qP2Z/ERwPxRVlrtgnJje8T4Kr6wduZ+0LloNMAnFJ2AfFB9dwQIWlWiNseKIoupmmQWkRtB896AJUbFYQ4gDIAKjEAcxPkpUHnQHVVWlwnLlzVIh6rWLstBuCZ3fcheA5xInQDXvKquSy4jiOg0571pbuIxMbxf7HH4qNxAQdHqYGntKEtN3sbo0LVW4YVn7wzBO5VqYJrLZ+trMptGrhPdrK+j3pYMVncwerl3Z+5fPOj1rbTrtdU9B3ZcdIBIIPcQJ4SvpTrXM5RuMg4stRCkrVim2dgc3PIAkxnnEAZLb9E7IW0XgiMT3OA5ga94PikZsgZUJjIjEPeE8s9rIbAK8V99PoViJjYQvS19W0taZc7Jo2knRcFd9Oi2mIkNAJ4xmlVqpgVBUJJI0O7khLdefWPZSBw4nBpPMwpFdamYiOyatQqVq8AF2eZ2DvOS3/R+2U30sLHhxpnA4D8LhkQfDXak9ou54PVshrC0GRqyB2o3zl4lZK5bNaKLn2ihn1Zhzc4qNnMHznYvZWuQ8F77Ot9b2Yapd6wA8FmL6tha8RqU7N70rRSFRhhw9JhycwneN2WuhSS6LL9ItOM+hTz5nYFU0fZKDmRiPaKcUaEuAOmp7lVSbircApWKpjLtxcR/a05+Mgd6Ci/7uxM61gGWZgQS3fxWZBX0YZhYG9bN1VV7NgMjkcx88FYcOWudqg5SDlRiVtGk52gPgT5KuIu7nfa0/zt81OpacL3tIxNLnSDz1B2FW3ddlUVGOLHQHA+iRpzXq92uL3GDm4n8I28Siq20abvRqBvB+X+QyU/q13r0o34xC626Tu/yZ8VL6oO9v72fFD+EQ6nSzBFR+z1G/9yBrVi4lxMk6lMPqg72/vb8Vw3Sf6P8A7G/FDv6FZcoFya/VL9gYf/kb8VE3PU/ljuez/uRMn6FJcoEpu65an8t3i0+9VPuWp6rh3T5IA3nsd6EJTy13W8UWZGZ3FKn2J+7zRQrioSr3WZ3BQ6g8PFDSVhMQFW4FXB+I6LgpiNZKjqta3Bskka8YmFXVcHNJykblZVrAwJgiM+5eoOBIaM85J5Z+aNHVz0gOxP4Z75h3tc09xVlB5bWZOUOfPDMT5qltN2EPZmRnHrAZOb4Zd6DtNqms1wORGKYGuQdPHITzVVv7dQBaCk1aySx/JNrPWx0ARu4ahCU/Rdp4BGpYmpYjBGUgx3qy6b4qWcgHtM9Q6gTHZ3ctEww9uDpJ2BKr4sxa8nYUZfR6z2VaDa1MyMiCN20HcZ2cFXSCzPQO8Ye6zuPZqAlvB4GY7x/+QtVVbhkfPz8V5eavevb9nvtcK72dAJSLo7ZjWtbdzTjP9pyHjCKvy1bEd0CpAB9U/iOHk0f7J8FeKDms0l82wU6TjkJy9xQ1z2IU6Uet2vEIStUFprgA/ZUzJy27kwvK1hrSfnJeh5SS/HQMDAMToGXHTRNrusIs9ANyxHN2+Sl1y2cvqGu/QeiDv3phaaxcYRYWWGnDXv4HyVF2twMaNpzP93aj2om01Ayg4ndGzVxAHmEss9oAMu9I56SfYg0dBZ3plZvQqj8h82/9Sc2S0CNDnwI9ihflIPoVJ0DS4c2gkIzeNqwUq6lbHt9FxEbiqGNJMAEngrq9kcwAkaieGzKd+Y4KvFN4ic1Y68KpMmo8ni4qwvI1EkznxzMJfKJbXBAkwQjSx7gWk5SFUG7eB9nyF6pVEQM95VOMxGxBcWH54LmDiNYVfWn5A9u9c60+/wD8ILDSPBQwcRrHeoGqeHgFw1Nh07lB1xIXOvd6zvEqFV8mVWSiiheNUCBUeB+Yrv1vXH/K/wAVCxWXrMecYWF3ONiDJQNKF8VzP2hMbIb8Fb9dV/kM+CT0auE8Ff8ASW7/AGFFKKRGbjtnIKl9QjJdpnKNqhUGeZVdkap05BGXQySd5gDz9wQD3SmN3MGHPaT8Pcin9BpaMQkg+m3bI/E3iNo2juSG1R12WhOzTPWOcBPqFVwEP7Q2PGvJ+/mkF5jDVDuMoNj0YtPpU3Iw9kkLP2S0Q5lVu2Aee1P7adHDailVaj254rt72HEyeCYupYgCrXsBbCD5/Tc5jwQYc0gg7iDIK3FsvQVKbKmxzZI3PEhw8R5LNXxYoMhUUqp6ot9VwdHB0NPtDPFc+Suw6cVvGw3qjXfhBgfiO6fedgT60PFJjLLQ9J23zc5AWMClTBOup/MfgMu8o+66OEmq/wBN3+LdgVrXIL28pNrJRbRphjeZO0k6koC0zVeG7NqsqV5VljgZrQPMMYGhD2dsuleqVJRFnACAPpTVw2Zx3OpnwqNSG7LWT2oEnMkmE76SWd1eiaNIYnuLOyJJgOBJy5Kdxfw8qwDWfhG6c/2tPmUcrXycjtfZbaNuGdwJKNpGtVyo0sQ2uPojv0Pim1K7rBZB23NLtziCe5gy9iK+u6r8rPZnkbHv7DOYnUKaxa0z1M5+3cld19Bw0DrHgf0sE/5ER7J4o61tsFnaWOaxxIggjrHkbjMkd8BSddNprff2jC31KQgePxlGWK4bPS9GmCfWd2jO8TkDyCTO+5ZpxZ+WufrL5je10F7n1qFGo2gACMi7nB012TkkDxBjzyPeNhX2m+eklms/3lQYvUHaf+0ad8BfLekt6ttdTrKdFtMAZnIOfOhfGU/Mqx2zesU7mxNK9KhK5KMrJXJXadFztBlv2eKOst1Odt8Bl4nJAvlWWizPZGJpE79fBai6buYx0NALiD2iZw8RsSO+6jR2ZxPxEk58ok6qrhWSoErhKiSgd9HKRcagHqctSrK9CnScWl1Np3wXlB3Gfvf0nJdXqlxkooy1WwjIOa4DTswqPp7tzf2hCEqMpoXdaVGqc1NtIZ5jL4xmvPoknmo7qU5sTsLWyJbGcaic5HHNLGWeXASM436e5OwyIdq2B36/BUNaGggy0jI7D8OSQ34zC4HinFn7HaYcVJxzbuO/gUrv8dtu45oq6wu3aHUbitJZqssAOxZSxvgp/YXyQEQ2ou2KT3qBrRoIjbr86KuvVkA+PcihbawOlJKFPBVA2OBEHfHZ/wAg1Oa/P/xEylF6UnB7aocAGnTiDPw13IG9lpw1uLM695RJrJdWrwSAdOeSofao2jb7EWJw3FcIilXCzDrbxB27dFP6xgwh5NayqFmb8vuoapZSfha0RI2u/ETwHmvWm+MNMx6REDmdvdqs1UqQMI1Ovw95UYvPl+GH2Lov0h61gpWGzk4AA+rVOFuKNpElx2p99U1an39oeR6lL7Nvj6R8V8x6G9M22Gg6k6kXkuLgWkCZABxTyWjufp1aLXVbSpU6dPET2nEugAGTGUnLRZXwjO24sV00KWbKbQfWObv3HNWWy9KNIfaVWN5kT4apc66i6fpFoqvG4Hqm+DIPtQP0u7rNp1IcNwxv3a5lSc+ViLeqxgx/SYOyoUatY7CGlrP3EJTa7uvK1ZVKos9M/gpmHR/U8ST4t5Ku2/xCotH2VNz909kaws/bv4gWl0hnV0xB0BcdePwU8o+IX7q0+7f7+2lsP8PrNTzqOLzqdgPOSfcp3tVuyjRfTPUyWuEAy/MaB2ZbzXzC8b3tNX7ys907C4gZ8NEuZZS45mBrtz+CbaT7vjpG4NYGubjbiAJIwuHaEQc4yIz1HFdpkA6Sq308I1ygR3qDXQujyz7aEPYwB1TLcDDndzdG8yr7FfReXNDY7LiDqcgs4agc+TIaTntIHfqi7LbWtdDBAg5nU5ZTuVBrrydTbM9t0cw3eeJQfSCn9rjGlRoeO/VLxLnZnVOa9TFZhAzpOjf2HTB8QEUhJUZV1qIMOG1QNLzy5RM+SgYXJ/y/pOSolPejlFsVsbw0dXEwTrqqzYLIP/cPdlOVM+9UJFxOXUbINtZ2vqjRQxWP1av7v9IYyxrHWfJR6071WuhR3G2BxL/boO72lP7teHNLDq2SJ2zqkly+me7zTu7x9seRQXU2QSW942HmEuvmn2QRoDMbk5I7Xgg7waMJyVUloVE6u60Qs7RTCyFEagWlpzmN43+CqtNpnkloPuXXFFStVsjbogrZbJYePJVXgOyUuByRBL7aZOe07tFQ+0nehj8PJQKoJFqMzqe4eO9RNdDKyjqiSIdUO3Yu0m/iKhu5qytoO/zWZarCJJcU0u6qWaEtjMOGRB4EJdZdEaFiztEGlovao6cVV7zxJjwS9ryNFBeKxjSRqmIVTq7icte72qFRX2MZDl7lqsa58l/GHKFNxIHpO2R7k0bdloH4InfhHmlUr2InUk810h5JtM+zU3VUIAJptjfUavG6Y1rUB/fPkEPd7ATmAeYWqu+x0/5bP2j4KpDMGyUxrXb/AGhxVtjoUS8DG8/2/JW5bZaceg39oVddgaOyAOQjyRfFir0otp1TMjQxpqOKJuyqx5e0B2F7MLtvFuezNaK0WdjjLmNJ3kAlIb8cWuaGmBIyGQ13BEZ+01ZMblV1hyz00RF5j7R3P3INQN7lqHDX/SclorkCO7kjrl0rfpOSsqifWFd+kO3+SqKnCg//2Q=="
                  alt="girl"
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

      <section className="mb-5">
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
                            {/* <div className="col-auto">
                              <button
                                type="button"
                                onClick={() =>
                                  addToCart(
                                    c.id,
                                    userId,
                                    c.price,
                                    country,
                                    cartId
                                  )
                                }
                                className="text-inherit text-decoration-none btn btn-primary me-2"
                              >
                                <i className="fas fa-shopping-cart text-primary text-white" />
                              </button>
                              <Link
                                to={"/cart"}
                                className="text-inherit text-decoration-none btn btn-primary"
                              >
                                Enroll Now{" "}
                                <i className="fas fa-arrow-right text-primary align-middle me-2 text-white" />
                              </Link>
                            </div> */}
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

      {/* <section className="my-8 py-lg-8">
       
        <div className="container">
      
          <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
            
            <div className="col-lg-6 col-12 d-none d-lg-block">
              <div className="d-flex justify-content-center pt-4">
          
                <div className="position-relative">
                  <img
                    src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
                    alt="image"
                    className="img-fluid mt-n8"
                  />
                  <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
                    <img
                      src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg"
                      alt="dollor"
                    />
                  </div>
                 
                  <div className="me-n4 position-absolute top-0 end-0">
                    <img
                      src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg"
                      alt="graph"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12">
              <div className="text-white p-5 p-lg-0">
              
                <h2 className="h1 text-white">Become an instructor today</h2>
                <p className="mb-0">
                  Instructors from around the world teach millions of students
                  on Geeks. We provide the tools and skills to teach what you
                  love.
                </p>
                <a href="#" className="btn bg-white text-dark fw-bold mt-4">
                  Start Teaching Today <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
                {/* <div className="col-lg-6 col-md-4 text-md-end mt-4 mt-md-0">
                  
                  <a href="#" className="btn btn-primary">
                    View Reviews
                  </a>
                </div> */}
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

//This is experiment

/* eslint-disable react/jsx-key */
// import { useEffect, useState, useContext } from "react";
// import BaseHeader from "../partials/BaseHeader";
// import BaseFooter from "../partials/BaseFooter";
// import { Link } from "react-router-dom";
// import Rater from "react-rater";
// import "react-rater/lib/react-rater.css";

// import useAxios from "../../utils/useAxios";
// import CartId from "../plugin/CartId";
// import GetCurrentAddress from "../plugin/UserCountry";
// import UserData from "../plugin/UserData";
// import Toast from "../plugin/Toast";
// import { CartContext } from "../plugin/Context";
// import apiInstance from "../../utils/axios";

// function Index() {
//   const [courses, setCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [cartCount, setCartCount] = useContext(CartContext);
//   const user = UserData();

//   const country = GetCurrentAddress().country;
//   const userId = user?.user_id;
//   const cartId = CartId();

//   const fetchCourse = async () => {
//     setIsLoading(true);
//     try {
//       await useAxios()
//         .get(`/course/course-list/`)
//         .then((res) => {
//           setCourses(res.data);
//           setIsLoading(false);
//         });
//     } catch (error) {
//       console.log("Failed to fetch courses:", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourse();
//   }, []);

//   const addToCart = async (courseId, userId, price, country, cartId) => {
//     if (!user) {
//       Toast().fire({
//         icon: "warning",
//         title: "Please log in to add items to the cart.",
//       });
//       return;
//     }

//     const formdata = new FormData();
//     formdata.append("course_id", courseId);
//     formdata.append("user_id", userId);
//     formdata.append("price", price);
//     formdata.append("country_name", country);
//     formdata.append("cart_id", cartId);

//     try {
//       await useAxios()
//         .post(`course/cart/`, formdata)
//         .then((res) => {
//           console.log(res.data);
//           Toast().fire({
//             title: "Added To Cart",
//             icon: "success",
//           });

//           // Set cart count after adding to cart
//           apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
//             setCartCount(res.data?.length);
//           });
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Pagination
//   const coursesPerRow = 4;
//   const itemsPerPage = coursesPerRow; // 4 items per page
//   const [currentPage, setCurrentPage] = useState(1);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(courses.length / itemsPerPage);
//   const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

//   const addToWishlist = (courseId) => {
//     if (!user) {
//       Toast().fire({
//         icon: "warning",
//         title: "Please log in to add items to the wishlist.",
//       });
//       return;
//     }

//     const formdata = new FormData();
//     formdata.append("user_id", user.user_id);
//     formdata.append("course_id", courseId);

//     useAxios()
//       .post(`student/wishlist/${user.user_id}/`, formdata)
//       .then((res) => {
//         console.log(res.data);
//         Toast().fire({
//           icon: "success",
//           title: res.data.message,
//         });
//       });
//   };

//   return (
//     <>
//       <BaseHeader user={user} />

//       <section className="py-lg-8 py-5">
//         {/* container */}
//         <div className="container my-lg-8">
//           {/* row */}
//           <div className="row align-items-center">
//             {/* col */}
//             <div className="col-lg-6 mb-6 mb-lg-0">
//               <div>
//                 {/* heading */}
//                 <h5 className="text-dark mb-4">
//                   <i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2" />
//                   Most trusted education platform
//                 </h5>
//                 {/* heading */}
//                 <h1 className="display-3 fw-bold mb-3">
//                   Grow your skills and advance career
//                 </h1>
//                 {/* para */}
//                 <p className="pe-lg-10 mb-5">
//                   Start, switch, or advance your career with more than 5,000
//                   courses, Professional Certificates, and degrees from
//                   world-class universities and companies.
//                 </p>
//                 {/* btn */}
//                 <a href="#" className="btn btn-primary fs-4 text-inherit ms-3">
//                   Join Free Now <i className="fas fa-plus"></i>
//                 </a>
//                 <a
//                   href="https://www.youtube.com/watch?v=Nfzi7034Kbg"
//                   className="btn btn-outline-success fs-4 text-inherit ms-3"
//                 >
//                   Watch Demo <i className="fas fa-video"></i>
//                 </a>
//               </div>
//             </div>
//             {/* col */}
//             <div className="col-lg-6 d-flex justify-content-center">
//               {/* images */}
//               <div className="position-relative">
//                 <img
//                   src="https://geeksui.codescandy.com/geeks/assets/images/background/acedamy-img/girl-image.png"
//                   alt="girl"
//                   className="end-0 bottom-0"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="pb-8">
//         <div className="container mb-lg-8">
//           {/* row */}
//           <div className="row mb-5">
//             <div className="col-md-6 col-lg-3 border-top-md border-top pb-4  border-end-md">
//               {/* text */}
//               <div className="py-7 text-center">
//                 <div className="mb-3">
//                   <i className="fe fe-award fs-2 text-info" />
//                 </div>
//                 <div className="lh-1">
//                   <h2 className="mb-1">316,000+</h2>
//                   <span>Qualified Instructor</span>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3 border-top-md border-top border-end-lg">
//               {/* icon */}
//               <div className="py-7 text-center">
//                 <div className="mb-3">
//                   <i className="fe fe-users fs-2 text-warning" />
//                 </div>
//                 {/* text */}
//                 <div className="lh-1">
//                   <h2 className="mb-1">1.8 Billion+</h2>
//                   <span>Course enrolments</span>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3 border-top-lg border-top border-end-md">
//               {/* icon */}
//               <div className="py-7 text-center">
//                 <div className="mb-3">
//                   <i className="fe fe-tv fs-2 text-primary" />
//                 </div>
//                 {/* text */}
//                 <div className="lh-1">
//                   <h2 className="mb-1">41,000+</h2>
//                   <span>Courses in 42 languages</span>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3 border-top-lg border-top">
//               {/* icon */}
//               <div className="py-7 text-center">
//                 <div className="mb-3">
//                   <i className="fe fe-film fs-2 text-success" />
//                 </div>
//                 {/* text */}
//                 <div className="lh-1">
//                   <h2 className="mb-1">179,000+</h2>
//                   <span>Online Videos</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mb-5">
//         <div className="container mb-lg-8 ">
//           <div className="row mb-5 mt-3">
//             {/* col */}
//             <div className="col-12">
//               <div className="mb-6">
//                 <h2 className="mb-1 h1">🔥Most Popular Courses</h2>
//                 <p>
//                   These are the most popular courses among Geeks Courses
//                   learners worldwide in year 2022
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//                 {currentItems?.map((c, index) => (
//                   <div className="col" key={index}>
//                     {/* Card */}
//                     <div className="card card-hover">
//                       <Link to={`/course-detail/${c.slug}/`}>
//                         <img
//                           src={c.image}
//                           alt="course"
//                           className="card-img-top"
//                           style={{
//                             width: "100%",
//                             height: "200px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </Link>
//                       {/* Card Body */}
//                       <div className="card-body">
//                         <div className="d-flex justify-content-between align-items-center mb-3">
//                           <div>
//                             <span className="badge bg-info">{c.level}</span>
//                             <span className="badge bg-success ms-2">
//                               {c.language}
//                             </span>
//                           </div>
//                           <a
//                             onClick={() => addToWishlist(c.id)}
//                             className="fs-5"
//                           >
//                             <i className="fas fa-heart text-danger align-middle" />
//                           </a>
//                         </div>
//                         <h4 className="mb-2 text-truncate-line-2 ">
//                           <Link
//                             to={`/course-detail/${c.slug}/`}
//                             className="text-inherit text-decoration-none text-dark fs-5"
//                           >
//                             {c.title}
//                           </Link>
//                         </h4>
//                         <small>By: {c.teacher.full_name}</small> <br />
//                         <small>
//                           {c.students?.length} Student
//                           {c.students?.length > 1 && "s"}
//                         </small>{" "}
//                         <br />
//                         <div className="lh-1 mt-3 d-flex">
//                           <span className="align-text-top">
//                             <span className="fs-6">
//                               <Rater total={5} rating={c.average_rating || 0} />
//                             </span>
//                           </span>
//                           <span className="text-warning">4.5</span>
//                           <span className="fs-6 ms-2">
//                             ({c.reviews?.length} Reviews)
//                           </span>
//                         </div>
//                       </div>
//                       {/* Card Footer */}
//                       <div className="card-footer">
//                         <div className="row align-items-center g-0">
//                           <div className="col">
//                             <h5 className="mb-0">${c.price}</h5>
//                           </div>
//                           <div className="col-auto">
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 addToCart(
//                                   c.id,
//                                   userId,
//                                   c.price,
//                                   country,
//                                   cartId
//                                 )
//                               }
//                               className="text-inherit text-decoration-none btn btn-primary me-2"
//                             >
//                               <i className="fas fa-shopping-cart text-primary text-white" />
//                             </button>
//                             <Link
//                               to={"/cart"}
//                               className="text-inherit text-decoration-none btn btn-primary"
//                             >
//                               Enroll Now{" "}
//                               <i className="fas fa-arrow-right text-primary align-middle me-2 text-white" />
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <nav className="d-flex mt-5">
//                 <ul className="pagination">
//                   <li
//                     className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
//                   >
//                     <button
//                       className="page-link me-1"
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                     >
//                       <i className="ci-arrow-left me-2" />
//                       Previous
//                     </button>
//                   </li>
//                 </ul>
//                 <ul className="pagination">
//                   {pageNumbers.map((number) => (
//                     <li
//                       key={number}
//                       className={`page-item ${currentPage === number ? "active" : ""}`}
//                     >
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(number)}
//                       >
//                         {number}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>

//                 <ul className="pagination">
//                   <li
//                     className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
//                   >
//                     <button
//                       className="page-link ms-1"
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                     >
//                       Next
//                       <i className="ci-arrow-right ms-3" />
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="my-8 py-lg-8">
//         {/* container */}
//         <div className="container">
//           {/* row */}
//           <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
//             {/* col */}
//             <div className="col-lg-6 col-12 d-none d-lg-block">
//               <div className="d-flex justify-content-center pt-4">
//                 {/* img */}
//                 <div className="position-relative">
//                   <img
//                     src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
//                     alt="image"
//                     className="img-fluid mt-n8"
//                   />
//                   <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
//                     <img
//                       src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg"
//                       alt="dollor"
//                     />
//                   </div>
//                   {/* img */}
//                   <div className="me-n4 position-absolute top-0 end-0">
//                     <img
//                       src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg"
//                       alt="graph"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-5 col-12">
//               <div className="text-white p-5 p-lg-0">
//                 {/* text */}
//                 <h2 className="h1 text-white">Become an instructor today</h2>
//                 <p className="mb-0">
//                   Instructors from around the world teach millions of students
//                   on Geeks. We provide the tools and skills to teach what you
//                   love.
//                 </p>
//                 <a href="#" className="btn bg-white text-dark fw-bold mt-4">
//                   Start Teaching Today <i className="fas fa-arrow-right"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="bg-gray-200 pt-8 pb-8 mt-5">
//         <div className="container pb-8">
//           {/* row */}
//           <div className="row mb-lg-8 mb-5">
//             <div className="offset-lg-1 col-lg-10 col-12">
//               <div className="row align-items-center">
//                 {/* col */}
//                 <div className="col-lg-6 col-md-8">
//                   {/* rating */}
//                   <div>
//                     <div className="mb-3">
//                       <span className="lh-1">
//                         <span className="align-text-top ms-2">
//                           <i className="fas fa-star text-warning"></i>
//                           <i className="fas fa-star text-warning"></i>
//                           <i className="fas fa-star text-warning"></i>
//                           <i className="fas fa-star text-warning"></i>
//                           <i className="fas fa-star text-warning"></i>
//                         </span>
//                         <span className="text-dark fw-semibold">4.5/5.0</span>
//                       </span>
//                       <span className="ms-2">(Based on 3265 ratings)</span>
//                     </div>
//                     {/* heading */}
//                     <h2 className="h1">What our students say</h2>
//                     <p className="mb-0">
//                       Hear from
//                       <span className="text-dark">teachers</span>,
//                       <span className="text-dark">trainers</span>, and
//                       <span className="text-dark">leaders</span>
//                       in the learning space about how Geeks empowers them to
//                       provide quality online learning experiences.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-4 text-md-end mt-4 mt-md-0">
//                   {/* btn */}
//                   <a href="#" className="btn btn-primary">
//                     View Reviews
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* row */}
//           <div className="row">
//             {/* col */}
//             <div className="col-md-12">
//               <div className="position-relative">
//                 {/* controls */}
//                 {/* slider */}
//                 <div className="sliderTestimonial">
//                   {/* item */}
//                   <div className="row">
//                     <div className="col-lg-4">
//                       <div className="item">
//                         <div className="card">
//                           <div className="card-body text-center p-6">
//                             {/* img */}
//                             <img
//                               src="../../assets/images/avatar/avatar-1.jpg"
//                               alt="avatar"
//                               className="avatar avatar-lg rounded-circle"
//                             />
//                             <p className="mb-0 mt-3">
//                               “The generated lorem Ipsum is therefore always
//                               free from repetition, injected humour, or words
//                               etc generate lorem Ipsum which looks racteristic
//                               reasonable.”
//                             </p>
//                             {/* rating */}
//                             <div className="lh-1 mb-3 mt-4">
//                               <span className="fs-6 align-top">
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                               </span>
//                               <span className="text-warning">5</span>
//                               {/* text */}
//                             </div>
//                             <h3 className="mb-0 h4">Gladys Colbert</h3>
//                             <span>Software Engineer at Palantir</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4">
//                       <div className="item">
//                         <div className="card">
//                           <div className="card-body text-center p-6">
//                             {/* img */}
//                             <img
//                               src="../../assets/images/avatar/avatar-1.jpg"
//                               alt="avatar"
//                               className="avatar avatar-lg rounded-circle"
//                             />
//                             <p className="mb-0 mt-3">
//                               “The generated lorem Ipsum is therefore always
//                               free from repetition, injected humour, or words
//                               etc generate lorem Ipsum which looks racteristic
//                               reasonable.”
//                             </p>
//                             {/* rating */}
//                             <div className="lh-1 mb-3 mt-4">
//                               <span className="fs-6 align-top">
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                               </span>
//                               <span className="text-warning">5</span>
//                               {/* text */}
//                             </div>
//                             <h3 className="mb-0 h4">Gladys Colbert</h3>
//                             <span>Software Engineer at Palantir</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4">
//                       <div className="item">
//                         <div className="card">
//                           <div className="card-body text-center p-6">
//                             {/* img */}
//                             <img
//                               src="../../assets/images/avatar/avatar-1.jpg"
//                               alt="avatar"
//                               className="avatar avatar-lg rounded-circle"
//                             />
//                             <p className="mb-0 mt-3">
//                               “The generated lorem Ipsum is therefore always
//                               free from repetition, injected humour, or words
//                               etc generate lorem Ipsum which looks racteristic
//                               reasonable.”
//                             </p>
//                             {/* rating */}
//                             <div className="lh-1 mb-3 mt-4">
//                               <span className="fs-6 align-top">
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width={11}
//                                   height={11}
//                                   fill="currentColor"
//                                   className="bi bi-star-fill text-warning"
//                                   viewBox="0 0 16 16"
//                                 >
//                                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                                 </svg>
//                               </span>
//                               <span className="text-warning">5</span>
//                               {/* text */}
//                             </div>
//                             <h3 className="mb-0 h4">Gladys Colbert</h3>
//                             <span>Software Engineer at Palantir</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <BaseFooter />
//     </>
//   );
// }

// export default Index;
