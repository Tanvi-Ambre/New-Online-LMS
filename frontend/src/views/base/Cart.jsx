/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import apiInstance from "../../utils/axios";
import CartId from "../plugin/CartId";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import { useAuthStore } from "../../store/auth";

const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CD", name: "Congo, Democratic Republic of the" },
  { code: "CG", name: "Congo, Republic of the" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "CI", name: "Ivory Coast" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KR", name: "South Korea" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VA", name: "Vatican City" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartStats, setCartStats] = useState([]);
  const [cartCount, setCartCount] = useContext(CartContext);
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const userId = user?.user_id;
  const [bioData, setBioData] = useState({
    full_name: "",
    email: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const fetchCartItem = async () => {
    try {
      await apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
        setCart(res.data);
      });

      await apiInstance.get(`cart/stats/${CartId()}/`).then((res) => {
        setCartStats(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  const navigate = useNavigate();

  const cartItemDelete = async (itemId) => {
    await apiInstance
      .delete(`course/cart-item-delete/${CartId()}/${itemId}/`)
      .then((res) => {
        fetchCartItem();
        Toast().fire({
          icon: "success",
          title: "Cart Item Deleted",
        });
        // Set cart count after adding to cart
        apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
          setCartCount(res.data?.length);
        });
      });
  };

  const handleBioDataChange = (event) => {
    setBioData({
      ...bioData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bioData.full_name) newErrors.full_name = "Name is required";
    if (!bioData.email) newErrors.email = "Email is required";
    if (!bioData.country) newErrors.country = "Country is required";
    return newErrors;
  };

  const createOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      Toast().fire({
        icon: "error",
        title: "Your cart is empty!",
      });
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    const formdata = new FormData();
    formdata.append("full_name", bioData.full_name);
    formdata.append("email", bioData.email);
    formdata.append("country", bioData.country);
    formdata.append("cart_id", CartId());
    //formdata.append("user_id", userId);
    if (userId) {
      formdata.append("user_id", userId);
    } else {
      console.error("User ID is undefined");
      return;
    }
    try {
      await apiInstance.post(`order/create-order/`, formdata).then((res) => {
        navigate(`/checkout/${res.data.order_oid}/`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BaseHeader />

      <section className="py-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-light p-4 text-center rounded-3">
                <h1 className="m-0">My cart</h1>
                {/* Breadcrumb */}
                <div className="d-flex justify-content-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-dots mb-0">
                      <li className="breadcrumb-item">
                        <a href="/" className="text-decoration-none text-dark">
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="/student/courses/" className="text-decoration-none text-dark">
                          Courses
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Cart
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-5">
        <div className="container">
          <form onSubmit={createOrder}>
            <div className="row g-4 g-sm-5">
              {/* Main content START */}
              <div className="col-lg-8 mb-4 mb-sm-0">
                <div className="p-4 shadow rounded-3">
                  <h5 className="mb-0 mb-3">Cart Items ({cart?.length})</h5>

                  <div className="table-responsive border-0 rounded-3">
                    <table className="table align-middle p-4 mb-0">
                      <tbody className="border-top-2">
                        {cart?.map((c, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-lg-flex align-items-center">
                                <div className="w-100px w-md-80px mb-2 mb-md-0">
                                  <img
                                    src={c.course.image}
                                    style={{
                                      width: "100px",
                                      height: "70px",
                                      objectFit: "cover",
                                    }}
                                    className="rounded"
                                    alt=""
                                  />
                                </div>
                                <h6 className="mb-0 ms-lg-3 mt-2 mt-lg-0">
                                  <a
                                    href="#"
                                    className="text-decoration-none text-dark"
                                  >
                                    {c.course.title}
                                  </a>
                                </h6>
                              </div>
                            </td>
                            <td className="text-center">
                              <h5 className="text-success mb-0">${c.price}</h5>
                            </td>
                            <td>
                              <button
                                onClick={() => cartItemDelete(c.id)}
                                className="btn btn-sm btn-danger px-2 mb-0"
                                type="button"
                              >
                                <i className="fas fa-fw fa-times" />
                              </button>
                            </td>
                          </tr>
                        ))}

                        {cart?.length < 1 && (
                          <tr>
                            <td colSpan="3" className="text-center">
                              No Item In Cart
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Personal info START */}
                <div className="shadow p-4 rounded-3 mt-5">
                  {/* Title */}
                  <h5 className="mb-0">Personal Details</h5>
                  {/* Form START */}
                  <div className="row g-3 mt-0">
                    {/* Name */}
                    <div className="col-md-12 bg-light-input">
                      <label htmlFor="yourName" className="form-label">
                        Your name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="yourName"
                        placeholder="Name"
                        name="full_name"
                        value={bioData.full_name}
                        onChange={handleBioDataChange}
                      />
                      {errors.full_name && (
                        <div className="text-danger">{errors.full_name}</div>
                      )}
                    </div>
                    {/* Email */}
                    <div className="col-md-12 bg-light-input">
                      <label htmlFor="emailInput" className="form-label">
                        Email address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="Email"
                        name="email"
                        value={bioData.email}
                        onChange={handleBioDataChange}
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>

                    {/* Country option */}
                    <div className="col-md-12 bg-light-input">
                      <label htmlFor="mobileNumber" className="form-label">
                        Enter country *
                      </label>
                      <select
                        className="form-control"
                        id="country"
                        name="country"
                        value={bioData.country}
                        onChange={handleBioDataChange}
                      >
                        <option value="" disabled>
                          Select your country
                        </option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <div className="text-danger">{errors.country}</div>
                      )}
                    </div>
                  </div>
                  {/* Form END */}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="p-4 shadow rounded-3">
                  <h4 className="mb-3">Cart Total</h4>
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Sub Total
                      <span>${cartStats.price?.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Tax
                      <span>${cartStats.tax?.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex fw-bold justify-content-between align-items-center">
                      Total
                      <span className="fw-bold">
                        ${cartStats.total?.toFixed(2)}
                      </span>
                    </li>
                  </ul>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-lg btn-success"
                      disabled={cart.length === 0}
                      //onClick={createOrder}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                  <p className="small mb-0 mt-2 text-center">
                    By proceeding to checkout, you agree to these{" "}
                    <a href="#">
                      {" "}
                      <strong>Terms of Service</strong>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Cart;
