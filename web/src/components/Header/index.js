import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Search from "../Search";
import { logout } from "../../actions/userActions";

function Header() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("@shopit:cartItems");
    localStorage.removeItem("@shopit:shippingInfo");
  };

  const searchHandler = (event) => {
    event.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img src="assets/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search
          onChange={(event) => setKeyword(event.target.value)}
          onSubmit={searchHandler}
        />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ml-3">
            Cart
          </span>
          {cartItems.length > 0 && (
            <span className="ml-1" id="cart_count">
              {(cartItems.length > 0 && cartItems.length) || ""}
            </span>
          )}
        </Link>
        {(user && (
          <div className="ml-4 dropdown d-inline">
            <Link
              to="#!"
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user.avatar && user.avatar.url}
                  alt={user && user.name}
                  className="rounded-circle"
                />
              </figure>
              <span>{user && user.name}</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
              {user && user.role === "admin" && (
                <Link className="dropdown-item" to="/dashboard">
                  Admin Dashboard
                </Link>
              )}
              <Link className="dropdown-item" to="/orders/me">
                Orders
              </Link>
              <Link className="dropdown-item" to="/me">
                Profile
              </Link>
              <Link
                to="/"
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          </div>
        )) ||
          (!loading && (
            <button
              className="btn ml-4"
              id="login_btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ))}
      </div>
    </nav>
  );
}

export default Header;
